/**
 * The converter state machine. Runs inside the Web Worker in the browser
 * (contact data never lives on the page's global scope) and at build time to pre-render the demo.
 */
import {
  ENCODINGS,
  applyMerges,
  autoMap,
  buildVCard,
  buildVCards,
  columnLetter,
  convertTable,
  decode,
  detectDelimiter,
  detectEncoding,
  emptyStats,
  findDuplicates,
  mergeStats,
  parseCsv,
  tableFromRows,
  toGoogleCsv,
  toOutlookCsv,
  vcardFileNames,
  type ColumnMapping,
  type Contact,
  type ConvertStats,
  type CountryCode,
  type Delimiter,
  type EncodingGuess,
  type SkippedRow,
  type SourceInfo,
} from 'csvtovcf';
import type { ContactWarningCode, PhoneMode, VCardVersion } from 'csvtovcf';

export type OutputFormat = 'vcf' | 'zip' | 'google' | 'outlook';

export interface ToolOptions {
  version: VCardVersion;
  phoneMode: PhoneMode;
  country: string;
  output: OutputFormat;
  mergeDuplicates: boolean;
  splitFullName: boolean;
  charset: boolean;
}

export const DEFAULT_OPTIONS: ToolOptions = {
  version: '3.0',
  phoneMode: 'e164',
  country: 'US',
  output: 'vcf',
  mergeDuplicates: false,
  splitFullName: true,
  charset: false,
};

export type FileKind = 'csv' | 'xlsx' | 'xls' | 'ods' | 'paste' | 'demo';

export interface ColumnInfo {
  index: number;
  letter: string;
  header: string;
  samples: string[];
  filled: number;
  numericCells: number;
}

export interface FileMeta {
  name: string;
  size: number;
  kind: FileKind;
  encoding?: string;
  encodingGuess?: Pick<EncodingGuess, 'encoding' | 'confidence' | 'method' | 'bom'> & { candidates: string[] };
  delimiter?: Delimiter;
  sheets?: { name: string; hidden: boolean; rows: number }[];
  sheet: number;
  hasHeader: boolean;
  headerDetected: boolean;
  columns: ColumnInfo[];
  previewRows: string[][];
  rowCount: number;
  firstRowNumber: number;
  source: SourceInfo;
  mapping: ColumnMapping[];
  parseErrors: number;
}

export interface WarningItem {
  file: number;
  row: number;
  name: string;
  code: ContactWarningCode;
  value: string;
}

export interface DuplicatePreview {
  by: ('phone' | 'email')[];
  keys: string[];
  members: Contact[];
}

export interface Summary {
  stats: ConvertStats;
  total: number;
  duplicates: { groups: number; contacts: number; preview: DuplicatePreview[] };
  skipped: SkippedRow[];
  warnings: WarningItem[];
  warningCounts: Partial<Record<ContactWarningCode, number>>;
  page: Contact[];
  pageSize: number;
  /** First vCard of the output, as text — the "what will be written" preview. */
  sampleVcf: string;
}

export type CardFilter = 'all' | 'warnings';

interface LoadedFile {
  meta: FileMeta;
  bytes?: Uint8Array;
  text?: string;
  rawRows: string[][];
  sheetsRows?: string[][][];
  sheetsNumeric?: number[][];
}

const PAGE_SIZE = 12;
const LIST_CAP = 500;

function extKind(name: string, bytes?: Uint8Array): FileKind {
  const n = name.toLowerCase();
  if (bytes && bytes[0] === 0x50 && bytes[1] === 0x4b) return n.endsWith('.ods') ? 'ods' : 'xlsx';
  if (bytes && bytes[0] === 0xd0 && bytes[1] === 0xcf) return 'xls';
  if (n.endsWith('.xlsx') || n.endsWith('.xlsm')) return 'xlsx';
  if (n.endsWith('.xls')) return 'xls';
  if (n.endsWith('.ods')) return 'ods';
  return 'csv';
}

