"""
UNCTAD WWT dashboard — data pipeline.

Inputs  (../data relative to dashboard/):
  COMTRADE/Country_Report.csv                 bilateral trade, 16 HS6 codes, 2010-2024
  tariff/DataJobID-*_WWT.csv                  WITS tariffs (MFN / AHS / BND), latest year per reporter
  Share without safely managed water/data.csv WHO/UNICEF JMP, % using safely managed drinking water
  ../country_classification.json              UNCTAD regions & development status
  map-chart-style-package/data/meta.json      ISO3 names + label coordinates

Outputs (public/data/):
  countries.json  {iso3: {m49, name, coords, region, dev, ldc, sids}}
  products.json   HS codes, descriptions, technology groups
  tariffs.json    {iso3: {MFN: {year, r: [16 rates|null]}, AHS: {...}}}
  water.json      {iso3: {without, urban, rural, year}}
  flows/YYYY.json [[exp, imp, [16 values USD]], ...]  (importer-reported preferred, exporter mirror fallback)
  walls.json      {iso3: [[x,y,...flat ring in Equal Earth unit coords], ...]}
  validation.json summary figures checked by scripts/validate.py
"""
import glob
import json
import math
import os
import sys

import pandas as pd
import pycountry
import topojson_decode  # local helper (scripts/topojson_decode.py)
from shapely.geometry import Polygon, MultiPolygon, Point
from shapely.ops import unary_union

HERE = os.path.dirname(os.path.abspath(__file__))
DASH = os.path.dirname(HERE)
ROOT = os.path.dirname(DASH)                       # wastewater/
DATA = os.path.join(ROOT, 'data')
OUT = os.path.join(DASH, 'public', 'data')
os.makedirs(os.path.join(OUT, 'flows'), exist_ok=True)

YEARS = list(range(2010, 2025))

# ── Products & technology groups ─────────────────────────────────────────────
GROUPS = [
    ('pumping',    'Pumping',                   ['841350', '841370', '841391']),
    ('aeration',   'Aeration & air handling',   ['841440', '841480', '841490']),
    ('filtration', 'Filtration & purification', ['842121', '842199']),
    ('process',    'Process equipment',         ['841989', '847982']),
    ('monitoring', 'Monitoring & control',      ['853710', '902610', '902620', '902730', '902789', '902790']),
]
HS = [c for _, _, codes in GROUPS for c in codes]
HS_IDX = {c: i for i, c in enumerate(HS)}

# ── Country codes ────────────────────────────────────────────────────────────
# Comtrade / WITS reporter codes that differ from ISO M49
CODE_FIX = {251: 250, 579: 578, 699: 356, 757: 756, 842: 840, 490: 158}
DROP_CODES = {0, 200, 736, 891, 918, 568, 577, 899, 530, 838, 10, 837, 839, 473, 527, 636, 637, 80}


def m49_to_iso3(code):
    code = CODE_FIX.get(int(code), int(code))
    if code in DROP_CODES:
        return None
    if code == 158:
        return 'TWN'
    c = pycountry.countries.get(numeric=str(code).zfill(3))
    return c.alpha_3 if c else None


def iso3_to_m49(iso3):
    if iso3 == 'TWN':
        return '158'
    c = pycountry.countries.get(alpha_3=iso3)
    return c.numeric if c else None


NAME_FIX = {'FS Micronesia': 'Micronesia (Federated States of)', 'N. Mariana Isds': 'Northern Mariana Islands',
            'USA': 'United States', 'Br. Indian Ocean Terr.': 'British Indian Ocean Territory',
            'Holy See (Vatican City State)': 'Holy See'}


def tidy_name(n):
    n = NAME_FIX.get(n, n)
    return n.replace(' Isds', ' Islands').replace('Br. ', 'British ')


def short_name(n):
    # Map labels: drop the parenthetical part ("Iran (Islamic Republic of)" -> "Iran")
    s = n.split(' (')[0]
    return {'Dem. Rep. of the Congo': 'DR Congo', 'China, Taiwan Province of': 'Taiwan Province of China',
            'China, Hong Kong SAR': 'Hong Kong SAR', 'China, Macao SAR': 'Macao SAR',
            "Lao People's Dem. Rep.": 'Lao PDR', "Dem. People's Rep. of Korea": 'DPR Korea',
            'United Republic of Tanzania': 'Tanzania', 'Central African Republic': 'Central African Rep.'}.get(s, s)


