#!/usr/bin/env node
/**
 * After `astro build`:
 *  1. writes dist/sw.js — the offline service worker with a precache list of the app's own files;
 *  2. pre-compresses every text asset as .br and .gz for Caddy's `precompressed br gzip`.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { createHash } from 'node:crypto';
import { brotliCompressSync, gzipSync, constants } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// ── 1. service worker ──────────────────────────────────────────────────────
const files = walk(dist).map((p) => '/' + relative(dist, p).split('\\').join('/'));
const precache = files.filter((f) => {
  if (!f.startsWith('/_astro/')) return false;
  if (/\.(js|css)$/.test(f)) return true;
  // fonts: only the woff2 subsets of the phase-1 alphabets
  return /ibm-plex-(sans|mono)-(latin|latin-ext|cyrillic)-(400|500|600)-normal\.[\w-]+\.woff2$/.test(f);
});
precache.push('/manifest.webmanifest', '/favicon.svg', '/icon-192.png');

const swTemplate = (version) => `/* csvtovcf service worker ${version}
 * Caches the site's own code, styles and fonts so the converter works offline.
 * It never sees or stores your files: they are read locally and never requested over the network. */
const VERSION = '${version}';
const STATIC = 'static-' + VERSION;
const PAGES = 'pages-v1';
const PRECACHE = ${JSON.stringify(precache)};

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(STATIC).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('static-') && k !== STATIC).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // hashed assets never change: cache first
  if (url.pathname.startsWith('/_astro/')) {
    e.respondWith(
      caches.match(req, { ignoreVary: true }).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(STATIC).then((c) => c.put(req, copy)); }
        return res;
      })),
    );
    return;
  }

  // pages: network first, cached copy when offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(PAGES).then((c) => c.put(req, copy)); }
          return res;
        })
        .catch(() => caches.match(req, { ignoreVary: true }).then((hit) => hit || caches.match('/', { ignoreVary: true }).then((home) => home || Response.error()))),
    );
  }
});
`;
const version = createHash('sha256').update(precache.join('\n') + swTemplate('')).digest('hex').slice(0, 12);
writeFileSync(join(dist, 'sw.js'), swTemplate(version));
console.log(`sw.js: ${precache.length} files precached (version ${version})`);

// ── 2. markdown code blocks scroll sideways on phones: make them keyboard-focusable (WCAG 2.1.1) ──
let pres = 0;
for (const p of walk(dist)) {
  if (!p.endsWith('.html')) continue;
  const html = readFileSync(p, 'utf8');
  if (!html.includes('<pre>')) continue;
  writeFileSync(p, html.replaceAll('<pre>', () => (pres++, '<pre tabindex="0">')));
}
console.log(`focusable code blocks: ${pres}`);

// ── 3. pre-compression ─────────────────────────────────────────────────────
const TEXT = new Set(['.html', '.css', '.js', '.mjs', '.svg', '.xml', '.txt', '.md', '.json', '.webmanifest', '.ico']);
let n = 0;
let saved = 0;
for (const p of walk(dist)) {
  if (!TEXT.has(extname(p))) continue;
  const buf = readFileSync(p);
  if (buf.length < 512) continue;
  const br = brotliCompressSync(buf, { params: { [constants.BROTLI_PARAM_QUALITY]: 11, [constants.BROTLI_PARAM_SIZE_HINT]: buf.length } });
  const gz = gzipSync(buf, { level: 9 });
  if (br.length < buf.length) writeFileSync(p + '.br', br);
  if (gz.length < buf.length) writeFileSync(p + '.gz', gz);
  n++;
  saved += buf.length - br.length;
}
console.log(`precompressed ${n} files (brotli saves ${(saved / 1e6).toFixed(1)} MB)`);
