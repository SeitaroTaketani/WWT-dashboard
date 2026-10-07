# Methodology

## 1. Products

The 16 HS 6-digit codes supplied in `data/COMTRADE` are grouped into five technology groups:

| Group | HS codes |
|---|---|
| Pumping | 841350, 841370, 841391 |
| Aeration & air handling | 841440, 841480, 841490 |
| Filtration & purification | 842121, 842199 |
| Process equipment | 841989, 847982 |
| Monitoring & control | 853710, 902610, 902620, 902730, 902789, 902790 |

Most codes are dual-use (general-purpose pumps, compressors, control panels, laboratory instruments), so the
dashboard speaks of *WWT-related goods*. The grouping is a proposal. It is defined in one place
(`GROUPS` in `scripts/process_wwt.py`) and can be changed there.

## 2. Trade flows

- Source: UN Comtrade, 2010–2024, USD. World and non-geographic partners are dropped (Bunkers, Free Zones, "nes" areas, etc.).
- Code harmonisation: Comtrade/WITS codes 842→840 (USA), 251→250 (FRA), 579→578 (NOR), 699→356 (IND), 757→756 (CHE), 490→158 (Taiwan Province of China).
- **Mirror reconciliation**: for each exporter, importer, HS code and year, the importer-reported import value (CIF) is used where it is positive.
  Otherwise the exporter-reported export value (FOB) is used. 97.4% of the value is importer-reported.
- Arcs are **gross directed flows**. They are not netted as in the SHC monitor, because tariffs apply to gross imports.
- **High-need importers** switch: keeps only flows into economies in the global top quarter of need (JMP).
- Display threshold: the SHC adaptive rule (at most 40 arcs, with a floor of $10M globally or $1M for a region, lower for country selections).
  CSV exports ignore the threshold.

## 3. Tariffs

- Source: WITS/TRAINS extract (`data/tariff`), one tariff year per reporter and duty type (mostly 2023; the panel shows the year).
- MFN = most-favoured-nation applied rate. AHS = effectively applied rate, including preferences.
- Wall value = **simple mean of the HS-6 simple-average rates** over the selected codes that have a rate.
  Trade-weighted averages are not used, because high tariffs depress imports and so would be under-weighted.
- EU members are reported individually in the extract (common external tariff). The "European Union" aggregate (918) is dropped.

## 3b. Estimated duties paid

- Corridor duty = Σ over the selected HS codes of trade value × importer's rate (MFN or AHS, HS-6 simple average, latest year).
  A missing HS rate falls back to the importer's mean rate. Importers without any tariff data have no duty estimate (shown as "no data").
- Intra-EU trade is duty-free (customs union, 27 members flagged in Comtrade). Other preferences are not modelled, so MFN is an upper bound.
- 2024, all 16 goods: **MFN $6.66B** in total, of which **$871M** paid by importers in the global top quarter of need
  (≥ 52.17% without safely managed water). With AHS: $4.57B / $538M.
  The dashboard reproduces these figures exactly (checked by `qa/interact.mjs` against `scripts/validation.json`).
- Arcs: width = duties paid (USD), colour = effective duty rate on the corridor (duties ÷ trade value, `CONFIG.arcRate`):
  pale yellow (below) → UN yellow at the **world average effective rate** (trade-weighted over all corridors whose importer has
  tariff data, recomputed for the selected goods/measure; 2.46% for all goods, MFN, 2024) → orange (above), 15%+ brown; the first half of
  each arc (shipment before duty) is grey. The KPI "Effective duty rate" uses the same definition, so globally it equals the yellow midpoint (tick on the legend bar).
  Arcs have a white casing so they stay visible over red walls. "Colour: N/S" restores the development-status colours.
  Auto thresholds are scaled by 0.05 in duty mode (global floor $500K).

## 3c. 2D view

