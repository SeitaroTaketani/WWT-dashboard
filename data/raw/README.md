# Raw inputs of the data pipeline

`npm run data` (`python scripts/process_wwt.py`) reads only the files below plus two files in `public/`
(see the docstring of `scripts/process_wwt.py`). Outputs go to `public/data/` and `scripts/validation.json`.
Re-running the pipeline on these files reproduces the committed outputs byte for byte.

| File | Content | Notes |
|---|---|---|
| `comtrade_wwt.csv.gz` | UN Comtrade bilateral trade, 16 HS6 codes, 2010–2024 (USD) | Reduced extract of the full country report (~190 MB, not stored here): only `Import Value (USD)` / `Export Value (USD)` rows and the columns the pipeline reads. Rebuild with `python scripts/extract_comtrade.py <Country_Report.csv>` |
| `wits_tariffs_wwt.csv` | WITS/TRAINS simple-average tariffs per reporter and HS6 (MFN, AHS, BND), tariff years 1992–2023 | WITS job 3168187, HS nomenclature, 16 products |
| `who_unicef_jmp_drinking_water.csv` | WHO/UNICEF JMP "Population using safely managed drinking-water services (%)", 2000–2024 | WHO GHO export, last modified 2026-01-22; pipeline keeps `IsLatestYear` rows |
| `meta.json` | ISO3 country names and label coordinates | From the UNCTAD map-chart style package |

Also read by the pipeline (and by the app): `public/data/country_classification.json` (UNCTAD regions and
development status) and `public/assets/worldmap-economies-4326.topo.json` (UN map).

Setup: `pip install -r requirements.txt`.
