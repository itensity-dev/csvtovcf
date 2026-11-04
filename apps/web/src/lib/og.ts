import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) => {
  const p = require.resolve(`@fontsource/${pkg}/files/${file}`);
  const b = readFileSync(p);
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;
};

let fonts: Parameters<typeof satori>[1]['fonts'] | null = null;
function loadFonts() {
  if (fonts) return fonts;
  const sans = (subset: string, w: 400 | 600, name: string) => ({ name, data: font('ibm-plex-sans', `ibm-plex-sans-${subset}-${w}-normal.woff`), weight: w, style: 'normal' as const });
  fonts = [
    sans('latin', 400, 'Plex'),
    sans('latin', 600, 'Plex'),
    sans('latin-ext', 400, 'PlexExt'),
    sans('latin-ext', 600, 'PlexExt'),
    sans('cyrillic', 400, 'PlexCyr'),
    sans('cyrillic', 600, 'PlexCyr'),
    sans('vietnamese', 600, 'PlexVi'),
    { name: 'Mono', data: font('ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff'), weight: 500, style: 'normal' as const },
  ];
  return fonts;
}

type El = { type: string; props: Record<string, unknown> & { children?: unknown } };
const h = (type: string, style: Record<string, unknown>, ...children: unknown[]): El => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children },
});

const C = { paper: '#ede3c8', card: '#fffdf6', ink: '#1d1c1a', ink3: '#5f584d', rule: '#b8352a', blue: '#a8c2dd', action: '#1e4fa8' };
const FAMILY = 'Plex, PlexExt, PlexCyr, PlexVi';

/** 1200×630 Open Graph image: a catalog card with the page title. */
export async function ogPng(opts: { title: string; summary: string; label: string; lang: string }): Promise<Uint8Array> {
  const W = 1072;
  const tree = h(
    'div',
    { width: 1200, height: 630, display: 'flex', flexDirection: 'column', background: C.paper, paddingTop: 44, paddingLeft: 64, fontFamily: FAMILY, color: C.ink },
    h(
      'div',
      { width: W, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 },
      h('div', { display: 'flex', border: `3px solid ${C.ink}`, background: C.card, padding: '4px 14px', fontFamily: 'Mono', fontSize: 30 }, h('span', {}, 'csv'), h('span', { color: C.rule }, 'to'), h('span', {}, 'vcf')),
      h('div', { display: 'flex', fontFamily: 'Mono', fontSize: 22, color: C.ink3, letterSpacing: 2 }, opts.label.toUpperCase()),
    ),
    h(
      'div',
      { position: 'relative', width: W - 84, height: 470 - 28, display: 'flex', flexDirection: 'column', background: C.card, border: `2px solid ${C.ink}`, padding: '26px 40px 0 40px' },
      h('div', { display: 'flex', width: W - 84, fontSize: opts.title.length > 40 ? 50 : 62, fontWeight: 600, lineHeight: 1.12, paddingBottom: 16, borderBottom: `4px solid ${C.rule}` }, opts.title),
      h(
        'div',
        {
          display: 'flex',
          width: W - 84,
          flexGrow: 1,
          fontSize: 30,
          lineHeight: '58px',
          paddingTop: 2,
          backgroundImage: `repeating-linear-gradient(to bottom, transparent 0px, transparent 56px, ${C.blue} 56px, ${C.blue} 58px)`,
        },
        opts.summary,
      ),
      h('div', { position: 'absolute', right: 30, bottom: 16, display: 'flex', fontFamily: 'Mono', fontSize: 24, color: C.action, background: C.card, padding: '0 6px' }, 'csvtovcf.com'),
      h('div', { position: 'absolute', left: W / 2 - 12, bottom: 12, width: 20, height: 20, borderRadius: 10, border: `2px solid ${C.ink3}`, background: C.paper }),
    ),
  );
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: loadFonts() });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
