// PNG export of the current map view: WebGL canvas + labels + title, legend and sources.
import { CONFIG, STATE } from './config.js';
import { Data } from './data.js';
import { fmtUSD } from './config.js';
import { Map3D } from './map3d.js';

const FONT = 'Inter, "Helvetica Neue", Arial, sans-serif';

export function downloadMapPNG() {
    const gl = Map3D.renderer.domElement;
    Map3D.renderer.render(Map3D.scene, Map3D.camera);        // fresh frame in the drawing buffer
    const cw = Map3D.container.clientWidth, ch = Map3D.container.clientHeight;
    const k = gl.width / cw;                                  // device-pixel scale
    const HEAD = 84, FOOT = 74;
    const c = document.createElement('canvas');
    c.width = gl.width; c.height = gl.height + (HEAD + FOOT) * k;
    const ctx = c.getContext('2d');
    ctx.scale(k, k);

    // Background + header
    ctx.fillStyle = '#f3f8fd'; ctx.fillRect(0, 0, cw, ch + HEAD + FOOT);
    ctx.fillStyle = '#009edb'; ctx.fillRect(0, ch + HEAD + FOOT - 4, cw, 4);
    ctx.fillStyle = '#000'; ctx.font = `700 22px ${FONT}`;
    ctx.fillText('Wastewater Treatment Technology: Trade & Tariff Monitor', 20, 32);
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.font = `400 12.5px ${FONT}`;
    const q = Data.needTariffQuartiles();
    const msg = q ? ` · Median ${STATE.duty} tariff ${q.highMedian.toFixed(1)}% in the highest-need quarter vs ${q.lowMedian.toFixed(1)}% in the lowest` : '';
    ctx.fillText(`${STATE.year} · ${Data.productLabel()} · ${STATE.region === 'Global' ? 'World' : STATE.region}${msg}`, 20, 54);
    ctx.fillStyle = '#ab1d37'; ctx.font = `600 12.5px ${FONT}`;
    ctx.fillText(`Estimated import duties paid: ${fmtUSD(STATE.scopeDuty || 0)} · of which by highest-need importers: ${fmtUSD(Data.dutyHighNeed())}`, 20, 71);

    // Map
    ctx.drawImage(gl, 0, HEAD, cw, ch);

    // Labels (as currently shown on screen)
    const box = Map3D.container.getBoundingClientRect();
    for (const o of Map3D.labels) {
        const el = o.element;
        if (el.style.display === 'none' || el.style.visibility === 'hidden') continue;
        const r = el.getBoundingClientRect();
        if (r.right < box.left || r.left > box.right || r.bottom < box.top || r.top > box.bottom) continue;
        const x = r.left - box.left, y = r.top - box.top + HEAD;
        if (el.classList.contains('lbl-wall')) {
            ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.strokeStyle = 'rgba(171,29,55,0.35)';
            ctx.fillRect(x, y, r.width, r.height); ctx.strokeRect(x + 0.5, y + 0.5, r.width - 1, r.height - 1);
            const name = el.querySelector('.lw-name')?.textContent || '';
            const val = el.querySelector('b')?.textContent || '';
            ctx.font = `600 10.5px ${FONT}`; ctx.fillStyle = '#231f20';
            ctx.fillText(name, x + 5, y + r.height - 5);
            const w = ctx.measureText(name + ' ').width;
            ctx.font = `700 10.5px ${FONT}`; ctx.fillStyle = '#ab1d37';
            ctx.fillText(val, x + 5 + w, y + r.height - 5);
        } else {
            ctx.font = `600 ${el.classList.contains('lbl-guide') ? 9.5 : 11}px ${FONT}`;
            ctx.lineWidth = 3; ctx.strokeStyle = '#fff'; ctx.lineJoin = 'round';
            ctx.strokeText(el.textContent, x, y + r.height - 3);
            ctx.fillStyle = el.classList.contains('lbl-guide') ? '#004990' : '#231f20';
            ctx.fillText(el.textContent, x, y + r.height - 3);
        }
    }

    // Legend + sources
    let y = HEAD + ch + 18, x = 20;
    ctx.font = `700 9px ${FONT}`; ctx.fillStyle = '#6e6259';
    const label = (t) => { ctx.font = `700 9px ${FONT}`; ctx.fillStyle = '#6e6259'; ctx.fillText(t.toUpperCase(), x, y); x += ctx.measureText(t.toUpperCase()).width + 8; };
    const sw = (col, w = 16) => { ctx.fillStyle = col; ctx.fillRect(x, y - 8, w, 9); x += w + 1; };
    const txt = (t) => { ctx.font = `400 10px ${FONT}`; ctx.fillStyle = '#6e6259'; ctx.fillText(t, x, y); x += ctx.measureText(t).width + 6; };
    if (STATE.view === 'biv') {
        label('Need × tariff');
        txt('need ↑');
        for (let ni = 0; ni < 3; ni++) for (let ti = 0; ti < 3; ti++) {
            ctx.fillStyle = CONFIG.bivariate[ni][ti];
            ctx.fillRect(x + ti * 9, y + 2 - (ni + 1) * 9, 8, 8);
        }
        x += 30; txt('tariff →'); sw(Map3D.noDataPattern(ctx, 0.8), 12); x += 3; txt('no data'); x += 14;
    } else {
        label('No safe water'); txt('0%');
        [10, 30, 50, 70, 90].forEach(v => sw(Map3D.needColor(v))); x += 4; txt('100%'); sw(Map3D.noDataPattern(ctx, 0.8), 12); x += 3; txt('no data'); x += 14;
        label(`Tariff wall (${STATE.duty})`); txt('0%');
        const g = ctx.createLinearGradient(x, 0, x + 70, 0);
        CONFIG.tariff.colors.forEach((col, i) => g.addColorStop(CONFIG.tariff.domain[i] / CONFIG.tariff.cap, col));
        sw(g, 70); x += 4; txt(`${CONFIG.tariff.cap}%+`); x += 14;
    }
    label(STATE.flowMetric === 'duty' ? 'Arcs: width = duties paid' : 'Arcs: width = trade');
    if (STATE.arcColor === 'rate') {
        txt('colour = duty rate 0%');
        const dom = Map3D.arcDomain, max = dom[dom.length - 1];
        const ag = ctx.createLinearGradient(x, 0, x + 60, 0);
        CONFIG.arcRate.colors.forEach((col, i) => ag.addColorStop(dom[i] / max, col));
        ctx.fillStyle = ag; ctx.fillRect(x, y - 6, 60, 4); x += 64;
        txt(`${+max.toFixed(1)}%+ (grey = world avg ${Map3D.arcMid.toFixed(2)}%)`);
    } else for (const [cat, col] of Object.entries(CONFIG.flowColors)) {
        ctx.fillStyle = col; ctx.fillRect(x, y - 5, 14, 3); x += 18;
        txt({ 'north-south': 'N→S', 'south-north': 'S→N', 'south-south': 'S→S', 'north-north': 'N→N' }[cat]);
    }
    y += 20; x = 20;
    ctx.font = `400 9.5px ${FONT}`; ctx.fillStyle = '#6e6259';
    ctx.fillText('Sources: UNCTAD calculations based on UN Comtrade (importer-reported, exporter mirror fallback), WITS/TRAINS (simple-average tariffs, latest year), WHO/UNICEF JMP 2024. Duties = trade value × importer tariff per HS code (intra-EU duty-free).', x, y);
    ctx.fillText('The boundaries and names shown and the designations used on this map do not imply official endorsement or acceptance by the United Nations.', x, y + 13);

    c.toBlob((blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `wwt_map_${STATE.product}_${STATE.year}_${STATE.region}.png`.toLowerCase();
        document.body.appendChild(a); a.click();
        setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    }, 'image/png');
}
