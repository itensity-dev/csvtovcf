import type { ColumnMapping, FieldKey } from './fields.js';
import { fieldFamily } from './fields.js';
import type { Address, AddressType, Contact, EmailType, PhoneType, UrlType } from './types.js';
import { emptyAddress, emptyContact } from './types.js';
import { clean, cleanMultiline, looksLikeEmail, splitMulti } from './text.js';
import { joinName, splitFullName } from './names.js';
import { inferPhoneType, normalizePhone, type CountryCode } from './phones.js';
import type { PhoneMode } from './types.js';
import { detectDateOrder, parseDate, type DateOrder } from './dates.js';
import { countryFromName } from './countries.js';

export interface ConvertOptions {
  /** Country for numbers written without a country code. */
  defaultCountry?: CountryCode;
  phoneMode: PhoneMode;
  /** 'auto' looks at each date column as a whole. */
  dateOrder?: DateOrder | 'auto';
  /** Page language: name order heuristics and date defaults. */
  locale?: string;
  /** Split a one-cell full name into given/family parts for the N property. Default true. */
  splitFullName?: boolean;
  /** Use the contact's address country (if any) as the phone country for that row. Default true. */
  countryFromAddress?: boolean;
}

export interface TableInput {
  /** Header cells (null when the table has no header row). */
  headers: string[] | null;
  rows: string[][];
  /** 1-based row number of rows[0] in the original file/sheet — for the report. */
  firstRowNumber: number;
  /** Index of the file when several files are combined. */
  file?: number;
}

export type SkipReason = 'empty' | 'no-contact-data' | 'repeated-header';

export interface SkippedRow {
  file: number;
  row: number;
  reason: SkipReason;
}

export interface ConvertStats {
  rows: number;
  contacts: number;
  skipped: Record<SkipReason, number>;
  phones: number;
  phonesInvalid: number;
  phonesExcelLost: number;
  phonesExcelRestored: number;
  phonesPlusAdded: number;
  emails: number;
  emailsInvalid: number;
  datesUnparsed: number;
  namesFromFallback: number;
}

export interface ConvertResult {
  contacts: Contact[];
  skipped: SkippedRow[];
  stats: ConvertStats;
}

export function emptyStats(): ConvertStats {
  return {
    rows: 0,
    contacts: 0,
    skipped: { empty: 0, 'no-contact-data': 0, 'repeated-header': 0 },
    phones: 0,
    phonesInvalid: 0,
    phonesExcelLost: 0,
    phonesExcelRestored: 0,
    phonesPlusAdded: 0,
    emails: 0,
    emailsInvalid: 0,
    datesUnparsed: 0,
    namesFromFallback: 0,
  };
}

const PHONE_LABELS: [RegExp, PhoneType][] = [
  [/(work|business).*fax|fax.*(work|business)|telecopie.*bureau/i, 'workfax'],
  [/home.*fax|fax.*home/i, 'homefax'],
  [/fax|факс|faks/i, 'fax'],
  [/pager|пейджер/i, 'pager'],
  [/mobile|cell|celular|móvil|movil|handy|мобил|сотов|ponsel|hp|cep|whatsapp|iphone/i, 'cell'],
  [/main|primary|principal|основн|haupt/i, 'main'],
  [/work|business|office|trabajo|trabalho|рабоч|arbeit|geschäft|kantor|iş/i, 'work'],
  [/home|casa|домаш|privat|rumah|ev\b/i, 'home'],
  [/other|другой|otro|outro|lainnya/i, 'other'],
];

/** Labels that are just the type itself — not kept as a custom label. */
const STANDARD_PHONE_LABEL = /^(mobile|cell|cellular|work|home|main|other|pager|fax|work fax|home fax|other fax|business|private|phone|voice)$/i;

function phoneTypeFromLabel(label: string): PhoneType | null {
  const l = label.replace(/^\*\s*/, '').trim();
  if (!l) return null;
  for (const [re, t] of PHONE_LABELS) if (re.test(l)) return t;
  return 'other';
}

function simpleTypeFromLabel(label: string): 'home' | 'work' | 'other' | null {
  const l = label.replace(/^\*\s*/, '').trim();
  if (!l) return null;
  if (/work|business|office|trabajo|trabalho|рабоч|arbeit|geschäft|kantor|iş/i.test(l)) return 'work';
  if (/home|personal|casa|домаш|privat|rumah|\bev\b/i.test(l)) return 'home';
  return 'other';
}

/** Google adds "* myContacts" / "* starred"; old exports add "System Group: My Contacts". */
function cleanCategories(v: string): string[] {
  return splitMulti(v, { comma: true })
    .map((c) => c.replace(/^\*\s*/, '').trim())
    .filter((c) => c && !/^(mycontacts|starred|system group:.*)$/i.test(c.replace(/\s+/g, '')) && !/^system group:/i.test(c));
}

