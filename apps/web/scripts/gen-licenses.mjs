#!/usr/bin/env node
/**
 * Writes src/generated/licenses.json from the installed packages: name, version, license, link.
 * Runs before every build, so the /licenses/ page always matches what ships.
 */
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = join(here, '..');
const coreRoot = join(webRoot, '..', '..', 'packages', 'core');

const GROUPS = {
  browser: {
    from: { web: ['preact', 'fflate', 'xlsx', '@preact/signals'], core: ['papaparse', 'chardet', 'libphonenumber-js'] },
  },
  fonts: {
    from: { web: ['@fontsource/ibm-plex-sans', '@fontsource/ibm-plex-mono', '@fontsource/ibm-plex-sans-arabic', '@fontsource/noto-sans-devanagari'] },
  },
  build: {
    from: { web: ['astro', '@astrojs/preact', 'typescript', '@astrojs/check', '@playwright/test', 'satori', '@resvg/resvg-js'], core: ['vitest', 'ical.js'] },
  },
};

const FONT_NAMES = {
  '@fontsource/ibm-plex-sans': 'IBM Plex Sans (IBM, Bold Monday)',
  '@fontsource/ibm-plex-mono': 'IBM Plex Mono (IBM, Bold Monday)',
  '@fontsource/ibm-plex-sans-arabic': 'IBM Plex Sans Arabic (IBM, Bold Monday)',
  '@fontsource/noto-sans-devanagari': 'Noto Sans Devanagari (Google)',
};

function findPkg(root, name) {
  for (const cand of [join(root, 'node_modules', name, 'package.json'), join(root, '..', '..', 'node_modules', '.pnpm', 'node_modules', name, 'package.json')]) {
    if (existsSync(cand)) return JSON.parse(readFileSync(cand, 'utf8'));
  }
  const req = createRequire(join(root, 'package.json'));
  let p;
  try {
    p = req.resolve(`${name}/package.json`);
  } catch {
    // packages without "./package.json" in exports: walk up from the main entry
    try {
      let dir = dirname(req.resolve(name));
      while (dir !== dirname(dir)) {
        const cand = join(dir, 'package.json');
        if (existsSync(cand) && JSON.parse(readFileSync(cand, 'utf8')).name === name) {
          p = cand;
          break;
        }
        dir = dirname(dir);
      }
    } catch {
      return null;
    }
  }
  return p ? JSON.parse(readFileSync(p, 'utf8')) : null;
}

function link(pkg) {
  const repo = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository?.url;
  const fromRepo = repo?.replace(/^git\+/, '').replace(/\.git$/, '').replace(/^git:\/\//, 'https://').replace(/^github:/, 'https://github.com/');
  return pkg.homepage || fromRepo || `https://www.npmjs.com/package/${pkg.name}`;
}

const out = {};
for (const [group, { from }] of Object.entries(GROUPS)) {
  out[group] = [];
  for (const [where, names] of Object.entries(from)) {
    for (const name of names) {
      const pkg = findPkg(where === 'core' ? coreRoot : webRoot, name);
      if (!pkg) {
        console.warn('licenses: not found', name);
        continue;
      }
      const lic = typeof pkg.license === 'string' ? pkg.license : pkg.license?.type ?? 'see package';
      out[group].push({
        name: FONT_NAMES[name] ?? (name === 'xlsx' ? 'SheetJS Community Edition (xlsx)' : name),
        version: pkg.version,
        license: lic,
        url: name === 'xlsx' ? 'https://sheetjs.com/' : link(pkg),
      });
    }
  }
  out[group].sort((a, b) => a.name.localeCompare(b.name));
}
mkdirSync(join(webRoot, 'src', 'generated'), { recursive: true });
writeFileSync(join(webRoot, 'src', 'generated', 'licenses.json'), JSON.stringify(out, null, 2) + '\n');
console.log('licenses:', Object.entries(out).map(([k, v]) => `${k}=${v.length}`).join(' '));
