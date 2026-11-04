#!/usr/bin/env node
/** WCAG 2.2 contrast check of the design tokens, light and dark. Fails (exit 1) below AA. */
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
function block(re) {
  const m = re.exec(css);
  const out = {};
  if (!m) return out;
  for (const [, k, v] of m[1].matchAll(/(--[\w-]+):\s*(#[0-9a-f]{6})/gi)) out[k] = v;
  return out;
}
const light = block(/:root \{([\s\S]*?)\n\}/);
const dark = { ...light, ...block(/:root\[data-theme='dark'\] \{([\s\S]*?)\n\}/) };

const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const pairs = [
  ['--ink', '--card', 4.5], ['--ink', '--paper', 4.5], ['--ink-2', '--card', 4.5], ['--ink-2', '--paper', 4.5],
  ['--ink-3', '--card', 4.5], ['--ink-3', '--paper', 4.5], ['--ink-3', '--card-2', 4.5], ['--ink-3', '--paper-2', 4.5],
  ['--rule', '--card', 4.5], ['--rule', '--paper', 4.5], ['--action', '--card', 4.5], ['--action', '--paper', 4.5],
  ['--action-ink', '--action', 4.5], ['--ink', '--action-soft', 4.5], ['--ink', '--card-2', 4.5], ['--ink-2', '--paper-2', 4.5],
  ['--hairline', '--card', 1.5], ['--line-blue', '--card', 1.3],
];
let fail = 0;
for (const [name, t] of [['light', light], ['dark', dark]]) {
  console.log(`\n${name}`);
  for (const [fg, bg, min] of pairs) {
    const r = ratio(t[fg], t[bg]);
    const ok = r >= min;
    if (!ok) fail++;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${fg} on ${bg}: ${r.toFixed(2)}:1 (min ${min})`);
  }
}
process.exit(fail ? 1 : 0);
