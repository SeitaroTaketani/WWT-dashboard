# Progress (update after every step)

## Phase 0 — Setup
- [x] Inspect SHC src (index.html, config, styles, main, map, dataLoader) for reuse
- [x] Scaffold Vite project, copy styles/assets, npm install
## Phase 1 — Data
- [x] Country code mapping (M49 -> ISO3) + unmatched report
- [x] Trade flows JSON (mirror reconciliation)
- [x] Tariff JSON (MFN/AHS, per HS, latest year)
- [x] WHO need JSON
- [x] Wall geometry (inset borders) JSON
- [x] Validation report
## Phase 2 — 3D map core
- [x] Scene/camera/controls
- [x] Ground choropleth texture + picking
- [x] Walls + guides
## Phase 3 — Arcs
- [x] 3D arcs + threshold + colours
## Phase 4 — UI
- [x] Header/filters/KPI/legend
- [x] Tooltip/country panel
- [x] CSV/deeplink/animation/footer
## Phase 5 — QA
- [x] Screenshot review loop (desktop/mobile)
- [x] Console errors 0, build ok, aggregation test, fps
## Phase 6 — Scatter (optional)
- [x] Scatter linked to map
## Phase 7 — Docs
- [x] METHODOLOGY.md, REPORT.md (Japanese)

## Phase 8 — Continuous QC & improvement (until user returns)
- [ ] Improvement rounds (log each below)

## Log
- 2026-09-29: plan approved; permissions set in wastewater/.claude/settings.local.json; shapely installed.
- Phase 0 done: dashboard/ scaffold (vite, three, d3, topojson-client, less, playwright); SHC styles/assets copied.
- Phase 1 done: `npm run data` (scripts/process_wwt.py) -> public/data. Key checks (scripts/validation.json):
  importer-reported share 97.4%; tariffs 196 countries; water 158; ETH MFN 11.5, COD 10.33, BHS 38.28;
  need-quartile median MFN [1.23, 2.18, 3.11, 6.4], spearman 0.513 (n=135). 78 small states get symbolic cage rings.
  Walls are in Equal Earth unit coords (d3 convention, y down): JS must use d3.geoEqualEarth().scale(1).translate([0,0]).
