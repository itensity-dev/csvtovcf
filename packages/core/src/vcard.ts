import type { Address, Contact, PartialDate, Phone, PhoneType, VCardVersion } from './types.js';
import { formatPartialDate } from './dates.js';
import { joinName } from './names.js';

export interface BuildOptions {
  version: VCardVersion;
  /**
   * 3.0 only: add CHARSET=UTF-8 to properties with non-ASCII text.
   * Not in RFC 2426, but older Outlook builds need it to read Cyrillic/Arabic correctly.
   */
  charset?: boolean;
  /** 4.0 only: write normalized numbers as tel: URIs (RFC 6350 §6.4.1). Default true. */
  telUri?: boolean;
  /** Write a PRODID line (3.0/4.0). Default true. */
  prodId?: boolean;
  /** 3.0: custom labels as Apple "item1.X-ABLabel" groups (read by iOS, macOS, Google). Default true. */
  customLabels?: boolean;
}

export const PRODID = '-//csvtovcf.com//csvtovcf 1.0//EN';
const CRLF = '\r\n';
const encoder = new TextEncoder();

export function utf8Length(s: string): number {
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c < 0x80) n += 1;
    else if (c < 0x800) n += 2;
    else if (c >= 0xd800 && c <= 0xdbff) {
      n += 4;
      i++;
    } else n += 3;
  }
  return n;
}

const isAscii = (s: string) => /^[\x00-\x7f]*$/.test(s);

// ───────────────────────── escaping ─────────────────────────

/** RFC 2426 §5 / RFC 6350 §3.4: escape backslash, comma, semicolon, newline in TEXT values. */
export function escapeText(s: string, semicolon = true): string {
  const t = s
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/,/g, '\\,');
  return semicolon ? t.replace(/;/g, '\\;') : t;
}

/** vCard 2.1: only ";" is special inside structured values; line breaks go through Quoted-Printable. */
function escape21(s: string, structured: boolean): string {
  const t = s.replace(/\\/g, '\\\\');
  return structured ? t.replace(/;/g, '\\;') : t;
}

// ───────────────────────── folding ─────────────────────────

let segmenter: Intl.Segmenter | null | undefined;
function graphemes(s: string): string[] {
  if (segmenter === undefined) {
    segmenter = typeof Intl !== 'undefined' && 'Segmenter' in Intl ? new Intl.Segmenter('en', { granularity: 'grapheme' }) : null;
  }
  if (segmenter) return Array.from(segmenter.segment(s), (x) => x.segment);
  return Array.from(s);
}

/**
 * Fold a content line at 75 octets (RFC 6350 §3.2, RFC 2426 §2.6):
 * CRLF + one space, never inside a UTF-8 sequence, a grapheme cluster or a "\x" escape pair.
 */
export function foldLine(line: string, limit = 75): string {
  if (utf8Length(line) <= limit) return line;
  // units: grapheme clusters, with backslash escapes glued to the next character
  const raw = graphemes(line);
  const units: string[] = [];
  for (let i = 0; i < raw.length; i++) {
    const u = raw[i]!;
    if (u === '\\' && i + 1 < raw.length) {
      units.push(u + raw[i + 1]!);
      i++;
    } else units.push(u);
  }
  const lines: string[] = [];
  let cur = '';
  let curLen = 0;
  let max = limit;
  const push = (u: string, ul: number) => {
    if (curLen + ul > max && curLen > 0) {
      lines.push(cur);
      cur = '';
      curLen = 0;
      max = limit - 1; // continuation lines start with a space
    }
    cur += u;
    curLen += ul;
  };
  for (const u of units) {
    const ul = utf8Length(u);
    if (ul > limit - 1) {
      // pathological grapheme (long combining sequence): fall back to code points
      for (const cp of Array.from(u)) push(cp, utf8Length(cp));
    } else push(u, ul);
  }
  lines.push(cur);
  return lines.join(CRLF + ' ');
}

