// QA: hover a specific corridor and screenshot its tooltip. Usage: node qa/arc-tip.mjs EXP IMP [hash]
import fs from 'node:fs';
import path from 'node:path';
import { BASE_URL, SHOTS_DIR, launch } from './_browser.mjs';
const [exp, imp, hash = ''] = process.argv.slice(2);
const OUT = SHOTS_DIR;
fs.mkdirSync(OUT, { recursive: true });
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE_URL}${hash || `#y=2024&p=all&d=MFN&r=Global&c=${imp}`}`);
await page.waitForFunction(() => window.__wwtReady === true);
await page.waitForTimeout(2500);
const pt = await page.evaluate(([e, i]) => {
    const M = window.Map3D;
    const a = M.arcObjects.find(o => o.flow.exporter === e && o.flow.importer === i);
    if (!a) return null;
    const v = a.curve.getPoint(0.78).project(M.camera);
    const r = M.container.getBoundingClientRect();
    return { x: r.left + (v.x + 1) / 2 * r.width, y: r.top + (1 - v.y) / 2 * r.height };
}, [exp, imp]);
if (!pt) { console.log('arc not drawn'); process.exit(1); }
await page.mouse.move(pt.x, pt.y);
await page.waitForTimeout(800);
console.log(await page.evaluate(() => document.getElementById('tooltip').innerText));
await page.screenshot({ path: path.join(OUT, `tip-${exp}-${imp}.png`) });
await browser.close();
