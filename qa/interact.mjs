// QA: drive the main interactions and report console errors / failed assertions.
import fs from 'node:fs';
import path from 'node:path';
import { BASE_URL, SHOTS_DIR, launch } from './_browser.mjs';

const BASE = process.argv[2] || BASE_URL;
const OUT = SHOTS_DIR;
fs.mkdirSync(OUT, { recursive: true });
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
const problems = [];
page.on('console', m => { if (m.type() === 'error') problems.push('console: ' + m.text()); });
page.on('pageerror', e => problems.push('pageerror: ' + e.message));
const flowYears = new Set();
let trendRequests = 0;
page.on('request', r => {
    const m = r.url().match(/data\/flows\/(\d{4})\.json/);
    if (m) flowYears.add(m[1]);
    if (/data\/trend\.json/.test(r.url())) trendRequests++;
});
const ok =(cond, msg) => { if (!cond) problems.push('FAIL: ' + msg); else console.log('ok  ', msg); };

await page.goto(BASE);
await page.waitForFunction(() => window.__wwtReady === true, null, { timeout: 60000 });
const kpi = async () => page.evaluate(() => ({
    high: document.getElementById('kpi-need-high').textContent,
    low: document.getElementById('kpi-need-low').textContent,
    flows: document.getElementById('kpi-flows').textContent,
    total: document.getElementById('kpi-total').textContent,
}));
const validation = JSON.parse(fs.readFileSync(path.join(path.dirname(OUT), '..', 'scripts', 'validation.json'), 'utf8'));
const tot2024 = await page.evaluate(async () => {
    const raw = await (await fetch('data/flows/2024.json')).json();
    return raw.reduce((a, [, , v]) => a + v.reduce((x, y) => x + y, 0), 0);
});
ok(Math.abs(tot2024 - validation.world_total_by_year['2024']) / validation.world_total_by_year['2024'] < 1e-6,
    `2024 flow total matches pipeline (${tot2024} vs ${validation.world_total_by_year['2024']})`);
const fmtB = (v) => '$' + (v / 1e9).toFixed(2) + 'B';
const fmtM = (v) => '$' + (v / 1e6).toFixed(2) + 'M';
const dutyTxt = await page.textContent('#kpi-duty');
const dutyHighTxt = await page.textContent('#kpi-duty-high');
ok(dutyTxt === fmtB(validation.duty_2024_MFN.total), `JS duty total = pipeline (${dutyTxt} vs ${fmtB(validation.duty_2024_MFN.total)})`);
ok(dutyHighTxt === fmtM(validation.duty_2024_MFN.high_need_importers), `JS high-need duty = pipeline (${dutyHighTxt} vs ${fmtM(validation.duty_2024_MFN.high_need_importers)})`);
let k = await kpi();
ok(k.high === '6.4%' && k.low === '1.2%', `global MFN quartile medians 6.4 / 1.2 (got ${k.high} / ${k.low})`);
ok(+k.flows === 0, `default 'Importers' view draws no arcs (got ${k.flows})`);
const arcsIn = () => page.evaluate(() => window.__STATE.filteredFlows.length);
await page.click('#flowview-group [data-flowview="top"]'); await page.waitForTimeout(500);
ok(await arcsIn() === 15 && page.url().includes('f=top'), `Top 15 view draws 15 arcs (${await arcsIn()})`);
await page.click('#flowview-group [data-flowview="region"]'); await page.waitForTimeout(500);
const reg = await page.evaluate(() => window.__STATE.filteredFlows.every(d => d.importerRegion));
ok(reg && await arcsIn() <= 14, `Regions view draws grouped arcs (${await arcsIn()})`);
await page.click('#flowview-group [data-flowview="all"]'); await page.waitForTimeout(500);
ok(await arcsIn() === 40, `All view: auto threshold draws 40 arcs (${await arcsIn()})`);
await page.click('#flowview-group [data-flowview="importers"]'); await page.waitForTimeout(500);
{
    const box0 = await page.locator('#map-container').boundingBox();
    const sp0 = await page.evaluate(() => window.Map3D.screenOf('IND'));
    await page.mouse.move(box0.x + sp0.x, box0.y + sp0.y + 3);
    await page.waitForTimeout(700);
    const n = await page.evaluate(() => window.Map3D.hoverArcObjects?.length || 0);
    ok(n > 0, `hovering India previews supplier arcs (${n})`);
    await page.mouse.move(5, 5);
}

await page.click('#duty-group [data-duty="AHS"]');
await page.waitForTimeout(500);
ok(await page.textContent('#kpi-duty') === fmtB(validation.duty_2024_AHS.total), `AHS duty total = pipeline (${await page.textContent('#kpi-duty')})`);
k = await kpi();
ok(k.high !== '6.4%', `AHS changes KPI (got ${k.high} / ${k.low})`);
ok(page.url().includes('d=AHS'), 'deep link records duty');

