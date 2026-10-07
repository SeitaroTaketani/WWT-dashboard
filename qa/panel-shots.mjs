// QA: screenshots of the Need vs tariff analysis panel (the scatter) in its main states, at 2x for detail.
// Usage: node qa/panel-shots.mjs [baseUrl] [only-name]   -> qa/shots/panel/*.png
import fs from 'node:fs';
import path from 'node:path';
import { BASE_URL, SHOTS_DIR, launch } from './_browser.mjs';

const BASE = process.argv[2] || BASE_URL;
const ONLY = process.argv[3];
const OUT = path.join(SHOTS_DIR, 'panel');
fs.mkdirSync(OUT, { recursive: true });

const states = [
    { name: 'p1-default', hash: '' },
    { name: 'p2-hover-ethiopia', hash: '', hoverDot: 'Ethiopia' },
    { name: 'p3-focus-kenya', hash: '#y=2024&p=all&d=MFN&r=Global&c=KEN' },
    { name: 'p4-africa-fade', hash: '#y=2024&p=all&d=MFN&r=Africa' },
    { name: 'p5-single-hs-ahs', hash: '#y=2024&p=842121&d=AHS&r=Global' },
    { name: 'p6-wide-1920', hash: '', viewport: { width: 1920, height: 1080 } },
    { name: 'p7-mobile', hash: '', viewport: { width: 390, height: 844 }, click: '#scatter-toggle' },
];

const browser = await launch();
for (const s of states) {
    if (ONLY && !s.name.includes(ONLY)) continue;
    const page = await browser.newPage({ viewport: s.viewport || { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    await page.goto(BASE + s.hash);
    await page.waitForFunction(() => window.__wwtReady === true, null, { timeout: 60000 });
    await page.waitForTimeout(2000);
    if (s.click) { await page.click(s.click); await page.waitForTimeout(800); }
    if (s.hoverDot) {
        const box = await page.locator(`.sc-hit[aria-label^="${s.hoverDot}"]`).first().boundingBox();
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(500);
    }
    const panel = await page.locator('#analysis-panel').boundingBox();
    await page.screenshot({ path: path.join(OUT, `${s.name}.png`), clip: panel });
    console.log(s.name, 'ok');
    await page.close();
}
await browser.close();