// ───────────────────────── quoted-printable (2.1) ─────────────────────────

/** Encode UTF-8 bytes as Quoted-Printable tokens; line breaks become =0D=0A. */
export function qpEncode(s: string): string[] {
  const bytes = encoder.encode(s.replace(/\r\n|\r|\n/g, '\r\n'));
  const tokens: string[] = [];
  for (const b of bytes) {
    if ((b >= 33 && b <= 126 && b !== 61) || b === 32) tokens.push(String.fromCharCode(b));
    else tokens.push('=' + b.toString(16).toUpperCase().padStart(2, '0'));
  }
  // a space at the very end must be encoded
  if (tokens[tokens.length - 1] === ' ') tokens[tokens.length - 1] = '=20';
  return tokens;
}

/** Soft line breaks: each physical line ≤ 76 chars including the trailing "=". Never splits "=XX". */
function qpLine(prefix: string, tokens: string[]): string {
  const lines: string[] = [];
  let cur = prefix;
  for (const t of tokens) {
    if (cur.length + t.length > 75) {
      lines.push(cur + '=');
      cur = '';
    }
    cur += t;
  }
  lines.push(cur);
  return lines.join(CRLF);
}

// ───────────────────────── property writer ─────────────────────────

class Writer {
  lines: string[] = [];
  private item = 0;
  constructor(private readonly opts: Required<BuildOptions>) {}

  get v(): VCardVersion {
    return this.opts.version;
  }

  nextItem(): string {
    this.item++;
    return `item${this.item}.`;
  }

  /**
   * Write a property. `value` is already escaped for 3.0/4.0, or raw text for 2.1
   * (`components` tells 2.1 how to escape structured values).
   */
  prop(name: string, params: string[], value: string, kind: 'text' | 'raw' = 'text', components?: string[]): void {
    if (this.v === '2.1') {
      const text = components ? components.map((c) => escape21(c, true)).join(';') : kind === 'raw' ? value : escape21(value, false);
      const needQp = !isAscii(text) || /[\r\n]/.test(text);
      const p = [...params];
      if (needQp) {
        if (!isAscii(text)) p.push('CHARSET=UTF-8');
        p.push('ENCODING=QUOTED-PRINTABLE');
        this.lines.push(qpLine(`${name}${p.length ? ';' + p.join(';') : ''}:`, qpEncode(text)));
      } else {
        this.lines.push(foldLine(`${name}${p.length ? ';' + p.join(';') : ''}:${text}`));
      }
      return;
    }
    // RFC 6350 §3.4: ";" MUST be escaped in compound values (N, ADR, ORG) and MAY be elsewhere — 4.0 leaves it.
    // RFC 2426 §5 (3.0) requires escaping ";" in every TEXT value.
    const escaped = components
      ? components.map((c) => escapeText(c)).join(';')
      : kind === 'raw'
        ? value
        : escapeText(value, this.v === '3.0');
    const p = [...params];
    if (this.opts.charset && this.v === '3.0' && !isAscii(escaped)) p.push('CHARSET=UTF-8');
    this.lines.push(foldLine(`${name}${p.length ? ';' + p.join(';') : ''}:${escaped}`));
  }
}

// ───────────────────────── type parameters ─────────────────────────

function telTypes(t: PhoneType, v: VCardVersion): string[] {
  const map: Record<PhoneType, string[]> = {
    cell: ['CELL'],
    voice: ['VOICE'],
    home: ['HOME', 'VOICE'],
    work: ['WORK', 'VOICE'],
    main: v === '4.0' ? ['VOICE'] : ['MAIN'],
    fax: ['FAX'],
    homefax: ['HOME', 'FAX'],
    workfax: ['WORK', 'FAX'],
    pager: ['PAGER'],
    other: ['VOICE'],
  };
  return map[t];
}