await page.selectOption('#product-select', 'filtration');
await page.waitForTimeout(500);
ok(page.url().includes('p=filtration'), 'deep link records product');

await page.click('#region-group [data-region="Europe"]');
await page.waitForTimeout(1500);
ok(await page.textContent('#kpi-scope') === 'Europe', 'region filter updates scope KPI');
const wallLbls = await page.$$eval('.lbl-wall .lw-name', els => els.map(e => e.textContent));
ok(!wallLbls.some(n => /Algeria|Ethiopia|Brazil|Iran/.test(n)), `wall labels follow region (${wallLbls.join(', ')})`);

await page.selectOption('#year-select', '2012');
const t0y = Date.now();
await page.waitForFunction(() => location.hash.includes('y=2012'), null, { timeout: 8000 }).catch(() => {});
console.log('     year switch took', Date.now() - t0y, 'ms');
ok(page.url().includes('y=2012'), 'year select: ' + page.url().split('#')[1]);

await page.click('#need-group [data-need="high"]');
await page.waitForTimeout(600);
ok(page.url().includes('n=high') && /high-need/.test(await page.textContent('#kpi-scope')), 'high-need importer switch');
await page.click('#need-group [data-need="all"]');

// Picker: choose Kenya as importer
await page.click('#region-group [data-region="Global"]');
await page.click('#imp-btn');
await page.fill('#imp-search', 'Kenya');
await page.locator('#imp-list .country-option:visible').first().click();
await page.waitForTimeout(800);
const lbl = await page.textContent('#imp-label');
ok(/Kenya/.test(lbl), `importer picker selects Kenya (label: ${lbl})`);
const arcs = await page.evaluate(() => window.App && document.getElementById('kpi-flows').textContent);
ok(+arcs > 0, `arcs to Kenya drawn (${arcs})`);
await page.click('#imp-clear-all');
await page.waitForTimeout(500);
ok(/All Importers/.test(await page.textContent('#imp-label')), 'importer Clear resets selection');
await page.click('body', { position: { x: 5, y: 5 } });

// Country panel via deep link-free click path: use App.focusCountry
await page.evaluate(() => window.App.focusCountry('ETH'));
await page.waitForTimeout(1500);
ok(await page.textContent('#panel-country-name') === 'Ethiopia', 'panel opens for Ethiopia');
const panelTxt = await page.textContent('#panel-body');
ok(/11\.5%/.test(panelTxt) || /Filtration/.test(panelTxt), 'panel shows tariff content');
await page.screenshot({ path: path.join(OUT, 'i1-ethiopia.png') });
await page.waitForSelector('#panel-body svg[aria-label="Imports and exports trend"]', { timeout: 10000 });
ok(trendRequests === 1, `panel trend loads trend.json once (${trendRequests} request)`);
ok(flowYears.size < 15, `opening a country panel does not load every year (${flowYears.size} of 15 flows files so far)`);

// CSV downloads
const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#panel-export-btn')]);
const f = path.join(OUT, await dl.suggestedFilename());
await dl.saveAs(f);
const csv = fs.readFileSync(f, 'utf8');
ok(csv.split('\n').length > 50, `country CSV has rows (${csv.split('\n').length})`);
ok(/^2010,/m.test(csv) && /^2024,/m.test(csv), 'country CSV covers all years (years are fetched on demand for the export)');

// The precomputed trend must equal the sums of the per-year flow files (all goods and a single HS code)
const trendDiffs = await page.evaluate(async () => {
    const D = window.__Data, S = window.__STATE;
    await D.loadTrend();
    const all = D.productIndices('all'), one = D.productIndices('842121');
    const diffs = [];
    for (const [yi, y] of S.products.years.entries()) {
        const raw = await D.loadYear(y);
        for (const iso of ['ETH', 'CAN', 'USA', 'CHN', 'DEU']) {
            const sum = { all: { imp: 0, exp: 0 }, one: { imp: 0, exp: 0 } };
            for (const [e, i, vals] of raw) {
                const v = vals.reduce((a, b) => a + b, 0);
                if (i === iso) { sum.all.imp += v; sum.one.imp += vals[one[0]]; }
                if (e === iso) { sum.all.exp += v; sum.one.exp += vals[one[0]]; }
            }
            const a = D.trendOf(iso, all)[yi], b = D.trendOf(iso, one)[yi];
            if (a.imp !== sum.all.imp || a.exp !== sum.all.exp || b.imp !== sum.one.imp || b.exp !== sum.one.exp) diffs.push(`${iso} ${y}`);
        }
    }
    return diffs;
});
ok(trendDiffs.length === 0, `trend.json equals the flows sums for ETH CAN USA CHN DEU x 15 years${trendDiffs.length ? ': ' + trendDiffs.join(', ') : ''}`);
await page.click('#panel-close-btn');
await page.click('#export-btn');
const [dl2] = await Promise.all([page.waitForEvent('download'), page.click('#export-menu [data-export="countries"]')]);
await dl2.saveAs(path.join(OUT, await dl2.suggestedFilename()));
ok(true, 'countries CSV downloaded: ' + (await dl2.suggestedFilename()));

