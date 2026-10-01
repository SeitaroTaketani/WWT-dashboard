import * as d3 from 'd3';

export const CONFIG = {
    geoJsonUrl: 'assets/worldmap-economies-4326.topo.json',
    // The UN TopoJSON stores longitudes relative to a central meridian of ~11.31°E
    // (decoded lon = real lon − 11.31; verified on Cap-Vert, Cape Agulhas, Ras Hafun).
    // Real-world coordinates (meta.json, region centres, graticule) are rotated by this
    // amount so they line up with the map geometry. See qa/debug-geo3.mjs.
    geoLonOffset: 11.31,
    years: d3.range(2010, 2025),
    defaultYear: 2024,

    // UNCTAD flow-category colours (same semantics as the SHC monitor).
    flowColors: {
        'north-south': '#009EDB',  // UNCTAD Blue
        'south-north': '#72BF44',  // UNCTAD Green
        'south-south': '#FBAF17',  // UNCTAD Yellow
        'north-north': '#AEA29A',  // UNCTAD Grey
    },
    flowLabels: {
        'north-south': 'North → South',
        'south-north': 'South → North',
        'south-south': 'South → South',
        'north-north': 'North → North',
    },

    // Ground choropleth: % of population WITHOUT safely managed drinking water.
    // Sequential single hue (UNCTAD purple) so it never competes with the red tariff walls.
    need: {
        domain: [0, 20, 40, 60, 80, 100],
        colors: ['#f4f0f6', '#e2d3e7', '#c7a9d0', '#a978b6', '#8a4f9e', '#5e2b75'],
        noData: '#f7f5f3',   // base of the 'no data' hatch (see noDataHatch) — must never look like a low value
        noDataLine: '#b8aea7',
        border: '#ffffff',   // UN cartographic standard: white borders
    },

    // Bivariate palette [need tertile][tariff tertile]: grey → purple (need) × grey → UNCTAD red (tariff);
    // the top-right cell (high need · high tariff) is the darkest wine colour.
    bivariate: [
        ['#e6e1dd', '#f0b3c0', '#e45a74'],
        ['#cbb8d6', '#c98aa6', '#b8405f'],
        ['#9a76b2', '#8e4f86', '#6e1a45'],
    ],

    // Arc colour by effective duty rate (duty ÷ trade value, %): diverging around the WORLD AVERAGE
    // effective rate for the selected goods / measure (computed at run time, e.g. 2.45 % for all goods, MFN, 2024).
    // UNCTAD water blue = below world average, neutral grey = average, UNCTAD red = above; 'cap' = darkest red.
    arcRate: {
        cap: 15,
        colors: ['#0077b8', '#5aa9dd', '#d9cfc9', '#e4476a', '#8a1538'],
    },

    // Tariff walls: height and colour both encode the simple-average tariff (%).
    tariff: {
        cap: 20,                                   // % at which the wall stops growing
        guides: [5, 10, 20],                       // reference levels drawn on the ruler / focus rings
        colors: ['#cfc5bf', '#f47a94', '#eb1f48', '#9b1830'],   // neutral grey → UNCTAD red ramp (low tariffs recede)
        domain: [0, 5, 10, 20],
    },

};

// Tunable 2.5D view parameters (edit here, no other code changes needed)
export const VIEW3D = {
    worldScale: 100,          // Equal Earth unit -> scene units
    elevationDeg: 52,         // camera angle above the horizon (45–60 per spec)
    topViewElevationDeg: 80,  // 'Top' view keeps a slight tilt so walls stay readable
    azimuthRangeDeg: 30,      // user may rotate ±this around the vertical axis
    polarRangeDeg: [22, 62],  // allowed camera polar angle (from vertical)
    wallMaxHeight: 19,        // scene units at tariff >= cap
    wallMinHeight: 0.35,      // a 0 % tariff still shows as a low outline
    wallOpacityBottom: 0.92,
    wallOpacityTop: 0.62,
    arcMaxWidth: 7,           // px
    arcMinWidth: 1.2,
    arcLift: 0.32,            // apex height as share of chord length
    textureWidth: 4096,
    maxArcs: 40,
    topArcs: 15,              // 'Top' view: largest duty corridors into highest-need importers
    regionArcs: 14,           // 'By region' view: exporter → importing-region corridors
    hoverArcs: 8,             // supplier arcs drawn when hovering an economy
    circleMaxRadius: 9,       // scene units (world ≈ 550 wide) for the largest duty payer
    arcStepAt: 0.5,           // share of the arc where the duty is added (same place on every arc)
    arcStepExaggeration: 4,   // extra width after the step = width × rate × this (tariffs of 1–12 % are invisible at 1×)
    labelTopTariff: 6,        // number of highest walls labelled by default
    transitionMs: 650,
    defaultZoom: 1.1,
};

// Short product names for tooltips (HS 2022 descriptions are too long to scan)
export const HS_SHORT = {
    '841350': 'Reciprocating pumps', '841370': 'Centrifugal pumps', '841391': 'Pump parts',
    '841440': 'Towed air compressors', '841480': 'Air/vacuum pumps & compressors', '841490': 'Compressor & fan parts',
    '842121': 'Water filtering & purifying machinery', '842199': 'Filter & purifier parts',
    '841989': 'Thermal treatment plant', '847982': 'Mixing & stirring machines',
    '853710': 'Control panels (≤1 000 V)', '902610': 'Flow & level meters', '902620': 'Pressure gauges',
    '902730': 'Spectrometers', '902789': 'Analysis instruments n.e.c.', '902790': 'Instrument parts',
};

export const fmtUSD = (v) => {
    const a = Math.abs(v);
    const s = v < 0 ? '-' : '';
    if (a >= 1e9) return s + '$' + d3.format('.2f')(a / 1e9) + 'B';
    if (a >= 1e6) return s + '$' + d3.format('.2f')(a / 1e6) + 'M';
    if (a >= 1e3) return s + '$' + d3.format('.1f')(a / 1e3) + 'K';
    return s + '$' + d3.format(',.0f')(a);
};
export const fmtPct = (v, digits = 1) => (v == null || isNaN(v)) ? '—' : d3.format(`.${digits}f`)(v) + '%';

export const STATE = {
    year: CONFIG.defaultYear,
    product: 'all',          // 'all' | group id | HS6 code
    duty: 'MFN',             // 'MFN' | 'AHS'
    region: 'Global',
    selectedExporters: new Set(),
    selectedImporters: new Set(),
    flowFilters: new Set(['north-south', 'south-north', 'south-south', 'north-north']),
    thresholdMode: 'auto',
    importerNeed: 'all',
    flowMetric: 'duty',      // arcs: 'duty' (estimated duties paid) | 'value' (trade value)
    arcColor: 'rate',
    flowView: 'importers',   // arcs shown: 'importers' (none; importer circles) | 'top' | 'region' | 'all'        // arc colour: 'rate' (effective duty rate) | 'ns' (North/South category)
    view: '3d',              // '3d' (tariff walls) | 'biv' (bivariate need × tariff, top-down)     // 'all' | 'high' (highest-need quarter, global quartiles)
    focusedIso: null,

    // loaded data
    countries: {}, products: null, tariffs: {}, water: {}, walls: {}, flowsByYear: {},
    // derived
    tariffView: {},          // iso -> {value, year, n}
    filteredFlows: [],
    allFlows: [],
    nodeStats: {},
    effectiveThreshold: 0,
    totalScope: 0,
};
