// Shared Playwright setup for the QA scripts: finds a Chromium and launches it with software GL.
//
// Browser lookup order: $PW_CHROME -> Playwright's own build -> newest chromium-* in the Playwright cache
// (the installed Playwright can expect a newer build than the one on disk). If none is found Playwright
// throws its usual "npx playwright install chromium" hint.
import { chromium } from 'playwright';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const BASE_URL = 'http://localhost:8080/';
export const SHOTS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'shots');

const CACHE_ROOTS = [
    process.env.PLAYWRIGHT_BROWSERS_PATH,
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'ms-playwright'),
    path.join(os.homedir(), 'Library', 'Caches', 'ms-playwright'),
    path.join(os.homedir(), '.cache', 'ms-playwright'),
].filter(Boolean);
const BINARIES = [
    ['chrome-win64', 'chrome.exe'],
    ['chrome-win', 'chrome.exe'],
    ['chrome-linux64', 'chrome'],
    ['chrome-linux', 'chrome'],
    ['chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'],
];

function findChromium() {
    if (process.env.PW_CHROME) return process.env.PW_CHROME;
    try {
        if (fs.existsSync(chromium.executablePath())) return undefined;   // Playwright's default build is present
    } catch { /* fall through to the cache scan */ }
    for (const root of CACHE_ROOTS) {
        if (!fs.existsSync(root)) continue;
        const builds = fs.readdirSync(root).filter(d => /^chromium-\d+$/.test(d))
            .sort((a, b) => parseInt(b.split('-')[1], 10) - parseInt(a.split('-')[1], 10));
        for (const b of builds) {
            for (const rel of BINARIES) {
                const exe = path.join(root, b, ...rel);
                if (fs.existsSync(exe)) return exe;
            }
        }
    }
    return undefined;
}

export function launch() {
    return chromium.launch({
        executablePath: findChromium(),
        args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
    });
}
