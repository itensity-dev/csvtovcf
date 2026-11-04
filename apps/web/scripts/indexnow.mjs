#!/usr/bin/env node
/**
 * Submits changed URLs to IndexNow (api.indexnow.org shares them with Bing, Yandex, Seznam, Naver, Yep).
 * Reads the live sitemaps of SITE_URL, picks URLs whose <lastmod> is on/after --since (default: today),
 * or every URL with --all, and POSTs them in batches of 10 000.
 *
 *   SITE_URL=https://csvtovcf.com INDEXNOW_KEY=… node apps/web/scripts/indexnow.mjs [--all] [--since 2026-11-04] [--dry-run]
 */
const SITE = (process.env.SITE_URL || 'https://csvtovcf.com').replace(/\/$/, '');
const KEY = process.env.INDEXNOW_KEY || '';
const args = process.argv.slice(2);
const all = args.includes('--all');
const dry = args.includes('--dry-run');
const since = args.includes('--since') ? args[args.indexOf('--since') + 1] : new Date().toISOString().slice(0, 10);

if (!/^[a-zA-Z0-9-]{8,128}$/.test(KEY)) {
  console.error('INDEXNOW_KEY is missing or invalid (8–128 chars of a-z A-Z 0-9 -).');
  process.exit(1);
}

async function text(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  return r.text();
}

const keyFile = await text(`${SITE}/${KEY}.txt`).catch(() => '');
if (keyFile.trim() !== KEY) {
  console.error(`Key file ${SITE}/${KEY}.txt is missing or does not match. Build the site with INDEXNOW_KEY set.`);
  process.exit(1);
}

const index = await text(`${SITE}/sitemap-index.xml`);
const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const urls = [];
for (const map of maps) {
  const xml = await text(map);
  for (const u of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = /<loc>([^<]+)<\/loc>/.exec(u[1])?.[1];
    const lastmod = /<lastmod>([^<]+)<\/lastmod>/.exec(u[1])?.[1] ?? '';
    if (loc && (all || lastmod >= since)) urls.push(loc);
  }
}
console.log(`${urls.length} URL(s) to submit${all ? '' : ` (lastmod ≥ ${since})`}.`);
if (!urls.length || dry) {
  if (dry) console.log(urls.join('\n'));
  process.exit(0);
}
const host = new URL(SITE).host;
for (let i = 0; i < urls.length; i += 10000) {
  const batch = urls.slice(i, i + 10000);
  const r = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: batch }),
  });
  console.log(`batch ${i / 10000 + 1}: HTTP ${r.status} (200/202 = accepted)`);
  if (r.status >= 400) process.exit(1);
}
