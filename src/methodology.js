export const METHODOLOGY_HTML = `
<section class="method-section">
    <h3 class="method-section-title">What the map shows</h3>
    <p class="method-note">Three layers are stacked on an Equal Earth projection, viewed at an angle:
    the <strong>ground colour</strong> (UN purple) shows how much of the population lacks safely managed drinking water (need),
    <strong>walls</strong> (UN red above, UN blue below the median economy) raised along each economy's border show the tariff it applies to water and wastewater treatment goods (barrier),
    and <strong>circles and arcs</strong> (UN yellow) show the duties paid on, and the trade in, those goods (supply). One variable, one hue, in every view. Economies whose share of the population without safely
    managed drinking water is highest tend to apply the highest tariffs on the equipment needed to close that gap.</p>
</section>

<section class="method-section">
    <h3 class="method-section-title">Products</h3>
    <dl class="method-dl">
        <dt>Coverage</dt>
        <dd>16 HS 6-digit codes that cover equipment used in water and wastewater treatment, grouped into five technology groups:
        <strong>Pumping</strong> (841350, 841370, 841391); <strong>Aeration &amp; air handling</strong> (841440, 841480, 841490);
        <strong>Filtration &amp; purification</strong> (842121, 842199); <strong>Process equipment</strong> (841989, 847982);
        <strong>Monitoring &amp; control</strong> (853710, 902610, 902620, 902730, 902789, 902790).</dd>
        <dt>Caveat</dt>
        <dd>Most of these codes also cover goods used outside water treatment (for example general-purpose pumps, compressors,
        control panels and laboratory instruments). Figures describe trade in <em>WWT-related goods</em>, not in water-treatment use only.</dd>
    </dl>
</section>

<section class="method-section">
    <h3 class="method-section-title">Trade data</h3>
    <dl class="method-dl">
        <dt>Source</dt>
        <dd>UN Comtrade, 2010–2024, current US dollars.</dd>
        <dt>Mirror data</dt>
        <dd>For each exporter–importer–product–year, the value reported by the importer is used. Where the importer does not report,
        the value reported by the exporter is used. About 97% of the value comes from importer reports.
        Many least developed countries report incompletely, so mirror data give them better coverage.</dd>
        <dt>Direction</dt>
        <dd>Arcs are gross, directed flows from exporter to importer. They are not netted, because the tariff applies to gross imports.
        Arcs bend clockwise, so flows in opposite directions between the same pair do not overlap.</dd>
        <dt>High-need importers</dt>
        <dd>The <strong>Importers: High need</strong> switch keeps only flows into economies in the global top quarter of the share of population without safely managed drinking water.</dd>
        <dt>Display threshold</dt>
        <dd>As in UNCTAD's Second-Hand Clothes Trade Monitor, at most 40 arcs are drawn in Auto mode (global floor $10&thinsp;M). Exports (CSV) ignore the threshold.</dd>
    </dl>
</section>

<section class="method-section">
    <h3 class="method-section-title">Flow direction classification</h3>
    <p class="method-note">Economies are classified as <strong>North</strong> (developed) or <strong>South</strong> (developing) using the UNCTAD development-status classification.</p>
    <dl class="method-dl">
        <dt><span class="method-flow-dot" style="background:#009EDB"></span> N&rarr;S</dt><dd>Developed exporter, developing importer</dd>
        <dt><span class="method-flow-dot" style="background:#72BF44"></span> S&rarr;N</dt><dd>Developing exporter, developed importer</dd>
        <dt><span class="method-flow-dot" style="background:#FBAF17"></span> S&rarr;S</dt><dd>Both developing</dd>
        <dt><span class="method-flow-dot" style="background:#AEA29A"></span> N&rarr;N</dt><dd>Both developed</dd>
    </dl>
</section>

<section class="method-section">
    <h3 class="method-section-title">Tariffs (walls)</h3>
    <dl class="method-dl">
        <dt>Source</dt>
        <dd>WITS / UNCTAD TRAINS, latest year available for each reporter (mostly 2023). The panel shows the year for each economy.</dd>
        <dt>Measures</dt>
        <dd><strong>MFN</strong>: most-favoured-nation applied rate. <strong>Applied (AHS)</strong>: effectively applied rate, including preferential rates.</dd>
        <dt>Aggregation</dt>
        <dd>For the selected goods, the wall shows the <em>simple average</em> of the HS 6-digit simple-average rates.
        Trade-weighted averages are not used: prohibitive tariffs suppress imports and would therefore receive little weight.</dd>
        <dt>Height</dt>
        <dd>Linear in the tariff and capped at 20%. Walls for the few economies above 20% stop at the cap; their exact rate is in the labels, tooltip and panel.
        Reference levels at 5, 10 and 20% appear on the ruler and, when an economy is selected, as dashed rings around its wall.</dd>
        <dt>Borders</dt>
        <dd>Walls follow each economy's border, pulled slightly inwards so that neighbours do not share one line.
        Economies too small to draw are shown as a symbolic ring, so small island developing States stay visible.</dd>
    </dl>
</section>

<section class="method-section">
    <h3 class="method-section-title">Estimated duties paid (arcs and KPIs)</h3>
    <dl class="method-dl">
        <dt>Formula</dt>
        <dd>For each exporter → importer corridor: Σ over the selected HS codes of <em>trade value × importer's tariff rate</em>.
        The rate is the importer's MFN or applied (AHS) simple average for that HS code (latest year). Where one HS rate is missing, the importer's mean rate is used.</dd>
        <dt>Preferences</dt>
        <dd>Trade within the European Union is treated as duty-free (customs union). Other bilateral preferences are not modelled.
        MFN therefore gives an upper-bound estimate; AHS is closer to the duties actually collected.</dd>
        <dt>Interpretation</dt>
        <dd>A static, first-order estimate of the extra cost on water treatment equipment. It does not account for exemptions for public utilities or donor projects, for smuggling, or for imports that the tariff prevents.</dd>
        <dt>Circles</dt>
        <dd>Each importing economy gets a circle: <strong>size</strong> = estimated duties it pays on the selected goods, <strong>colour</strong> = its effective duty rate (same key as the arcs; in the 2D view the colour is its tariff instead). This is the default view: it shows who pays, and how heavily, without drawing every trade route.</dd>
        <dt>Show</dt>
        <dd><strong>Importers</strong>: circles only; hovering an economy draws its 8 largest supplier corridors. <strong>Top 15</strong>: the 15 largest duty corridors into economies in the global top quarter of need. <strong>Regions</strong>: corridors grouped from each supplier to an importing region (anchored at the trade-weighted centre of that region's importers). <strong>All</strong>: every corridor above the adaptive threshold, with the North/South and threshold filters. Selecting an economy always shows its own corridors. Arcs are static and widen towards the importer, where the duty is paid.</dd>
        <dt>Arc encoding</dt>
        <dd>Every arc runs from supplier to importer. Its <strong>first half</strong> is the shipment at its export price, i.e. before any duty: it takes the 0% colour of the duty-rate scale (grey), width = trade value. At the <strong>midpoint of every arc</strong> (the same place on all arcs, so small economies are as readable as large ones) the importer's duty is added: the line turns to the duty-rate colour and widens by the rate. The widening is exaggerated ×4 so that rates of 1–12% remain visible. Hover an arc for the exact rate and duty, and for the products shipped on that corridor.</dd>
        <dt>Why arcs into the same economy differ</dt>
        <dd>The importer sets a rate per HS code; each supplier ships a different mix of codes. The corridor's effective rate is the trade-weighted mix of the importer's rates, so, for example, a supplier shipping mostly water-purifying machinery (HS 842121) to Ethiopia faces 30%, while one shipping mostly control panels (HS 853710) faces 5%. With a single HS code selected, all arcs into one economy share its rate (except duty-free intra-EU trade). The arc tooltip lists the main products, their share and the importer's rate for each.</dd>
        <dt>Water need vs import tariff (side panel)</dt>
        <dd>Each dot is an economy with both a water-need and a tariff estimate; colour = tariff on the map's scale, size = estimated duties paid. The shaded corner is the <strong>high need · high tariff</strong> group: the same need cut-off as the "Importers: High need" switch (top quarter of economies, about the point where a majority lacks safely managed water) and a tariff above the median economy, i.e. the red side of the colour scale. These thresholds are relative, not policy standards; the panel also reports how many economies remain with a stricter tariff cut (top quarter of tariffs). Hover a dot for its name and numbers; "Show names" labels the three largest duty payers of the group. Drag the panel edge to widen the chart. Economies without a safely-managed-water estimate (about a third of those with tariff data, e.g. China) cannot be placed and are listed under the chart. Below it, <strong>cost of $100 of equipment, with tariff</strong> shows what $100 costs once the importer's tariff is added, for each economy in the group against the median of the lowest-need quarter and of all economies.</dd>
        <dt>Arcs</dt>
        <dd>By default, arc <strong>width</strong> shows the duties paid (USD) and arc <strong>colour</strong> shows the effective duty rate on the corridor (duties ÷ trade value), on a scale anchored on the <strong>world average effective duty rate</strong> for the selected goods and measure (e.g. 2.46% for all 16 goods, MFN, 2024; marked by a tick on the legend bar): pale yellow below the world average, UN yellow at it, orange above, brown at 15% or more.
        Switch <strong>Arcs</strong> to "Trade value" for width by trade, and <strong>Colour</strong> to "N/S" for the development-status colours. The display threshold adapts to the chosen measure.</dd>
    </dl>
</section>

<section class="method-section">
    <h3 class="method-section-title">2D view</h3>
    <p class="method-note">The <strong>2D</strong> button flattens the map (top-down, no walls). The ground stays the share of the population without safely
    managed drinking water, in UN purple. The tariff moves onto the importer circles: <strong>circle colour</strong> = the economy's simple-average tariff on the
    selected goods (the same scale as the wall colour: blue below, grey at and red above the median economy, dark red at 20%), <strong>circle size</strong> = estimated duties it pays. A dark purple ground with a
    dark red circle therefore reads as high need and a high tariff. Circles have a minimum size so that small, heavily taxed economies stay visible.</p>
</section>

<section class="method-section">
    <h3 class="method-section-title">Water access (ground)</h3>
    <dl class="method-dl">
        <dt>Indicator</dt>
        <dd>100 minus the share of the population using safely managed drinking-water services (SDG 6.1.1), national total, latest year (mostly 2024). "Safely managed" means an improved source located on premises, available when needed and free from faecal and priority chemical contamination; the remainder ("without") therefore also includes people who have a basic or limited service, unimproved sources or surface water.</dd>
        <dt>Source</dt>
        <dd>WHO/UNICEF Joint Monitoring Programme (JMP). Hatched land (grey diagonal lines) means no JMP estimate is available (e.g. China, Kenya, Australia). It is deliberately not a colour, so it cannot be mistaken for a low share.</dd>
    </dl>
</section>

<section class="method-section">
    <h3 class="method-section-title">Need vs tariff indicator (KPI bar)</h3>
    <p class="method-note">Economies with both a tariff and a water-access estimate are split into quarters by the share of the population
    without safely managed drinking water. The KPI bar compares the median tariff of the highest-need quarter with that of the lowest-need quarter,
    for the selected goods, tariff measure and region. Globally, for all 16 goods (MFN), the medians rise steadily across the quarters (about 1.2%, 2.2%, 3.1% and 6.4%);
    the Spearman rank correlation is about 0.5 (135 economies).</p>
</section>

<section class="method-section">
    <h3 class="method-section-title">Map disclaimer</h3>
    <p class="method-note">The boundaries and names shown and the designations used on this map do not imply official endorsement or acceptance by the United Nations.
    Dotted and dashed lines represent approximate borders for which the final status has not yet been agreed.</p>
</section>

<section class="method-section method-section-last">
    <h3 class="method-section-title">How to cite</h3>
    <p class="method-cite">UNCTAD (2026). <em>Wastewater Treatment Technology: Trade &amp; Tariff Monitor.</em> United Nations Conference on Trade and Development, Geneva.</p>
</section>
`;
