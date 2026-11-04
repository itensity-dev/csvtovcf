import { describe, expect, it } from 'vitest';
import ICAL from 'ical.js';
import { buildVCards } from '../src/vcard';
import { pipeline } from './helpers';
import type { Contact } from '../src/types';

type JCard = [string, [string, Record<string, unknown>, string, ...unknown[]][], unknown[]];

function parseAll(vcf: string): JCard[] {
  const parsed = ICAL.parse(vcf) as unknown;
  // one component → a single jCard; several → an array of jCards
  return (Array.isArray(parsed) && parsed[0] === 'vcard' ? [parsed] : parsed) as JCard[];
}

function props(card: JCard, name: string) {
  return card[1].filter((p) => p[0] === name.toLowerCase());
}

/** vCard 2.1 reader for the round trip: unfold QP soft breaks, decode QP, split. */
function parse21(vcf: string): Record<string, string[]>[] {
  const cards: Record<string, string[]>[] = [];
  let cur: Record<string, string[]> | null = null;
  const physical = vcf.replace(/=\r\n/g, '').replace(/\r\n[ \t]/g, '').split('\r\n');
  for (const line of physical) {
    if (!line) continue;
    if (line === 'BEGIN:VCARD') cur = {};
    else if (line === 'END:VCARD') {
      cards.push(cur!);
      cur = null;
    } else if (cur) {
      const i = line.indexOf(':');
      const head = line.slice(0, i).split(';');
      let value = line.slice(i + 1);
      if (head.includes('ENCODING=QUOTED-PRINTABLE')) {
        const bytes: number[] = [];
        for (let j = 0; j < value.length; j++) {
          if (value[j] === '=') {
            bytes.push(parseInt(value.slice(j + 1, j + 3), 16));
            j += 2;
          } else bytes.push(value.charCodeAt(j));
        }
        value = new TextDecoder().decode(new Uint8Array(bytes));
      }
      (cur[head[0]!] ??= []).push(value);
    }
  }
  return cards;
}

function expectSameNames(contacts: Contact[], cards: JCard[]) {
  expect(cards.length).toBe(contacts.length);
  cards.forEach((card, i) => {
    const c = contacts[i]!;
    const fn = props(card, 'fn')[0]![3];
    expect(fn).toBe(c.fullName);
    const n = props(card, 'n')[0]![3] as string[] | string;
    const nArr = Array.isArray(n) ? n : [n];
    if (c.family || c.given) {
      expect(nArr[0] ?? '').toBe(c.family);
      expect(nArr[1] ?? '').toBe(c.given);
    }
    const tels = props(card, 'tel').map((p) => String(p[3]).replace(/^tel:/, '').replace(/;ext=(\d+)$/, ' ext. $1'));
    expect(tels).toEqual(c.phones.map((p) => p.value.replace(/[\r\n;]+/g, ' ').trim()));
    const emails = props(card, 'email').map((p) => p[3]);
    expect(emails).toEqual(c.emails.map((e) => e.value));
    // ical.js does not unescape "\\;" in single-value TEXT (RFC 2426 requires us to escape it in 3.0)
    const note = String(props(card, 'note')[0]?.[3] ?? '').replace(/\\;/g, ';');
    expect(note).toBe(c.note);
    if (c.categories.length) {
      expect(props(card, 'categories')[0]!.slice(3)).toEqual(c.categories);
    }
  });
}

const files = [
  'google-contacts.csv',
  'google-contacts-legacy.csv',
  'outlook-en.csv',
  'outlook-de-cp1252.csv',
  'outlook-ru-cp1251.csv',
  'outlook-fr-semicolon.csv',
  'linkedin-connections.csv',
  'excel-tr-cp1254.csv',
  'excel-ar-cp1256.csv',
  'excel-unicode-utf16le.txt',
  'japanese-shift_jis.csv',
  'workbook.xlsx',
];

describe('round trip through an independent parser (ical.js)', () => {
  it.each(files)('%s → vCard 3.0 → ical.js', async (file) => {
    const { result } = await pipeline(file);
    expect(result.contacts.length).toBeGreaterThan(0);
    const vcf = buildVCards(result.contacts, { version: '3.0', customLabels: false });
    expectSameNames(result.contacts, parseAll(vcf));
  });
  it.each(files)('%s → vCard 4.0 → ical.js', async (file) => {
    const { result } = await pipeline(file);
    const vcf = buildVCards(result.contacts, { version: '4.0' });
    const cards = parseAll(vcf);
    expectSameNames(result.contacts, cards);
    for (const c of cards) expect(props(c, 'version')[0]![3]).toBe('4.0');
  });
  it.each(files)('%s → vCard 2.1 (QP) → decoder', async (file) => {
    const { result } = await pipeline(file);
    const vcf = buildVCards(result.contacts, { version: '2.1' });
    const cards = parse21(vcf);
    expect(cards.length).toBe(result.contacts.length);
    cards.forEach((card, i) => {
      const c = result.contacts[i]!;
      expect(card.FN?.[0]).toBe(c.fullName.replace(/\\/g, '\\\\'));
      expect((card.TEL ?? []).length).toBe(c.phones.length);
      expect(card.EMAIL ?? []).toEqual(c.emails.map((e) => e.value));
      if (c.note) expect(card.NOTE?.[0]).toBe(c.note.replace(/\\/g, '\\\\').replace(/\n/g, '\r\n'));
    });
  });
});
