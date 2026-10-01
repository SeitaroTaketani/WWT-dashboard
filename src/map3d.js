// map3d.js — 2.5D "map table": Equal Earth ground texture (need choropleth),
// per-country tariff border walls, 3D trade arcs, nodes and labels.
//
// Coordinate system: d3.geoEqualEarth with scale 1 / translate 0 gives "unit"
// coordinates (x east, y south — d3 screen convention). Scene: X = x·S, Z = y·S,
// Y = up. scripts/process_wwt.py emits walls.json in the same unit coordinates.
import * as THREE from 'three';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { CONFIG, STATE, VIEW3D, fmtPct, fmtUSD } from './config.js';
import { prefersReducedMotion } from './motion.js';

const S = VIEW3D.worldScale;
// unitProj takes REAL lon/lat; map geometry (TopoJSON, walls.json) is already in the
// UN map frame and is projected without rotation (see CONFIG.geoLonOffset).
const unitProj = d3.geoEqualEarth().scale(1).translate([0, 0]).rotate([-CONFIG.geoLonOffset, 0]);
// Extent of the Equal Earth sphere in unit coordinates (+2 % margin)
const UX = 2.7064 * 1.02, UY = 1.3174 * 1.02;
const deg = Math.PI / 180;

const hex = (c) => new THREE.Color(c);
const WHITE = new THREE.Color(0xffffff);

function rampGLSL() {
    return `
    uniform vec3 uC0, uC1, uC2, uC3;
    uniform float uD0, uD1, uD2, uD3;
    vec3 ramp(float v) {
        if (v <= uD1) return mix(uC0, uC1, clamp((v - uD0) / (uD1 - uD0), 0.0, 1.0));
        if (v <= uD2) return mix(uC1, uC2, (v - uD1) / (uD2 - uD1));
        return mix(uC2, uC3, clamp((v - uD2) / (uD3 - uD2), 0.0, 1.0));
    }`;
}

const WALL_VERT = `
    attribute float aTop;
    attribute float aShade;
    attribute float aCountry;
    uniform sampler2D uVals;
    uniform float uN, uT, uCap, uHmax, uHmin;
    varying float vTop, vShade, vV, vPresent, vState;
    void main() {
        vec4 d = texture2D(uVals, vec2((aCountry + 0.5) / uN, 0.5));
        float pr = d.r >= 0.0 ? 1.0 : 0.0;
        float pg = d.g >= 0.0 ? 1.0 : 0.0;
        float present = mix(pr, pg, uT);
        float v = mix(max(d.r, 0.0), max(d.g, 0.0), uT);
        float h = (uHmin + min(v, uCap) / uCap * (uHmax - uHmin)) * present;
        vec3 p = position;
        p.y = aTop * h;
        vTop = aTop; vShade = aShade; vV = v; vPresent = present; vState = d.b;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }`;

const WALL_FRAG = `
    ${rampGLSL()}
    uniform float uOpBottom, uOpTop, uEdge;
    varying float vTop, vShade, vV, vPresent, vState;
    void main() {
        vec3 col = ramp(vV) * vShade;
        float strength = 0.45 + 0.55 * clamp(vV / 8.0, 0.0, 1.0);
        float a = mix(uOpBottom, uOpTop, vTop) * vPresent * strength;
        if (uEdge > 0.5) { col = ramp(vV) * 0.72; a = vPresent * (0.55 + 0.45 * strength); }
        // state: 0 normal · 1 hover · 2 focus · 3 dimmed
        if (vState > 2.5) a *= 0.22;
        else if (vState > 0.5) {
            // hover / focus: solid, slightly darker face and a near-black ridge
            a = uEdge > 0.5 ? 1.0 : max(a, 0.9);
            col = uEdge > 0.5 ? vec3(0.14, 0.12, 0.13) : ramp(max(vV, 2.0)) * vShade * 0.88;
        }
        if (a < 0.01) discard;
        gl_FragColor = vec4(col, a);
    }`;

// The TopoJSON was built for planar rendering; d3-geo is spherical and treats a
// ring with the "wrong" winding as the whole globe minus the polygon. Reverse
// any polygon whose spherical area exceeds a hemisphere.
function rewind(f) {
    const g = f.geometry;
    if (!g) return f;
    const fix = (poly) => d3.geoArea({ type: 'Polygon', coordinates: poly }) > 2 * Math.PI
        ? poly.map(r => r.slice().reverse()) : poly;
    if (g.type === 'Polygon') g.coordinates = fix(g.coordinates);
    else if (g.type === 'MultiPolygon') g.coordinates = g.coordinates.map(fix);
    return f;
}

