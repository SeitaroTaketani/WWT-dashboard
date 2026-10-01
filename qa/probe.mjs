import { chromium } from 'playwright';
const hash = process.argv[2];
const browser = await chromium.launch({ executablePath: 'C:/Users/seitaro.taketani/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:8080/' + hash);
await page.waitForFunction(() => window.__wwtReady === true);
await page.waitForTimeout(1200);
console.log(await page.evaluate(() => {
  const S = window.__STATE, M = window.Map3D;
  return { mid: M.arcMid.toFixed(2), domain: M.arcDomain.map(v => +v.toFixed(2)), arcView: S.arcView,
    arcs: S.filteredFlows.slice(0, 20).map(d => `${d.exporter}->${d.importer} val=${Math.round(d.value)} duty=${Math.round(d.duty)} rate=${M.arcRate(d)?.toFixed(2)} col=${M.arcColorOf(d)}`) };
}));
await browser.close();
