// QA: time the parts of App.update() in the browser
import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: 'C:/Users/seitaro.taketani/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:8080/');
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
await browser.close();
