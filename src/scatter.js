// Left analysis panel: water need vs import tariff, linked to the map both ways (hover, focus, region filter).
// Dot colour = tariff on the map's median-centred scale, dot size = duties paid. The shaded corner is the "high need ·
// high tariff" group (need at the cut-off of the "Importers: High need" switch, tariff above the median = red), which is
// emphasised, labelled and listed below with what $100 of equipment costs once the tariff is added.
import * as d3 from 'd3';
import { CONFIG, STATE, fmtPct, fmtUSD, tariffColor, TARIFF_SCALE } from './config.js';
import { Data } from './data.js';

const $ = (id) => document.getElementById(id);
const W = 316, H = 268;
const M = { top: 26, right: 12, bottom: 34, left: 36 };
const YMAX = 25;    // tariffs above are drawn at the top edge (▲)
const YMIN = -1;    // 0 % tariffs float just above the axis instead of sitting on it
const NAME = (iso) => STATE.countries[iso]?.short || Data.name(iso);

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
        this._initNamesSwitch();
        this._initResizer();
    },

    // "Show names": off by default (the chart starts uncluttered); on = name the three largest duty payers of the group.
    // The hovered economy always gets the tooltip and the focused one always keeps its name.
    _initNamesSwitch() {
        const box = $('sc-names'), KEY = 'wwt.showNames';
        try { this.showNames = localStorage.getItem(KEY) === '1'; } catch { this.showNames = false; }
        box.checked = this.showNames;
        box.addEventListener('change', () => {
            this.showNames = box.checked;
            try { localStorage.setItem(KEY, this.showNames ? '1' : '0'); } catch { /* storage unavailable */ }
            this.highlight(this._hover || null);
        });
    },

    // Drag the panel edge to resize the chart (keyboard: arrows, Home resets; double-click resets). The width is remembered.
    _initResizer() {
        const el = $('ap-resizer'), root = document.documentElement, KEY = 'wwt.analysisWidth', MIN = 348;
        const maxW = () => Math.min(640, Math.round(window.innerWidth * 0.5));
        const apply = (px) => root.style.setProperty('--ap-w', `${Math.min(Math.max(Math.round(px), MIN), maxW())}px`);
        const width = () => this.panel.getBoundingClientRect().width;
        const save = () => { try { localStorage.setItem(KEY, String(Math.round(width()))); } catch { /* storage unavailable */ } };
        const reset = () => { root.style.removeProperty('--ap-w'); try { localStorage.removeItem(KEY); } catch { /* storage unavailable */ } };
        try { const saved = +localStorage.getItem(KEY); if (saved) apply(saved); } catch { /* storage unavailable */ }
        el.addEventListener('pointerdown', (e) => { e.preventDefault(); el.setPointerCapture(e.pointerId); document.body.classList.add('ap-resizing'); });
        el.addEventListener('pointermove', (e) => { if (el.hasPointerCapture(e.pointerId)) apply(e.clientX - this.panel.getBoundingClientRect().left); });
        const end = (e) => { if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId); document.body.classList.remove('ap-resizing'); save(); };
        el.addEventListener('pointerup', end);
        el.addEventListener('pointercancel', end);
        el.addEventListener('dblclick', reset);
        el.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { apply(width() + (e.key === 'ArrowRight' ? 24 : -24)); save(); e.preventDefault(); }
            else if (e.key === 'Home') { reset(); e.preventDefault(); }
        });
        window.addEventListener('resize', () => { const cur = parseFloat(root.style.getPropertyValue('--ap-w')); if (cur) apply(cur); });
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
        const b = Data.burden();
        const svg = this.svg;
        svg.selectAll('*').remove();
        this.dots = null;
        if (b.n < 9) return;   // data not ready yet (called before the first update)

        // Duties paid by each importer this year (dot size, list ranking) and imports (to name the largest missing economies)
        const duty = {}, imports = {};
        for (const d of STATE.allFlows) {
            duty[d.importer] = (duty[d.importer] || 0) + (d.duty ?? 0);
            imports[d.importer] = (imports[d.importer] || 0) + d.value;
        }
        const pts = b.pts.map(p => ({
            ...p, duty: duty[p.iso] || 0, inScope: Data.inScope(p.iso),
            hh: p.need >= b.needHigh && p.tariff > b.tariffHigh,
        }));
        const x = d3.scaleLinear().domain([0, 100]).range([M.left, W - M.right]);
        const y = d3.scaleLinear().domain([YMIN, YMAX]).range([H - M.bottom, M.top]);
        const r = d3.scaleSqrt().domain([0, d3.max(pts, p => p.duty) || 1]).range([3, 8]);
        const yOf = (p) => y(Math.min(p.tariff, YMAX));
        this.x = x; this.y = y; this.r = r; this.pts = pts; this.yOf = yOf; this.b = b;

        this._renderHeadline();

        const ym = y(b.tariffHigh);
        // Shaded corner = the high need · high tariff group; its lower edge is the dashed median-tariff line (the colour centre)
        svg.append('rect').attr('class', 'sc-hh-zone')
            .attr('x', x(b.needHigh)).attr('width', x(100) - x(b.needHigh))
            .attr('y', y(YMAX)).attr('height', ym - y(YMAX));
        svg.append('text').attr('class', 'sc-hh-lbl').attr('x', W - M.right).attr('y', M.top - 9).attr('text-anchor', 'end')
            .text('High need · high tariff');
        svg.append('line').attr('class', 'sc-median').attr('x1', M.left).attr('x2', W - M.right).attr('y1', ym).attr('y2', ym);
        svg.append('text').attr('class', 'sc-median-lbl').attr('x', M.left + 3).attr('y', ym - 3).text(`median ${fmtPct(TARIFF_SCALE.median)}`);

        // Axes (linear, so the scale needs no explanation)
        svg.append('g').attr('class', 'sc-axis').attr('transform', `translate(0,${H - M.bottom})`)
            .call(d3.axisBottom(x).tickValues([0, 25, 50, 75, 100]).tickFormat(d => d + '%').tickSizeOuter(0));
        svg.append('g').attr('class', 'sc-axis').attr('transform', `translate(${M.left},0)`)
            .call(d3.axisLeft(y).tickValues([0, 5, 10, 15, 20, 25]).tickFormat(d => d + '%').tickSizeOuter(0));
        svg.append('text').attr('class', 'sc-axis-title').attr('x', (W + M.left) / 2).attr('y', H - 3).attr('text-anchor', 'middle')
            .text('Population without safely managed drinking water →');
        svg.append('text').attr('class', 'sc-axis-title').attr('x', 2).attr('y', M.top - 9)
            .text(`↑ ${STATE.duty === 'MFN' ? 'MFN' : 'Applied'} tariff`);

        // Dots: largest first so small economies stay on top. The high need · high tariff group is emphasised, the rest is muted.
        // Each dot has a larger invisible hit circle so small dots are easy to hover and tap.
        const sorted = pts.slice().sort((a, c) => c.duty - a.duty);
        this.dots = svg.append('g').selectAll('circle').data(sorted, d => d.iso).join('circle')
            .attr('class', d => `sc-dot${d.hh ? ' hh' : ''}${d.inScope ? '' : ' out'}`)
            .attr('cx', d => x(d.need)).attr('cy', yOf).attr('r', d => r(d.duty))
            .attr('fill', d => tariffColor(d.tariff))
            .attr('aria-hidden', 'true');
        const hits = svg.append('g').selectAll('circle').data(sorted, d => d.iso).join('circle')
            .attr('class', d => `sc-hit${d.inScope ? '' : ' out'}`)
            .attr('cx', d => x(d.need)).attr('cy', yOf).attr('r', d => Math.max(r(d.duty) + 3, 9))
            .attr('tabindex', d => (d.inScope && d.hh ? 0 : null))   // keyboard: the high need · high tariff group; everyone else via the list or the pickers
            .attr('role', d => (d.inScope && d.hh ? 'button' : null))
            .attr('aria-label', d => `${Data.name(d.iso)}: ${fmtPct(d.need)} without safely managed water, tariff ${fmtPct(d.tariff)}, duties ${fmtUSD(d.duty)}`);
        hits.on('mouseenter focus', (e, d) => { this.onHover?.(d.iso); this.highlight(d.iso); })
            .on('mouseleave blur', () => { this.onHover?.(null); this.highlight(null); })
            .on('click keydown', (e, d) => { if (e.type === 'click' || e.key === 'Enter') this.onSelect?.(d.iso); });
        svg.append('g').selectAll('text').data(pts.filter(p => p.tariff > YMAX)).join('text')
            .attr('class', 'sc-over').attr('x', d => x(d.need)).attr('y', M.top + 3).attr('text-anchor', 'middle').text('▲');
        this.labelLayer = svg.append('g').attr('class', 'sc-labels');

        this._renderKey(pts, b, imports);
        this._renderLadder(pts, b);
        this.highlight(this._hover || null);
    },

    // The finding, in words, above the chart (same numbers as the KPI bar)
    _renderHeadline() {
        const q = Data.needTariffQuartiles();
        const el = $('ap-insight');
        if (!q) { el.innerHTML = ''; return; }
        const where = STATE.region === 'Global' ? '' : ` (${STATE.region})`;
        const nums = `median tariff <b>${fmtPct(q.highMedian)}</b> in the highest-need quarter vs <b>${fmtPct(q.lowMedian)}</b> in the lowest${where}`;
        el.innerHTML = q.highMedian > q.lowMedian * 1.2
            ? `<b>Where safely managed water is scarcest, tariffs are higher:</b> ${nums}.`
            : `<b>Tariffs are not clearly higher where need is greatest${where}:</b> ${nums}.`;
    },

    // Colour/size key, the definition of the group, and which economies cannot be shown
    _renderKey(pts, b, imports) {
        const t = CONFIG.tariff, ts = TARIFF_SCALE;
        const grad = `linear-gradient(90deg, ${t.colors.map((c, i) => `${c} ${ts.domain[i] / t.cap * 100}%`).join(', ')})`;
        const [r0, r1] = this.r.range();
        $('sc-key').innerHTML = `
            <span class="sc-key-item"><span class="sc-ramp" style="background:${grad}"></span>tariff: blue below, red above the median</span>
            <span class="sc-key-item"><svg width="${Math.ceil(r0 * 2 + r1 * 2 + 8)}" height="${Math.ceil(r1 * 2 + 2)}" aria-hidden="true">
                <circle cx="${r0 + 1}" cy="${r1 + 1}" r="${r0}" class="sc-key-dot"/><circle cx="${r0 * 2 + r1 + 5}" cy="${r1 + 1}" r="${r1}" class="sc-key-dot"/></svg>duties paid</span>`;

        const inScope = pts.filter(p => p.inScope).length;
        const scopeLine = inScope < pts.length
            ? `<br>${STATE.region !== 'Global' ? STATE.region + ': ' : ''}${inScope} of ${pts.length} economies highlighted.` : '';
        const nHH = pts.filter(p => p.hh).length;
        const nStrict = pts.filter(p => p.hh && p.tariff >= b.tariffTop).length;
        $('analysis-note').innerHTML = `<b>High need · high tariff</b> = at least ${fmtPct(b.needHigh, 0)} of the population without safely managed drinking water (about a majority; the cut-off of the High need switch) and a tariff above the ${fmtPct(b.tariffHigh)} median (red dots). ${nHH} economies; with a stricter tariff cut (top quarter, ${fmtPct(b.tariffTop)} or more), ${nStrict} of them remain.${scopeLine}`;

        const big = b.missing.slice().sort((a, c) => (imports[c] || 0) - (imports[a] || 0)).filter(iso => imports[iso]).slice(0, 3).map(NAME);
        this.missingNote = b.missing.length
            ? `${b.missing.length} of ${pts.length + b.missing.length} economies with tariff data are not shown: no safely-managed-water estimate${big.length ? ` (largest importers: ${big.join(', ')})` : ''}.`
            : '';
    },

    // Landed cost of $100 of equipment: the high need · high tariff group vs reference groups, ranked by tariff
    _renderLadder(pts, b) {
        const hh = pts.filter(p => p.hh && p.inScope).sort((a, c) => c.tariff - a.tariff);
        const lowNeed = pts.filter(p => p.need <= b.needLow);
        const refs = [
            { label: 'Lowest-need quarter', tariff: d3.median(lowNeed, p => p.tariff), cls: 'ref-low' },
            { label: 'All economies', tariff: d3.median(pts, p => p.tariff), cls: 'ref-all' },
        ];
        const maxT = Math.max(15, d3.max(hh, p => p.tariff) || 0);
        const bar = (tariff) => {
            const extra = Math.min(tariff, maxT) / maxT * 100;
            return `<span class="ld-bar"><span class="ld-base"></span><span class="ld-duty" style="width:${(extra * 0.55).toFixed(1)}%"></span></span>`;
        };
        const cost = (tariff) => `$${(100 + tariff).toFixed(1)}`;
        $('ladder-measure').textContent = `median ${STATE.duty === 'MFN' ? 'MFN' : 'applied'} tariff of each group, ${Data.productLabel().replace('All 16 WWT-related goods', 'all 16 goods')}`;
        $('hh-count').textContent = `${hh.length} economies`;
        $('hh-refs').innerHTML = refs.map(rf => `<div class="ld-row ${rf.cls}">
                <span class="hh-name">${rf.label}</span>${bar(rf.tariff)}<span class="ld-cost">${cost(rf.tariff)}</span></div>`).join('');
        $('hh-list').innerHTML = hh.length ? hh.map(p => `
            <button class="hh-row ld-row" data-iso="${p.iso}" type="button"
                title="${Data.name(p.iso)} · ${fmtPct(p.need, 0)} without safely managed water · est. duties paid ${STATE.year}: ${fmtUSD(p.duty)} · click to open">
                <span class="hh-name">${NAME(p.iso)}</span>${bar(p.tariff)}<span class="ld-cost">${cost(p.tariff)}</span>
            </button>`).join('') : '<div class="hh-empty">None in the current scope.</div>';
    },

    // Map ↔ chart: emphasis ring and tooltip for the hovered economy, persistent ring + name for the focused one,
    // optionally names for the biggest high need · high tariff economies
    highlight(iso) {
        this._hover = iso;
        if (!this.dots) return;
        const focus = STATE.focusedIso;
        this.dots.classed('hover', d => d.iso === iso).classed('focus', d => d.iso === focus);
        this.dots.filter(d => d.iso === iso || d.iso === focus).raise();

        // Labels: the focused economy always; with "Show names" also the three biggest in-scope high need · high tariff economies that fit
        const taken = [];
        const items = [];
        const add = (p, force) => {
            if (!p || items.some(i => i.p === p)) return;
            const text = NAME(p.iso), w = text.length * 5.4 + 4;
            const rad = this.r(p.duty);
            let x0 = this.x(p.need) + rad + 3;
            if (x0 + w > W - M.right) x0 = this.x(p.need) - rad - 3 - w;
            const rect = { x: x0, y: this.yOf(p) - 9, w, h: 11 };
            if (!force && taken.some(t => rect.x < t.x + t.w && t.x < rect.x + rect.w && rect.y < t.y + t.h && t.y < rect.y + rect.h)) return;
            taken.push(rect);
            items.push({ p, x: x0, y: this.yOf(p) + 3.5, text });
        };
        add(this.pts.find(p => p.iso === focus), true);
        if (this.showNames) this.pts.filter(p => p.hh && p.inScope).sort((a, c) => c.duty - a.duty).slice(0, 3).forEach(p => add(p, false));
        this.labelLayer.selectAll('text').data(items, d => d.p.iso).join('text')
            .attr('x', d => d.x).attr('y', d => d.y).text(d => d.text);

        this._tip(iso);
        const focusMissing = focus && STATE.tariffView[focus] && !this.pts.some(p => p.iso === focus);
        const note = $('sc-missing');
        note.textContent = focusMissing ? `${Data.name(focus)} has no safely-managed-water estimate, so it cannot be placed on this chart.` : (this.missingNote || '');
        note.classList.toggle('focus', !!focusMissing);

        document.querySelectorAll('#hh-list .hh-row').forEach(rw => {
            rw.classList.toggle('hover', rw.dataset.iso === iso);
            rw.classList.toggle('focus', rw.dataset.iso === focus);
        });
    },

    // Tooltip card next to the hovered dot with the numbers behind it
    _tip(iso) {
        const tip = $('sc-tip');
        const p = iso && this.pts.find(q => q.iso === iso);
        if (!p || !p.inScope) { tip.hidden = true; return; }
        const median = TARIFF_SCALE.median;
        tip.innerHTML = `<b>${Data.name(p.iso)}</b>
            <span>${fmtPct(p.need, 0)} without safely managed water</span>
            <span>${STATE.duty === 'MFN' ? 'MFN' : 'Applied'} tariff <b>${fmtPct(p.tariff)}</b> (${p.tariff > median ? 'above' : p.tariff < median ? 'below' : 'at'} the ${fmtPct(median)} median)</span>
            <span>Duties paid ${STATE.year}: ${fmtUSD(p.duty)}</span>${p.hh ? '<em>High need · high tariff</em>' : ''}`;
        tip.hidden = false;
        const svgBox = this.svg.node().getBoundingClientRect();
        const k = svgBox.width / W;
        const cx = this.x(p.need) * k, cy = this.yOf(p) * k, rad = this.r(p.duty) * k;
        const w = tip.offsetWidth, h = tip.offsetHeight;
        let left = cx + rad + 8;
        if (left + w > svgBox.width) left = cx - rad - 8 - w;
        tip.style.left = `${Math.max(0, left)}px`;
        tip.style.top = `${Math.min(Math.max(0, cy - h / 2), Math.max(0, svgBox.height - h))}px`;
    },
};
