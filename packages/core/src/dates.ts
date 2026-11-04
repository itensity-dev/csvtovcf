import type { PartialDate } from './types';
import { stripDiacritics } from './text';

export type DateOrder = 'ymd' | 'dmy' | 'mdy';

/** Month names in the languages we support + common abbreviations. Built once, lazily. */
let MONTHS: Map<string, number> | null = null;
const MONTH_LOCALES = ['en', 'es', 'pt', 'id', 'tr', 'de', 'fr', 'ru', 'it', 'pl', 'nl', 'vi', 'uk'];

function monthTable(): Map<string, number> {
  if (MONTHS) return MONTHS;
  const m = new Map<string, number>();
  const add = (name: string, i: number) => {
    const k = stripDiacritics(name.toLowerCase()).replace(/\.$/, '');
    if (k && !m.has(k)) m.set(k, i);
  };
  for (const loc of MONTH_LOCALES) {
    for (const style of ['long', 'short'] as const) {
      for (const ctx of ['format', 'standalone'] as const) {
        let fmt: Intl.DateTimeFormat;
        try {
          fmt =
            ctx === 'format'
              ? new Intl.DateTimeFormat(loc, { month: style, day: 'numeric', timeZone: 'UTC' })
              : new Intl.DateTimeFormat(loc, { month: style, timeZone: 'UTC' });
        } catch {
          continue;
        }
        for (let i = 0; i < 12; i++) {
          const parts = fmt.formatToParts(new Date(Date.UTC(2000, i, 15)));
          const month = parts.find((p) => p.type === 'month')?.value;
          if (month) add(month, i + 1);
        }
      }
    }
  }
  // English 3-letter forms used by LinkedIn and Outlook exports
  'jan feb mar apr may jun jul aug sep sept oct nov dec'.split(' ').forEach((n, i) => add(n, i < 9 ? i + 1 : i));
  MONTHS = m;
  return m;
}

function valid(y: number | undefined, mo: number, d: number): boolean {
  if (!(mo >= 1 && mo <= 12 && d >= 1 && d <= 31)) return false;
  const year = y ?? 2000; // leap year so 29 Feb without a year is accepted
  const dim = new Date(Date.UTC(year, mo, 0)).getUTCDate();
  if (d > dim) return false;
  if (y !== undefined && (y < 1800 || y > 2200)) return false;
  return true;
}

function fixYear(y: string): number {
  const n = Number(y);
  if (y.length === 2) {
    const now = new Date().getUTCFullYear() % 100;
    return n > now ? 1900 + n : 2000 + n;
  }
  return n;
}

