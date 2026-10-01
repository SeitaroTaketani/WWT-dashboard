// Left analysis panel: need-vs-tariff scatter that doubles as the key of the bivariate map
// (same tertile breaks, same 9 colours), plus the list of high-need · high-tariff economies.
// Linked to the map both ways: hover, focus and region filter.
import * as d3 from 'd3';
import { CONFIG, STATE, fmtPct, fmtUSD } from './config.js';
import { Data } from './data.js';

const $ = (id) => document.getElementById(id);
const W = 316, H = 262;
const M = { top: 12, right: 10, bottom: 34, left: 36 };
const YMAX = 25;   // tariffs above are drawn at the top edge (▲)

export const Scatter = {
    init({ onHover, onSelect, onToggle }) {
        this.onHover = onHover;
        this.onSelect = onSelect;
        this.onToggle = onToggle;
        this.panel = $('analysis-panel');
        $('scatter-toggle').addEventListener('click', () => this.toggle(true));
        $('analysis-close').addEventListener('click', () => this.toggle(false));
        this.svg = d3.select('#scatter-svg').attr('viewBox', `0 0 ${W} ${H}`);
        $('hh-list').addEventListener('click', (e) => {
            const row = e.target.closest('[data-iso]');
            if (row) this.onSelect?.(row.dataset.iso);
        });
        $('hh-list').addEventListener('mouseover', (e) => {
            const row = e.target.closest('[data-iso]');
            if (row) { this.onHover?.(row.dataset.iso); this.highlight(row.dataset.iso); }
        });
        $('hh-list').addEventListener('mouseleave', () => { this.onHover?.(null); this.highlight(null); });
    },

    isOpen() { return this.panel.classList.contains('open'); },

    toggle(open = !this.isOpen()) {
        this.panel.classList.toggle('open', open);
        document.body.classList.toggle('analysis-open', open);
        $('scatter-toggle').setAttribute('aria-pressed', String(open));
        this.onToggle?.(open);
        if (open) this.render();
    },

    render() {
        if (!this.isOpen()) return;
        const biv = Data.bivariate();
        const svg = this.svg;
        svg.selectAll('*').remove();
        this.dots = null;
        if (biv.n < 9) return;   // data not ready yet (called before the first update)

        // Duties paid by each importer this year (dot size, list ranking)
        const duty = {};
        for (const d of STATE.allFlows) duty[d.importer] = (duty[d.importer] || 0) + (d.duty ?? 0);

        const pts = Object.entries(biv.cls).map(([iso, c]) => ({
            iso, c, need: Data.needOf(iso), tariff: STATE.tariffView[iso].value, duty: duty[iso] || 0,
            inScope: Data.inScope(iso),
        }));
        const x = d3.scaleSqrt().domain([0, 100]).range([M.left, W - M.right]);
        const y = d3.scaleLinear().domain([0, YMAX]).range([H - M.bottom, M.top]);
        const r = d3.scaleSqrt().domain([0, d3.max(pts, p => p.duty) || 1]).range([2, 10]);

        // 3×3 background cells = the bivariate classes of the map
        const xs = [0, biv.nb[0], biv.nb[1], 100], ys = [0, biv.tb[0], biv.tb[1], YMAX];
        const cells = svg.append('g');
        for (let ni = 0; ni < 3; ni++) for (let ti = 0; ti < 3; ti++) {
            cells.append('rect')
                .attr('x', x(xs[ni])).attr('width', x(xs[ni + 1]) - x(xs[ni]))
                .attr('y', y(Math.min(ys[ti + 1], YMAX))).attr('height', y(ys[ti]) - y(Math.min(ys[ti + 1], YMAX)))
                .attr('fill', CONFIG.bivariate[ni][ti]).attr('opacity', ni === 2 && ti === 2 ? 0.34 : 0.16);
        }
        const g = svg.append('g').attr('class', 'sc-breaks');
        biv.nb.forEach(v => g.append('line').attr('x1', x(v)).attr('x2', x(v)).attr('y1', M.top).attr('y2', H - M.bottom));
        biv.tb.forEach(v => g.append('line').attr('x1', M.left).attr('x2', W - M.right).attr('y1', y(v)).attr('y2', y(v)));
        svg.append('text').attr('class', 'sc-hh-lbl').attr('x', W - M.right - 3).attr('y', M.top + 10).attr('text-anchor', 'end')
            .text('High need · high tariff');

        // Axes
        svg.append('g').attr('class', 'sc-axis').attr('transform', `translate(0,${H - M.bottom})`)
            .call(d3.axisBottom(x).tickValues([0, 5, 10, 25, 50, 75, 100]).tickFormat(d => d + '%').tickSizeOuter(0));
        svg.append('g').attr('class', 'sc-axis').attr('transform', `translate(${M.left},0)`)
            .call(d3.axisLeft(y).ticks(5).tickFormat(d => d + '%').tickSizeOuter(0));
        svg.append('text').attr('class', 'sc-axis-title').attr('x', (W + M.left) / 2).attr('y', H - 3).attr('text-anchor', 'middle')
            .text('Population without safely managed water (√ scale) →');
        svg.append('text').attr('class', 'sc-axis-title').attr('transform', `translate(10,${(H - M.bottom) / 2}) rotate(-90)`).attr('text-anchor', 'middle')
            .text(`${STATE.duty === 'MFN' ? 'MFN' : 'Applied'} tariff →`);

        // Dots: largest first so small economies stay on top; out-of-region economies fade like on the map
        const sorted = pts.slice().sort((a, b) => b.duty - a.duty);
        this.dots = svg.append('g').selectAll('circle').data(sorted, d => d.iso).join('circle')
            .attr('class', d => `sc-dot${d.inScope ? '' : ' out'}`)
            .attr('cx', d => x(d.need)).attr('cy', d => y(Math.min(d.tariff, YMAX)))
            .attr('r', d => r(d.duty))
            .attr('fill', d => CONFIG.bivariate[d.c[0]][d.c[1]])
            .attr('tabindex', d => (d.inScope ? 0 : -1))
            .attr('aria-label', d => `${Data.name(d.iso)}: ${fmtPct(d.need)} without safe water, tariff ${fmtPct(d.tariff)}, duties ${fmtUSD(d.duty)}`);
        this.dots.on('mouseenter focus', (e, d) => { this.onHover?.(d.iso); this.highlight(d.iso); })
            .on('mouseleave blur', () => { this.onHover?.(null); this.highlight(null); })
            .on('click keydown', (e, d) => { if (e.type === 'click' || e.key === 'Enter') this.onSelect?.(d.iso); });
        svg.append('g').selectAll('text').data(pts.filter(p => p.tariff > YMAX)).join('text')
            .attr('class', 'sc-over').attr('x', d => x(d.need)).attr('y', M.top + 3).attr('text-anchor', 'middle').text('▲');
        this.labelLayer = svg.append('g').attr('class', 'sc-labels');
        this.x = x; this.y = y; this.pts = pts;

        // Landed-cost ladder: $100 of equipment + the importer's tariff, for the high need · high tariff economies,
        // with reference rows (lowest-need third, all economies). Ranked by tariff.
        const hh = pts.filter(p => p.c[0] === 2 && p.c[1] === 2 && p.inScope).sort((a, b) => b.tariff - a.tariff);
        const lowNeed = pts.filter(p => p.c[0] === 0);
        const refs = [
            { label: 'Low-need median', tariff: d3.median(lowNeed, p => p.tariff), cls: 'ref-low' },
            { label: 'All-economy median', tariff: d3.median(pts, p => p.tariff), cls: 'ref-all' },
        ];
        const maxT = Math.max(15, d3.max(hh, p => p.tariff) || 0);
        const bar = (t) => {
            const extra = Math.min(t, maxT) / maxT * 100;
            return `<span class="ld-bar"><span class="ld-base"></span><span class="ld-duty" style="width:${(extra * 0.55).toFixed(1)}%"></span></span>`;
        };
        const cost = (t) => `$${(100 + t).toFixed(1)}`;
        $('ladder-measure').textContent = `${STATE.duty === 'MFN' ? 'MFN' : 'applied'} tariff, ${Data.productLabel().replace('All 16 WWT-related goods', 'all 16 goods')}`;
        $('hh-count').textContent = `${hh.length} economies`;
        $('hh-refs').innerHTML = refs.map(r => `<div class="ld-row ${r.cls}">
                <span class="hh-name">${r.label}</span>${bar(r.tariff)}<span class="ld-cost">${cost(r.tariff)}</span></div>`).join('');
        $('hh-list').innerHTML = hh.length ? hh.map(p => `
            <button class="hh-row ld-row" data-iso="${p.iso}" type="button"
                title="${Data.name(p.iso)} · ${fmtPct(p.need, 0)} without safe water · est. duties paid ${STATE.year}: ${fmtUSD(p.duty)} · click to open">
                <span class="hh-name">${STATE.countries[p.iso]?.short || Data.name(p.iso)}</span>${bar(p.tariff)}<span class="ld-cost">${cost(p.tariff)}</span>
            </button>`).join('') : '<div class="hh-empty">None in the current scope.</div>';
        $('analysis-note').innerHTML = `Thirds of ${biv.n} economies — need breaks ${fmtPct(biv.nb[0], 0)} / ${fmtPct(biv.nb[1], 0)}, tariff breaks ${fmtPct(biv.tb[0])} / ${fmtPct(biv.tb[1])} (${STATE.duty}). Colours match the <b>Need × tariff</b> map; dot size = estimated duties paid, ${STATE.year}.`;
        this.highlight(this._hover || null);
    },

    // Map ↔ chart: ring + name for the hovered economy, persistent ring for the focused one
    highlight(iso) {
        this._hover = iso;
        if (!this.dots) return;
        this.dots.classed('hover', d => d.iso === iso).classed('focus', d => d.iso === STATE.focusedIso);
        this.dots.filter(d => d.iso === iso || d.iso === STATE.focusedIso).raise();
        const show = this.pts.filter(p => p.iso === iso || p.iso === STATE.focusedIso);
        this.labelLayer.selectAll('text').data(show, d => d.iso).join('text')
            .attr('x', d => Math.min(this.x(d.need) + 8, W - 70)).attr('y', d => this.y(Math.min(d.tariff, YMAX)) - 7)
            .text(d => STATE.countries[d.iso]?.short || Data.name(d.iso));
        document.querySelectorAll('#hh-list .hh-row').forEach(r => {
            r.classList.toggle('hover', r.dataset.iso === iso);
            r.classList.toggle('focus', r.dataset.iso === STATE.focusedIso);
        });
    },
};
