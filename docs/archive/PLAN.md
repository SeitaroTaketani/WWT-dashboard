# UNCTAD WWT Global Dashboard — Plan

## Goal
Show that countries most in need of water/wastewater treatment technology apply higher tariffs on it,
together with bilateral trade flows. English UI. **UNCTAD style (as in SHC monitor) is the top design priority.**

Reference repo (read-only): `C:\Users\seitaro.taketani\OneDrive - United Nations\Documents\GitHub\SHC-trade-visualization - UNCTADstyled`

## Fixed decisions (user, 2026-09-29)
- Location: `wastewater/dashboard/` (do not touch other files in `wastewater/`).
- No git operations unless absolutely necessary.
- Tariff = **border walls only** (per-country inset border ribbons). No centroid pillars.
- Scatter plot (need vs tariff) = **last phase, optional**.
- Projection: Equal Earth (d3.geoEqualEarth) -> Three.js plane (X,Z). 2.5D tilted orthographic view.
- Ground: WHO/UNICEF JMP % population WITHOUT safely managed drinking water (Total, latest) as choropleth (canvas texture).
- Walls: height = MFN (default) or AHS simple-average tariff; aggregation = all 16 HS / tech group / single HS. Capped scale, guide levels 5/10/20%.
- Colours: ground single-hue sequential (light grey -> UNCTAD dark blue/purple); walls a distinct sequential (yellow -> orange -> red, UNCTAD-toned, no neon). White top edge.
- Arcs: bilateral trade, importer-reported preferred, exporter-reported mirror as fallback. SHC threshold logic (auto, max 40 arcs), SHC N/S categories & colours.

## Tech groups
- Pumping: 841350, 841370, 841391
- Aeration & air handling: 841440, 841480, 841490
- Filtration & purification: 842121, 842199
- Process equipment: 841989, 847982
- Monitoring & control: 853710, 902610, 902620, 902730, 902789, 902790

## Phases
0. Setup: Vite project (copy SHC structure & styles), deps three/d3/topojson-client, playwright scripts.
1. Data pipeline `scripts/process_wwt.py` -> `public/data/*.json` + validation report `scripts/validation_report.md`.
2. 3D map core `src/map3d.js`: scene, ortho camera, ground texture, picking canvas, walls, guides.
3. Arcs in 3D.
4. UI port from SHC (header, filters incl. product selector & MFN/AHS, KPI incl. need-quartile tariff ratio, legend, tooltip, country panel, CSV, deep link, year animation, footer methodology). Drop story/SNS/factsheet/sea routes.
5. QA loop: playwright screenshots desktop 1440 & mobile 390, visual review, zero console errors, build ok, JS vs Python aggregation test, fps.
6. Scatter panel (optional).
7. METHODOLOGY.md + REPORT.md (for the user, in Japanese).

## Autonomy rules
- State lives in `PROGRESS.md`; update after every meaningful step. On resume: read PROGRESS.md, continue next unchecked item.
- Tunable visual parameters in `src/config.js` (`VIEW3D`).
- Never delete files outside `dashboard/`; never push/deploy.
- Token economy: no subagents, never cat big CSVs, limited screenshots.
8. **Continuous improvement (user request 2026-09-29)**: if time remains after phase 7, keep looping QC — look for bugs, data issues,
   UX/UNCTAD-style inconsistencies, performance, mobile, accessibility — fix and log each in PROGRESS.md. Keep going until user returns.
