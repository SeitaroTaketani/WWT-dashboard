import * as d3 from 'd3';
import { CONFIG, STATE, VIEW3D, TARIFF_SCALE } from './config.js';

const getJSON = async (url) => {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
    return r.json();
};

export const Data = {
    async loadAll() {
        const [countries, products, tariffs, water, walls, topo] = await Promise.all([
            getJSON('data/countries.json'),
            getJSON('data/products.json'),
            getJSON('data/tariffs.json'),
            getJSON('data/water.json'),
            getJSON('data/walls.json'),
            getJSON(CONFIG.geoJsonUrl),
        ]);
        Object.assign(STATE, { countries, products, tariffs, water, walls, topo });
        STATE.m49ToIso = {};
        for (const [iso, c] of Object.entries(countries)) {
            if (c.m49) STATE.m49ToIso[String(+c.m49)] = iso;
        }
        await this.loadYear(STATE.year);
    },

    async loadYear(year) {
        if (!STATE.flowsByYear[year]) {
            STATE.flowsByYear[year] = await getJSON(`data/flows/${year}.json`);
        }
        return STATE.flowsByYear[year];
    },

    // Warm the cache for the animation and the country CSV so they never wait on the network.
    prefetchAll() {
        return Promise.all(CONFIG.years.map(y => this.loadYear(y).catch(() => null)));
    },

    // Per-economy import/export totals for every year (small; the panel trend needs no flows/YYYY.json).
    async loadTrend() {
        if (!STATE.trend) STATE.trend = await getJSON('data/trend.json');
        return STATE.trend;
    },

    // Imports and exports of the selected goods per year, or null until loadTrend() has resolved.
    trendOf(iso, idx = this.productIndices()) {
        if (!STATE.trend) return null;
        const rec = STATE.trend[iso];
        const n = STATE.products.hs.length;
        return CONFIG.years.map((y, yi) => {
            let imp = 0, exp = 0;
            if (rec) for (const k of idx) { imp += rec[0][yi * n + k]; exp += rec[1][yi * n + k]; }
            return { y, imp, exp };
        });
    },

    // ── Product selection → HS index list ────────────────────────────────
    productIndices(product = STATE.product) {
        const { hs, groups } = STATE.products;
        if (product === 'all') return hs.map((_, i) => i);
        const g = groups.find(x => x.id === product);
        if (g) return g.codes.map(c => hs.indexOf(c));
        const i = hs.indexOf(product);
        return i >= 0 ? [i] : hs.map((_, j) => j);
    },

    productLabel(product = STATE.product) {
        const { hs, groups, desc } = STATE.products;
        if (product === 'all') return 'All 16 WWT-related goods';
        const g = groups.find(x => x.id === product);
        if (g) return `${g.label} (${g.codes.length} HS codes)`;
        const i = hs.indexOf(product);
        return i >= 0 ? `HS ${product} – ${desc[i]}` : product;
    },

    groupOf(code) {
        return STATE.products.groups.find(g => g.codes.includes(code));
    },

    // Simple average of the available HS6 rates for the selected products.
    tariffFor(iso, duty = STATE.duty, idx = this.productIndices()) {
        const rec = STATE.tariffs[iso]?.[duty];
        if (!rec) return null;
        const vals = idx.map(i => rec.r[i]).filter(v => v != null);
        if (!vals.length) return null;
        return { value: d3.mean(vals), year: rec.year, n: vals.length };
    },

    computeTariffView() {
        const idx = this.productIndices();
        const view = {};
        for (const iso of Object.keys(STATE.tariffs)) {
            const t = this.tariffFor(iso, STATE.duty, idx);
            if (t) view[iso] = t;
        }
        STATE.tariffView = view;
        TARIFF_SCALE.set(d3.median(Object.values(view), t => t.value));   // colour centre = median economy
        return view;
    },

    needOf(iso) { return STATE.water[iso]?.without ?? null; },

    dev(iso) { return STATE.countries[iso]?.dev || 'south'; },
    region(iso) { return STATE.countries[iso]?.region || 'Other'; },
    name(iso) { return STATE.countries[iso]?.name || iso; },

    category(exp, imp) {
        return `${this.dev(exp)}-${this.dev(imp)}`;
    },

    // ── Estimated duty burden ─────────────────────────────────────────────
    // Importer's HS-6 rates for the active duty type; a missing HS rate falls back to the
    // importer's mean available rate. null = no tariff data for the importer.
    rateVector(iso, duty = STATE.duty) {
        const key = `${iso}|${duty}`;
        this._rates ||= {};
        if (key in this._rates) return this._rates[key];
        const r = STATE.tariffs[iso]?.[duty]?.r;
        let out = null;
        if (r) {
            const av = r.filter(x => x != null);
            if (av.length) { const m = d3.mean(av); out = r.map(x => x ?? m); }
        }
        return (this._rates[key] = out);
    },

    // Duty on one exporter→importer flow (USD). Intra-EU trade is duty-free (customs union).
    dutyOn(exp, imp, vals, idx = this.productIndices()) {
        const rates = this.rateVector(imp);
        if (!rates) return null;
        if (STATE.countries[exp]?.eu && STATE.countries[imp]?.eu) return 0;
        let d = 0;
        for (const i of idx) d += vals[i] * rates[i] / 100;
        return d;
    },

    // World trade-weighted effective duty rate (%) for the active year / goods / measure:
    // all corridors worldwide whose importer has tariff data (independent of region or selections).
    worldEffectiveRate() {
        let d = 0, v = 0;
        for (const f of STATE.allFlows) if (f.duty != null) { d += f.duty; v += f.value; }
        return v ? d / v * 100 : 0;
    },

    // Active arc metric: 'duty' (estimated duties paid) or 'value' (trade value)
    mv(d) { return STATE.flowMetric === 'duty' ? (d.duty ?? 0) : d.value; },

    // ── Flows for the active year/product ────────────────────────────────
    buildFlows() {
        const raw = STATE.flowsByYear[STATE.year] || [];
        const idx = this.productIndices();
        const out = [];
        for (const [exp, imp, vals] of raw) {
            let v = 0;
            for (const i of idx) v += vals[i];
            if (v > 0) out.push({ exporter: exp, importer: imp, value: v, duty: this.dutyOn(exp, imp, vals, idx), flowCategory: this.category(exp, imp), vals });
        }
        STATE.allFlows = out;
        return out;
    },

    inScope(iso) {
        return STATE.region === 'Global' || this.region(iso) === STATE.region;
    },

    filterFlows() {
        let flows = STATE.allFlows;
        if (STATE.region !== 'Global') {
            flows = flows.filter(d => this.inScope(d.exporter) && this.inScope(d.importer));
        }
        if (STATE.selectedExporters.size) flows = flows.filter(d => STATE.selectedExporters.has(d.exporter));
        if (STATE.selectedImporters.size) flows = flows.filter(d => STATE.selectedImporters.has(d.importer));
        if (STATE.importerNeed === 'high') {
            const q3 = this.highNeedThreshold();
            flows = flows.filter(d => (this.needOf(d.importer) ?? -1) >= q3);
        }
        // Importer circles: duties paid per importer in scope (independent of the focused economy)
        STATE.importerStats = this.importerStats(flows);

        // Focus mode: show the focused economy's own corridors (unless the user picked countries)
        const picked = STATE.selectedExporters.size || STATE.selectedImporters.size;
        const focus = STATE.focusedIso && !picked ? STATE.focusedIso : null;
        if (focus) flows = STATE.allFlows.filter(d => d.exporter === focus || d.importer === focus);

        STATE.scopeFlows = flows;
        STATE.totalScope = d3.sum(flows, d => this.mv(d));
        STATE.scopeValue = d3.sum(flows, d => d.value);
        STATE.scopeDuty = d3.sum(flows, d => d.duty ?? 0);
        STATE.scopeValueKnown = d3.sum(flows, d => (d.duty == null ? 0 : d.value));

        // Which arcs to draw. A focus or a country pick always shows the corridors (threshold view).
        const view = (focus || picked) ? 'all' : STATE.flowView;
        STATE.arcView = view;
        STATE.effectiveThreshold = 0;
        let shown = [];
        if (view === 'all') {
            const thr = STATE.thresholdMode === 'auto' ? this.computeAutoThreshold(flows) : +STATE.thresholdMode * this.metricScale();
            STATE.effectiveThreshold = thr;
            shown = flows.filter(d => this.mv(d) >= thr && this.mv(d) > 0)
                .sort((a, b) => this.mv(b) - this.mv(a)).slice(0, 400)          // hard cap for the 3D scene
                .filter(d => STATE.flowFilters.has(d.flowCategory));
        } else if (view === 'top') {
            const q3 = this.highNeedThreshold();
            shown = flows.filter(d => (this.needOf(d.importer) ?? -1) >= q3 && this.mv(d) > 0)
                .sort((a, b) => this.mv(b) - this.mv(a)).slice(0, VIEW3D.topArcs);
        } else if (view === 'region') {
            shown = this.regionFlows(flows).slice(0, VIEW3D.regionArcs);
        }
        shown.forEach(d => { d.m = this.mv(d); });   // arc width measure for map3d
        STATE.filteredFlows = shown;
        STATE.nodeStats = this.nodeStats(shown.filter(d => d.importer));
        return shown;
    },

    // Duties paid and trade value per importer (only corridors whose importer has tariff data)
    importerStats(flows) {
        const s = {};
        for (const d of flows) {
            if (d.duty == null) continue;
            const r = (s[d.importer] ||= { duty: 0, value: 0 });
            r.duty += d.duty; r.value += d.value;
        }
        return s;
    },

    // Exporter → importing region, anchored at the duty-weighted centre of that region's importers
    regionFlows(flows) {
        const agg = {};
        for (const d of flows) {
            const reg = this.region(d.importer);
            const c = STATE.countries[d.importer]?.coords;
            if (reg === 'Other' || !c) continue;
            const key = `${d.exporter}|${reg}`;
            const a = (agg[key] ||= { exporter: d.exporter, importer: null, importerRegion: reg, value: 0, duty: 0, valueKnown: 0,
                n: new Set(), wx: 0, wy: 0, wz: 0, w: 0, flowCategory: `${this.dev(d.exporter)}-south` });
            a.value += d.value;
            if (d.duty != null) { a.duty += d.duty; a.valueKnown += d.value; }
            a.n.add(d.importer);
            // weight by trade value so the anchor sits where the goods actually go
            const lon = c[0] * Math.PI / 180, lat = c[1] * Math.PI / 180, w = d.value;
            a.wx += Math.cos(lat) * Math.cos(lon) * w; a.wy += Math.cos(lat) * Math.sin(lon) * w; a.wz += Math.sin(lat) * w; a.w += w;
        }
        return Object.values(agg).map(a => {
            const lon = Math.atan2(a.wy, a.wx) * 180 / Math.PI;
            const lat = Math.atan2(a.wz, Math.hypot(a.wx, a.wy)) * 180 / Math.PI;
            return { ...a, n: a.n.size, toLonLat: [lon, lat] };
        }).filter(a => this.mv(a) > 0).sort((a, b) => this.mv(b) - this.mv(a));
    },

    // Product mix of one corridor: why its effective rate differs from other corridors into the same importer.
    // Returns the largest HS lines (share of the corridor's value, importer's rate, whether the rate is imputed).
    corridorMix(d, n = 3) {
        if (!d.vals) return null;
        const { hs } = STATE.products;
        const raw = STATE.tariffs[d.importer]?.[STATE.duty]?.r;
        const rates = this.rateVector(d.importer);
        const free = STATE.countries[d.exporter]?.eu && STATE.countries[d.importer]?.eu;
        const rows = this.productIndices().filter(i => d.vals[i] > 0).map(i => ({
            hs: hs[i], share: d.vals[i] / d.value * 100,
            rate: free ? 0 : rates ? rates[i] : null,
            imputed: !free && !!rates && raw[i] == null,
            duty: free || !rates ? 0 : d.vals[i] * rates[i] / 100,
        })).sort((a, b) => b.share - a.share);
        return { top: rows.slice(0, n), rest: rows.length - n, count: rows.length };
    },

    // Largest supplier corridors into one economy (hover arcs)
    supplierFlows(iso, n = VIEW3D.hoverArcs) {
        return STATE.allFlows.filter(d => d.importer === iso && this.mv(d) > 0)
            .sort((a, b) => this.mv(b) - this.mv(a)).slice(0, n)
            .map(d => ({ ...d, m: this.mv(d) }));
    },

    // Same arc-count-capped adaptive threshold as the SHC monitor (DataLoader.computeAutoThreshold).
    computeAutoThreshold(flows, targetMax = VIEW3D.maxArcs) {
        const n = STATE.selectedExporters.size + STATE.selectedImporters.size + (STATE.focusedIso ? 1 : 0)
            + (STATE.importerNeed === 'high' ? 4 : 0);   // narrower scope -> lower floor
        const isRegional = STATE.region !== 'Global';
        let floor;
        if (n === 0 && !isRegional) floor = 10_000_000;
        else if (n <= 3) floor = 10_000;
        else if (n <= 10) floor = 100_000;
        else if (n <= 30) floor = 500_000;
        else floor = 1_000_000;
        if (isRegional && n === 0) floor = 1_000_000;
        floor *= this.metricScale();
        const above = flows.filter(d => this.mv(d) >= floor);
        if (above.length <= targetMax) return floor;
        return this.mv(above.slice().sort((a, b) => this.mv(b) - this.mv(a))[targetMax - 1]);
    },

    // Duties are ~2–10 % of trade value, so value floors/thresholds are scaled down in duty mode.
    metricScale() { return STATE.flowMetric === 'duty' ? 0.05 : 1; },

    nodeStats(flows) {
        const s = {};
        for (const d of flows) {
            const v = this.mv(d);
            (s[d.exporter] ||= { exp: 0, imp: 0 }).exp += v;
            (s[d.importer] ||= { exp: 0, imp: 0 }).imp += v;
        }
        return s;
    },

    // Country totals (all partners, not thresholded) for the active year/products
    countryTotals(iso, year = STATE.year, idx = this.productIndices()) {
        const raw = STATE.flowsByYear[year];
        if (!raw) return null;
        let imp = 0, exp = 0, duty = 0, dutyKnown = !!this.rateVector(iso);
        const suppliers = {}, markets = {}, supplierDuty = {};
        for (const [e, i, vals] of raw) {
            if (e !== iso && i !== iso) continue;
            let v = 0;
            for (const k of idx) v += vals[k];
            if (!v) continue;
            if (i === iso) {
                imp += v; suppliers[e] = (suppliers[e] || 0) + v;
                const d = this.dutyOn(e, i, vals, idx) ?? 0;
                duty += d; supplierDuty[e] = (supplierDuty[e] || 0) + d;
            }
            if (e === iso) { exp += v; markets[i] = (markets[i] || 0) + v; }
        }
        return { imp, exp, suppliers, markets, duty: dutyKnown ? duty : null, supplierDuty };
    },

    // Upper-quartile cut-off of need across all economies with a JMP estimate (global, fixed)
    highNeedThreshold() {
        if (this._q3 == null) this._q3 = d3.quantile(Object.values(STATE.water).map(w => w.without).sort(d3.ascending), 0.75);
        return this._q3;
    },

    // Duties paid by importers in the global highest-need quarter, within the current scope
    dutyHighNeed() {
        const q3 = this.highNeedThreshold();
        let high = 0;
        for (const d of STATE.scopeFlows || []) if ((this.needOf(d.importer) ?? -1) >= q3) high += d.duty ?? 0;
        return high;
    },

    // ── The "high need · high tariff" group (analysis panel) ──
    // Economies with both a need and a tariff estimate (global). High need = the same top-quarter cut-off as the "Importers: High need"
    // switch (about the share at which a majority lacks safely managed water). High tariff = above the median economy, i.e. the red
    // side of the colour scale (TARIFF_SCALE.median). `tariffTop` is the stricter top-quarter tariff cut, used for a sensitivity note.
    // The low-need reference group is the bottom quarter of need.
    burden() {
        const pts = [];
        for (const [iso, t] of Object.entries(STATE.tariffView)) {
            const need = this.needOf(iso);
            if (need != null) pts.push({ iso, need, tariff: t.value });
        }
        const sorted = (k) => pts.map(p => p[k]).sort(d3.ascending);
        return {
            pts, n: pts.length,
            needHigh: this.highNeedThreshold(),
            needLow: d3.quantile(sorted('need'), 0.25),
            tariffHigh: TARIFF_SCALE.median,
            tariffTop: d3.quantile(sorted('tariff'), 0.75),
            missing: Object.keys(STATE.tariffView).filter(iso => this.needOf(iso) == null),   // tariff but no water estimate
        };
    },

    // ── The core message: tariffs by need quartile ───────────────────────
    needTariffQuartiles() {
        const pts = [];
        for (const [iso, t] of Object.entries(STATE.tariffView)) {
            const need = this.needOf(iso);
            if (need == null || !this.inScope(iso)) continue;
            pts.push({ iso, need, tariff: t.value });
        }
        if (pts.length < 8) return null;
        const needs = pts.map(p => p.need).sort(d3.ascending);
        const q1 = d3.quantileSorted(needs, 0.25), q3 = d3.quantileSorted(needs, 0.75);
        const low = pts.filter(p => p.need <= q1), high = pts.filter(p => p.need >= q3);
        return {
            n: pts.length,
            lowMedian: d3.median(low, p => p.tariff),
            highMedian: d3.median(high, p => p.tariff),
            q1, q3, pts,
        };
    },
};
