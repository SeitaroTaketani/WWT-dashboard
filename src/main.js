import '@fontsource/inter/latin-300.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import './styles/styles.less';
import './styles/wwt.less';
import * as d3 from 'd3';
import { CONFIG, STATE, VIEW3D, HS_SHORT, fmtUSD, fmtPct } from './config.js';
import { Data } from './data.js';
import { Map3D } from './map3d.js';
import { CountrySelector } from './countrySelector.js';
import { RegionConfig } from './regions.js';
import { Panel } from './panel.js';
import { Csv } from './csv.js';
import { DeepLink } from './deepLink.js';
import { METHODOLOGY_HTML } from './methodology.js';
import { Scatter } from './scatter.js';
import { downloadMapPNG } from './snapshot.js';

const $ = (id) => document.getElementById(id);
const NEED_GROUND = Map3D.groundColor;   // default ground palette (need ramp)
const fmtShortUSD = (v) => v >= 1e6 ? `$${+(v / 1e6).toFixed(1)}M` : v >= 1e3 ? `$${+(v / 1e3).toFixed(0)}K` : `$${Math.round(v)}`;

const App = {
    async init() {
        if (!this._webglOK()) {
            $('loader').classList.add('hidden');
            $('webgl-error').classList.remove('hidden');
            return;
        }
        DeepLink.applyPreLoad(DeepLink.read());
        try {
            await Data.loadAll();
        } catch (err) {
            console.error(err);
            $('loader').querySelector('p').textContent = 'Could not load data.';
            return;
        }
        this._populateSelects();
        Map3D.init($('map-container'), {
            onHover: (hit, e) => this.showTooltip(hit, e),
            onClick: (hit) => this.onMapClick(hit),
        });

        this.exporterSelector = new CountrySelector('exp', 'exp-label', 'exporter');
        this.importerSelector = new CountrySelector('imp', 'imp-label', 'importer');
        await Promise.all([this.exporterSelector.init(), this.importerSelector.init()]);
        this._setupPicker('exp', this.exporterSelector);
        this._setupPicker('imp', this.importerSelector);
        document.addEventListener('shc:selection-change', () => {
            STATE.selectedExporters = new Set(this.exporterSelector.getSelectedCountries());
            STATE.selectedImporters = new Set(this.importerSelector.getSelectedCountries());
            this.update({ walls: false });
        });

        this._bindControls();
        $('methodology-body').innerHTML = METHODOLOGY_HTML;
        Panel.init({ onClose: () => this.focusCountry(null), onSelect: (iso) => this.focusCountry(iso) });
        Scatter.init({
            onHover: (iso) => this.hoverCountry(iso),
            onSelect: (iso) => this.focusCountry(iso),
        });
        // Docked by default on wide screens; the map re-fits through its ResizeObserver
        if (window.innerWidth >= 1400) Scatter.toggle(true);

        const link = DeepLink.read();
        if (STATE.view === 'biv') {
            document.body.classList.add('view-biv');
            Data.computeTariffView();
            this._applyGroundColours();
            Map3D.drawGround();
            Map3D.setMode('biv', false);
        }
        this._syncControls();
        await this.update({ animate: false });
        if (link.region && link.region !== 'Global') this._flyToRegion(link.region, false);
        if (link.focus && STATE.countries[link.focus]) this.focusCountry(link.focus);
        $('loader').classList.add('hidden');
        window.__wwtReady = true;
    },

    _webglOK() {
        try {
            const c = document.createElement('canvas');
            return !!(window.WebGL2RenderingContext && c.getContext('webgl2'));
        } catch { return false; }
    },

    // ── Controls ───────────────────────────────────────────────────────
    _populateSelects() {
        const years = CONFIG.years.slice().reverse();
        for (const id of ['year-select', 'm-year-select']) {
            $(id).innerHTML = years.map(y => `<option value="${y}">${y}</option>`).join('');
        }
        const { hs, desc, groups } = STATE.products;
        const short = (s) => s.length > 58 ? s.slice(0, 56) + '…' : s;
        let html = `<option value="all">All 16 WWT-related goods</option>`;
        html += `<optgroup label="Technology groups">${groups.map(g => `<option value="${g.id}">${g.label}</option>`).join('')}</optgroup>`;
        for (const g of groups) {
            html += `<optgroup label="${g.label} · HS codes">${g.codes.map(c => `<option value="${c}">${c} – ${short(desc[hs.indexOf(c)])}</option>`).join('')}</optgroup>`;
        }
        $('product-select').innerHTML = html;
        $('m-product-select').innerHTML = html;
    },

    _syncControls() {
        for (const id of ['year-select', 'm-year-select']) $(id).value = STATE.year;
        for (const id of ['product-select', 'm-product-select']) $(id).value = STATE.product;
        document.querySelectorAll('.duty-btn').forEach(b => b.classList.toggle('active', b.dataset.duty === STATE.duty));
        document.querySelectorAll('.region-btn').forEach(b => b.classList.toggle('active', b.dataset.region === STATE.region));
        document.querySelectorAll('.threshold-btn').forEach(b => b.classList.toggle('active', String(b.dataset.threshold) === String(STATE.thresholdMode)));
        document.querySelectorAll('.need-btn').forEach(b => b.classList.toggle('active', b.dataset.need === STATE.importerNeed));
        document.querySelectorAll('.view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === STATE.view));
        document.querySelectorAll('.metric-btn').forEach(b => b.classList.toggle('active', b.dataset.metric === STATE.flowMetric));
        document.querySelectorAll('.arccolor-btn').forEach(b => b.classList.toggle('active', b.dataset.arccolor === STATE.arcColor));
        document.querySelectorAll('.flowview-btn').forEach(b => b.classList.toggle('active', b.dataset.flowview === STATE.flowView));
        // Threshold and N/S direction filters only apply to the 'All flows' view
        document.body.classList.toggle('flows-all', STATE.flowView === 'all');
        // Threshold buttons are defined in trade-value terms and scaled for duties
        document.querySelectorAll('.threshold-btn').forEach(b => {
            if (b.dataset.threshold === 'auto') return;
            b.textContent = fmtShortUSD(+b.dataset.threshold * Data.metricScale());
        });
        document.querySelectorAll('.flow-checkbox').forEach(cb => { cb.checked = STATE.flowFilters.has(cb.value); });
        $('mobile-filter-badge').textContent = this._activeFilterCount() || '';
    },

    _activeFilterCount() {
        let n = 0;
        if (STATE.region !== 'Global') n++;
        if (STATE.product !== 'all') n++;
        if (STATE.duty !== 'MFN') n++;
        if (STATE.flowFilters.size < 4) n++;
        if (STATE.importerNeed !== 'all') n++;
        if (STATE.selectedExporters.size || STATE.selectedImporters.size) n++;
        return n;
    },

    _bindControls() {
        const onYear = async (e) => { this.stopAnimation(); STATE.year = +e.target.value; await this.update({ walls: false }); };
        $('year-select').addEventListener('change', onYear);
        $('m-year-select').addEventListener('change', onYear);

        const onProduct = (e) => { STATE.product = e.target.value; this.update(); };
        $('product-select').addEventListener('change', onProduct);
        $('m-product-select').addEventListener('change', onProduct);

        document.querySelectorAll('.duty-btn').forEach(b => b.addEventListener('click', () => {
            STATE.duty = b.dataset.duty; this.update();   // duties on flows depend on the tariff measure
        }));
        document.querySelectorAll('.region-btn').forEach(b => b.addEventListener('click', () => {
            STATE.region = b.dataset.region;
            Map3D.drawGround();
            this._flyToRegion(STATE.region, true);
            this.update({ walls: false });
        }));
        document.querySelectorAll('.view-btn').forEach(b => b.addEventListener('click', () => this.setView(b.dataset.view)));
        document.querySelectorAll('.metric-btn').forEach(b => b.addEventListener('click', () => {
            STATE.flowMetric = b.dataset.metric;
            this.update({ walls: false });
        }));
        document.querySelectorAll('.flowview-btn').forEach(b => b.addEventListener('click', () => {
            STATE.flowView = b.dataset.flowview;
            this.update({ walls: false });
        }));
        document.querySelectorAll('.arccolor-btn').forEach(b => b.addEventListener('click', () => {
            STATE.arcColor = b.dataset.arccolor;
            this.update({ walls: false });
        }));
        document.querySelectorAll('.need-btn').forEach(b => b.addEventListener('click', () => {
            STATE.importerNeed = b.dataset.need;
            this.update({ walls: false });
        }));
        document.querySelectorAll('.threshold-btn').forEach(b => b.addEventListener('click', () => {
            STATE.thresholdMode = b.dataset.threshold === 'auto' ? 'auto' : +b.dataset.threshold;
            this.update({ walls: false });
        }));
        document.querySelectorAll('.flow-checkbox').forEach(cb => cb.addEventListener('change', () => {
            if (cb.checked) STATE.flowFilters.add(cb.value); else STATE.flowFilters.delete(cb.value);
            this.update({ walls: false });
        }));

        // View controls
        const zoomBy = (k) => {
            const cam = Map3D.camera;
            cam.zoom = THREE_clamp(cam.zoom * k, Map3D.controls.minZoom, Map3D.controls.maxZoom);
            cam.updateProjectionMatrix();
        };
        $('view-zoom-in').addEventListener('click', () => zoomBy(1.35));
        $('view-zoom-out').addEventListener('click', () => zoomBy(1 / 1.35));
        $('view-reset').addEventListener('click', () => {
            Map3D.flat = false; $('view-flat').setAttribute('aria-pressed', 'false'); $('view-flat').textContent = 'Top';
            Map3D.controls.minPolarAngle = VIEW3D.polarRangeDeg[0] * Math.PI / 180;
            Map3D.controls.maxPolarAngle = VIEW3D.polarRangeDeg[1] * Math.PI / 180;
            if (STATE.region !== 'Global') this._flyToRegion(STATE.region, true);
            else Map3D.resetView(true);
        });
        $('view-flat').addEventListener('click', () => {
            const flat = !Map3D.flat;
            Map3D.setFlat(flat);
            $('view-flat').setAttribute('aria-pressed', String(flat));
            $('view-flat').textContent = flat ? '3D' : 'Top';
        });

        // CSV export menu
        const menu = $('export-menu'), btn = $('export-btn');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('hidden');
            btn.setAttribute('aria-expanded', String(!menu.classList.contains('hidden')));
            $('export-scope').textContent = this._scopeLabel();
        });
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && e.target !== btn) { menu.classList.add('hidden'); btn.setAttribute('aria-expanded', 'false'); }
        });
        document.querySelectorAll('[data-export]').forEach(b => b.addEventListener('click', () => {
            menu.classList.add('hidden');
            if (b.dataset.export === 'flows') Csv.flows();
            else if (b.dataset.export === 'png') downloadMapPNG();
            else Csv.countries();
        }));
        $('panel-export-btn').addEventListener('click', () => STATE.focusedIso && Csv.country(STATE.focusedIso));

        // Methodology
        const mm = $('methodology-modal');
        $('methodology-btn').addEventListener('click', () => mm.classList.remove('hidden'));
        $('methodology-modal-close').addEventListener('click', () => mm.classList.add('hidden'));
        $('methodology-modal-backdrop').addEventListener('click', () => mm.classList.add('hidden'));
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            mm.classList.add('hidden');
            if (STATE.focusedIso) this.focusCountry(null);
        });

        // Animation
        $('anim-btn').addEventListener('click', () => (this._anim ? this.stopAnimation() : this.startAnimation()));

        // Mobile sheets
        const sheet = $('mobile-filter-panel'), sb = $('mobile-filter-backdrop');
        const openSheet = (open) => { sheet.classList.toggle('open', open); sb.classList.toggle('hidden', !open); };
        $('mobile-filter-btn').addEventListener('click', () => openSheet(true));
        $('mobile-filter-close').addEventListener('click', () => openSheet(false));
        sb.addEventListener('click', () => openSheet(false));
        const legend = $('legend-panel'), lb = $('mobile-legend-backdrop');
        const openLegend = (open) => { legend.classList.toggle('mobile-open', open); lb.classList.toggle('hidden', !open); };
        $('mobile-legend-btn').addEventListener('click', () => openLegend(true));
        $('mobile-legend-close').addEventListener('click', () => openLegend(false));
        lb.addEventListener('click', () => openLegend(false));
    },

    _setupPicker(prefix, selector) {
        const btn = $(`${prefix}-btn`), menu = $(`${prefix}-menu`), search = $(`${prefix}-search`);
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const other = $(`${prefix === 'exp' ? 'imp' : 'exp'}-menu`);
            other.classList.add('hidden');
            menu.classList.toggle('hidden');
            btn.parentElement.style.zIndex = menu.classList.contains('hidden') ? '50' : '60';
            if (!menu.classList.contains('hidden')) {
                menu.style.left = ''; menu.style.right = '';
                const r = menu.getBoundingClientRect();
                if (r.left < 8) { menu.style.right = 'auto'; menu.style.left = `${8 - btn.parentElement.getBoundingClientRect().left}px`; }
            }
        });
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !btn.contains(e.target)) { menu.classList.add('hidden'); btn.parentElement.style.zIndex = '50'; }
        });
        search.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            if (!term) {
                menu.querySelectorAll('.picker-section-header, .group-option, .country-option').forEach(el => { el.style.display = ''; });
                menu.querySelectorAll('.group-children').forEach(c => { c.classList.add('hidden'); c.style.display = ''; });
                menu.querySelectorAll('.group-toggle').forEach(t => t.setAttribute('aria-expanded', 'false'));
                return;
            }
            menu.querySelectorAll('.picker-section-header, .group-option').forEach(el => { el.style.display = 'none'; });
            menu.querySelectorAll('.group-children').forEach(c => { c.classList.remove('hidden'); c.style.display = 'block'; });
            menu.querySelectorAll('.country-option').forEach(item => {
                item.style.display = item.innerText.toLowerCase().includes(term) ? 'flex' : 'none';
            });
        });
        $(`${prefix}-clear-all`).addEventListener('click', () => selector.clearAll());
    },

    setView(view, animate = true) {
        STATE.view = view;
        document.body.classList.toggle('view-biv', view === 'biv');
        this._applyGroundColours();
        Map3D.drawGround();
        Map3D.setMode(view, animate);
        this.update({ walls: false });
    },

    // Ground palette: need ramp (3D) or bivariate need × tariff classes
    _applyGroundColours() {
        if (STATE.view !== 'biv') { Map3D.groundColor = NEED_GROUND; return; }
        this._biv = Data.bivariate();
        Map3D.groundColor = (iso) => {
            const c = iso && this._biv.cls[iso];
            return c ? CONFIG.bivariate[c[0]][c[1]] : null;   // null → no-data hatch
        };
    },

    _flyToRegion(region, animate) {
        const r = RegionConfig.regions[region] || RegionConfig.regions.Global;
        if (region === 'Global') Map3D.resetView(animate);
        else Map3D.focusLonLat(r.center[0], r.center[1], r.scale * Map3D.mobileZoomFactor(), animate);
    },

    _scopeLabel() {
        const parts = [STATE.region === 'Global' ? 'Global' : STATE.region];
        if (STATE.importerNeed === 'high') parts.push('high-need importers');
        if (STATE.selectedExporters.size) parts.push(`${STATE.selectedExporters.size} exp.`);
        if (STATE.selectedImporters.size) parts.push(`${STATE.selectedImporters.size} imp.`);
        return `${parts.join(' · ')} · ${STATE.year}`;
    },

    // ── Main update ────────────────────────────────────────────────────
    async update({ walls = true, flows = true, animate = true } = {}) {
        this._syncControls();
        if (walls) {
            Data.computeTariffView();
            const vals = {};
            for (const [iso, t] of Object.entries(STATE.tariffView)) vals[iso] = t.value;
            Map3D.setWallValues(vals, animate);
            if (STATE.view === 'biv') { this._applyGroundColours(); Map3D.drawGround(); }
        }
        Map3D.setWallLabels(this._topTariffIsos());   // depends on region too, so always refresh
        if (flows) {
            await Data.loadYear(STATE.year);
            Data.buildFlows();
            Map3D.setArcMidpoint(Data.worldEffectiveRate());
            Data.filterFlows();
            Map3D.setFlows(STATE.filteredFlows, STATE.importerStats, this._nodeLabelIsos());
        }
        Map3D.refreshStates();
        this.renderLegend();
        this.renderKPIs();
        Scatter.render();
        $('mb-year').textContent = STATE.year;
        $('mb-meta').innerHTML = `${Data.productLabel()}<br>Walls: ${STATE.duty === 'MFN' ? 'MFN' : 'applied (AHS)'} tariff, latest year · Ground: WHO/UNICEF JMP 2024`;
        if (STATE.focusedIso) Panel.render(STATE.focusedIso);
        DeepLink.write();
    },

    _topTariffIsos() {
        return Object.entries(STATE.tariffView)
            // label only walls at or above the first guide level (5 %): lower walls carry no story
            .filter(([iso, t]) => Data.needOf(iso) != null && Data.inScope(iso) && t.value >= CONFIG.tariff.guides[0])
            .sort((a, b) => b[1].value - a[1].value)
            .slice(0, VIEW3D.labelTopTariff)
            .map(([iso]) => iso);
    },

    _nodeLabelIsos() {
        const walls = new Set(this._topTariffIsos());
        // Largest duty payers (the biggest circles), plus exporters at the start of drawn arcs
        const payers = Object.entries(STATE.importerStats || {}).sort((a, b) => b[1].duty - a[1].duty).slice(0, 8).map(([iso]) => iso);
        const sources = [...new Set(STATE.filteredFlows.map(d => d.exporter))].slice(0, 6);
        return [...new Set([...payers, ...sources])].filter(iso => !walls.has(iso));
    },

    // ── Legend ─────────────────────────────────────────────────────────
    renderLegend() {
        const flows = STATE.filteredFlows;
        const cats = ['north-south', 'south-north', 'south-south', 'north-north'];
        const short = { 'north-south': 'N→S', 'south-north': 'S→N', 'south-south': 'S→S', 'north-north': 'N→N' };
        const flowItems = cats.map(c => {
            const f = flows.filter(d => d.flowCategory === c);
            const active = STATE.flowFilters.has(c);
            return `<div class="legend-flow-item" style="opacity:${active ? 1 : 0.3}">
                <span class="legend-flow-dot" style="background:${CONFIG.flowColors[c]}"></span>
                <span class="legend-flow-label">${short[c]}</span>
                <span class="legend-flow-stat">${f.length} · ${f.length ? fmtUSD(d3.sum(f, d => Data.mv(d))) : '—'}</span>
            </div>`;
        }).join('');

        const needStops = CONFIG.need.domain.slice(0, -1).map((v, i) => {
            const mid = (v + CONFIG.need.domain[i + 1]) / 2;
            return `<span class="lg-swatch" style="background:${Map3D.needColor(mid)}" title="${v}–${CONFIG.need.domain[i + 1]}%"></span>`;
        }).join('');
        const t = CONFIG.tariff;
        const wallGrad = `linear-gradient(90deg, ${t.colors.map((c, i) => `${c} ${t.domain[i] / t.cap * 100}%`).join(', ')})`;
        const isManual = STATE.thresholdMode !== 'auto';

        const groundLegend = STATE.view === 'biv' ? this._bivLegendHTML() : `
            <div class="legend-section" title="WHO/UNICEF JMP 2024: share of the population not using safely managed drinking-water services">
                <span class="legend-section-label">No safe water</span>
                <span class="lg-scale-lbl">0%</span>${needStops}<span class="lg-scale-lbl">100%</span>
                <span class="lg-swatch lg-nodata" title="No data"></span><span class="lg-scale-lbl">n/a</span>
            </div>
            <span class="legend-bar-divider"></span>
            <div class="legend-section" title="Wall height and colour: simple-average ${STATE.duty} tariff on the selected goods, capped at ${t.cap}%">
                <span class="legend-section-label">Tariff wall (${STATE.duty === 'MFN' ? 'MFN' : 'AHS'})</span>
                <span class="lg-scale-lbl">0%</span><span class="lg-wall" style="background:${wallGrad}"></span><span class="lg-scale-lbl">${t.cap}%+</span>
            </div>`;
        $('legend-content').innerHTML = `${groundLegend}
            <span class="legend-bar-divider"></span>
            <div class="legend-section" title="Circles at each importer and arcs from supplier to importer. Size: ${STATE.flowMetric === 'duty' ? 'estimated duties paid' : 'trade value'}. Colour: effective duty rate (duties ÷ trade value).">
                <span class="legend-section-label">Duties</span>
                <span class="legend-node lg-circle-key" title="Circle size = ${STATE.flowMetric === 'duty' ? 'duties paid by the importer' : 'imports'}"></span>
                <span class="lg-scale-lbl">size = ${STATE.flowMetric === 'duty' ? 'duties $' : 'trade $'}</span>
                ${STATE.arcColor === 'rate' ? this._arcRateLegendHTML(flows) : `<div class="legend-flows">${flowItems}</div>`}
            </div>
            <span class="legend-bar-divider"></span>
            <div class="legend-section">
                <span class="legend-section-label">Arcs</span>
                <span class="lg-scale-lbl">${{
                    importers: 'on hover',
                    top: `top ${flows.length} · high need`,
                    region: `${flows.length} to regions`,
                    all: '',
                }[STATE.arcView]}</span>
                ${STATE.arcView === 'all' ? `<span class="legend-threshold-badge${isManual ? ' manual' : ''}">${isManual ? 'MANUAL' : 'AUTO'}</span>
                <span class="legend-threshold-val">${fmtUSD(STATE.effectiveThreshold)}</span>
                <span class="legend-arc-count">${flows.length} arcs</span>` : ''}
                <svg class="lg-taper" width="40" height="10" aria-hidden="true"><path d="M1 5 H20" stroke="${CONFIG.arcRate.colors[0]}" stroke-width="2.5"/><path d="M20 5 H39" stroke="#d0234f" stroke-width="5.5"/></svg>
                <span class="lg-scale-lbl" title="Each arc runs from supplier to importer. First half: goods at export price, i.e. at 0% duty (the 0% colour, width = trade value). At the midpoint the importer's duty is added: the arc turns to the duty-rate colour and widens by the rate (×${VIEW3D.arcStepExaggeration} for visibility).">width = trade · +duty at midpoint</span>
            </div>`;

        // Importer view: the circles show everything in scope
        const shown = flows.length ? d3.sum(flows, d => Data.mv(d)) : STATE.totalScope;
        $('stat-value').textContent = fmtUSD(shown);
        $('stat-bilateral').textContent = fmtUSD(STATE.totalScope);
        $('stat-coverage').textContent = STATE.totalScope ? `${(shown / STATE.totalScope * 100).toFixed(1)}% shown` : '';
    },

    // Arc colour key for the effective duty rate + width note
    _arcRateLegendHTML(flows) {
        const r = CONFIG.arcRate, dom = Map3D.arcDomain, mid = Map3D.arcMid;
        const max = dom[dom.length - 1];
        const grad = `linear-gradient(90deg, ${r.colors.map((c, i) => `${c} ${dom[i] / max * 100}%`).join(', ')})`;
        return `<span class="lg-scale-lbl" title="Colour: effective duty rate = estimated duties ÷ trade value">rate 0%</span>
            <span class="lg-arcrate-wrap"><span class="lg-arcrate" style="background:${grad}"></span><span class="lg-arcmid-tick" style="left:${mid / max * 100}%"></span></span><span class="lg-scale-lbl">${+max.toFixed(1)}%+</span>
            <span class="lg-scale-lbl" title="Neutral grey = world average effective duty rate on the selected goods (trade-weighted, all corridors with tariff data)">grey = world avg ${fmtPct(mid, 2)}</span>
`;
    },

    // 3×3 bivariate key: need (rows, bottom→top) × tariff (columns, left→right)
    _bivLegendHTML() {
        const b = this._biv || Data.bivariate();
        const cells = [2, 1, 0].map(ni => [0, 1, 2].map(ti =>
            `<span class="biv-cell${ni === 2 && ti === 2 ? ' biv-hh' : ''}" style="background:${CONFIG.bivariate[ni][ti]}"
                title="Need ${['low', 'mid', 'high'][ni]} · tariff ${['low', 'mid', 'high'][ti]}"></span>`).join('')).join('');
        return `<div class="legend-section legend-biv" title="Tertiles over ${b.n} economies. Need breaks: ${fmtPct(b.nb[0])} / ${fmtPct(b.nb[1])} without safe water. Tariff breaks: ${fmtPct(b.tb[0])} / ${fmtPct(b.tb[1])} (${STATE.duty}).">
                <span class="legend-section-label">Need × tariff</span>
                <span class="biv-axis biv-y">need ↑</span>
                <span class="biv-grid">${cells}</span>
                <span class="biv-axis">tariff →</span>
                <span class="lg-scale-lbl biv-note"><span class="biv-hh-dot"></span>high need · high tariff</span>
                <span class="lg-swatch lg-nodata" title="No data"></span><span class="lg-scale-lbl">n/a</span>
            </div>`;
    },

    // ── KPIs ───────────────────────────────────────────────────────────
    renderKPIs() {
        $('kpi-scope').textContent = STATE.focusedIso && !STATE.selectedExporters.size && !STATE.selectedImporters.size
            ? `${Data.name(STATE.focusedIso)} (all partners)`
            : STATE.region === 'Global' && !STATE.selectedExporters.size && !STATE.selectedImporters.size && STATE.importerNeed === 'all'
                ? 'Global' : this._scopeLabel().replace(` · ${STATE.year}`, '');
        $('kpi-total-label').textContent = STATE.filteredFlows.length
            ? `${STATE.flowMetric === 'duty' ? 'Duties' : 'Trade'} on arcs (${STATE.filteredFlows.length})`
            : `Importers paying duty (${Object.values(STATE.importerStats || {}).filter(s => s.duty > 0).length})`;
        $('kpi-total').textContent = STATE.filteredFlows.length ? fmtUSD(d3.sum(STATE.filteredFlows, d => Data.mv(d))) : fmtUSD(STATE.scopeDuty || 0);
        $('kpi-flows').textContent = STATE.filteredFlows.length;
        $('kpi-duty').textContent = fmtUSD(STATE.scopeDuty || 0);
        $('kpi-duty-high').textContent = fmtUSD(Data.dutyHighNeed());
        // Same definition as the arc-colour midpoint: corridors whose importer has tariff data
        $('kpi-duty-rate').textContent = STATE.scopeValueKnown ? fmtPct(STATE.scopeDuty / STATE.scopeValueKnown * 100, 2) : '—';

        const q = Data.needTariffQuartiles();
        if (q) {
            $('kpi-need-high').textContent = fmtPct(q.highMedian);
            $('kpi-need-low').textContent = fmtPct(q.lowMedian);
            const gapEl = $('kpi-need-gap');
            if (q.lowMedian > 0.05 && q.highMedian >= q.lowMedian) gapEl.textContent = `${(q.highMedian / q.lowMedian).toFixed(1)}×`;
            else if (q.highMedian < q.lowMedian) gapEl.textContent = 'reversed';   // e.g. the Americas: honest, not hidden
            else gapEl.textContent = q.highMedian > 0.05 ? 'higher' : '—';
            gapEl.title = `Highest-need quarter median ${fmtPct(q.highMedian)} vs lowest-need quarter ${fmtPct(q.lowMedian)} (${q.n} economies)`;
        } else {
            ['kpi-need-high', 'kpi-need-low', 'kpi-need-gap'].forEach(id => { $(id).textContent = '—'; });
        }

        const exp = {}, imp = {};
        for (const d of STATE.scopeFlows || []) {
            exp[d.exporter] = (exp[d.exporter] || 0) + d.value;
            imp[d.importer] = (imp[d.importer] || 0) + Data.mv(d);
        }
        const top = (o) => Object.entries(o).sort((a, b) => b[1] - a[1])[0];
        const te = top(exp), ti = top(imp);
        $('kpi-top-exp').textContent = te ? Data.name(te[0]) : '—';
        $('kpi-top-imp').textContent = ti ? Data.name(ti[0]) : '—';
        $('kpi-top-imp-label').textContent = STATE.flowMetric === 'duty' ? '#1 Duty payer' : '#1 Importer';
    },

    // ── Tooltip ────────────────────────────────────────────────────────
    showTooltip(hit, e) {
        const tip = $('tooltip');
        Scatter.highlight(hit?.type === 'country' ? hit.iso : null);
        if (hit?.type !== 'arc') this._scheduleHoverArcs(hit?.type === 'country' ? hit.iso : null);
        if (!hit || !e) { tip.style.display = 'none'; return; }
        let html = '';
        const prod = Data.productLabel();
        if (hit.type === 'country') {
            const iso = hit.iso;
            const c = STATE.countries[iso];
            const w = STATE.water[iso];
            const t = STATE.tariffView[iso];
            const tot = Data.countryTotals(iso);
            html = `<div class="tt-title">${c?.name || iso}</div>
                <div class="tt-sub">${[c?.region, c?.dev === 'north' ? 'Developed' : 'Developing', c?.ldc ? 'LDC' : null, c?.sids ? 'SIDS' : null].filter(Boolean).join(' · ')}</div>
                <div class="tt-row"><span>Without safely managed water</span><b class="tt-need">${w ? fmtPct(w.without) : 'no data'}</b></div>
                <div class="tt-row"><span>${STATE.duty === 'MFN' ? 'MFN' : 'Applied'} tariff${t ? ` (${t.year})` : ''}</span><b class="tt-tariff">${t ? fmtPct(t.value) : 'no data'}</b></div>
                <div class="tt-row"><span>Imports ${STATE.year}</span><b>${tot ? fmtUSD(tot.imp) : '—'}</b></div>
                <div class="tt-row"><span>Est. duties paid ${STATE.year}</span><b class="tt-tariff">${tot?.duty != null ? fmtUSD(tot.duty) : 'no data'}</b></div>
                <div class="tt-row"><span>Exports ${STATE.year}</span><b>${tot ? fmtUSD(tot.exp) : '—'}</b></div>
                <div class="tt-foot">${prod} · click for details</div>`;
        } else if (hit.type === 'arc' && hit.flow.importerRegion) {
            const d = hit.flow;
            html = `<div class="tt-title">${Data.name(d.exporter)} → ${d.importerRegion}</div>
                <div class="tt-sub">${d.n} importing economies · grouped corridor</div>
                <div class="tt-row"><span>Trade ${STATE.year}</span><b>${fmtUSD(d.value)}</b></div>
                <div class="tt-row"><span>Est. duties paid</span><b class="tt-tariff">${fmtUSD(d.duty)}</b></div>
                <div class="tt-row"><span>Effective duty rate</span><b class="tt-tariff">${d.valueKnown ? fmtPct(d.duty / d.valueKnown * 100, 1) : '—'}</b></div>
                <div class="tt-foot">${prod} · click to zoom to ${d.importerRegion}</div>`;
        } else if (hit.type === 'arc') {
            const d = hit.flow;
            const t = STATE.tariffView[d.importer];
            const w = STATE.water[d.importer];
            html = `<div class="tt-title">${Data.name(d.exporter)} → ${Data.name(d.importer)}</div>
                <div class="tt-sub"><span class="tt-dot" style="background:${CONFIG.flowColors[d.flowCategory]}"></span>${CONFIG.flowLabels[d.flowCategory]}</div>
                <div class="tt-row"><span>Trade ${STATE.year}</span><b>${fmtUSD(d.value)}</b></div>
                <div class="tt-row"><span>Est. duties paid</span><b class="tt-tariff">${d.duty != null ? fmtUSD(d.duty) : 'no tariff data'}</b></div>
                <div class="tt-row"><span>Effective duty rate</span><b class="tt-tariff">${d.duty != null && d.value ? fmtPct(d.duty / d.value * 100, 1) : '—'}</b></div>
                ${STATE.countries[d.exporter]?.eu && STATE.countries[d.importer]?.eu ? '<div class="tt-row"><span>Intra-EU trade</span><b>duty-free</b></div>' : ''}
                <div class="tt-row"><span>Importer's ${STATE.duty === 'MFN' ? 'MFN' : 'applied'} tariff (simple avg.)</span><b class="tt-tariff">${t ? fmtPct(t.value) : 'no data'}</b></div>
                <div class="tt-row"><span>Importer: no safe water</span><b class="tt-need">${w ? fmtPct(w.without) : 'no data'}</b></div>
                ${this._mixHTML(d)}
                <div class="tt-foot">${prod} · click to open ${Data.name(d.importer)}</div>`;
        }
        tip.innerHTML = html;
        tip.style.display = 'block';
        // Position inside .map-area (the map container may be offset by the docked analysis panel)
        const area = $('map-container').getBoundingClientRect();
        const off = area.left - $('map-container').parentElement.getBoundingClientRect().left;
        const tw = tip.offsetWidth, th = tip.offsetHeight;
        let x = e.clientX - area.left + 16, y = e.clientY - area.top + 16;
        if (x + tw > area.width - 8) x = e.clientX - area.left - tw - 16;
        if (y + th > area.height - 8) y = e.clientY - area.top - th - 16;
        tip.style.left = `${Math.max(8, x) + off}px`;
        tip.style.top = `${Math.max(8, y)}px`;
    },

    // Hovering an economy (map or chart) previews its largest supplier corridors
    hoverCountry(iso) {
        Map3D.setHover(iso);
        this._scheduleHoverArcs(iso);
    },

    _scheduleHoverArcs(iso) {
        clearTimeout(this._hoverTimer);
        if (iso === this._hoverArcIso) return;
        this._hoverTimer = setTimeout(() => {
            this._hoverArcIso = iso;
            // No preview for the focused economy (its corridors are already drawn) or in 'All flows'
            const show = iso && iso !== STATE.focusedIso && STATE.arcView !== 'all';
            Map3D.setHoverArcs(show ? Data.supplierFlows(iso) : []);
        }, iso ? 140 : 250);
    },

    // "What is shipped" block in the arc tooltip: explains the corridor's effective rate
    _mixHTML(d) {
        const mix = Data.corridorMix(d);
        if (!mix || mix.count < 2) return '';     // single product: the rate is simply the importer's rate
        const rows = mix.top.map(r => `<tr>
                <td><span class="mix-name">${HS_SHORT[r.hs] || r.hs}</span> <span class="mix-hs">${r.hs}</span></td>
                <td class="ar"><span class="mix-bar" style="width:${Math.max(2, r.share * 0.4).toFixed(0)}px"></span>${r.share.toFixed(0)}%</td>
                <td class="ar mix-rate" style="color:${r.rate == null ? '#aea29a' : Map3D.arcRateColor(r.rate)}">${r.rate == null ? '—' : fmtPct(r.rate, r.rate % 1 ? 1 : 0)}${r.imputed ? '*' : ''}</td>
            </tr>`).join('');
        return `<div class="tt-mix">
                <div class="tt-mix-head">What is shipped <span>share · ${Data.name(d.importer)}'s ${STATE.duty} rate</span></div>
                <table>${rows}</table>
                ${mix.rest > 0 ? `<div class="tt-mix-note">+ ${mix.rest} more HS line${mix.rest > 1 ? 's' : ''}</div>` : ''}
                ${mix.top.some(r => r.imputed) ? `<div class="tt-mix-note">* no rate reported; ${Data.name(d.importer)}'s average used</div>` : ''}
                <div class="tt-mix-note">The effective rate is the trade-weighted mix of these rates, so it differs by supplier.</div>
            </div>`;
    },

    onMapClick(hit) {
        if (!hit) { if (STATE.focusedIso) this.focusCountry(null); return; }
        if (hit.type === 'country') this.focusCountry(hit.iso === STATE.focusedIso ? null : hit.iso);
        if (hit.type === 'arc' && hit.flow.importerRegion) {
            STATE.region = hit.flow.importerRegion;
            Map3D.drawGround();
            this._flyToRegion(STATE.region, true);
            this.update({ walls: false });
        } else if (hit.type === 'arc') this.focusCountry(hit.flow.importer, { move: false });
    },

    focusCountry(iso, { move = true } = {}) {
        const prev = STATE.focusedIso;
        STATE.focusedIso = iso;
        if (iso) {
            Map3D.setFocus(iso, null);
            Panel.open(iso);
            const narrow = window.innerWidth < 768;
            const panel = document.getElementById('insight-panel');
            if (move) requestAnimationFrame(() => Map3D.focusIsoView(iso, narrow ? 0 : panel.offsetWidth, 1.6,
                narrow ? Math.min(panel.getBoundingClientRect().height, $('map-container').clientHeight * 0.7) : 0));
        } else {
            Map3D.setFocus(null);
            Panel.close();
        }
        if (prev !== iso) this.update({ walls: false });
        else DeepLink.write();
    },

    // ── Animation over years (tariffs are a single snapshot) ───────────
    async startAnimation() {
        $('anim-btn').innerHTML = '&#9632; Stop';
        $('anim-btn').classList.add('playing');
        await Data.prefetchAll();
        const years = CONFIG.years;
        let i = STATE.year >= years[years.length - 1] ? 0 : Math.max(0, years.indexOf(STATE.year) + 1);
        const step = async () => {
            STATE.year = years[i];
            await this.update({ walls: false });
            i++;
            if (i >= years.length) { this.stopAnimation(); return; }
            this._anim = setTimeout(step, 1300);
        };
        this._anim = setTimeout(step, 50);
    },

    stopAnimation() {
        clearTimeout(this._anim);
        this._anim = null;
        $('anim-btn').innerHTML = '&#9654; Animate';
        $('anim-btn').classList.remove('playing');
    },
};

function THREE_clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

// A shared link pasted into the same tab only changes the hash; reload so it is applied
// (DeepLink.write uses history.replaceState, which does not fire 'hashchange').
window.addEventListener('hashchange', () => location.reload());

window.App = App;
window.Map3D = Map3D;   // exposed for QA scripts
window.__Data = Data; window.__STATE = STATE; window.__Scatter = Scatter;
App.init();
