// CSV exports. Display thresholds are never applied: exports cover the whole scope.
import { STATE } from './config.js';
import { Data } from './data.js';

const esc = (v) => {
    if (v == null) return '';
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

function download(name, header, rows, notes = []) {
    const lines = [...notes.map(n => `# ${n}`), header.join(','), ...rows.map(r => r.map(esc).join(','))];
    const blob = new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

const slug = () => `${STATE.product}_${STATE.year}_${STATE.region}`.toLowerCase().replace(/[^a-z0-9_]+/g, '-');
const notes = () => [
    `UNCTAD Wastewater Treatment Technology: Trade & Tariff Monitor`,
    `Goods: ${Data.productLabel()} | Year: ${STATE.year} | Scope: ${STATE.region}`,
    `Trade: UN Comtrade, importer-reported values (exporter mirror where missing), current USD`,
];

export const Csv = {
    flows() {
        const rows = (STATE.scopeFlows || []).slice().sort((a, b) => b.value - a.value).map(d => [
            STATE.year, d.exporter, Data.name(d.exporter), d.importer, Data.name(d.importer),
            d.flowCategory, Math.round(d.value), d.duty == null ? '' : Math.round(d.duty),
            STATE.tariffView[d.importer]?.value?.toFixed(2), Data.needOf(d.importer),
        ]);
        download(`wwt_flows_${slug()}.csv`,
            ['year', 'exporter_iso3', 'exporter', 'importer_iso3', 'importer', 'flow_category', 'value_usd', `est_duty_${STATE.duty.toLowerCase()}_usd`,
                `importer_${STATE.duty.toLowerCase()}_tariff_pct`, 'importer_pct_without_safe_water'],
            rows, notes());
    },

    countries() {
        const idx = Data.productIndices();
        const isos = Object.keys(STATE.countries).filter(iso => Data.inScope(iso)
            && (STATE.tariffs[iso] || STATE.water[iso]));
        const rows = isos.sort().map(iso => {
            const c = STATE.countries[iso];
            const m = Data.tariffFor(iso, 'MFN', idx), a = Data.tariffFor(iso, 'AHS', idx);
            const t = Data.countryTotals(iso);
            return [iso, c.name, c.region, c.dev === 'north' ? 'Developed' : 'Developing', c.ldc ? 1 : 0, c.sids ? 1 : 0,
                STATE.water[iso]?.without, m?.value?.toFixed(2), m?.year, a?.value?.toFixed(2), a?.year,
                t ? Math.round(t.imp) : '', t?.duty == null ? '' : Math.round(t.duty), t ? Math.round(t.exp) : ''];
        });
        download(`wwt_countries_${slug()}.csv`,
            ['iso3', 'economy', 'region', 'development_status', 'ldc', 'sids', 'pct_without_safe_water',
                'mfn_tariff_pct', 'mfn_year', 'applied_tariff_pct', 'applied_year', `imports_${STATE.year}_usd`, `est_duty_${STATE.duty.toLowerCase()}_${STATE.year}_usd`, `exports_${STATE.year}_usd`],
            rows, notes());
    },

    async country(iso) {
        await Data.prefetchAll();   // the file covers every year, but years are only fetched on demand
        const { hs, desc } = STATE.products;
        const m = STATE.tariffs[iso]?.MFN, a = STATE.tariffs[iso]?.AHS;
        const rows = [];
        for (const [y, raw] of Object.entries(STATE.flowsByYear)) {
            for (const [e, i, vals] of raw) {
                if (e !== iso && i !== iso) continue;
                vals.forEach((v, k) => {
                    if (!v) return;
                    rows.push([y, e === iso ? 'export' : 'import', e === iso ? i : e, Data.name(e === iso ? i : e),
                        hs[k], desc[k], Math.round(v), m?.r[k], a?.r[k]]);
                });
            }
        }
        rows.sort((p, q) => q[0] - p[0] || q[6] - p[6]);
        download(`wwt_${iso.toLowerCase()}.csv`,
            ['year', 'direction', 'partner_iso3', 'partner', 'hs6', 'description', 'value_usd', 'mfn_tariff_pct', 'applied_tariff_pct'],
            rows, [...notes().slice(0, 1), `Economy: ${Data.name(iso)} | years loaded: ${Object.keys(STATE.flowsByYear).sort().join(' ')}`,
                `% without safely managed water: ${STATE.water[iso]?.without ?? 'n/a'}`]);
    },
};