// Bivariate view toggle + arc metric toggle
await page.click('#view-group [data-view="biv"]');
await page.waitForTimeout(1200);
ok(page.url().includes('v=biv') && await page.isVisible('.legend-biv'), 'bivariate view shows 3x3 key');
await page.click('#metric-group [data-metric="value"]');
await page.waitForTimeout(500);
ok(page.url().includes('m=value') && /size = trade/.test(await page.textContent('#legend-content')), 'size metric switches to trade value');
await page.click('#metric-group [data-metric="duty"]');
await page.click('#arccolor-group [data-arccolor="ns"]');
await page.waitForTimeout(400);
ok(page.url().includes('k=ns') && await page.isVisible('.legend-flows'), 'arc colour switches to N/S');
await page.click('#arccolor-group [data-arccolor="rate"]');
await page.waitForTimeout(400);
ok(await page.isVisible('.lg-arcrate'), 'arc colour = duty rate legend');
await page.click('#view-group [data-view="3d"]');
await page.waitForTimeout(1000);

// PNG map export
await page.click('#export-btn');
const [dl3] = await Promise.all([page.waitForEvent('download'), page.click('#export-menu [data-export="png"]')]);
const pngPath = path.join(OUT, 'export-' + await dl3.suggestedFilename());
await dl3.saveAs(pngPath);
ok(fs.statSync(pngPath).size > 100000, `PNG export written (${Math.round(fs.statSync(pngPath).size / 1024)} KB)`);

// Animation
await page.click('#anim-btn');
await page.waitForTimeout(4500);
const y = await page.inputValue('#year-select');
ok(+y >= 2010 && +y <= 2024, `animation advancing (year ${y})`);
await page.click('#anim-btn');

// Hover picking
await page.click('#view-reset');
await page.waitForTimeout(1500);
const box = await page.locator('#map-container').boundingBox();
const sp = await page.evaluate(() => window.Map3D.screenOf('TCD'));
await page.mouse.move(box.x + sp.x, box.y + sp.y + 4);
await page.waitForTimeout(700);
const tipVisible = await page.evaluate(() => getComputedStyle(document.getElementById('tooltip')).display !== 'none');
ok(tipVisible, 'tooltip on hover');
const tt = await page.textContent('#tooltip'); ok(/Chad/.test(tt), 'hover picks the right country (Chad): ' + tt.slice(0, 60)); await page.screenshot({ path: path.join(OUT, 'i2-hover.png') });

// Analysis panel: open by default at 1440px, list rows focus the map
ok(await page.isVisible('#analysis-panel'), 'analysis panel docked by default');
const firstRow = page.locator('#hh-list .hh-row').first();
const rowIso = await firstRow.getAttribute('data-iso');
await firstRow.click();
await page.waitForTimeout(1200);
ok(page.url().includes('c=' + rowIso), `high-need list row focuses ${rowIso}`);
await page.click('#panel-close-btn');

// Corridor product mix (Canada → Ethiopia 2024, all goods, MFN: HS 842121 at 30 % dominates)
// Pasting a link into the same tab changes only the hash; the app must reload and apply it
await Promise.all([page.waitForEvent('load'), page.evaluate(() => { location.hash = 'y=2024&p=all&d=MFN&r=Global'; })]);
await page.waitForFunction(() => window.__wwtReady === true, null, { timeout: 60000 });
await page.waitForTimeout(800);
{
    const mix = await page.evaluate(() => {
        const d = window.__STATE.allFlows.find(f => f.exporter === 'CAN' && f.importer === 'ETH');
        return d ? { top: window.__Data.corridorMix(d).top[0], rate: d.duty / d.value * 100 } : null;
    });
    ok(mix && mix.top.hs === '842121' && mix.top.rate === 30 && mix.top.share > 85 && Math.abs(mix.rate - 29.1) < 0.1,
        `CAN→ETH mix: ${mix?.top.hs} ${mix?.top.share.toFixed(0)}% at ${mix?.top.rate}%, effective ${mix?.rate.toFixed(1)}%`);
}

// Methodology modal
await page.click('#methodology-btn');
ok(await page.isVisible('#methodology-modal .method-section'), 'methodology modal opens');
await page.keyboard.press('Escape');

await browser.close();
console.log(problems.length ? '\nPROBLEMS:\n' + problems.join('\n') : '\nAll interaction checks passed, no console errors.');
process.exitCode = problems.length ? 1 : 0;   // so `npm test` and CI fail on any problem