- Phases 2-4 done (map3d.js, main.js, panel.js, csv.js, deepLink.js, methodology.js, wwt.less). Build OK.
- QA tooling: `npx vite preview --port 8080` then `node qa/shots.mjs` (8 states -> qa/shots/*.png) and `node qa/interact.mjs` (16+ checks).
  Playwright uses existing Chromium at ms-playwright/chromium-1228 (installed PW version expects newer browser).
- Fixes after first visual QA: low tariffs grey (ramp), edge colour from ramp, label declutter, screen-space wall scale (#wall-scale),
  'Top' view = 80° elevation (walls stay visible), region zooms tuned, mobile zoom, opaque arcs (transparent Line2 looked dashed),
  focus mode shows focused economy's corridors + pans camera clear of the panel.
- IMPORTANT FINDING: the UN TopoJSON longitudes are offset by -11.31° (UN map centred ~11.31°E). Real coords (meta.json) must be
  rotated: CONFIG.geoLonOffset; unitProj/texProjReal/pick.projReal rotate([-11.31,0]); Python fallback centroids +11.31.
  Verified: hover at label point of TCD/BRA/AUS/IND/RUS/USA picks the right country. (SHC monitor probably has the same offset -> tell user.)
- Phase 5 done: 10 screenshot states + interact.mjs (17 checks incl. KPI = Python 6.4/1.2, hover picks Chad) all pass, 0 console errors.
  fps under swiftshader (CPU) ~6-14; real GPU expected 60.
- Phase 6 done: scatter.js (sqrt x, quartile bands + medians, size = imports, linked hover/click, keyboard focusable).
  Opens by default only at >=1600px width (covers SE Asia at 1440). Map badge (#map-badge) shows year/goods/measure.
- Phase 7 done: README.md, METHODOLOGY.md, REPORT.md (Japanese, for the user). interact.mjs now 19 checks (incl. 2024 total = pipeline).
- Phase 8 round 1: mobile header specificity; mobile focus pans above bottom sheet; Europe zoom 4.2; wall labels only >= 5%;
  node discs scale with 1/sqrt(zoom); region QA shots 13-16.
- Phase 8 round 2: wall labels refresh on region change (bug fix + test); stronger hover/focus wall highlight + UNCTAD-blue
  ground outline (Line2); PNG map export (src/snapshot.js: title, message, labels, legend, sources, UN disclaimer) + test;
  aria-label on map. interact.mjs = 21 checks, all pass.
- Phase 8 round 3: UNCTAD official country names (classification first; 'Isds'->'Islands', USA->United States) + 'short'
  names for map labels (Iran, DR Congo, Tanzania...); Africa region view zoom 1.75 centre [18,4]. Tests pass.
- Phase 8 round 4: removed temporary debug scripts (kept qa/debug-geo3.mjs); KPI gap shows 'reversed' when the
  high-need median < low-need (Americas: 0.73 vs 5.33, n=17); Americas view centre [-76,6] zoom 1.25; regional medians added to REPORT.
- Phase 8 round 5: dist verified from a subfolder (python http.server /dashboard/dist/); new 'Importers: All | High need'
  switch (flows into global top-quarter need economies; deep link n=high; docs + test); Americas framing re-checked.
- Phase 8 round 6: code scan clean (no console.log/TODO); removed dead config (tariff.edge/uEdgeColor, dutyLabels, need.ocean);
  arc tooltip says 'click to open <importer>'. Full regression (17 shot states + interact) passes. Product considered stable:
  further rounds = light regression checks only unless a real issue is found.
- Loop stopped (all phases complete, product stable, idle checks add nothing). Preview server may still run on :8080.
- 2026-09-30 user request: implemented A (bivariate need x tariff map, 'Map' switch, v=biv) and D (estimated duties paid:
  trade x importer HS rate, intra-EU duty-free; arcs default to duties, 'Arcs' switch m=value; KPIs duty total / high-need /
  effective rate / #1 duty payer; panel, tooltip, CSV, scatter size, PNG). JS duty = pipeline (MFN $6.66B / $870.83M,
  AHS $4.57B). Bug fixed: duty toggle now rebuilds flows. interact.mjs 27 checks pass. Docs + REPORT section 7 updated.
- Arcs: colour = effective duty rate, diverging water-blue (<5%) / grey (5%) / red (>5%), white casing (user request). Docs updated.
- Arc colour midpoint = world trade-weighted effective duty rate (Data.worldEffectiveRate, recomputed per goods/measure;
  2.46% all goods MFN 2024); KPI effective rate uses same definition. Nodes neutral (exp white/dark ring, imp dark grey).
- Scatter rebuilt as docked left analysis panel (#analysis-panel): bivariate-coloured 3x3 cells = map key, dots sized by
  duties, region fade, 2-way hover/focus with labels, 'High need · high tariff' list (click = focus). Mobile bottom sheet.
- Perf: software-GL detection (SwiftShader etc.) -> no particles + on-demand rendering (Map3D.invalidate); year switch
  2.3s -> 0.3s on CPU. qa/perf*.mjs added. interact.mjs 31 checks pass.
- Arc de-spaghetti (options 1-4): Show = Importers (default, circles size=duty colour=rate, hover supplier arcs) / Top 15 high-need / Regions (supplier->region, weighted centre) / All; static tapered arcs (8 Line2 segments), particles removed, always on-demand render; threshold+N/S controls only in All. 35 checks pass.
- No-data ground = hatched pattern (Map3D.noDataPattern), not flat grey (was ~identical to low-need/low-tariff class). Legend/PNG updated.
- Arc encoding v3: width = trade value; grey first half, duty step at midpoint (VIEW3D.arcStepAt/arcStepExaggeration), hover step label; landed-cost ladder ($100 + tariff) in analysis panel with reference medians.
- Arc first half now = 0% colour of the duty-rate scale (blue) instead of grey (user request); fixed VIEW3D comments that had been merged onto one line in config.js.
- Arc tooltip 'What is shipped': top-3 HS lines (share, importer rate, * imputed) via Data.corridorMix + HS_SHORT names; explains supplier-specific effective rates (CAN->ETH 29.1% = 842121 at 30%).
- hashchange -> reload so pasted deep links apply in the same tab; interact 36 checks.
