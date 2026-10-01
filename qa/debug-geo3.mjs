import * as topojson from 'topojson-client';
import fs from 'node:fs';
const topo = JSON.parse(fs.readFileSync('public/assets/worldmap-economies-4326.topo.json'));
const fc = topojson.feature(topo, topo.objects.economies);
const pts = (code) => { const f = fc.features.find(x => +x.properties.code === code); return f.geometry.coordinates.flat(f.geometry.type === 'Polygon' ? 1 : 2); };
const ext = (code, fn) => pts(code).reduce((a, b) => fn(a, b) ? a : b);
const sen = ext(686, (a, b) => a[0] < b[0]);  // Cap-Vert  -17.54
const som = ext(706, (a, b) => a[0] > b[0]);  // Ras Hafun 51.41
const zaf = ext(710, (a, b) => a[1] < b[1]);  // Cape Agulhas 20.00 / -34.83
const nor = ext(578, (a, b) => a[1] > b[1]);  // (mainland+svalbard) north
const chl = ext(152, (a, b) => a[1] < b[1]);  // Cape Horn area -67.3 / -55.98
console.log('SEN west', sen, 'offset', (sen[0] + 17.54).toFixed(3));
console.log('SOM east', som, 'offset', (som[0] - 51.41).toFixed(3));
console.log('ZAF south', zaf, 'offset', (zaf[0] - 20.00).toFixed(3));
console.log('CHL south', chl, 'offset', (chl[0] + 67.27).toFixed(3));
console.log('transform', topo.transform);