interface ColumnPlan {
  index: number;
  header: string;
  mapping: ColumnMapping;
  dateOrder?: DateOrder;
}

/** Split label/value pairs packed in one cell with " ::: " (Google) */
function pairValues(values: string[], labels: string[]): { value: string; label: string }[] {
  return values.map((value, i) => ({ value, label: labels[i] ?? labels[0] ?? '' }));
}

export function convertTable(table: TableInput, mappingIn: ColumnMapping[], opts: ConvertOptions): ConvertResult {
  const file = table.file ?? 0;
  const stats = emptyStats();
  const contacts: Contact[] = [];
  const skipped: SkippedRow[] = [];
  const split = opts.splitFullName !== false;
  const locale = opts.locale ?? 'en';

  const plans: ColumnPlan[] = mappingIn
    .map((mapping, index) => ({ index, header: table.headers?.[index] ?? '', mapping }))
    .filter((p) => p.mapping.field !== 'ignore');

  // Per-column date order, decided once from the whole column.
  for (const p of plans) {
    if (fieldFamily(p.mapping.field) === 'date' && p.mapping.field !== 'event.label') {
      const order = opts.dateOrder && opts.dateOrder !== 'auto' ? opts.dateOrder : detectDateOrder(table.rows.map((r) => r[p.index] ?? ''), locale);
      p.dateOrder = order;
    }
  }
  const noteColumns = plans.filter((p) => p.mapping.field === 'note').length;
  const countryColumns = plans.filter((p) => p.mapping.field === 'adr.country').map((p) => p.index);
  const headerKey = table.headers ? table.headers.map((h) => h.trim().toLowerCase()).join('\u0001') : null;

  // label columns by group
  const labelOf = new Map<string, number>();
  for (const p of plans) {
    if (p.mapping.field.endsWith('.label') && p.mapping.group) labelOf.set(`${fieldFamily(p.mapping.field)}:${p.mapping.group}`, p.index);
  }

  table.rows.forEach((row, ri) => {
    const rowNumber = table.firstRowNumber + ri;
    stats.rows++;
    if (row.every((c) => !c || c.trim() === '')) {
      skipped.push({ file, row: rowNumber, reason: 'empty' });
      stats.skipped.empty++;
      return;
    }
    if (headerKey && row.map((h) => (h ?? '').trim().toLowerCase()).join('\u0001') === headerKey) {
      skipped.push({ file, row: rowNumber, reason: 'repeated-header' });
      stats.skipped['repeated-header']++;
      return;
    }
    const c = emptyContact(file, rowNumber);
    const addresses = new Map<string, Address>();
    const notes: string[] = [];
    let fullName = '';

    const cell = (i: number) => row[i] ?? '';
    let rowCountry: CountryCode | undefined = opts.defaultCountry;
    if (opts.countryFromAddress !== false) {
      for (const ci of countryColumns) {
        const cc = countryFromName(cell(ci));
        if (cc) {
          rowCountry = cc;
          break;
        }
      }
    }
    const labelsFor = (family: string, group: string | undefined): string[] => {
      if (!group) return [];
      const li = labelOf.get(`${family}:${group}`);
      return li === undefined ? [] : splitMulti(cell(li)).length ? cell(li).split(/\s*:::\s*/) : [];
    };

    for (const p of plans) {
      const raw = cell(p.index);
      if (!raw || !raw.trim()) continue;
      const f: FieldKey = p.mapping.field;
      switch (f) {
        case 'name.full':
          fullName = clean(raw);
          break;
        case 'name.prefix':
          c.prefix = clean(raw);
          break;
        case 'name.given':
          c.given = clean(raw);
          break;
        case 'name.middle':
          c.middle = clean(raw);
          break;
        case 'name.family':
          c.family = clean(raw);
          break;
        case 'name.suffix':
          c.suffix = clean(raw);
          break;
        case 'name.nickname':
          c.nickname = clean(raw);
          break;
        case 'name.phoneticGiven':
          c.phoneticGiven = clean(raw);
          break;
        case 'name.phoneticMiddle':
          c.phoneticMiddle = clean(raw);
          break;
        case 'name.phoneticFamily':
          c.phoneticFamily = clean(raw);
          break;
        case 'org.name':
          c.org = clean(raw);
          break;
        case 'org.department':
          c.department = clean(raw);
          break;
        case 'org.title':
          c.title = clean(raw);
          break;
        case 'phone': {
          const values = raw.includes(':::') ? raw.split(/\s*:::\s*/) : splitPhones(raw);
          const labels = labelsFor('phone', p.mapping.group);
          for (const { value, label } of pairValues(values, labels)) {
            if (!value.trim()) continue;
            const fixedType = (p.mapping.type as PhoneType | undefined) ?? 'voice';
            const labelType = phoneTypeFromLabel(label);
            const n = normalizePhone(value, {
              mode: opts.phoneMode,
              ...(rowCountry ? { defaultCountry: rowCountry } : {}),
            });
            const type = labelType ?? inferPhoneType(n.kind, fixedType);
            const cleanLabel = label.replace(/^\*\s*/, '').trim();
            c.phones.push({
              value: n.value,
              raw: value,
              type,
              valid: n.valid,
              ...(n.e164 ? { e164: n.e164 } : {}),
              ...(n.issue ? { issue: n.issue } : {}),
              ...(cleanLabel && !STANDARD_PHONE_LABEL.test(cleanLabel) ? { label: cleanLabel } : {}),
            });
            stats.phones++;
            if (n.issue === 'excel-scientific') {
              stats.phonesExcelLost++;
              c.warnings.push({ code: 'phone-excel-scientific', value });
            } else if (n.valid === false) {
              stats.phonesInvalid++;
              c.warnings.push({ code: 'phone-invalid', value });
            }
            if (n.issue === 'excel-scientific-restored') {
              stats.phonesExcelRestored++;
              c.warnings.push({ code: 'phone-excel-restored', value });
            }
            if (n.issue === 'added-plus') {
              stats.phonesPlusAdded++;
              c.warnings.push({ code: 'phone-added-plus', value });
            }
          }
          break;
        }
        case 'email': {
          const values = splitMulti(raw, { comma: true });
          const labels = labelsFor('email', p.mapping.group);
          for (const { value, label } of pairValues(values, labels)) {
            const v = value.replace(/^mailto:/i, '').trim();
            if (!v) continue;
            const type = (simpleTypeFromLabel(label) ?? (p.mapping.type as EmailType | undefined) ?? 'other') as EmailType;
            const cleanLabel = label.replace(/^\*\s*/, '').trim();
            c.emails.push({ value: v, type, ...(cleanLabel && type === 'other' && !/^other$/i.test(cleanLabel) ? { label: cleanLabel } : {}) });
            stats.emails++;
            if (!looksLikeEmail(v)) {
              stats.emailsInvalid++;
              c.warnings.push({ code: 'email-invalid', value: v });
            }
          }
          break;
        }
        case 'url': {
          const values = splitMulti(raw);
          const labels = labelsFor('url', p.mapping.group);
          for (const { value, label } of pairValues(values, labels)) {
            const v = value.trim();
            if (!v) continue;
            const lt = simpleTypeFromLabel(label);
            const type = ((lt && lt !== 'other' ? lt : undefined) ?? (p.mapping.type as UrlType | undefined) ?? 'other') as UrlType;
            const cleanLabel = label.replace(/^\*\s*/, '').trim();
            c.urls.push({ value: v, type, ...(cleanLabel && lt === 'other' ? { label: cleanLabel } : {}) });
          }
          break;
        }
        case 'adr.full':
        case 'adr.street':
        case 'adr.extended':
        case 'adr.poBox':
        case 'adr.city':
        case 'adr.region':
        case 'adr.postalCode':
        case 'adr.country': {
          const g = p.mapping.group ?? p.mapping.type ?? 'a';
          let a = addresses.get(g);
          if (!a) {
            const labels = labelsFor('adr', p.mapping.group);
            const lt = labels[0] ? simpleTypeFromLabel(labels[0]) : null;
            a = emptyAddress((lt ?? (p.mapping.type as AddressType | undefined) ?? 'home') as AddressType);
            const cleanLabel = (labels[0] ?? '').replace(/^\*\s*/, '').trim();
            if (cleanLabel && lt === 'other') a.label = cleanLabel;
            addresses.set(g, a);
          }
          const v = f === 'adr.full' || f === 'adr.street' ? cleanMultiline(raw) : clean(raw);
          const key = ({
            'adr.full': 'label',
            'adr.street': 'street',
            'adr.extended': 'extended',
            'adr.poBox': 'poBox',
            'adr.city': 'city',
            'adr.region': 'region',
            'adr.postalCode': 'postalCode',
            'adr.country': 'country',
          } as const)[f];
          if (key === 'label') (a as Address & { _full?: string })._full = v;
          else a[key] = a[key] ? `${a[key]}\n${v}` : v;
          break;
        }
        case 'birthday':
        case 'anniversary': {
          const d = parseDate(raw, p.dateOrder);
          if (d) c[f] = d;
          else if (!/^0{1,2}[./-]0{1,2}[./-]0{2,4}$/.test(raw.trim())) {
            stats.datesUnparsed++;
            c.warnings.push({ code: 'date-unparsed', value: raw });
            notes.push(`${p.header || f}: ${raw.trim()}`);
          }
          break;
        }
        case 'event': {
          const labels = labelsFor('date', p.mapping.group);
          const values = raw.split(/\s*:::\s*/);
          pairValues(values, labels).forEach(({ value, label }) => {
            const d = parseDate(value, p.dateOrder);
            const l = label.replace(/^\*\s*/, '').trim();
            if (d && /birthday|geburtstag|день рожд|cumple|aniversário|anniversaire/i.test(l) && !c.birthday) c.birthday = d;
            else if (d && /anniversary|jahrestag|годовщ|aniversario|yıldönümü/i.test(l) && !c.anniversary) c.anniversary = d;
            else notes.push(`${l || p.header || 'Event'}: ${value.trim()}`);
          });
          break;
        }
        case 'custom': {
          const labels = labelsFor('other', p.mapping.group);
          const values = raw.split(/\s*:::\s*/);
          pairValues(values, labels).forEach(({ value, label }) => {
            const l = label.replace(/^\*\s*/, '').trim();
            notes.push(l ? `${l}: ${value.trim()}` : value.trim());
          });
          break;
        }
        case 'note': {
          const v = cleanMultiline(raw);
          notes.push(noteColumns > 1 && p.header ? `${p.header}: ${v}` : v);
          break;
        }
        case 'categories':
          for (const cat of cleanCategories(raw)) if (!c.categories.includes(cat)) c.categories.push(cat);
          break;
        default:
          break;
      }
    }

    for (const a of addresses.values()) {
      const full = (a as Address & { _full?: string })._full;
      delete (a as Address & { _full?: string })._full;
      // A one-cell address ("Alamat") next to a city column: the full text becomes the street line.
      // Google's "Formatted" repeats the parts, so it is only used when there is no street.
      if (!a.street && full) a.street = full;
      if (a.street || a.city || a.region || a.postalCode || a.country || a.poBox || a.extended) c.addresses.push(a);
    }
    c.note = notes.filter(Boolean).join('\n');

    // ── names ──
    const hasParts = c.given || c.family || c.middle || c.prefix || c.suffix;
    if (fullName) {
      c.fullName = fullName;
      if (!hasParts && split) {
        const parts = splitFullName(fullName, { locale });
        Object.assign(c, parts);
      } else if (!hasParts) {
        c.given = fullName;
      }
    } else if (hasParts) {
      c.fullName = joinName(c);
    }

    const hasData = c.fullName || c.phones.length || c.emails.length || c.org || c.addresses.length;
    if (!hasData) {
      skipped.push({ file, row: rowNumber, reason: 'no-contact-data' });
      stats.skipped['no-contact-data']++;
      return;
    }
    if (!c.fullName) {
      stats.namesFromFallback++;
      if (c.org) {
        c.fullName = c.org;
        c.warnings.push({ code: 'name-from-org', value: c.org });
      } else if (c.emails[0]) {
        c.fullName = c.emails[0].value;
        c.warnings.push({ code: 'name-from-email', value: c.emails[0].value });
      } else if (c.phones[0]) {
        c.fullName = c.phones[0].value;
        c.warnings.push({ code: 'name-from-phone', value: c.phones[0].value });
      } else if (c.addresses[0]) {
        c.fullName = c.addresses[0].street || c.addresses[0].city;
      }
    }
    contacts.push(c);
  });
  stats.contacts = contacts.length;
  return { contacts, skipped, stats };
}

/**
 * Several numbers in one cell: "+1 555 0100, +1 555 0101", "555-0100 / 555-0101", line breaks.
 * Only splits if every part has enough digits to be a phone.
 */
export function splitPhones(raw: string): string[] {
  const parts = raw.split(/\s*(?:[,;\n]|\s\/\s|\s\|\s)\s*/).map((s) => s.trim()).filter(Boolean);
  if (parts.length > 1 && parts.every((p) => p.replace(/\D/g, '').length >= 5)) return parts;
  return [raw.trim()];
}

export function mergeStats(a: ConvertStats, b: ConvertStats): ConvertStats {
  const out = emptyStats();
  for (const k of Object.keys(out) as (keyof ConvertStats)[]) {
    if (k === 'skipped') continue;
    (out[k] as number) = (a[k] as number) + (b[k] as number);
  }
  for (const r of Object.keys(out.skipped) as SkipReason[]) out.skipped[r] = a.skipped[r] + b.skipped[r];
  return out;
}
