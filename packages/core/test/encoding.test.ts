import { describe, expect, it } from 'vitest';
import { decode, detectEncoding, plausibility } from '../src/encoding';
import { fixture } from './helpers';

describe('detectEncoding', () => {
  const cases: [string, string, string][] = [
    ['google-contacts.csv', 'en', 'utf-8'],
    ['outlook-fr-semicolon.csv', 'fr', 'utf-8'],
    ['outlook-de-cp1252.csv', 'de', 'windows-1252'],
    ['outlook-de-cp1252.csv', 'en', 'windows-1252'],
    ['outlook-ru-cp1251.csv', 'ru', 'windows-1251'],
    ['outlook-ru-cp1251.csv', 'en', 'windows-1251'],
    ['simple-ru-cp1251-noheader.csv', 'en', 'windows-1251'],
    ['excel-de-semicolon-cp1252.csv', 'de', 'windows-1252'],
    ['excel-tr-cp1254.csv', 'tr', 'windows-1254'],
    ['excel-tr-cp1254.csv', 'en', 'windows-1254'],
    ['excel-ar-cp1256.csv', 'en', 'windows-1256'],
    ['excel-unicode-utf16le.txt', 'en', 'utf-16le'],
    ['japanese-shift_jis.csv', 'en', 'shift_jis'],
  ];
  it.each(cases)('%s (page %s) → %s', (file, locale, expected) => {
    const g = detectEncoding(fixture(file), { locale });
    expect(g.encoding).toBe(expected);
  });

  it('reports BOM', () => {
    const g = detectEncoding(fixture('outlook-fr-semicolon.csv'));
    expect(g.method).toBe('bom');
    expect(g.bom).toBe(true);
  });

  it('pure ASCII is UTF-8 with full confidence', () => {
    const g = detectEncoding(new TextEncoder().encode('Name,Phone\nBob,+12025550143\n'));
    expect(g).toMatchObject({ encoding: 'utf-8', confidence: 1, method: 'ascii' });
  });

  it('UTF-16 without BOM is recognized by zero-byte pattern', () => {
    const s = 'Name\tPhone\r\nZoë\t+1 202 555 0143\r\n';
    const b = new Uint8Array(s.length * 2);
    for (let i = 0; i < s.length; i++) b[i * 2] = s.charCodeAt(i) & 0xff;
    expect(detectEncoding(b).encoding).toBe('utf-16le');
  });

  it('decoded text has no mojibake', () => {
    const t = decode(fixture('outlook-ru-cp1251.csv'), 'windows-1251');
    expect(t).toContain('Смирнова');
    expect(t).toContain('Ёлкин');
    const tr = decode(fixture('excel-tr-cp1254.csv'), 'windows-1254');
    expect(tr).toContain('Çağrı Öztürk');
    expect(tr).toContain('İsmail Işık');
  });

  it('plausibility penalizes UTF-8 read as Latin-1', () => {
    const good = plausibility('Müller, Jürgen', 'windows-1252');
    const bad = plausibility('MÃ¼ller, JÃ¼rgen', 'windows-1252');
    expect(good).toBeGreaterThan(bad);
  });
});