/** Excel serial date (1900 system): 1 = 1900-01-01, with Excel's fake 29 Feb 1900. */
export function fromExcelSerial(serial: number): PartialDate | null {
  if (!Number.isFinite(serial) || serial < 1 || serial > 2958465) return null;
  const days = Math.floor(serial) - (serial > 60 ? 1 : 0);
  const d = new Date(Date.UTC(1899, 11, 31) + days * 86400000);
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

/** Values that mean "no date" in Outlook/Excel exports. */
const EMPTY_DATES = /^(0{1,2}[./-]0{1,2}[./-]0{2,4}|0000-00-00|1\/0\/00|0\/0\/00|n\/a|-|—)$/i;

/**
 * Parse a single date. `order` resolves ambiguous numeric forms (03/04/1990).
 * Returns null if the value is not a recognizable date.
 */
export function parseDate(input: string, order: DateOrder = 'dmy'): PartialDate | null {
  const s = input.trim();
  if (!s || EMPTY_DATES.test(s)) return null;
  let m: RegExpExecArray | null;

  // ISO 8601 and vCard forms: 1990-05-17, 19900517, --05-17, --0517, 1990-05-17T00:00:00
  if ((m = /^(\d{4})-?(\d{2})-?(\d{2})(?:[T ][\d:.]+Z?)?$/.exec(s))) {
    const r = { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
    return valid(r.year, r.month, r.day) ? r : null;
  }
  if ((m = /^--(\d{2})-?(\d{2})$/.exec(s))) {
    const r = { month: Number(m[1]), day: Number(m[2]) };
    return valid(undefined, r.month, r.day) ? r : null;
  }
  // Year first with slashes or dots: 1990/05/17, 1990.05.17
  if ((m = /^(\d{4})[./](\d{1,2})[./](\d{1,2})\.?$/.exec(s))) {
    const r = { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
    return valid(r.year, r.month, r.day) ? r : null;
  }
  // Numeric with separators: 17.05.1990, 05/17/1990, 17-05-90, 17/05 (no year)
  if ((m = /^(\d{1,2})[./-](\d{1,2})(?:[./-](\d{2}|\d{4}))?\.?(?:\s+[\d:]+(?:\s*[AP]M)?)?$/i.exec(s))) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    const y = m[3] ? fixYear(m[3]) : undefined;
    let day: number;
    let month: number;
    if (a > 12 && b <= 12) [day, month] = [a, b];
    else if (b > 12 && a <= 12) [month, day] = [a, b];
    else if (order === 'mdy') [month, day] = [a, b];
    else [day, month] = [a, b];
    if (!valid(y, month, day)) return null;
    return y === undefined ? { month, day } : { year: y, month, day };
  }
  // Excel serial number (only plausible birth/anniversary range: 1900–2100)
  if (/^\d{4,5}(\.\d+)?$/.test(s)) {
    const n = Number(s);
    if (n >= 367 && n <= 73051) return fromExcelSerial(n);
    return null;
  }
  // Textual: "17 May 1990", "May 17, 1990", "17. Mai 1990", "17 мая 1990 г.", "4 Nov 2026"
  const norm = stripDiacritics(s.toLowerCase())
    .replace(/\b(de|del|of)\b/g, ' ')
    .replace(/г\.?$/u, '')
    .replace(/[,.]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const tokens = norm.split(' ');
  const months = monthTable();
  let month: number | undefined;
  const nums: string[] = [];
  for (const t of tokens) {
    if (/^\d+$/.test(t)) nums.push(t);
    else if (month === undefined) {
      const mo = months.get(t) ?? months.get(t.slice(0, 3)) ?? months.get(t.replace(/(а|я)$/u, 'ь'));
      if (mo !== undefined) month = mo;
      else if (t.length > 2) return null;
    }
  }
  if (month === undefined || nums.length === 0 || nums.length > 2) return null;
  let day: number | undefined;
  let year: number | undefined;
  for (const n of nums) {
    if (n.length === 4) year = Number(n);
    else if (day === undefined && Number(n) <= 31) day = Number(n);
    else if (n.length === 2) year = fixYear(n);
  }
  if (day === undefined || !valid(year, month, day)) return null;
  return year === undefined ? { month, day } : { year, month, day };
}

/**
 * Look at a whole column to decide between day-first and month-first:
 * any value with first part > 12 means dd/mm, second part > 12 means mm/dd.
 * Falls back to the locale default (en-US → mdy, everyone else → dmy).
 */
export function detectDateOrder(values: string[], locale = 'en'): DateOrder {
  let dmy = 0;
  let mdy = 0;
  for (const v of values) {
    const m = /^(\d{1,2})[./-](\d{1,2})(?:[./-]\d{2,4})?/.exec(v.trim());
    if (!m) continue;
    const a = Number(m[1]);
    const b = Number(m[2]);
    if (a > 12 && b <= 12) dmy++;
    else if (b > 12 && a <= 12) mdy++;
    if (/^\d{1,2}\.\d{1,2}\./.test(v.trim())) dmy++; // dots are day-first everywhere
  }
  if (dmy > mdy) return 'dmy';
  if (mdy > dmy) return 'mdy';
  return /^en(-us)?$/i.test(locale) || locale === '' ? 'mdy' : 'dmy';
}

export function formatPartialDate(d: PartialDate, style: 'iso' | 'basic' = 'iso'): string {
  const mm = String(d.month).padStart(2, '0');
  const dd = String(d.day).padStart(2, '0');
  if (d.year === undefined) return style === 'iso' ? `--${mm}-${dd}` : `--${mm}${dd}`;
  const yyyy = String(d.year).padStart(4, '0');
  return style === 'iso' ? `${yyyy}-${mm}-${dd}` : `${yyyy}${mm}${dd}`;
}
