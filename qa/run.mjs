// QA runner: serves the existing dist/ with `vite preview` on a free port, runs the interaction checks
// against it and shuts the server down again. Build first (`npm test` does).
// Usage: node qa/run.mjs
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
if (!fs.existsSync(path.join(ROOT, 'dist', 'index.html'))) {
    console.error('dist/ not found: run `npm run build` first (or use `npm test`).');
    process.exit(1);
}

const freePort = () =>
    new Promise((resolve, reject) => {
        const srv = net.createServer();
        srv.once('error', reject);
        srv.listen(0, () => {
            const { port } = srv.address();
            srv.close(() => resolve(port));
        });
    });

const waitFor = async (url, ms = 30000) => {
    const end = Date.now() + ms;
    while (Date.now() < end) {
        try {
            if ((await fetch(url)).ok) return;
        } catch {
            /* server not up yet */
        }
        await new Promise((r) => setTimeout(r, 250));
    }
    throw new Error(`preview server did not answer at ${url}`);
};

const run = (args) =>
    new Promise((resolve) => {
        const p = spawn(process.execPath, args, { cwd: ROOT, stdio: 'inherit' });
        p.on('exit', (code) => resolve(code ?? 1));
    });

const port = await freePort();
const url = `http://localhost:${port}/`;
// Call vite's JS entry directly (not via npx) so that killing it really stops the server on every OS.
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(port), '--strictPort'], {
    cwd: ROOT,
    stdio: 'ignore',
});
let code;
try {
    await waitFor(url);
    code = await run(['qa/interact.mjs', url]);
} finally {
    server.kill();
}
process.exit(code);