function typeParams(types: string[], v: VCardVersion): string[] {
  if (types.length === 0) return [];
  if (v === '2.1') return types.map((t) => t.toUpperCase());
  if (v === '4.0') return [`TYPE=${types.map((t) => t.toLowerCase()).join(',')}`];
  return [`TYPE=${types.join(',')}`];
}

function dateValue(d: PartialDate, v: VCardVersion): string {
  return v === '4.0' ? formatPartialDate(d, 'basic') : formatPartialDate(d, 'iso');
}

function telUri(p: Phone): string | null {
  if (!p.e164 || !p.valid) return null;
  const ext = /ext\.\s*(\d+)$/.exec(p.value)?.[1];
  return `tel:${p.e164}${ext ? `;ext=${ext}` : ''}`;
}

const APPLE_LABEL = (l: string) => l;

// ───────────────────────── builder ─────────────────────────

/** Ensure FN and N are present: FN from parts → org → email → phone. */
export function displayName(c: Contact): string {
  return (
    c.fullName.trim() ||
    joinName(c) ||
    c.org.trim() ||
    c.emails[0]?.value ||
    c.phones[0]?.value ||
    'Unnamed'
  );
}

export function buildVCard(c: Contact, options: BuildOptions): string {
  const opts: Required<BuildOptions> = {
    charset: false,
    telUri: true,
    prodId: true,
    customLabels: true,
    ...options,
  };
  const v = opts.version;
  const w = new Writer(opts);
  w.lines.push('BEGIN:VCARD');
  w.lines.push(`VERSION:${v}`);
  if (opts.prodId && v !== '2.1') w.lines.push(`PRODID:${PRODID}`);

  const fn = displayName(c);
  const hasPersonName = !!(c.given || c.family || c.middle || c.prefix || c.suffix);
  const companyOnly = !hasPersonName && !c.fullName.trim() && !!c.org;
  if (companyOnly && v === '4.0') w.lines.push('KIND:org');

  // N is required in 2.1 and 3.0; in 4.0 it is optional but every importer reads it.
  let n = [c.family, c.given, c.middle, c.prefix, c.suffix];
  if (!hasPersonName && !companyOnly) n = ['', fn, '', '', ''];
  w.prop('N', [], '', 'text', n);
  w.prop('FN', [], fn);

  if (c.nickname && v !== '2.1') w.prop('NICKNAME', [], c.nickname);
  if (c.phoneticGiven) w.prop('X-PHONETIC-FIRST-NAME', [], c.phoneticGiven);
  if (c.phoneticMiddle) w.prop('X-PHONETIC-MIDDLE-NAME', [], c.phoneticMiddle);
  if (c.phoneticFamily) w.prop('X-PHONETIC-LAST-NAME', [], c.phoneticFamily);

  if (c.org || c.department) w.prop('ORG', [], '', 'text', c.department ? [c.org, c.department] : [c.org]);
  if (c.title) w.prop('TITLE', [], c.title);

  c.phones.forEach((p, i) => {
    const value = p.value.replace(/[\r\n;]+/g, ' ').trim();
    if (!value) return;
    const pref = i === 0 && c.phones.length > 1;
    const custom = p.label && opts.customLabels && v === '3.0' ? w.nextItem() : '';
    const types = telTypes(p.type, v);
    if (v === '4.0') {
      const uri = opts.telUri ? telUri(p) : null;
      const params = [...(uri ? ['VALUE=uri'] : []), ...typeParams(types, v), ...(pref ? ['PREF=1'] : [])];
      w.prop('TEL', params, uri ?? value, 'raw');
    } else {
      const params = [...typeParams(types, v), ...(pref ? [v === '2.1' ? 'PREF' : 'TYPE=PREF'] : [])];
      w.prop(`${custom}TEL`, params, value, 'raw');
      if (custom) w.prop(`${custom}X-ABLabel`, [], APPLE_LABEL(p.label!));
    }
  });

  c.emails.forEach((e, i) => {
    const value = e.value.trim();
    if (!value) return;
    const pref = i === 0 && c.emails.length > 1;
    const custom = e.label && opts.customLabels && v === '3.0' ? w.nextItem() : '';
    const t = e.type === 'other' || custom ? [] : [e.type.toUpperCase()];
    if (v === '4.0') {
      w.prop('EMAIL', [...typeParams(t, v), ...(pref ? ['PREF=1'] : [])], value);
    } else if (v === '2.1') {
      w.prop('EMAIL', ['INTERNET', ...t, ...(pref ? ['PREF'] : [])], value, 'raw');
    } else {
      w.prop(`${custom}EMAIL`, [`TYPE=${['INTERNET', ...t, ...(pref ? ['PREF'] : [])].join(',')}`], value);
      if (custom) w.prop(`${custom}X-ABLabel`, [], e.label!);
    }
  });

  c.addresses.forEach((a: Address) => {
    const comps = [a.poBox, a.extended, a.street, a.city, a.region, a.postalCode, a.country];
    if (comps.every((x) => !x)) return;
    const custom = a.label && opts.customLabels && v === '3.0' ? w.nextItem() : '';
    const t = custom ? [] : [a.type === 'other' ? (v === '2.1' ? 'POSTAL' : '') : a.type.toUpperCase()].filter(Boolean);
    w.prop(`${custom}ADR`, typeParams(t, v), '', 'text', comps);
    if (custom) w.prop(`${custom}X-ABLabel`, [], a.label!);
  });

  c.urls.forEach((u) => {
    const value = u.value.replace(/[\r\n]+/g, '').trim();
    if (!value) return;
    if (v === '4.0' && (u.type === 'home' || u.type === 'work')) w.prop('URL', [`TYPE=${u.type}`], value, 'raw');
    else w.prop('URL', [], value, 'raw');
  });

  if (c.birthday) w.prop('BDAY', [], dateValue(c.birthday, v), 'raw');
  if (c.anniversary) {
    if (v === '4.0') w.prop('ANNIVERSARY', [], dateValue(c.anniversary, v), 'raw');
    else if (v === '3.0') {
      const item = w.nextItem();
      w.prop(`${item}X-ABDATE`, [], dateValue(c.anniversary, v), 'raw');
      w.prop(`${item}X-ABLabel`, [], '_$!<Anniversary>!$_', 'raw');
    } else w.prop('X-ANNIVERSARY', [], dateValue(c.anniversary, v), 'raw');
  }

  if (c.note) w.prop('NOTE', [], c.note);
  if (c.categories.length && v !== '2.1') {
    w.prop('CATEGORIES', [], c.categories.map((x) => escapeText(x, v === '3.0')).join(','), 'raw');
  }
  if (companyOnly && v === '3.0') w.lines.push('X-ABShowAs:COMPANY');

  w.lines.push('END:VCARD');
  return w.lines.join(CRLF) + CRLF;
}

export function buildVCards(contacts: Contact[], options: BuildOptions): string {
  let out = '';
  for (const c of contacts) out += buildVCard(c, options);
  return out;
}

/** Safe, unique file names for "one .vcf per contact" ZIP export. */
export function vcardFileNames(contacts: Contact[]): string[] {
  const used = new Map<string, number>();
  return contacts.map((c) => {
    let base = displayName(c)
      .normalize('NFC')
      .replace(/[\\/:*?"<>|\x00-\x1f]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 80)
      .replace(/[. ]+$/, '');
    if (!base || /^(con|prn|aux|nul|com\d|lpt\d)$/i.test(base)) base = `contact-${c.row}`;
    const k = base.toLowerCase();
    const n = used.get(k) ?? 0;
    used.set(k, n + 1);
    return n === 0 ? `${base}.vcf` : `${base} (${n + 1}).vcf`;
  });
}
