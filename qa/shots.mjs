// QA: screenshots of key states + console error capture.
// Usage: node qa/shots.mjs [baseUrl] [only-name]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.argv[2] || 'http://localhost:8080/';
const ONLY = process.argv[3];
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'shots');
fs.mkdirSync(OUT, { recursive: true });

const states = [
    { name: '01-default', hash: '' },
    { name: '02-africa', hash: '#y=2024&p=all&d=MFN&r=Africa' },
    { name: '03-kenya-panel', hash: '#y=2024&p=all&d=MFN&r=Global&c=KEN' },
    { name: '04-filtration-ahs', hash: '#y=2024&p=filtration&d=AHS&r=Global' },
    { name: '05-hs842121', hash: '#y=2015&p=842121&d=MFN&r=Asia' },
    { name: '06-flat', hash: '', flat: true },
    { name: '07-hover', hash: '', hover: [0.52, 0.62] },
    { name: '08-mobile', hash: '', viewport: { width: 390, height: 844 } },
    { name: '09-panel-hover', hash: '', hoverIso: 'NGA' },
    { name: '11-mobile-panel', hash: '#y=2024&p=all&d=MFN&r=Global&c=ETH', viewport: { width: 390, height: 844 } },
    { name: '12-mobile-filters', hash: '', viewport: { width: 390, height: 844 }, click: '#mobile-filter-btn' },
    { name: '13-americas', hash: '#y=2024&p=all&d=MFN&r=Americas' },
    { name: '14-europe', hash: '#y=2024&p=all&d=MFN&r=Europe' },
    { name: '15-oceania', hash: '#y=2024&p=all&d=MFN&r=Oceania' },
    { name: '16-mobile-legend', hash: '', viewport: { width: 390, height: 844 }, click: '#mobile-legend-btn' },
    { name: '17-high-need', hash: '#y=2024&p=all&d=MFN&r=Global&n=high' },
    { name: '18-bivariate', hash: '#y=2024&p=all&d=MFN&r=Global&v=biv' },
    { name: '19-biv-africa-panel', hash: '#y=2024&p=all&d=MFN&r=Africa&v=biv&c=NGA' },
    { name: '20-trade-value', hash: '#y=2024&p=all&d=MFN&r=Global&m=value' },
    { name: '21-mobile-analysis', hash: '', viewport: { width: 390, height: 844 }, click: '#scatter-toggle' },
    { name: '22-top15', hash: '#y=2024&p=all&d=MFN&r=Global&f=top' },
    { name: '23-region', hash: '#y=2024&p=all&d=MFN&r=Global&f=region' },
    { name: '24-hover-arcs', hash: '', hoverIso: 'IND' },
    { name: '10-wide', hash: '', viewport: { width: 1920, height: 1080 } },
];

const exe = process.env.PW_CHROME || 'C:/Users/seitaro.taketani/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe';
const browser = await chromium.launch({ executablePath: fs.existsSync(exe) ? exe : undefined, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const errors = [];
for (const s of states) {
    if (ONLY && !s.name.includes(ONLY)) continue;
    const page = await browser.newPage({ viewport: s.viewport || { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${s.name}] ${m.type()}: ${m.text()}`); });
    page.on('pageerror', e => errors.push(`[${s.name}] pageerror: ${e.message}`));
    const t0 = Date.now();
    await page.goto(BASE + s.hash, { waitUntil: 'load' });
    await page.waitForFunction(() => window.__wwtReady === true, null, { timeout: 60000 }).catch(() => errors.push(`[${s.name}] not ready after 60s`));
    const loadMs = Date.now() - t0;
    await page.waitForTimeout(2200);
    if (s.click) { await page.click(s.click); await page.waitForTimeout(600); }
    if (s.flat) { await page.click('#view-flat'); await page.waitForTimeout(1400); }
    if (s.hoverIso) {
        const box = await page.locator('#map-container').boundingBox();
        const sp = await page.evaluate((iso) => window.Map3D.screenOf(iso), s.hoverIso);
        await page.mouse.move(box.x + sp.x, box.y + sp.y + 3);
        await page.waitForTimeout(600);
    }
    if (s.hover) {
        const box = await page.locator('#map-container').boundingBox();
        await page.mouse.move(box.x + box.width * s.hover[0], box.y + box.height * s.hover[1]);
        await page.waitForTimeout(600);
    }
    const fps = await page.evaluate(() => new Promise(res => {
        let n = 0; const t = performance.now();
        const f = () => { n++; if (performance.now() - t < 1000) requestAnimationFrame(f); else res(n); };
        requestAnimationFrame(f);
    }));
    await page.screenshot({ path: path.join(OUT, `${s.name}.png`) });
    console.log(`${s.name}: load ${loadMs} ms, ~${fps} fps (swiftshader)`);
    await page.close();
}
await browser.close();
console.log(errors.length ? `\nCONSOLE ISSUES (${errors.length}):\n` + [...new Set(errors)].join('\n') : '\nNo console errors.');
