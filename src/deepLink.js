// Shareable URL state: #y=2024&p=all&d=MFN&r=Global&c=KEN
import { CONFIG, STATE } from './config.js';

export const DeepLink = {
    read() {
        const h = new URLSearchParams(location.hash.slice(1));
        return {
            year: +h.get('y') || null,
            product: h.get('p'),
            duty: h.get('d'),
            region: h.get('r'),
            focus: h.get('c'),
            need: h.get('n'),
            view: h.get('v'),
            metric: h.get('m'),
            arcColor: h.get('k'),
            flowView: h.get('f'),
        };
    },

    applyPreLoad(l) {
        if (l.year && CONFIG.years.includes(l.year)) STATE.year = l.year;
        if (l.product) STATE.product = l.product;
        if (l.duty === 'MFN' || l.duty === 'AHS') STATE.duty = l.duty;
        if (l.need === 'high') STATE.importerNeed = 'high';
        if (l.view === '2d' || l.view === 'biv') STATE.view = '2d';   // 'biv' = links from the old bivariate view
        else if (l.view === '3d') STATE.view = '3d';
        if (l.metric === 'value' || l.metric === 'duty') STATE.flowMetric = l.metric;
        if (l.arcColor === 'ns' || l.arcColor === 'rate') STATE.arcColor = l.arcColor;
        if (['importers', 'top', 'region', 'all'].includes(l.flowView)) STATE.flowView = l.flowView;
        if (['Global', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].includes(l.region)) STATE.region = l.region;
    },

    write() {
        const p = new URLSearchParams({ y: STATE.year, p: STATE.product, d: STATE.duty, r: STATE.region });
        if (STATE.focusedIso) p.set('c', STATE.focusedIso);
        if (STATE.importerNeed === 'high') p.set('n', 'high');
        if (STATE.view !== '2d') p.set('v', STATE.view);   // 2D is the default view, so only 3D is written to the link
        if (STATE.flowMetric !== 'duty') p.set('m', STATE.flowMetric);
        if (STATE.arcColor !== 'rate') p.set('k', STATE.arcColor);
        if (STATE.flowView !== 'importers') p.set('f', STATE.flowView);
        history.replaceState(null, '', `#${p.toString()}`);
    },
};