export const Map3D = {
    handlers: {},
    isoIndex: {},      // iso -> index in value texture
    isoList: [],
    labels: [],
    arcObjects: [],
    hoverIso: null,
    focusIso: null,

    init(container, handlers = {}) {
        this.container = container;
        this.handlers = handlers;
        const { width, height } = container.getBoundingClientRect();

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000, 0);
        container.appendChild(this.renderer.domElement);
        this.renderer.domElement.classList.add('map3d-canvas');

        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize(width, height);
        this.labelRenderer.domElement.className = 'map3d-labels';
        container.appendChild(this.labelRenderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -5000, 5000);
        this._setupControls();
        this._fitFrustum(width, height);
        this.resetView(false);

        this.raycaster = new THREE.Raycaster();
        this.raycaster.params.Line2 = { threshold: 6 };
        this.pointer = new THREE.Vector2();

        this.groundGroup = new THREE.Group();
        this.wallGroup = new THREE.Group();
        this.arcGroup = new THREE.Group();
        this.nodeGroup = new THREE.Group();
        this.guideGroup = new THREE.Group();
        this.scene.add(this.groundGroup, this.wallGroup, this.guideGroup, this.nodeGroup, this.arcGroup);

        this._buildGround();
        this._buildWalls();
        this._buildRuler();
        this._bindPointer();

        new ResizeObserver(() => this.resize()).observe(container);
        // On-demand rendering: the scene is static, so redraw only when something changes
        // (keeps software-GL machines responsive and saves battery elsewhere).
        this._dirty = true;
        this.renderer.setAnimationLoop(() => this._tick());
    },

    // ── Camera & controls ─────────────────────────────────────────────
    _setupControls() {
        const c = new OrbitControls(this.camera, this.labelRenderer.domElement);
        c.enableDamping = true;
        c.dampingFactor = 0.12;
        c.screenSpacePanning = false;
        c.zoomToCursor = true;
        c.minZoom = 0.8;
        c.maxZoom = 14;
        c.minPolarAngle = VIEW3D.polarRangeDeg[0] * deg;
        c.maxPolarAngle = VIEW3D.polarRangeDeg[1] * deg;
        c.minAzimuthAngle = -VIEW3D.azimuthRangeDeg * deg;
        c.maxAzimuthAngle = VIEW3D.azimuthRangeDeg * deg;
        c.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE };
        c.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_ROTATE };
        c.addEventListener('change', () => this._clampTarget());
        this.controls = c;
    },

    _clampTarget() {
        const t = this.controls.target;
        const mx = UX * S, mz = UY * S;
        const cx = THREE.MathUtils.clamp(t.x, -mx, mx), cz = THREE.MathUtils.clamp(t.z, -mz, mz);
        if (cx !== t.x || cz !== t.z || t.y !== 0) {
            const dx = cx - t.x, dz = cz - t.z;
            t.set(cx, 0, cz);
            this.camera.position.x += dx;
            this.camera.position.z += dz;
        }
    },

    _fitFrustum(w, h) {
        const aspect = w / Math.max(h, 1);
        const elev = VIEW3D.elevationDeg * deg;
        const needW = UX * S;                                            // half width
        const needH = (UY * S * Math.sin(elev) + VIEW3D.wallMaxHeight * Math.cos(elev)) * 1.04;
        let halfW = needW, halfH = needW / aspect;
        if (halfH < needH) { halfH = needH; halfW = halfH * aspect; }
        Object.assign(this.camera, { left: -halfW, right: halfW, top: halfH, bottom: -halfH });
        this.camera.updateProjectionMatrix();
    },

    // Narrow / portrait screens: the frustum is width-limited, so zoom in to use the height.
    mobileZoomFactor() {
        const { width, height } = this.container.getBoundingClientRect();
        return width / Math.max(height, 1) < 1 ? 1.5 : 1;   // region zoom multiplier
    },

    resetView(animate = true, elevationDeg = this.viewElev()) {
        const polar = (90 - elevationDeg) * deg;
        const r = 1500;
        const narrow = this.mobileZoomFactor() > 1;
        const [x, y] = narrow ? unitProj([18, 8]) : [0, 0];
        const target = new THREE.Vector3(x * S, 0, y * S);
        const pos = target.clone().add(new THREE.Vector3(0, r * Math.cos(polar), r * Math.sin(polar)));
        this._flyTo(target, pos, VIEW3D.defaultZoom * (narrow ? 3.2 : 1), animate);
    },

    // Current camera elevation: bivariate view is top-down, 'Top' is 80°, default 3D is 52°
    viewElev() {
        if (this.mode === 'biv') return 89.9;
        return this.flat ? VIEW3D.topViewElevationDeg : VIEW3D.elevationDeg;
    },

    _applyElevation(animate = true) {
        const e = this.viewElev();
        const locked = this.mode === 'biv' || this.flat;
        const polar = (90 - e) * deg;
        this.controls.minPolarAngle = locked ? polar : VIEW3D.polarRangeDeg[0] * deg;
        this.controls.maxPolarAngle = locked ? polar : VIEW3D.polarRangeDeg[1] * deg;
        // Top-down views keep north up (no azimuth rotation)
        this.controls.minAzimuthAngle = this.mode === 'biv' ? 0 : -VIEW3D.azimuthRangeDeg * deg;
        this.controls.maxAzimuthAngle = this.mode === 'biv' ? 0 : VIEW3D.azimuthRangeDeg * deg;
        const t = this.controls.target.clone();
        const pos = t.clone().add(new THREE.Vector3(0, 1500 * Math.cos(polar), 1500 * Math.sin(polar)));
        this._flyTo(t, pos, this.camera.zoom, animate);
    },

    setFlat(flat) {
        this.flat = flat;
        this._applyElevation();
    },

    // 'biv': bivariate need × tariff ground, walls hidden, top-down · '3d': tariff walls
    setMode(mode, animate = true) {
        this.invalidate();
        this.mode = mode;
        this.wallGroup.visible = mode !== 'biv';
        this.guideGroup.visible = mode !== 'biv';
        this._applyElevation(animate);
        this.setWallLabels(this._wallLabelIsos || []);
        this._buildFocusGuides();
    },

    focusLonLat(lon, lat, zoom, animate = true) {
        const [x, y] = unitProj([lon, lat]);
        const target = new THREE.Vector3(x * S, 0, y * S);
        const off = this.camera.position.clone().sub(this.controls.target);
        this._flyTo(target, target.clone().add(off), zoom, animate);
    },

    // Centre an economy in the part of the map not covered by the side panel.
    focusIsoView(iso, rightPadPx = 0, minZoom = 1.6, bottomPadPx = 0) {
        const p = this.scenePos(iso);
        if (!p) return;
        const { width } = this.container.getBoundingClientRect();
        const zoom = Math.max(this.camera.zoom, minZoom * this.mobileZoomFactor());
        const unitsPerPx = (this.camera.right - this.camera.left) / zoom / width;
        const right = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0).setY(0).normalize();
        const off = this.camera.position.clone().sub(this.controls.target);
        // Ground displacement toward the camera moves the economy up the screen (bottom sheet on mobile)
        const toward = off.clone().setY(0).normalize();
        const sinElev = Math.max(0.2, off.clone().normalize().y);
        const target = p.clone()
            .add(right.multiplyScalar(rightPadPx / 2 * unitsPerPx))
            .add(toward.multiplyScalar(bottomPadPx / 2 * unitsPerPx / sinElev));
        this._flyTo(target, target.clone().add(off), zoom, true);
    },

    _flyTo(target, pos, zoom, animate) {
        const c = this.controls, cam = this.camera;
        if (!animate || prefersReducedMotion()) {
            c.target.copy(target); cam.position.copy(pos); cam.zoom = zoom;
            cam.updateProjectionMatrix(); c.update();
            this.invalidate();
            return;
        }
        const t0 = c.target.clone(), p0 = cam.position.clone(), z0 = cam.zoom;
        if (this._fly) this._fly.stop();
        this._fly = d3.timer((el) => {
            const k = d3.easeCubicInOut(Math.min(1, el / 900));
            c.target.lerpVectors(t0, target, k);
            cam.position.lerpVectors(p0, pos, k);
            cam.zoom = z0 + (zoom - z0) * k;
            cam.updateProjectionMatrix();
            this.invalidate();
            if (k >= 1) this._fly.stop();
        });
    },

    resize() {
        this.invalidate();
        const { width, height } = this.container.getBoundingClientRect();
        if (!width || !height) return;
        this.renderer.setSize(width, height);
        this.labelRenderer.setSize(width, height);
        this._fitFrustum(width, height);
        for (const a of [...this.arcObjects, ...(this.hoverArcObjects || [])]) for (const l of [...a.lines, ...a.casings]) l.material.resolution.set(width, height);
        for (const ls of Object.values(this._outlines || {})) (ls || []).forEach(l => l.material.resolution.set(width, height));
    },

    // ── Ground: need choropleth drawn once to a canvas texture ────────
    _buildGround() {
        const W = VIEW3D.textureWidth;
        const k = W / (2 * UX);
        const H = Math.round(2 * UY * k);
        this.tex = { W, H, k };
        this.texProj = d3.geoEqualEarth().scale(k).translate([W / 2, H / 2]);
        this.texProjReal = d3.geoEqualEarth().scale(k).translate([W / 2, H / 2]).rotate([-CONFIG.geoLonOffset, 0]);

        const canvas = document.createElement('canvas');
        canvas.width = W; canvas.height = H;
        this.groundCanvas = canvas;
        this.groundTexture = new THREE.CanvasTexture(canvas);
        this.groundTexture.colorSpace = THREE.SRGBColorSpace;
        this.groundTexture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

        const geo = new THREE.PlaneGeometry(2 * UX * S, 2 * UY * S);
        geo.rotateX(-Math.PI / 2);
        const mat = new THREE.MeshBasicMaterial({ map: this.groundTexture, transparent: true, depthWrite: false });
        this.ground = new THREE.Mesh(geo, mat);
        this.ground.renderOrder = -1;
        this.groundGroup.add(this.ground);

        // Picking canvas: one flat colour per country (index + 1)
        const pc = document.createElement('canvas');
        const PW = 2048, PH = Math.round(PW * H / W);
        pc.width = PW; pc.height = PH;
        this.pick = { canvas: pc, ctx: pc.getContext('2d', { willReadFrequently: true }), W: PW, H: PH,
            proj: d3.geoEqualEarth().scale(PW / (2 * UX)).translate([PW / 2, PH / 2]),
            projReal: d3.geoEqualEarth().scale(PW / (2 * UX)).translate([PW / 2, PH / 2]).rotate([-CONFIG.geoLonOffset, 0]) };

        this.features = topojson.feature(STATE.topo, STATE.topo.objects.economies).features.map(rewind);
        this.borders = {
            plain: topojson.feature(STATE.topo, STATE.topo.objects['plain-borders']),
            dashed: topojson.feature(STATE.topo, STATE.topo.objects['dashed-borders']),
            dotted: topojson.feature(STATE.topo, STATE.topo.objects['dotted-borders']),
            dashDotted: topojson.feature(STATE.topo, STATE.topo.objects['dash-dotted-borders']),
        };
        this.drawGround();
        this._drawPick();
    },

    isoOfFeature(f) {
        const code = String(f.properties.code);
        return /^\d+$/.test(code) ? STATE.m49ToIso[String(+code)] : null;
    },

    needColor: d3.scaleLinear().domain(CONFIG.need.domain).range(CONFIG.need.colors).clamp(true),

    // Ground fill; main.js swaps this for the bivariate palette in 'biv' mode. null = no data (hatched).
    groundColor(iso) {
        const need = iso ? STATE.water[iso]?.without : null;
        return need != null ? this.needColor(need) : null;
    },

    // 'No data' = light base with grey diagonal hatching, so it can never be read as a low value
    noDataPattern(ctx, scale = 1) {
        const c = document.createElement('canvas');
        const n = Math.round(10 * scale);
        c.width = c.height = n;
        const g = c.getContext('2d');
        g.fillStyle = CONFIG.need.noData; g.fillRect(0, 0, n, n);
        g.strokeStyle = CONFIG.need.noDataLine; g.lineWidth = 1.6 * scale;
        g.beginPath();
        g.moveTo(0, n); g.lineTo(n, 0);
        g.moveTo(-n / 2, n / 2); g.lineTo(n / 2, -n / 2);
        g.moveTo(n / 2, n * 1.5); g.lineTo(n * 1.5, n / 2);
        g.stroke();
        return ctx.createPattern(c, 'repeat');
    },

    drawGround() {
        const { W, H } = this.tex;
        const ctx = this.groundCanvas.getContext('2d');
        const path = d3.geoPath(this.texProj, ctx);
        ctx.clearRect(0, 0, W, H);

        // Ocean inside the Equal Earth outline + graticule
        ctx.beginPath(); path({ type: 'Sphere' });
        ctx.fillStyle = '#ffffff'; ctx.fill();
        ctx.beginPath(); d3.geoPath(this.texProjReal, ctx)(d3.geoGraticule10());
        ctx.strokeStyle = 'rgba(0,73,144,0.07)'; ctx.lineWidth = 2; ctx.stroke();

        const focusRegion = STATE.region !== 'Global' ? STATE.region : null;
        const hatch = this.noDataPattern(ctx, 1.6);
        for (const f of this.features) {
            const iso = this.isoOfFeature(f);
            ctx.beginPath(); path(f);
            ctx.fillStyle = this.groundColor(iso) ?? hatch;
            ctx.globalAlpha = (focusRegion && STATE.countries[iso]?.region !== focusRegion) ? 0.35 : 1;
            ctx.fill();
            if (f.properties.code === 'C00002') {            // Aksai Chin hatch (UN standard)
                ctx.save(); ctx.clip();
                ctx.strokeStyle = 'rgba(110,98,89,0.45)'; ctx.lineWidth = 2;
                const b = path.bounds(f);
                for (let x = b[0][0] - 60; x < b[1][0] + 60; x += 7) {
                    ctx.beginPath(); ctx.moveTo(x, b[0][1]); ctx.lineTo(x + 60, b[1][1]); ctx.stroke();
                }
                ctx.restore();
            }
        }
        ctx.globalAlpha = 1;

        // UN-standard borders: white, disputed lines dashed/dotted
        const strokeLayer = (fc, dash) => {
            ctx.beginPath(); path(fc);
            ctx.setLineDash(dash); ctx.strokeStyle = CONFIG.need.border; ctx.lineWidth = 2.2; ctx.stroke();
        };
        strokeLayer(this.borders.plain, []);
        strokeLayer(this.borders.dashed, [9, 6]);
        strokeLayer(this.borders.dotted, [2, 5]);
        strokeLayer(this.borders.dashDotted, [9, 5, 2, 5]);
        ctx.setLineDash([]);

        ctx.beginPath(); path({ type: 'Sphere' });
        ctx.strokeStyle = 'rgba(0,73,144,0.18)'; ctx.lineWidth = 2.5; ctx.stroke();
        this.groundTexture.needsUpdate = true;
        this.invalidate();
    },

    _drawPick() {
        const { ctx, W, H, proj, projReal } = this.pick;
        const path = d3.geoPath(proj, ctx);
        ctx.clearRect(0, 0, W, H);
        this.pickColors = {};
        let i = 1;
        const put = (iso) => {
            if (!this.pickColors[iso]) this.pickColors[iso] = i++;
            const n = this.pickColors[iso];
            return `rgb(${n & 255},${(n >> 8) & 255},${(n >> 16) & 255})`;
        };
        for (const f of this.features) {
            const iso = this.isoOfFeature(f);
            if (!iso) continue;
            ctx.beginPath(); path(f);
            ctx.fillStyle = put(iso); ctx.fill();
        }
        // Small states get a hoverable disc so SIDS remain reachable
        for (const [iso, c] of Object.entries(STATE.countries)) {
            if (!c.coords || !(c.sids || this._isCage(iso))) continue;
            const p = projReal(c.coords);
            if (!p) continue;
            ctx.beginPath(); ctx.arc(p[0], p[1], 5, 0, 2 * Math.PI);
            ctx.fillStyle = put(iso); ctx.fill();
        }
        this.pickLookup = Object.fromEntries(Object.entries(this.pickColors).map(([k, v]) => [v, k]));
    },

    _isCage(iso) {
        const rings = STATE.walls[iso];
        return rings && rings.length === 1 && rings[0].length === 18;   // 9-vertex symbolic ring
    },

    isoAtUV(uv) {
        const { ctx, W, H } = this.pick;
        const x = Math.floor(uv.x * W), y = Math.floor((1 - uv.y) * H);
        if (x < 0 || y < 0 || x >= W || y >= H) return null;
        const d = ctx.getImageData(x, y, 1, 1).data;
        if (d[3] < 255) return null;
        return this.pickLookup[d[0] + (d[1] << 8) + (d[2] << 16)] || null;
    },

    // ── Walls ─────────────────────────────────────────────────────────
    _buildWalls() {
        const isos = Object.keys(STATE.walls);
        this.isoList = isos;
        isos.forEach((iso, i) => { this.isoIndex[iso] = i; });
        const N = isos.length;

        const pos = [], top = [], shade = [], cidx = [];
        const edgePos = [], edgeIdx = [];
        const light = new THREE.Vector2(-0.55, -0.83).normalize();   // from north-west
        this.wallRings = {};
        isos.forEach((iso, ci) => {
            this.wallRings[iso] = [];
            for (const flat of STATE.walls[iso]) {
                const pts = [];
                for (let j = 0; j < flat.length; j += 2) pts.push([flat[j] * S, flat[j + 1] * S]);
                this.wallRings[iso].push(pts);
                for (let j = 0; j < pts.length - 1; j++) {
                    const [x0, z0] = pts[j], [x1, z1] = pts[j + 1];
                    const n = new THREE.Vector2(z1 - z0, -(x1 - x0)).normalize();
                    const sh = 0.78 + 0.22 * Math.abs(n.dot(light));
                    const quad = [[x0, z0, 0], [x1, z1, 0], [x1, z1, 1], [x0, z0, 0], [x1, z1, 1], [x0, z0, 1]];
                    for (const [x, z, t] of quad) { pos.push(x, 0, z); top.push(t); shade.push(sh); cidx.push(ci); }
                    edgePos.push(x0, 0, z0, x1, 0, z1); edgeIdx.push(ci, ci);
                }
            }
        });

        this.valTex = new THREE.DataTexture(new Float32Array(N * 4).fill(-1), N, 1, THREE.RGBAFormat, THREE.FloatType);
        this.valTex.magFilter = this.valTex.minFilter = THREE.NearestFilter;
        for (let i = 0; i < N; i++) this.valTex.image.data[i * 4 + 2] = 0;
        this.valTex.needsUpdate = true;
        this.invalidate();

        const [c0, c1, c2, c3] = CONFIG.tariff.colors.map(hex);
        const [d0, d1, d2, d3] = CONFIG.tariff.domain;
        const uniforms = {
            uVals: { value: this.valTex }, uN: { value: N }, uT: { value: 1 },
            uCap: { value: CONFIG.tariff.cap }, uHmax: { value: VIEW3D.wallMaxHeight }, uHmin: { value: VIEW3D.wallMinHeight },
            uC0: { value: c0 }, uC1: { value: c1 }, uC2: { value: c2 }, uC3: { value: c3 },
            uD0: { value: d0 }, uD1: { value: d1 }, uD2: { value: d2 }, uD3: { value: d3 },
            uOpBottom: { value: VIEW3D.wallOpacityBottom }, uOpTop: { value: VIEW3D.wallOpacityTop },
            uEdge: { value: 0 },
        };
        this.wallUniforms = uniforms;

        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        g.setAttribute('aTop', new THREE.Float32BufferAttribute(top, 1));
        g.setAttribute('aShade', new THREE.Float32BufferAttribute(shade, 1));
        g.setAttribute('aCountry', new THREE.Float32BufferAttribute(cidx, 1));
        const wallMat = new THREE.ShaderMaterial({
            uniforms, vertexShader: WALL_VERT, fragmentShader: WALL_FRAG,
            transparent: true, depthWrite: false, side: THREE.DoubleSide,
        });
        this.walls = new THREE.Mesh(g, wallMat);
        this.walls.frustumCulled = false;
        this.walls.renderOrder = 2;
        this.wallGroup.add(this.walls);

        // Crisp top edge (ridge line)
        const eg = new THREE.BufferGeometry();
        eg.setAttribute('position', new THREE.Float32BufferAttribute(edgePos, 3));
        eg.setAttribute('aTop', new THREE.Float32BufferAttribute(new Array(edgeIdx.length).fill(1), 1));
        eg.setAttribute('aShade', new THREE.Float32BufferAttribute(new Array(edgeIdx.length).fill(1), 1));
        eg.setAttribute('aCountry', new THREE.Float32BufferAttribute(edgeIdx, 1));
        const edgeMat = new THREE.ShaderMaterial({
            uniforms: { ...uniforms, uEdge: { value: 1 } }, vertexShader: WALL_VERT, fragmentShader: WALL_FRAG,
            transparent: true, depthWrite: false,
        });
        this.edges = new THREE.LineSegments(eg, edgeMat);
        this.edges.frustumCulled = false;
        this.edges.renderOrder = 3;
        this.wallGroup.add(this.edges);
    },

    wallHeight(v) {
        if (v == null) return 0;
        return VIEW3D.wallMinHeight + Math.min(v, CONFIG.tariff.cap) / CONFIG.tariff.cap * (VIEW3D.wallMaxHeight - VIEW3D.wallMinHeight);
    },

    // values: iso -> tariff % (null/undefined = no data)
    setWallValues(values, animate = true) {
        const data = this.valTex.image.data;
        const t = this.wallUniforms.uT.value;
        for (let i = 0; i < this.isoList.length; i++) {
            const iso = this.isoList[i];
            // freeze the currently displayed value as the new start value
            const r = data[i * 4], g = data[i * 4 + 1];
            const cur = (r < 0 && g < 0) ? -1 : (r < 0 ? (t > 0.5 ? g : -1) : (g < 0 ? (t < 0.5 ? r : -1) : r + (g - r) * t));
            data[i * 4] = cur;
            const v = values[iso];
            data[i * 4 + 1] = v == null ? -1 : v;
        }
        this.valTex.needsUpdate = true;
        this.invalidate();
        this.wallValues = values;
        if (!animate || prefersReducedMotion()) { this.wallUniforms.uT.value = 1; return; }
        this.wallUniforms.uT.value = 0;
        if (this._wallAnim) this._wallAnim.stop();
        this._wallAnim = d3.timer((el) => {
            const k = d3.easeCubicOut(Math.min(1, el / VIEW3D.transitionMs));
            this.wallUniforms.uT.value = k;
            this.invalidate();
            if (k >= 1) this._wallAnim.stop();
        });
    },

    // 0 normal · 1 hover · 2 focus · 3 dimmed
    _applyWallStates() {
        const data = this.valTex.image.data;
        const dimOthers = !!this.focusIso;
        const related = this.relatedIsos || new Set();
        for (let i = 0; i < this.isoList.length; i++) {
            const iso = this.isoList[i];
            let s = 0;
            if (dimOthers && iso !== this.focusIso && !related.has(iso)) s = 3;
            if (STATE.region !== 'Global' && STATE.countries[iso]?.region !== STATE.region) s = 3;
            if (iso === this.focusIso) s = 2;
            if (iso === this.hoverIso) s = 1;
            data[i * 4 + 2] = s;
        }
        this.valTex.needsUpdate = true;
        this.invalidate();
    },

    setHover(iso) {
        if (iso === this.hoverIso) return;
        this.hoverIso = iso;
        this._applyWallStates();
        this._outline('hover', iso, 0x004990, 2.2);
    },

    // Ground-level outline (UNCTAD dark blue) for the hovered / focused economy
    _outline(kind, iso, color, width) {
        this.invalidate();
        this._outlines ||= {};
        const old = this._outlines[kind];
        if (old) { old.forEach(l => { this.scene.remove(l); l.geometry.dispose(); l.material.dispose(); }); }
        this._outlines[kind] = null;
        if (!iso || !this.wallRings[iso]) return;
        const { width: w, height: h } = this.container.getBoundingClientRect();
        this._outlines[kind] = this.wallRings[iso].map(ring => {
            const g = new LineGeometry();
            g.setPositions(ring.flatMap(([x, z]) => [x, 0.15, z]));
            const m = new LineMaterial({ color, linewidth: width });
            m.resolution.set(w, h);
            const l = new Line2(g, m);
            l.renderOrder = 4;
            this.scene.add(l);
            return l;
        });
    },

    setFocus(iso, relatedIsos = null) {
        this.focusIso = iso;
        this.relatedIsos = relatedIsos;
        this._applyWallStates();
        this._outline('focus', iso, 0x004990, 3);
        this._buildFocusGuides();
    },

    refreshStates() { this._applyWallStates(); },

    // Dashed contour rings at the guide levels around the focused country
    _buildFocusGuides() {
        this.guideGroup.children.slice().forEach(o => { this.guideGroup.remove(o); o.geometry?.dispose(); });
        this._removeLabels('guide');
        const iso = this.focusIso;
        if (!iso || !this.wallRings[iso] || this.mode === 'biv') return;   // no walls, no height guides
        const mat = new THREE.LineDashedMaterial({ color: 0x004990, dashSize: 0.8, gapSize: 0.6, transparent: true, opacity: 0.55 });
        let anchor = null;
        for (const lvl of CONFIG.tariff.guides) {
            const h = this.wallHeight(lvl);
            for (const ring of this.wallRings[iso]) {
                const pts = ring.map(([x, z]) => new THREE.Vector3(x, h, z));
                const g = new THREE.BufferGeometry().setFromPoints(pts);
                const line = new THREE.Line(g, mat);
                line.computeLineDistances();
                this.guideGroup.add(line);
                if (!anchor || ring.length > anchor.len) anchor = { len: ring.length, pt: ring.reduce((a, b) => (b[0] > a[0] ? b : a)) };
            }
        }
        if (anchor) {
            for (const lvl of CONFIG.tariff.guides) {
                this._addLabel('guide', `${lvl}%`, new THREE.Vector3(anchor.pt[0] + 0.8, this.wallHeight(lvl), anchor.pt[1]), 'lbl-guide');
            }
        }
    },

    // Screen-space wall scale: an HTML/SVG ruler whose tick heights follow the
    // current zoom and tilt, so 5 / 10 / 20 % read correctly at any view.
    _buildRuler() {
        this.rulerEl = document.getElementById('wall-scale');
        this._rulerKey = '';
    },

    _updateRuler() {
        if (!this.rulerEl) return;
        this.rulerEl.style.display = this.mode === 'biv' ? 'none' : '';
        const t = this.controls.target;
        const a = t.clone().project(this.camera);
        const b = t.clone().setY(this.wallHeight(CONFIG.tariff.cap)).project(this.camera);
        const { height } = this.container.getBoundingClientRect();
        const px = Math.abs(b.y - a.y) / 2 * height;          // pixels for a capped wall
        const key = px.toFixed(1);
        if (key === this._rulerKey) return;
        this._rulerKey = key;
        const H = Math.max(px, 4), base = H + 8;
        const y = (v) => base - (this.wallHeight(v) / this.wallHeight(CONFIG.tariff.cap)) * H;
        const ticks = [0, ...CONFIG.tariff.guides];
        const lastY = {};
        const labels = ticks.map(v => {
            const yy = y(v);
            const show = Object.values(lastY).every(p => Math.abs(p - yy) >= 10);
            if (show) lastY[v] = yy;
            return `<line x1="14" x2="22" y1="${yy}" y2="${yy}" stroke="#6e6259"/>` +
                (show ? `<text x="26" y="${yy + 3}">${v === CONFIG.tariff.cap ? v + '%+' : v + '%'}</text>` : '');
        }).join('');
        const grad = CONFIG.tariff.colors.map((c, i) => `<stop offset="${CONFIG.tariff.domain[i] / CONFIG.tariff.cap}" stop-color="${c}"/>`).join('');
        this.rulerEl.innerHTML = `<div class="ws-title">Wall height</div>
            <svg width="64" height="${base + 4}" aria-hidden="true">
                <defs><linearGradient id="wsg" x1="0" y1="1" x2="0" y2="0">${grad}</linearGradient></defs>
                <rect x="4" y="${base - H}" width="8" height="${H}" fill="url(#wsg)" opacity="0.9"/>
                <line x1="4" x2="12" y1="${base - H}" y2="${base - H}" stroke="#9b1830" stroke-width="1.5"/>
                <line x1="18" x2="18" y1="${y(CONFIG.tariff.cap)}" y2="${base}" stroke="#6e6259"/>
                ${labels}
            </svg>`;
    },

    // ── Labels ────────────────────────────────────────────────────────
    _addLabel(kind, html, position, cls) {
        this.invalidate();
        const el = document.createElement('div');
        el.className = `map3d-label ${cls || ''}`;
        el.innerHTML = html;
        const o = new CSS2DObject(el);
        o.position.copy(position);
        o.userData.kind = kind;
        o.userData.rank = this.labels.length;
        this.scene.add(o);
        this.labels.push(o);
        return o;
    },

    _removeLabels(kind) {
        this.invalidate();
        this.labels = this.labels.filter(o => {
            if (o.userData.kind !== kind) return true;
            this.scene.remove(o); o.element.remove();
            return false;
        });
    },

    scenePos(iso, y = 0) {
        const c = STATE.countries[iso]?.coords;
        if (!c) return null;
        const p = unitProj(c);
        return p ? new THREE.Vector3(p[0] * S, y, p[1] * S) : null;
    },

    setWallLabels(isos) {
        this._wallLabelIsos = isos;
        this._removeLabels('wall');
        for (const iso of isos) {
            const v = this.wallValues?.[iso];
            const p = this.scenePos(iso, this.mode === 'biv' ? 0.6 : this.wallHeight(v) + 1.2);
            if (!p || v == null) continue;
            const name = STATE.countries[iso]?.short || STATE.countries[iso]?.name || iso;
            this._addLabel('wall', `<span class="lw-name">${name}</span> <b>${fmtPct(v)}</b>`, p, 'lbl-wall');
        }
    },

    // ── Trade arcs + nodes ───────────────────────────────────────────
    // Diverging domain centred on the world-average effective rate (set by main.js on every update)
    setArcMidpoint(mid) {
        const cap = Math.max(CONFIG.arcRate.cap, mid * 2);
        this.arcMid = mid;
        this.arcDomain = [0, mid * 0.5, mid, mid + (cap - mid) * 0.4, cap];
        this.arcRateColor = d3.scaleLinear().domain(this.arcDomain).range(CONFIG.arcRate.colors).clamp(true);
    },

    // Effective duty rate on a corridor (%), null when the importer has no tariff data
    arcRate(d) {
        const v = d.valueKnown ?? d.value;
        return d.duty == null || !v ? null : d.duty / v * 100;
    },

    arcColorOf(d) {
        if (STATE.arcColor === 'ns') return CONFIG.flowColors[d.flowCategory];
        const r = this.arcRate(d);
        return r == null ? '#aea29a' : this.arcRateColor(r);
    },

    _pos(d, end) {
        if (end === 'to' && d.toLonLat) {
            const p = unitProj(d.toLonLat);
            return p ? new THREE.Vector3(p[0] * S, 0.2, p[1] * S) : null;
        }
        return this.scenePos(end === 'to' ? d.importer : d.exporter, 0.2);
    },

    _clearArcs(list, group) {
        for (const a of list) for (const l of [...a.lines, ...a.casings]) { group.remove(l); l.geometry.dispose(); l.material.dispose(); }
    },

    // Static tapered arc: thin at the exporter, full width where the importer pays the duty.
    // Built from short Line2 segments of increasing width (Line2 has no per-vertex width).
    _buildArc(d, w, order, group) {
        const A = this._pos(d, 'from'), B = this._pos(d, 'to');
        if (!A || !B) return null;
        const chord = A.distanceTo(B);
        const dir = B.clone().sub(A).normalize();
        const perp = new THREE.Vector3(-dir.z, 0, dir.x);          // clockwise bend (SHC convention)
        const mid = A.clone().add(B).multiplyScalar(0.5)
            .add(perp.multiplyScalar(chord * 0.12))
            .setY(Math.max(4, chord * VIEW3D.arcLift) + VIEW3D.wallMaxHeight * 0.35);
        const curve = new THREE.QuadraticBezierCurve3(A, mid, B);
        const pts = curve.getPoints(64);
        const { width, height } = this.container.getBoundingClientRect();
        // Price-step encoding: the first half is the shipment at its export price, i.e. at a 0 % duty — drawn in the
        // 0 % colour of the same duty-rate scale (width = trade value);
        // at the same point on every arc the duty is added — the line turns to the duty-rate colour and widens by the
        // rate (exaggerated, see VIEW3D.arcStepExaggeration). N/S colour mode keeps a plain category-coloured arc.
        const nsMode = STATE.arcColor === 'ns';
        const rate = this.arcRate(d) ?? 0;
        const goods = hex(nsMode ? CONFIG.flowColors[d.flowCategory] : this.arcRateColor(0));
        const duty = hex(nsMode ? CONFIG.flowColors[d.flowCategory] : this.arcColorOf(d));
        const wAfter = nsMode ? w : w * (1 + Math.min(1.5, rate / 100 * VIEW3D.arcStepExaggeration));
        const SEG = 16, per = pts.length / SEG, stepSeg = Math.round(SEG * VIEW3D.arcStepAt);
        const lines = [], casings = [];
        for (let k = 0; k < SEG; k++) {
            const seg = pts.slice(Math.floor(k * per), Math.min(pts.length, Math.floor((k + 1) * per) + 1));
            // one short blend segment so the change reads as a step, not a gradient
            const t = k < stepSeg ? 0 : k === stepSeg ? 0.55 : 1;
            const sw = Math.max(1, w + (wAfter - w) * t);
            const base = goods.clone().lerp(duty, t);
            const geo = new LineGeometry();
            geo.setPositions(seg.flatMap(p => [p.x, p.y, p.z]));
            // opacity 1 (partial alpha makes Line2 joints look dashed); 'transparent' only puts arcs in the
            // transparent pass so they draw after the ground in renderOrder, without writing depth.
            const mat = new LineMaterial({ color: base.clone().lerp(WHITE, 0.06), linewidth: sw, depthWrite: false, transparent: true, opacity: 1 });
            mat.userData = { base };
            mat.resolution.set(width, height);
            const line = new Line2(geo, mat);
            line.renderOrder = order + 1;
            line.userData.flow = d;
            // White casing keeps red arcs readable over red walls / wine-coloured ground
            const cmat = new LineMaterial({ color: 0xffffff, linewidth: sw + 2.2, depthWrite: false, transparent: true, opacity: 1 });
            cmat.resolution.set(width, height);
            const casing = new Line2(geo.clone(), cmat);
            casing.renderOrder = order;
            group.add(casing, line);
            lines.push(line); casings.push(casing);
        }
        return { lines, casings, curve, flow: d };
    },

    _drawArcs(flows, group, orderBase = 10) {
        const mval = (d) => d.value;          // arc width = trade value (export price); the duty is the step
        const wScale = d3.scaleSqrt().domain([0, d3.max(flows, mval) || 1]).range([VIEW3D.arcMinWidth, VIEW3D.arcMaxWidth]);
        // small first so big arcs sit on top
        return flows.slice().sort((a, b) => mval(a) - mval(b))
            .map((d, i) => this._buildArc(d, wScale(mval(d)), orderBase + 2 * i, group))
            .filter(Boolean);
    },

    setFlows(flows, importerStats = {}, labelIsos = []) {
        this.invalidate();
        this._clearArcs(this.arcObjects, this.arcGroup);
        this.arcObjects = this._drawArcs(flows, this.arcGroup);
        this.setHoverArcs([]);
        this.nodeGroup.children.slice().forEach(o => { this.nodeGroup.remove(o); o.geometry?.dispose(); o.material?.dispose(); });

        // Importer circles: size = estimated duties paid, colour = effective duty rate (same key as the arcs).
        // This is the default message layer: who pays, and how heavily.
        const entries = Object.entries(importerStats).filter(([, s]) => s.duty > 0);
        const rScale = d3.scaleSqrt().domain([0, d3.max(entries, e => e[1].duty) || 1]).range([0.7, VIEW3D.circleMaxRadius]);
        entries.sort((a, b) => b[1].duty - a[1].duty);          // big first, small on top
        entries.forEach(([iso, s], i) => {
            const p = this.scenePos(iso, 0.25);
            if (!p) return;
            const r = rScale(s.duty);
            const col = STATE.arcColor === 'ns' ? 0x4f4740 : hex(this.arcRateColor(s.duty / s.value * 100));
            const disc = new THREE.Mesh(new THREE.CircleGeometry(r, 32).rotateX(-Math.PI / 2),
                new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.92, depthWrite: false }));
            disc.position.copy(p);
            disc.renderOrder = 5 + i * 0.001;
            disc.userData.iso = iso;
            // white halo + dark hairline so circles read over red walls and purple ground alike
            const ring = new THREE.Mesh(new THREE.RingGeometry(r, r + 0.45, 32).rotateX(-Math.PI / 2),
                new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false }));
            ring.position.copy(p).setY(0.26);
            ring.renderOrder = 5.5 + i * 0.001;
            const line = new THREE.Mesh(new THREE.RingGeometry(r + 0.45, r + 0.62, 32).rotateX(-Math.PI / 2),
                new THREE.MeshBasicMaterial({ color: 0x4f4740, transparent: true, opacity: 0.8, depthWrite: false }));
            line.position.copy(p).setY(0.27);
            line.renderOrder = 5.6 + i * 0.001;
            const k = this._nodeScale ?? 1;
            for (const m of [disc, ring, line]) { m.scale.set(k, 1, k); this.nodeGroup.add(m); }
        });

        this._removeLabels('node');
        for (const iso of labelIsos) {
            const p = this.scenePos(iso, 0.4);
            if (p) this._addLabel('node', STATE.countries[iso]?.short || STATE.countries[iso]?.name || iso, p, 'lbl-node');
        }
    },

    // '+rate · +$duty' at the step point of the hovered arc
    _stepLabel(d) {
        if (d === this._stepFlow) return;
        this._stepFlow = d;
        this._removeLabels('step');
        if (!d || d.duty == null) return;
        const a = [...this.arcObjects, ...(this.hoverArcObjects || [])].find(o => o.flow === d);
        if (!a) return;
        const p = a.curve.getPoint(VIEW3D.arcStepAt);
        const r = this.arcRate(d);
        this._addLabel('step', `+${r.toFixed(1)}% <span>+${fmtUSD(d.duty)}</span>`, p, 'lbl-step');
    },

    // Temporary supplier arcs for the hovered economy (not hit-testable)
    setHoverArcs(flows) {
        this.invalidate();
        this.hoverArcGroup ||= (() => { const g = new THREE.Group(); this.scene.add(g); return g; })();
        this._clearArcs(this.hoverArcObjects || [], this.hoverArcGroup);
        this.hoverArcObjects = flows.length ? this._drawArcs(flows, this.hoverArcGroup, 600) : [];
    },

    // ── Interaction ──────────────────────────────────────────────────
    _bindPointer() {
        const el = this.labelRenderer.domElement;
        let down = null;
        el.addEventListener('pointermove', (e) => this._onMove(e));
        el.addEventListener('pointerleave', () => { this.setHover(null); this.handlers.onHover?.(null); });
        el.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
        el.addEventListener('pointerup', (e) => {
            if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 5) return;
            const hit = this._hitTest(e);
            this.handlers.onClick?.(hit, e);
        });
    },

    _hitTest(e) {
        const rect = this.container.getBoundingClientRect();
        this.pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
        this.raycaster.setFromCamera(this.pointer, this.camera);
        this.raycaster.camera = this.camera;
        const arcs = this.raycaster.intersectObjects(this.arcObjects.flatMap(a => a.lines), false);
        if (arcs.length) {
            const top = arcs.sort((a, b) => b.object.renderOrder - a.object.renderOrder)[0];
            return { type: 'arc', flow: top.object.userData.flow };
        }
        const nodes = this.raycaster.intersectObjects(this.nodeGroup.children.filter(o => o.userData.iso), false);
        if (nodes.length) return { type: 'country', iso: nodes[0].object.userData.iso };
        const g = this.raycaster.intersectObject(this.ground, false);
        if (g.length) {
            const iso = this.isoAtUV(g[0].uv);
            if (iso) return { type: 'country', iso };
        }
        return null;
    },

    _onMove(e) {
        if (this._moveRaf) return;
        this._moveRaf = requestAnimationFrame(() => {
            this._moveRaf = null;
            const hit = this._hitTest(e);
            this.setHover(hit?.type === 'country' ? hit.iso : null);
            const arcHit = hit?.type === 'arc';
            this._stepLabel(arcHit ? hit.flow : null);
            this.invalidate();
            for (const a of this.arcObjects) {
                const on = arcHit && a.flow === hit.flow;
                for (const l of a.lines) l.material.color.copy(l.material.userData.base).lerp(WHITE, arcHit ? (on ? 0 : 0.7) : 0.08);
            }
            this.labelRenderer.domElement.style.cursor = hit ? 'pointer' : '';
            this.handlers.onHover?.(hit, e);
        });
    },

    // ── Render loop ──────────────────────────────────────────────────
    _tick() {
        if (this.controls.update()) this._dirty = true;          // camera moved (incl. damping)
        // Node discs grow only with √zoom so they stay readable without swamping small countries
        const ns = Math.min(1, 1 / Math.sqrt(this.camera.zoom / VIEW3D.defaultZoom));
        if (ns !== this._nodeScale) {
            this._nodeScale = ns;
            for (const o of this.nodeGroup.children) o.scale.set(ns, 1, ns);
            this._dirty = true;
        }
        if (!this._dirty) return;
        this._dirty = false;
        this.renderer.render(this.scene, this.camera);
        this.labelRenderer.render(this.scene, this.camera);
        this._declutterLabels();
        this._updateRuler();
    },

    // Hide lower-priority labels that overlap (wall labels win over node labels).
    _declutterLabels() {
        const order = { wall: 0, node: 1, guide: 2 };
        const cands = this.labels.filter(o => o.userData.kind in order && o.element.style.display !== 'none')
            .sort((a, b) => order[a.userData.kind] - order[b.userData.kind] || a.userData.rank - b.userData.rank);
        const placed = [];
        for (const o of cands) {
            o.element.style.visibility = 'visible';
            const r = o.element.getBoundingClientRect();
            const hit = placed.some(p => r.left < p.right + 2 && r.right > p.left - 2 && r.top < p.bottom + 1 && r.bottom > p.top - 1);
            if (hit) o.element.style.visibility = 'hidden';
            else placed.push(r);
        }
    },

    // Screen position (px, relative to the container) of an economy's label point
    screenOf(iso) {
        const p = this.scenePos(iso);
        if (!p) return null;
        const v = p.project(this.camera);
        const { width, height } = this.container.getBoundingClientRect();
        return { x: (v.x + 1) / 2 * width, y: (1 - v.y) / 2 * height };
    },

    // Request a redraw (on-demand rendering)
    invalidate() { this._dirty = true; },

    snapshot() { return this.renderer.domElement.toDataURL('image/png'); },
};
