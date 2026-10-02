import { defineConfig } from 'vite';

// Vendor code changes rarely, so it gets its own long-cacheable chunks: an app update then re-downloads
// only the small app chunk. three.js (~0.6 MB minified, WebGLRenderer alone) cannot be shrunk further,
// hence the raised warning limit.
const vendorChunk = (id) => {
    if (!id.includes('/node_modules/')) return undefined;
    if (id.includes('/three/')) return 'three';
    if (/\/node_modules\/(d3|d3-[^/]+|internmap|delaunator|robust-predicates)\//.test(id)) return 'd3';
    return undefined;
};

export default defineConfig({
    base: './',
    root: '.',
    publicDir: 'public',
    server: { port: 5174 },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        chunkSizeWarningLimit: 700,
        rollupOptions: { output: { manualChunks: vendorChunk } },
    },
});
