#!/usr/bin/env node
/**
 * i18n gate for CI: every language must have every page and every UI key.
 *   node scripts/check-i18n.mjs            → all languages
 *   node scripts/check-i18n.mjs ru         → one language
 * Checks: missing pages / keys, extra keys, placeholder mismatch ({n}, {file}…), frontmatter limits,
 * leftover TODO, untranslated copies of English text, duplicate slugs, internal links to unknown pages.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');
const LANGS = ['en', 'es', 'pt-br', 'id', 'tr', 'de', 'fr', 'ru'];
const PREFIX = { en: '', es: '/es', 'pt-br': '/pt-br', id: '/id', tr: '/tr', de: '/de', fr: '/fr', ru: '/ru' };
const PAGES = readdirSync(join(root, 'content', 'pages', 'en')).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3));
const only = process.argv[2];
const langs = only ? [only] : LANGS;
let errors = 0;
const err = (lang, msg) => {
  errors++;
  console.error(`✗ [${lang}] ${msg}`);
};

function flatten(o, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(o)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}
const placeholders = (s) => [...String(s).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');

function readPage(lang, id) {
  const p = join(root, 'content', 'pages', lang, `${id}.md`);
  if (!existsSync(p)) return null;
  const raw = readFileSync(p, 'utf8');
  const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw);
  if (!m) return { error: 'no frontmatter' };
  try {
    return { fm: parse(m[1]), body: m[2] };
  } catch (e) {
    return { error: `YAML: ${e.message}` };
  }
}

const enUi = flatten(JSON.parse(readFileSync(join(root, 'i18n', 'ui', 'en.json'), 'utf8')));
const enPages = Object.fromEntries(PAGES.map((id) => [id, readPage('en', id)]));

// paths of every language (for link checks)
const known = new Set();
for (const lang of LANGS) {
  for (const id of PAGES) {
    const pg = readPage(lang, id);
    if (!pg?.fm) continue;
    const slug = id === 'home' ? '' : pg.fm.url;
    known.add(slug ? `${PREFIX[lang]}/${slug}/` : `${PREFIX[lang]}/`);
  }
}

for (const lang of langs) {
  // UI dictionary
  const uiPath = join(root, 'i18n', 'ui', `${lang}.json`);
  if (!existsSync(uiPath)) err(lang, `missing ${uiPath}`);
  else {
    let ui;
    try {
      ui = flatten(JSON.parse(readFileSync(uiPath, 'utf8')));
    } catch (e) {
      err(lang, `ui JSON invalid: ${e.message}`);
      ui = {};
    }
    for (const [k, v] of Object.entries(enUi)) {
      if (!(k in ui)) err(lang, `ui key missing: ${k}`);
      else {
        if (placeholders(v) !== placeholders(ui[k])) err(lang, `ui placeholders differ in ${k}: "${ui[k]}"`);
        if (typeof ui[k] !== 'string' || !ui[k].trim()) err(lang, `ui key empty: ${k}`);
      }
    }
    for (const k of Object.keys(ui)) if (!(k in enUi)) err(lang, `ui key not in en: ${k}`);
  }
  // pages
  const slugs = new Map();
  for (const id of PAGES) {
    const pg = readPage(lang, id);
    if (!pg) {
      err(lang, `page missing: ${id}.md`);
      continue;
    }
    if (pg.error) {
      err(lang, `${id}.md ${pg.error}`);
      continue;
    }
    const { fm, body } = pg;
    for (const f of ['title', 'h1', 'description', 'lead', 'nav', 'summary', 'updated']) if (!fm[f]) err(lang, `${id}.md: missing ${f}`);
    if (id !== 'home' && !fm.url) err(lang, `${id}.md: missing url`);
    if (fm.url && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.url)) err(lang, `${id}.md: url must be lowercase a-z0-9 and dashes: "${fm.url}"`);
    if (fm.url) {
      if (slugs.has(fm.url)) err(lang, `${id}.md: url "${fm.url}" also used by ${slugs.get(fm.url)}`);
      slugs.set(fm.url, id);
    }
    if (String(fm.title ?? '').length > 70) err(lang, `${id}.md: title > 70 chars (${fm.title.length})`);
    if (String(fm.description ?? '').length > 170) err(lang, `${id}.md: description > 170 chars (${fm.description.length})`);
    const en = enPages[id];
    if (en?.fm) {
      for (const f of ['steps', 'features', 'faq']) {
        if ((en.fm[f]?.length ?? 0) !== (fm[f]?.length ?? 0)) err(lang, `${id}.md: ${f} count ${fm[f]?.length ?? 0} ≠ en ${en.fm[f]?.length ?? 0}`);
      }
      if (lang !== 'en' && fm.h1 === en.fm.h1 && fm.lead === en.fm.lead) err(lang, `${id}.md: looks untranslated (same h1 and lead as en)`);
      if (JSON.stringify(fm.related ?? []) !== JSON.stringify(en.fm.related ?? [])) err(lang, `${id}.md: related differs from en`);
    }
    const all = JSON.stringify(fm) + body;
    if (/\bTODO\b/.test(all)) err(lang, `${id}.md: contains TODO`);
    for (const m of all.matchAll(/\]\((\/[^)\s#]*)/g)) {
      const href = m[1];
      if (href.startsWith('/og/')) continue;
      if (!known.has(href)) err(lang, `${id}.md: link to unknown page ${href}`);
      else if (lang !== 'en' && !href.startsWith(PREFIX[lang] + '/')) err(lang, `${id}.md: link ${href} points to another language`);
    }
  }
}
if (errors) {
  console.error(`\n${errors} problem(s).`);
  process.exit(1);
}
console.log(`i18n OK: ${langs.join(', ')} — ${PAGES.length} pages, ${Object.keys(enUi).length} UI keys each.`);