def load_json(p):
    with open(p, encoding='utf-8') as f:
        return json.load(f)


def dump(name, obj):
    p = os.path.join(OUT, name)
    with open(p, 'w', encoding='utf-8') as f:
        json.dump(obj, f, separators=(',', ':'), ensure_ascii=False)
    return os.path.getsize(p)


def main():
    report = {}

    # ── Classification ───────────────────────────────────────────────────────
    cls = load_json(os.path.join(ROOT, 'country_classification.json'))
    meta = load_json(os.path.join(ROOT, 'map-chart-style-package', 'data', 'meta.json'))
    region_names = {k: v['name'] for k, v in cls['regions'].items()}
    developed = set(cls['development']['1500']['countries'])
    ldcs = set(cls['development']['1610']['countries'])

    # ── Trade ────────────────────────────────────────────────────────────────
    print('reading Comtrade ...')
    yrs = [str(y) for y in YEARS]
    tr = pd.read_csv(os.path.join(DATA, 'COMTRADE', 'Country_Report.csv'), encoding='utf-8-sig',
                     low_memory=False, dtype={'HS_Code': str})
    sids_flags = {}
    eu_members = set()
    for _, r in tr.drop_duplicates('Reporter_Code').iterrows():
        iso = m49_to_iso3(r.Reporter_Code)
        if iso:
            sids_flags[iso] = (str(r.SIDS) == 'Y', str(r.LDC) == 'Y')
            if str(r.EU) == 'Y':
                eu_members.add(iso)
    tr = tr[tr.Indicator.isin(['Import Value (USD)', 'Export Value (USD)']) & (tr.Partner_Code != 0)]
    tr = tr.assign(rep=tr.Reporter_Code.map(m49_to_iso3), par=tr.Partner_Code.map(m49_to_iso3))
    tr = tr.dropna(subset=['rep', 'par'])
    tr = tr[tr.rep != tr.par]
    imp = tr[tr.Indicator == 'Import Value (USD)'].rename(columns={'rep': 'imp', 'par': 'exp'})
    exp = tr[tr.Indicator == 'Export Value (USD)'].rename(columns={'rep': 'exp', 'par': 'imp'})
    key = ['exp', 'imp', 'HS_Code']
    imp_l = imp.melt(id_vars=key, value_vars=yrs, var_name='year', value_name='v_imp').dropna()
    exp_l = exp.melt(id_vars=key, value_vars=yrs, var_name='year', value_name='v_exp').dropna()
    imp_l = imp_l.groupby(key + ['year'], as_index=False).v_imp.sum()
    exp_l = exp_l.groupby(key + ['year'], as_index=False).v_exp.sum()
    m = imp_l.merge(exp_l, on=key + ['year'], how='outer')
    # Importer-reported (CIF) preferred; exporter-reported (FOB) mirror as fallback
    m['v'] = m.v_imp.where(m.v_imp.notna() & (m.v_imp > 0), m.v_exp)
    m['src'] = m.v_imp.notna() & (m.v_imp > 0)
    m = m[m.v > 0]
    report['trade_rows'] = int(len(m))
    report['share_importer_reported'] = round(float((m.v * m.src).sum() / m.v.sum()), 4)

    active = set(m.exp) | set(m.imp)
    flow_sizes = {}
    year_totals = {}
    for y, g in m.groupby('year'):
        g = g.assign(i=g.HS_Code.map(HS_IDX))
        g = g.dropna(subset=['i'])
        out = []
        for (e, i_), gg in g.groupby(['exp', 'imp']):
            vals = [0] * len(HS)
            for idx, v in zip(gg.i, gg.v):
                vals[int(idx)] += int(round(v))
            out.append([e, i_, vals])
        flow_sizes[y] = dump(f'flows/{y}.json', out)
        year_totals[y] = int(g.v.sum())
    report['flow_file_kb'] = {k: round(v / 1024) for k, v in flow_sizes.items()}
    report['world_total_by_year'] = year_totals

    # ── Tariffs ──────────────────────────────────────────────────────────────
    print('reading tariffs ...')
    tf = pd.read_csv(glob.glob(os.path.join(DATA, 'tariff', '*.csv'))[0], encoding='latin-1', dtype={'Product': str})
    tf = tf[tf.DutyType.isin(['MFN', 'AHS'])]
    tf = tf.assign(iso=tf.Reporter.map(m49_to_iso3)).dropna(subset=['iso'])
    tariffs = {}
    for (iso, dt), g in tf.groupby(['iso', 'DutyType']):
        rates = [None] * len(HS)
        for p, v in zip(g.Product, g['Simple Average']):
            if p in HS_IDX and pd.notna(v):
                rates[HS_IDX[p]] = round(float(v), 2)
        tariffs.setdefault(iso, {})[dt] = {'year': int(g['Tariff Year'].max()), 'r': rates}
    dump('tariffs.json', tariffs)
    report['tariff_countries'] = len(tariffs)

    # ── Water (WHO/UNICEF JMP) ───────────────────────────────────────────────
    wd = pd.read_csv(os.path.join(DATA, 'Share without safely managed water', 'data.csv'))
    wd = wd[wd.IsLatestYear == True]
    water = {}
    for iso, g in wd.groupby('SpatialDimValueCode'):
        rec = {}
        for dim, key_ in (('Total', 'without'), ('Urban', 'urban'), ('Rural', 'rural')):
            s = g[g.Dim1 == dim]
            if len(s):
                rec[key_] = round(100 - float(s.FactValueNumeric.iloc[0]), 1)
                if dim == 'Total':
                    rec['year'] = int(s.Period.iloc[0])
        if 'without' in rec:
            water[iso] = rec
    dump('water.json', water)
    report['water_countries'] = len(water)

    # ── Countries ────────────────────────────────────────────────────────────
    countries = {}
    all_iso = active | set(tariffs) | set(water) | set(cls['countries'])
    for iso in sorted(all_iso):
        c = cls['countries'].get(iso, {})
        regs = c.get('regions', [])
        top = next((region_names[r] for r in regs if r in ('5100', '5200', '5300', '5400', '5500')), None)
        sids, ldc_flag = sids_flags.get(iso, (False, False))
        # UNCTAD official names first (classification), then Comtrade-style meta names, tidied
        name = c.get('name') or (meta.get(iso) or {}).get('name')
        if not name:
            pc = pycountry.countries.get(alpha_3=iso)
            name = pc.name if pc else iso
        name = tidy_name(name)
        countries[iso] = {
            'm49': iso3_to_m49(iso), 'name': name, 'short': short_name(name),
            'coords': (meta.get(iso) or {}).get('coords'),
            'region': top, 'dev': 'north' if iso in developed else 'south',
            'ldc': iso in ldcs or ldc_flag, 'sids': sids, 'eu': iso in eu_members,
        }
    dump('countries.json', countries)
    report['countries'] = len(countries)
    report['countries_missing_coords'] = [k for k, v in countries.items() if not v['coords'] and k in active]

    dump('products.json', {
        'hs': HS,
        'desc': tr.drop_duplicates('HS_Code').set_index('HS_Code').Product_Description.reindex(HS).fillna('').tolist(),
        'groups': [{'id': gid, 'label': lab, 'codes': codes} for gid, lab, codes in GROUPS],
        'years': YEARS,
    })

    # ── Walls ────────────────────────────────────────────────────────────────
    print('building walls ...')
    walls, wall_report, centroids = build_walls(countries)
    dump('walls.json', walls)
    for iso, ll in centroids.items():
        if not countries[iso]['coords']:
            countries[iso]['coords'] = ll
    dump('countries.json', countries)
    report['countries_missing_coords'] = [k for k, v in countries.items() if not v['coords'] and k in active]
    report['walls'] = wall_report

    # ── Checks used by validate.py ───────────────────────────────────────────
    def avg(iso, dt='MFN'):
        r = [x for x in tariffs.get(iso, {}).get(dt, {}).get('r', []) if x is not None]
        return round(sum(r) / len(r), 2) if r else None
    report['spot_mfn_avg'] = {k: avg(k) for k in ('ETH', 'COD', 'BHS', 'DEU', 'USA', 'CHN', 'KEN', 'NGA')}
    both = [(water[k]['without'], avg(k)) for k in water if avg(k) is not None]
    df = pd.DataFrame(both, columns=['without', 'tariff'])
    df['q'] = pd.qcut(df.without, 4, labels=False)
    report['need_quartile_median_tariff'] = df.groupby('q').tariff.median().round(2).tolist()
    report['need_tariff_spearman'] = round(float(df.corr(method='spearman').iloc[0, 1]), 3)
    report['need_tariff_n'] = int(len(df))

    # Estimated duty burden (must match src/data.js dutyOf): sum over HS of value x rate/100,
    # missing HS rate -> the economy's mean available rate; intra-EU trade = 0 (customs union).
    import numpy as np
    q3 = float(np.quantile([w['without'] for w in water.values()], 0.75))
    for dt in ('MFN', 'AHS'):
        rates = {}
        for iso, rec in tariffs.items():
            if dt in rec:
                r = rec[dt]['r']; av = [x for x in r if x is not None]
                if av:
                    m = sum(av) / len(av)
                    rates[iso] = [x if x is not None else m for x in r]
        flows24 = json.load(open(os.path.join(OUT, 'flows', '2024.json'), encoding='utf-8'))
        tot = high = 0.0
        for e, i, vals in flows24:
            if i not in rates or (e in eu_members and i in eu_members):
                continue
            d = sum(v * r / 100 for v, r in zip(vals, rates[i]))
            tot += d
            if water.get(i, {}).get('without', -1) >= q3:
                high += d
        report[f'duty_2024_{dt}'] = {'total': round(tot), 'high_need_importers': round(high), 'q3_need': round(q3, 2)}
    with open(os.path.join(HERE, 'validation.json'), 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    print(json.dumps({k: v for k, v in report.items() if k not in ('flow_file_kb', 'world_total_by_year')}, indent=1))


# ── Equal Earth (unit radius, d3 screen convention: y down) ──────────────────
A1, A2, A3, A4 = 1.340264, -0.081106, 0.000893, 0.003796
M = math.sqrt(3) / 2


def equal_earth(lon, lat):
    lam, phi = math.radians(lon), math.radians(lat)
    l = math.asin(M * math.sin(phi))
    l2 = l * l
    l6 = l2 * l2 * l2
    x = lam * math.cos(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)))
    y = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))
    return x, -y


