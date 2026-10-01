// Country detail panel (SHC "insight panel" styling).
import * as d3 from 'd3';
import { CONFIG, STATE, fmtUSD, fmtPct } from './config.js';
import { Data } from './data.js';

const $ = (id) => document.getElementById(id);

export const Panel = {
    init({ onClose, onSelect }) {
        this.onSelect = onSelect;
        $('panel-close-btn').addEventListener('click', onClose);
        $('panel-body').addEventListener('click', (e) => {
            const el = e.target.closest('[data-iso]');
            if (el) onSelect(el.dataset.iso);
        });
    },

    open(iso) {
        $('insight-panel').classList.add('open');
        document.body.classList.add('panel-open');
        this.render(iso);
        // The import trend needs every year; fetch in the background and re-render once.
        if (!this._prefetched) {
            this._prefetched = true;
            Data.prefetchAll().then(() => { if (STATE.focusedIso) this.render(STATE.focusedIso); });
        }
    },

    close() {
        $('insight-panel').classList.remove('open');
        document.body.classList.remove('panel-open');
    },

    render(iso) {
        const c = STATE.countries[iso] || { name: iso };
        $('panel-country-name').textContent = c.name;
        const badges = [
            c.region,
            c.dev === 'north' ? 'Developed' : 'Developing',
            c.ldc ? '<span class="si-badge badge-ldc">LDC</span>' : '',
            c.sids ? '<span class="si-badge badge-sids">SIDS</span>' : '',
        ].filter(Boolean);
        $('panel-country-meta').innerHTML = badges.join(' · ');

        const w = STATE.water[iso];
        const idx = Data.productIndices();
        const mfn = Data.tariffFor(iso, 'MFN', idx);
        const ahs = Data.tariffFor(iso, 'AHS', idx);
        const tot = Data.countryTotals(iso);

        let html = `
        <div class="si-kpi-grid cols-3">
            <div class="si-kpi-card need">
                <div class="si-kpi-label">No safe water</div>
                <div class="si-kpi-value">${w ? fmtPct(w.without) : '—'}</div>
                <div class="si-kpi-sub">${w ? `urban ${fmtPct(w.urban)} · rural ${fmtPct(w.rural)}` : 'no JMP estimate'}</div>
            </div>
            <div class="si-kpi-card tariff">
                <div class="si-kpi-label">MFN tariff</div>
                <div class="si-kpi-value">${mfn ? fmtPct(mfn.value) : '—'}</div>
                <div class="si-kpi-sub">${mfn ? `${mfn.year} · ${mfn.n} HS lines` : 'no data'}</div>
            </div>
            <div class="si-kpi-card applied">
                <div class="si-kpi-label">Applied (AHS)</div>
                <div class="si-kpi-value">${ahs ? fmtPct(ahs.value) : '—'}</div>
                <div class="si-kpi-sub">${ahs ? `${ahs.year} · incl. preferences` : 'no data'}</div>
            </div>
        </div>`;

        html += this._rankNarrative(iso, w, STATE.duty === 'MFN' ? mfn : ahs);
        html += this._groupBars(iso);
        html += this._tradeBlock(iso, tot);
        html += this._trend(iso, idx);
        html += this._suppliers(iso, tot);
        html += this._hsTable(iso);
        html += `<div class="si-foot">Goods: ${Data.productLabel()}. Tariffs: WITS/TRAINS simple averages. Trade: UN Comtrade, importer-reported with exporter mirror fallback.</div>`;
        $('panel-body').innerHTML = html;
    },

    _rankNarrative(iso, w, t) {
        const vals = Object.entries(STATE.tariffView).map(([k, v]) => [k, v.value]).sort((a, b) => b[1] - a[1]);
        const rank = vals.findIndex(([k]) => k === iso);
        const needVals = Object.entries(STATE.water).map(([k, v]) => [k, v.without]).sort((a, b) => b[1] - a[1]);
        const nrank = needVals.findIndex(([k]) => k === iso);
        if (rank < 0 && nrank < 0) return '';
        const parts = [];
        if (rank >= 0) parts.push(`<b>${ordinal(rank + 1)}</b> highest ${STATE.duty === 'MFN' ? 'MFN' : 'applied'} tariff of ${vals.length} economies`);
        if (nrank >= 0) parts.push(`<b>${ordinal(nrank + 1)}</b> largest water-access gap of ${needVals.length}`);
        const q = Data.needTariffQuartiles();
        let tag = '';
        if (q && w && t) {
            if (w.without >= q.q3 && t.value >= q.highMedian) tag = '<span class="si-flag">High need · high tariff</span>';
            else if (w.without >= q.q3) tag = '<span class="si-flag si-flag-soft">High need</span>';
        }
        return `<div class="si-narrative-box">${tag ? `<div>${tag}</div>` : ''}${parts.join('<br>')}</div>`;
    },

    _groupBars(iso) {
        const groups = [{ id: 'all', label: 'All 16 goods', codes: STATE.products.hs }, ...STATE.products.groups];
        const rows = groups.map(g => {
            const idx = g.codes.map(c => STATE.products.hs.indexOf(c));
            const m = Data.tariffFor(iso, 'MFN', idx), a = Data.tariffFor(iso, 'AHS', idx);
            return { g, m: m?.value, a: a?.value };
        });
        const max = Math.max(CONFIG.tariff.guides[1], d3.max(rows, r => Math.max(r.m ?? 0, r.a ?? 0)) || 0);
        const bar = (v, cls) => v == null ? '<span class="gb-na">n/a</span>'
            : `<span class="gb-bar ${cls}" style="width:${(v / max * 100).toFixed(1)}%"></span><span class="gb-val">${fmtPct(v)}</span>`;
        const active = STATE.product;
        return `<div class="si-section">
            <div class="si-label">Tariffs by technology</div>
            <div class="gb-legend"><span class="gb-key mfn"></span>MFN <span class="gb-key ahs"></span>Applied (AHS)</div>
            ${rows.map(r => `<div class="gb-row${(active === r.g.id || (active === 'all' && r.g.id === 'all')) ? ' active' : ''}">
                <div class="gb-name">${r.g.label}</div>
                <div class="gb-bars"><div class="gb-line">${bar(r.m, 'mfn')}</div><div class="gb-line">${bar(r.a, 'ahs')}</div></div>
            </div>`).join('')}
        </div>`;
    },

    _tradeBlock(iso, tot) {
        if (!tot) return '';
        return `<div class="si-section">
            <div class="si-label">Trade in ${STATE.year}</div>
            <div class="si-kpi-grid cols-3 compact">
                <div class="si-kpi-card"><div class="si-kpi-label">Imports</div><div class="si-kpi-value">${fmtUSD(tot.imp)}</div></div>
                <div class="si-kpi-card tariff"><div class="si-kpi-label">Est. duties paid (${STATE.duty})</div><div class="si-kpi-value">${tot.duty != null ? fmtUSD(tot.duty) : '—'}</div>
                    <div class="si-kpi-sub">${tot.duty != null && tot.imp ? `${fmtPct(tot.duty / tot.imp * 100, 2)} of imports` : 'no tariff data'}</div></div>
                <div class="si-kpi-card"><div class="si-kpi-label">Exports</div><div class="si-kpi-value">${fmtUSD(tot.exp)}</div></div>
            </div>
        </div>`;
    },

    _trend(iso, idx) {
        const years = CONFIG.years;
        const series = years.map(y => {
            const t = Data.countryTotals(iso, y, idx);
            return t ? { y, imp: t.imp, exp: t.exp } : null;
        });
        if (series.some(s => s === null)) {
            return `<div class="si-section"><div class="si-label">Imports &amp; exports ${years[0]}–${years[years.length - 1]}</div><div class="si-loading">Loading trend…</div></div>`;
        }
        const W = 320, H = 70;
        const max = d3.max(series, s => Math.max(s.imp, s.exp)) || 1;
        const x = d3.scalePoint().domain(years).range([4, W - 4]);
        const y = d3.scaleLinear().domain([0, max]).range([H, 4]);
        const line = (k) => d3.line().x(s => x(s.y)).y(s => y(s[k]))(series);
        const cur = series.find(s => s.y === STATE.year);
        return `<div class="si-section">
            <div class="si-label">Imports &amp; exports ${years[0]}–${years[years.length - 1]}</div>
            <div class="si-chart-legend">
                <div class="si-legend-item"><div class="si-legend-swatch" style="background:#4f4740;height:2px"></div><span>Imports</span></div>
                <div class="si-legend-item"><div class="si-legend-swatch" style="background:#009edb;height:2px"></div><span>Exports</span></div>
                <span class="si-legend-max">max ${fmtUSD(max)}</span>
            </div>
            <svg viewBox="0 0 ${W} ${H + 14}" width="100%" role="img" aria-label="Imports and exports trend">
                <line x1="0" x2="${W}" y1="${H}" y2="${H}" stroke="#ded9d5"/>
                <path d="${line('imp')}" fill="none" stroke="#4f4740" stroke-width="1.8"/>
                <path d="${line('exp')}" fill="none" stroke="#009edb" stroke-width="1.8"/>
                ${cur ? `<line x1="${x(cur.y)}" x2="${x(cur.y)}" y1="0" y2="${H}" stroke="#aea29a" stroke-dasharray="2,2"/>
                <circle cx="${x(cur.y)}" cy="${y(cur.imp)}" r="3" fill="#4f4740"/><circle cx="${x(cur.y)}" cy="${y(cur.exp)}" r="3" fill="#009edb"/>` : ''}
                ${years.filter((_, i) => i % 2 === 0).map(yr => `<text x="${x(yr)}" y="${H + 12}" text-anchor="middle" font-size="8" fill="#6e6259">${yr}</text>`).join('')}
            </svg>
        </div>`;
    },

    _suppliers(iso, tot) {
        if (!tot || !tot.imp) return '';
        const list = Object.entries(tot.suppliers).sort((a, b) => b[1] - a[1]).slice(0, 6);
        return `<div class="si-section">
            <div class="si-label">Top suppliers ${STATE.year}</div>
            <div class="si-partners">
            ${list.map(([p, v]) => {
                const cat = Data.category(p, iso);
                const share = v / tot.imp * 100;
                return `<div class="si-partner-row" data-iso="${p}" title="Open ${Data.name(p)}">
                    <span class="sp-name">${Data.name(p)}</span>
                    <span class="sp-bar-wrap"><span class="sp-bar" style="width:${share.toFixed(1)}%;background:${CONFIG.flowColors[cat]}"></span></span>
                    <span class="sp-val" title="Estimated duty on imports from ${Data.name(p)}: ${fmtUSD(tot.supplierDuty[p] || 0)}">${share.toFixed(0)}% · ${fmtUSD(v)}</span>
                </div>`;
            }).join('')}
            </div>
        </div>`;
    },

    _hsTable(iso) {
        const { hs, desc } = STATE.products;
        const m = STATE.tariffs[iso]?.MFN?.r || [], a = STATE.tariffs[iso]?.AHS?.r || [];
        const raw = STATE.flowsByYear[STATE.year] || [];
        const imp = new Array(hs.length).fill(0), duty = new Array(hs.length).fill(0);
        const rates = Data.rateVector(iso);
        for (const [e, i, vals] of raw) {
            if (i !== iso) continue;
            const free = STATE.countries[e]?.eu && STATE.countries[i]?.eu;
            vals.forEach((v, k) => { imp[k] += v; if (rates && !free) duty[k] += v * rates[k] / 100; });
        }
        const rows = hs.map((code, k) => `<tr class="${Data.productIndices().includes(k) ? '' : 'muted-row'}">
            <td title="${desc[k]}"><b>${code}</b> <span class="hs-desc">${desc[k]}</span></td>
            <td class="ar">${m[k] != null ? fmtPct(m[k]) : '—'}</td>
            <td class="ar">${a[k] != null ? fmtPct(a[k]) : '—'}</td>
            <td class="ar">${imp[k] ? fmtUSD(imp[k]) : '—'}</td>
            <td class="ar">${rates && imp[k] ? fmtUSD(duty[k]) : '—'}</td></tr>`).join('');
        return `<div class="si-section">
            <div class="si-label">Detail by HS code</div>
            <div class="hs-table-wrap"><table class="si-table hs-table">
                <thead><tr><th>HS 6</th><th class="ar">MFN</th><th class="ar">AHS</th><th class="ar">Imports ${STATE.year}</th><th class="ar">Est. duty</th></tr></thead>
                <tbody>${rows}</tbody>
            </table></div>
        </div>`;
    },
};

function ordinal(n) {
    const s = ['th', 'st', 'nd', 'rd'], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
