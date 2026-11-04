#!/usr/bin/env node
/** Renders PNG/ICO app icons from an inline SVG (light theme) into public/. Run once; outputs are committed. */
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const svg = (pad) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${pad ? 0 : 10}" fill="#ede3c8"/>
  <g transform="${pad ? 'translate(9.6 9.6) scale(0.7)' : ''}">
    <rect x="8" y="14" width="48" height="36" rx="2" fill="#fffdf6" stroke="#1d1c1a" stroke-width="3"/>
    <path d="M12 24h40" stroke="#b8352a" stroke-width="3"/>
    <path d="M12 32h40M12 39h40" stroke="#a8c2dd" stroke-width="2"/>
    <circle cx="32" cy="46" r="2.5" fill="#ede3c8" stroke="#1d1c1a" stroke-width="1.5"/>
  </g>
</svg>`;
const png = (size, pad = false) => new Resvg(svg(pad), { fitTo: { mode: 'width', value: size } }).render().asPng();

writeFileSync(join(pub, 'icon-192.png'), png(192));
writeFileSync(join(pub, 'icon-512.png'), png(512));
writeFileSync(join(pub, 'icon-maskable-512.png'), png(512, true));
writeFileSync(join(pub, 'apple-touch-icon.png'), png(180, true));
// ICO with one embedded 32×32 PNG (supported by every browser since Windows Vista)
const p32 = png(32);
const ico = Buffer.alloc(22);
ico.writeUInt16LE(0, 0);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(1, 4);
ico.writeUInt8(32, 6);
ico.writeUInt8(32, 7);
ico.writeUInt8(0, 8);
ico.writeUInt8(0, 9);
ico.writeUInt16LE(1, 10);
ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(p32.length, 14);
ico.writeUInt32LE(22, 18);
writeFileSync(join(pub, 'favicon.ico'), Buffer.concat([ico, p32]));
console.log('icons written to', pub);
