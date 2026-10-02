// QA: timing of the pieces of App.update() and of year switching (software GL, so absolute numbers are pessimistic).
// Usage: node qa/perf.mjs [baseUrl]
import { BASE_URL, launch } from './_browser.mjs';

const BASE = process.argv[2] || BASE_URL;
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// 1. Cost of each stage of a data update
await page.goto(BASE);
await page.waitForFunction(() => window.__wwtReady === true);
await page.waitForTimeout(1500);
console.log(await page.evaluate(async () => {
    const out = {};
    const t = (k, f) => { const a = performance.now(); const r = f(); out[k] = Math.round(performance.now() - a); return r; };
    const { App, Map3D } = window;
    const D = window.__Data, S = window.__STATE;
    let a = performance.now(); await D.loadYear(2012); out.loadYear = Math.round(performance.now() - a);
    S.year = 2012;
    t('buildFlows', () => D.buildFlows());
    t('worldRate', () => Map3D.setArcMidpoint(D.worldEffectiveRate()));
    t('filterFlows', () => D.filterFlows());
    t('setFlows', () => Map3D.setFlows(S.filteredFlows, S.nodeStats, []));
    t('legend', () => App.renderLegend());
    t('kpis', () => App.renderKPIs());
    t('scatter', () => window.__Scatter.render());
    a = performance.now(); await App.update({ walls: false }); out.fullUpdate = Math.round(performance.now() - a);
    return out;
}));

// 2. Frame rate and year-switch latency on a heavy view
await page.goto(BASE + '#y=2024&p=filtration&d=AHS&r=Europe');
await page.waitForFunction(() => window.__wwtReady === true);
await page.waitForTimeout(1500);
const fps = () => page.evaluate(() => new Promise(res => { let n = 0; const t = performance.now(); const f = () => { n++; if (performance.now() - t < 1000) requestAnimationFrame(f); else res(n); }; requestAnimationFrame(f); }));
console.log('fps before', await fps());
for (const y of ['2012', '2013']) {
    const t0 = Date.now();
    await page.selectOption('#year-select', y);
    await page.waitForFunction(yr => location.hash.includes(`y=${yr}`), y, { timeout: 10000 });
    console.log(`year switch -> ${y}:`, Date.now() - t0, 'ms');
    if (y === '2012') console.log('fps after', await fps());
}
await browser.close();