export function baseName(name: string): string {
  return name.replace(/\.[^.]+$/, '').replace(/[\\/:*?"<>|]/g, '').trim() || 'contacts';
}

export class Engine {
  files: LoadedFile[] = [];
  options: ToolOptions = { ...DEFAULT_OPTIONS };
  locale = 'en';
  private contacts: Contact[] = [];
  private filtered: Contact[] | null = null;

  constructor(locale = 'en') {
    this.locale = locale;
  }

  meta(): FileMeta[] {
    return this.files.map((f) => f.meta);
  }

  clear(): void {
    this.files = [];
    this.contacts = [];
    this.filtered = null;
  }

  async addBytes(name: string, bytes: Uint8Array): Promise<void> {
    const kind = extKind(name, bytes);
    if (kind === 'xlsx' || kind === 'xls' || kind === 'ods') {
      const { readWorkbook } = await import('csvtovcf/spreadsheet');
      const wb = await readWorkbook(bytes);
      const visible = wb.sheets.findIndex((s) => !s.hidden && s.rows.length > 0);
      const sheet = visible >= 0 ? visible : 0;
      const f: LoadedFile = {
        meta: this.emptyMeta(name, bytes.length, kind),
        rawRows: wb.sheets[sheet]?.rows ?? [],
        sheetsRows: wb.sheets.map((s) => s.rows),
        sheetsNumeric: wb.sheets.map((s) => s.numericCells),
      };
      f.meta.sheets = wb.sheets.map((s) => ({ name: s.name, hidden: s.hidden, rows: s.rows.length }));
      f.meta.sheet = sheet;
      this.files.push(f);
      this.analyse(this.files.length - 1);
      return;
    }
    const guess = detectEncoding(bytes, { locale: this.locale });
    const f: LoadedFile = { meta: this.emptyMeta(name, bytes.length, 'csv'), bytes, rawRows: [] };
    f.meta.encoding = guess.encoding;
    f.meta.encodingGuess = {
      encoding: guess.encoding,
      confidence: guess.confidence,
      method: guess.method,
      bom: guess.bom,
      candidates: guess.candidates.map((c) => c.encoding),
    };
    this.files.push(f);
    this.decodeAndParse(this.files.length - 1);
  }

  addText(name: string, text: string, kind: FileKind = 'paste'): void {
    const f: LoadedFile = { meta: this.emptyMeta(name, text.length, kind), text, rawRows: [] };
    f.meta.encoding = 'utf-8';
    this.files.push(f);
    this.decodeAndParse(this.files.length - 1);
  }

  addTable(name: string, rows: string[][], kind: FileKind = 'demo'): void {
    const f: LoadedFile = { meta: this.emptyMeta(name, 0, kind), rawRows: rows };
    this.files.push(f);
    this.analyse(this.files.length - 1);
  }

  remove(i: number): void {
    this.files.splice(i, 1);
  }

  /** Change encoding / delimiter / sheet / header flag and re-analyse (mapping is re-detected). */
  reparse(i: number, ch: { encoding?: string; delimiter?: Delimiter; sheet?: number; hasHeader?: boolean }): void {
    const f = this.files[i];
    if (!f) return;
    if (ch.encoding) f.meta.encoding = ch.encoding;
    if (ch.delimiter) f.meta.delimiter = ch.delimiter;
    if (ch.hasHeader !== undefined) f.meta.hasHeader = ch.hasHeader;
    if (ch.sheet !== undefined && f.sheetsRows) {
      f.meta.sheet = ch.sheet;
      f.rawRows = f.sheetsRows[ch.sheet] ?? [];
      f.meta.hasHeader = true;
      this.analyse(i, true);
      return;
    }
    if (ch.encoding || ch.delimiter) this.decodeAndParse(i, !!ch.delimiter);
    else this.analyse(i, ch.hasHeader !== undefined);
  }

  setMapping(i: number, mapping: ColumnMapping[]): void {
    const f = this.files[i];
    if (f) f.meta.mapping = mapping;
  }

  private emptyMeta(name: string, size: number, kind: FileKind): FileMeta {
    return {
      name,
      size,
      kind,
      sheet: 0,
      hasHeader: true,
      headerDetected: true,
      columns: [],
      previewRows: [],
      rowCount: 0,
      firstRowNumber: 2,
      source: { id: 'generic', confidence: 0 },
      mapping: [],
      parseErrors: 0,
    };
  }

  private decodeAndParse(i: number, keepDelimiter = false): void {
    const f = this.files[i]!;
    const text = f.text ?? decode(f.bytes!, f.meta.encoding ?? 'utf-8');
    const delimiter = keepDelimiter && f.meta.delimiter ? f.meta.delimiter : detectDelimiter(text).delimiter;
    const parsed = parseCsv(text, { delimiter });
    f.meta.delimiter = parsed.delimiter;
    f.meta.parseErrors = parsed.errors.length;
    f.rawRows = parsed.rows;
    this.analyse(i, false);
  }

  private analyse(i: number, keepHeaderFlag = false): void {
    const f = this.files[i]!;
    const forced = keepHeaderFlag ? f.meta.hasHeader : undefined;
    const table = tableFromRows(f.rawRows, forced);
    if (!keepHeaderFlag) {
      f.meta.hasHeader = table.headers !== null;
      f.meta.headerDetected = table.headers !== null;
    }
    const width = Math.max(table.headers?.length ?? 0, ...table.rows.slice(0, 200).map((r) => r.length), 0);
    const numeric = f.sheetsNumeric?.[f.meta.sheet] ?? [];
    const columns: ColumnInfo[] = [];
    for (let c = 0; c < width; c++) {
      const samples: string[] = [];
      let filled = 0;
      for (const r of table.rows) {
        const v = (r[c] ?? '').trim();
        if (!v) continue;
        filled++;
        if (samples.length < 3 && !samples.includes(v)) samples.push(v.length > 60 ? v.slice(0, 57) + '…' : v);
      }
      columns.push({ index: c, letter: columnLetter(c), header: table.headers?.[c] ?? '', samples, filled, numericCells: numeric[c] ?? 0 });
    }
    const auto = autoMap({ headers: table.headers, sample: table.rows.slice(0, 200), locale: this.locale });
    f.meta.columns = columns;
    f.meta.previewRows = table.rows.slice(0, 6).map((r) => Array.from({ length: width }, (_, k) => r[k] ?? ''));
    f.meta.rowCount = table.rows.length;
    f.meta.firstRowNumber = table.firstRowNumber;
    f.meta.source = auto.source;
    f.meta.mapping = auto.mapping;
  }

  convert(options: Partial<ToolOptions> = {}): Summary {
    this.options = { ...this.options, ...options };
    const o = this.options;
    let stats = emptyStats();
    const skipped: SkippedRow[] = [];
    let all: Contact[] = [];
    this.files.forEach((f, fi) => {
      const table = tableFromRows(f.rawRows, f.meta.hasHeader);
      const res = convertTable({ ...table, file: fi }, f.meta.mapping, {
        phoneMode: o.phoneMode,
        defaultCountry: o.country as CountryCode,
        locale: this.locale,
        splitFullName: o.splitFullName,
      });
      stats = mergeStats(stats, res.stats);
      for (const s of res.skipped) if (skipped.length < LIST_CAP) skipped.push(s);
      all = all.concat(res.contacts);
    });
    const groups = findDuplicates(all);
    const preview: DuplicatePreview[] = groups.slice(0, 50).map((g) => ({ by: g.by, keys: g.keys, members: g.members.map((m) => all[m]!) }));
    const dupContacts = groups.reduce((n, g) => n + g.members.length, 0);
    this.contacts = o.mergeDuplicates ? applyMerges(all, groups) : all;
    this.filtered = null;

    const warnings: WarningItem[] = [];
    const warningCounts: Summary['warningCounts'] = {};
    for (const c of this.contacts) {
      for (const w of c.warnings) {
        warningCounts[w.code] = (warningCounts[w.code] ?? 0) + 1;
        if (warnings.length < LIST_CAP) warnings.push({ file: c.file, row: c.row, name: c.fullName, code: w.code, value: w.value ?? '' });
      }
    }
    const first = this.contacts[0];
    return {
      stats,
      total: this.contacts.length,
      duplicates: { groups: groups.length, contacts: dupContacts, preview },
      skipped,
      warnings,
      warningCounts,
      page: this.contacts.slice(0, PAGE_SIZE),
      pageSize: PAGE_SIZE,
      sampleVcf: first ? buildVCard(first, { version: o.version, charset: o.charset }) : '',
    };
  }

  page(filter: CardFilter, page: number): { page: Contact[]; total: number } {
    let list = this.contacts;
    if (filter === 'warnings') {
      this.filtered ??= this.contacts.filter((c) => c.warnings.length > 0);
      list = this.filtered;
    }
    return { page: list.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE), total: list.length };
  }

  async export(format: OutputFormat = this.options.output): Promise<{ name: string; mime: string; bytes: Uint8Array }> {
    const o = this.options;
    const base = baseName(this.files[0]?.meta.name ?? 'contacts');
    const enc = new TextEncoder();
    switch (format) {
      case 'zip': {
        const { zipSync, strToU8 } = await import('fflate');
        const names = vcardFileNames(this.contacts);
        const entries: Record<string, Uint8Array> = {};
        this.contacts.forEach((c, i) => {
          entries[names[i]!] = strToU8(buildVCard(c, { version: o.version, charset: o.charset }));
        });
        return { name: `${base}-vcards.zip`, mime: 'application/zip', bytes: zipSync(entries, { level: 6 }) };
      }
      case 'google':
        return { name: `${base}-google.csv`, mime: 'text/csv;charset=utf-8', bytes: enc.encode(toGoogleCsv(this.contacts)) };
      case 'outlook':
        return { name: `${base}-outlook.csv`, mime: 'text/csv;charset=utf-8', bytes: enc.encode(toOutlookCsv(this.contacts)) };
      default:
        return {
          name: `${base}.vcf`,
          mime: 'text/vcard;charset=utf-8',
          bytes: enc.encode(buildVCards(this.contacts, { version: o.version, charset: o.charset })),
        };
    }
  }
}

export { ENCODINGS };