# The UN TopoJSON stores longitudes relative to ~11.31°E (decoded = real - 11.31).
# Walls stay in that map frame (same as the ground); real coordinates are rotated in JS.
GEO_LON_OFFSET = 11.31
INSET = 0.0035          # inward offset so neighbouring walls do not coincide
SIMPLIFY = 0.0012
MIN_RING_AREA = 2.5e-6  # drop tiny islets (but see SMALL_STATE cage)
CAGE_R = 0.009          # symbolic ring for very small states (SIDS etc.)


def build_walls(countries):
    topo = load_json(os.path.join(DASH, 'public', 'assets', 'worldmap-economies-4326.topo.json'))
    feats = topojson_decode.features(topo, 'economies')
    m49_iso = {v['m49'].lstrip('0'): k for k, v in countries.items() if v['m49']}
    walls, cages, missing, centroids = {}, [], [], {}
    for f in feats:
        code = str(f['properties'].get('code', '')).lstrip('0')
        iso = m49_iso.get(code)
        if not iso:
            continue
        polys = []
        for rings in f['polygons']:
            ext = [equal_earth(lon, lat) for lon, lat in rings[0]]
            if len(ext) < 4:
                continue
            p = Polygon(ext).buffer(0)
            if not p.is_empty:
                polys.append(p)
        if not polys:
            missing.append(iso)
            continue
        geom = unary_union(polys)
        inset = geom.buffer(-INSET, join_style=2).simplify(SIMPLIFY)
        out = []
        for g in getattr(inset, 'geoms', [inset]):
            if g.is_empty or g.geom_type != 'Polygon' or g.area < MIN_RING_AREA:
                continue
            out.append([round(c, 5) for xy in g.exterior.coords for c in xy])
        if not out:
            # small state: symbolic circular cage around the largest part
            big = max(getattr(geom, 'geoms', [geom]), key=lambda g: g.area)
            c = big.centroid
            ring = Point(c.x, c.y).buffer(CAGE_R, 8).exterior.coords
            out = [[round(v, 5) for xy in ring for v in xy]]
            cages.append(iso)
        walls[iso] = out
        # lon/lat label point of the largest part (fallback when meta.json has no coords)
        ll_polys = [Polygon(r[0]).buffer(0) for r in f['polygons'] if len(r[0]) >= 4]
        if ll_polys:
            rp = max(ll_polys, key=lambda g: g.area).representative_point()
            lon = (rp.x + GEO_LON_OFFSET + 180) % 360 - 180      # map frame -> real longitude
            centroids[iso] = [round(lon, 3), round(rp.y, 3)]
    return walls, {'countries': len(walls), 'cages': cages, 'no_geometry': missing}, centroids


if __name__ == '__main__':
    sys.exit(main())