Top-down flat map with the walls hidden. The ground is unchanged (need, UN purple). The tariff is carried by the importer circles instead:
colour = the importer's simple-average tariff for the active goods and measure (`tariffColor`, the same median-centred scale as the wall colour),
size = estimated duties paid (minimum radius `VIEW3D.circleMinRadius2d`). Economies without tariff data get a grey circle.
The "high need · high tariff" group (`Data.burden`: need at or above the cut-off of the *Importers: High need* switch, i.e. the top quarter of the 158 economies with a JMP
estimate (52.2%, about a majority), and a tariff above the median economy `TARIFF_SCALE.median`, i.e. the red side of the colour scale; economies with both) is not a map colour; it drives the shaded corner of the analysis scatter and the list below it.
The thresholds are relative, not policy standards (the WTO/WITS "international tariff peak" of 15 % applies to single tariff lines, and no economy reaches it as a simple average).
The panel reports how many economies stay in the group with a stricter tariff cut (top quarter of tariffs); for all 16 goods, 2024: 30 economies (MFN) and 21 of them remain; with AHS 28 and 23.
The scatter uses linear axes, a dashed line at the median tariff (the colour centre), a tooltip per dot, and states which economies lack a
water estimate (and therefore cannot be placed).

## 4. Water-access need

WHO/UNICEF JMP, indicator `WSH_WATER_SAFELY_MANAGED`, national total, latest year (`IsLatestYear`).
Need = 100 − % using safely managed drinking-water services. There are 158 economies with an estimate.
Some large economies (for example China, Kenya and Australia) have no safely-managed estimate. They are shown with a grey diagonal hatch, not a flat colour, so that "no data" can never be read as "low need" (the flat light grey was almost identical to the low-need / low-tariff class).

## 5. Core indicator: tariffs by need quarter

Economies with both a tariff and a need estimate are ranked by need. The median tariff of the top quarter (≥ Q3)
is compared with that of the bottom quarter (≤ Q1). This is recomputed for the selected goods, tariff measure and region.

| Global, all 16 goods, MFN | Q1 (low need) | Q2 | Q3 | Q4 (high need) |
|---|---|---|---|---|
| Median MFN tariff | 1.23% | 2.18% | 3.11% | 6.40% |

Spearman rank correlation between need and MFN tariff: 0.51 (n = 135).

## 6. Map geometry

- Projection: Equal Earth (`d3.geoEqualEarth`), rendered as a Three.js plane viewed with an orthographic camera at 52° elevation.
  An orthographic camera keeps wall heights comparable anywhere on the map.
- The ground is a 4096-px canvas texture (need choropleth with white UN borders, disputed borders dashed/dotted, Aksai Chin hatched).
- **Walls**: each economy's outline is projected to Equal Earth unit coordinates, pulled 0.0035 units inwards (shapely `buffer(-d)`)
  so that neighbours do not share a line, and simplified. Economies too small to survive the inset (78, mostly SIDS and territories)
  get a symbolic 9-sided ring around their label point.
- Wall height is linear in the tariff up to a 20% cap. Colour is diverging around the **median economy** for the selected goods and measure (all economies with data; 3.53% for all 16 goods, MFN): UN blue below, neutral grey at the median, UNCTAD red above, dark red at the 20% cap (`TARIFF_SCALE`, recomputed in `Data.computeTariffView`). Height stays the absolute tariff.
  Opacity also increases with the tariff, so low-tariff walls recede.
- **Longitude offset**: the UN TopoJSON is stored relative to a central meridian of ~11.31°E. Label points and other real
  coordinates are rotated by `CONFIG.geoLonOffset` before projection (measured on Cap-Vert −11.298, Cape Agulhas −11.311).

## 7. Known limitations

- The tariff is a single snapshot (latest year). Only trade flows change during the year animation.
- Simple averages give equal weight to each HS line, whatever its importance in WWT projects.
- Dual-use HS codes overstate WWT-specific trade.
- Mirror values mix CIF (importer) and FOB (exporter) valuations.
