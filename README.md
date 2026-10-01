# UNCTAD Wastewater Treatment Technology: Trade & Tariff Monitor

A 2.5D dashboard showing that economies where safe water is scarcest apply the highest tariffs on water and
wastewater treatment (WWT) equipment, together with bilateral trade in that equipment.

- **Ground**: share of the population without safely managed drinking water (WHO/UNICEF JMP 2024)
- **Walls**: simple-average MFN or applied (AHS) tariff on the selected goods (WITS/TRAINS), capped at 20%
- **Arcs**: bilateral trade (UN Comtrade 2010–2024, importer-reported with exporter mirror fallback)

The UI, styling and interaction model are reused from the SHC monitor (`SHC-trade-visualization - UNCTADstyled`).

## Run

```bash
npm install
npm run data      # python scripts/process_wwt.py  -> public/data/*.json (needs pandas, shapely, pycountry)
npm run dev       # http://localhost:5174
npm run build     # -> dist/ (static, base './', can be hosted in any folder)
```

## Layout

| Path | Purpose |
|---|---|
| `scripts/process_wwt.py` | Data pipeline: country codes, mirror trade, tariffs, water, wall geometry, validation |
| `scripts/validation.json` | Figures checked after each run (coverage, spot checks, need-quartile medians) |
| `src/config.js` | Colours, `VIEW3D` tunables (camera angle, wall height, arc widths…), state |
| `src/data.js` | Loading, product aggregation, flow filtering (SHC auto threshold), need/tariff quartiles |
| `src/map3d.js` | Three.js scene: ground texture, tariff walls (shader), arcs, nodes, labels, picking |
| `src/main.js` | UI wiring, legend, KPIs, tooltip, animation |
| `src/panel.js` | Country panel |
| `src/scatter.js` | Need-vs-tariff chart linked to the map |
| `src/csv.js`, `src/deepLink.js`, `src/methodology.js` | CSV export, shareable URL hash, methodology modal |
| `qa/shots.mjs`, `qa/interact.mjs` | Playwright screenshots and interaction checks (run against `npx vite preview --port 8080`) |

## Tuning the look

Everything visual that is likely to need adjustment is in `src/config.js`:

- `VIEW3D.elevationDeg` (default 52°), `topViewElevationDeg` (80°), `wallMaxHeight`, `defaultZoom`
- `CONFIG.tariff.colors / domain / cap` (wall colour ramp and height cap)
- `CONFIG.need.colors / domain` (ground colour ramp)
- `CONFIG.flowColors` (arc colours, same as the SHC monitor except N→N in UNCTAD grey)

## Important: UN map longitude offset

The UN TopoJSON (`worldmap-economies-4326.topo.json`) stores longitudes relative to a central meridian of about
**11.31°E** (decoded longitude = real longitude − 11.31). Real-world coordinates (country label points,
region centres, graticule) are rotated by `CONFIG.geoLonOffset` so that they line up with the map geometry.
`qa/debug-geo3.mjs` measures the offset from coastline landmarks.
