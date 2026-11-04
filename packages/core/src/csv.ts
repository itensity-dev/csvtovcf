import Papa from 'papaparse';

export type Delimiter = ',' | ';' | '\t' | '|';
export const DELIMITERS: Delimiter[] = [',', ';', '\t', '|'];

export interface DelimiterGuess {
  delimiter: Delimiter;
  /** 0..1 */
  confidence: number;
  /** Excel's "sep=;" hint line was present (and must be skipped). */
  sepLine: boolean;
}

/** Split the first lines without breaking quoted fields that contain line breaks. */
function sampleLines(text: string, max: number): string[] {
  const lines: string[] = [];
  let inQuote = false;
  let start = 0;
  for (let i = 0; i < text.length && lines.length < max; i++) {
    const c = text.charCodeAt(i);
    if (c === 34 /* " */) inQuote = !inQuote;
    else if (!inQuote && (c === 10 || c === 13)) {
      lines.push(text.slice(start, i));
      if (c === 13 && text.charCodeAt(i + 1) === 10) i++;
      start = i + 1;
    }
  }
  if (lines.length < max && start < text.length) lines.push(text.slice(start));
  return lines.filter((l) => l.trim() !== '');
}

function countOutsideQuotes(line: string, d: string): number {
  let n = 0;
  let q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    else if (!q && ch === d) n++;
  }
  return n;
}

/**
 * Pick the delimiter whose per-line count is the most consistent and non-zero.
 * Handles Excel's "sep=;" first line and European ";" CSV.
 */
export function detectDelimiter(text: string): DelimiterGuess {
  const first = text.slice(0, 16).replace(/^\uFEFF/, '');
  const sep = /^sep=(.)\r?\n/i.exec(first);
  if (sep) {
    const d = sep[1] === '\\' ? '\t' : (sep[1] as Delimiter);
    if (DELIMITERS.includes(d)) return { delimiter: d, confidence: 1, sepLine: true };
  }
  const lines = sampleLines(text, 50);
  if (lines.length === 0) return { delimiter: ',', confidence: 0, sepLine: false };
  let best: Delimiter = ',';
  let bestScore = -1;
  let secondScore = -1;
  for (const d of DELIMITERS) {
    const counts = lines.map((l) => countOutsideQuotes(l, d));
    const nonZero = counts.filter((c) => c > 0).length;
    if (nonZero === 0) continue;
    // mode of counts
    const freq = new Map<number, number>();
    for (const c of counts) freq.set(c, (freq.get(c) ?? 0) + 1);
    let mode = 0;
    let modeFreq = 0;
    for (const [c, f] of freq) {
      if (c > 0 && (f > modeFreq || (f === modeFreq && c > mode))) {
        mode = c;
        modeFreq = f;
      }
    }
    const consistency = modeFreq / lines.length;
    // Prefer delimiters that produce more columns when equally consistent; tab and ; rarely appear in data.
    const score = consistency * 10 + Math.min(mode, 20) * 0.05 + (d === '\t' ? 0.2 : d === ';' ? 0.1 : 0);
    if (score > bestScore) {
      secondScore = bestScore;
      bestScore = score;
      best = d;
    } else if (score > secondScore) secondScore = score;
  }
  if (bestScore < 0) return { delimiter: ',', confidence: 0.3, sepLine: false };
  const confidence = Math.max(0.4, Math.min(1, (bestScore - Math.max(0, secondScore)) / 5 + 0.5));
  return { delimiter: best, confidence, sepLine: false };
}

export interface ParseCsvOptions {
  delimiter?: Delimiter;
  /** Stop after this many rows (for previews). */
  limit?: number;
}

export interface ParsedCsv {
  rows: string[][];
  delimiter: Delimiter;
  sepLine: boolean;
  errors: { row: number; message: string }[];
}

/** Parse CSV text into rows of strings. Uses PapaParse (RFC 4180 + real-world quirks). */
export function parseCsv(text: string, opts: ParseCsvOptions = {}): ParsedCsv {
  let src = text.replace(/^\uFEFF/, '');
  const guess = opts.delimiter
    ? { delimiter: opts.delimiter, sepLine: /^sep=.\r?\n/i.test(src) }
    : detectDelimiter(src);
  if (guess.sepLine) src = src.replace(/^sep=.\r?\n/i, '');
  const res = Papa.parse<string[]>(src, {
    delimiter: guess.delimiter,
    skipEmptyLines: false,
    preview: opts.limit ?? 0,
  });
  const rows = res.data.map((r) => (Array.isArray(r) ? r.map((c) => (c == null ? '' : String(c))) : []));
  // drop trailing empty rows
  while (rows.length && rows[rows.length - 1]!.every((c) => c.trim() === '')) rows.pop();
  return {
    rows,
    delimiter: guess.delimiter,
    sepLine: guess.sepLine,
    errors: res.errors
      .filter((e) => e.code !== 'UndetectableDelimiter')
      .slice(0, 50)
      .map((e) => ({ row: (e.row ?? 0) + 1, message: e.message })),
  };
}

/**
 * Find the header row: skips preambles such as LinkedIn's "Notes:" block
 * and empty lines. Returns -1 if the table has no header (first row is data).
 */
export function findHeaderRow(rows: string[][]): number {
  const maxScan = Math.min(rows.length, 15);
  const widths = rows.slice(0, 200).map((r) => r.filter((c) => c.trim() !== '').length);
  const typical = mode(widths.filter((w) => w > 0)) ?? 1;
  for (let i = 0; i < maxScan; i++) {
    const r = rows[i] ?? [];
    const filled = r.filter((c) => c.trim() !== '');
    if (filled.length === 0) continue;
    // A one-cell line in a multi-column table is a preamble ("Notes:", a title).
    if (typical >= 2 && filled.length === 1 && r.length < typical) continue;
    if (typical >= 2 && filled.length < Math.ceil(typical / 2)) continue;
    return looksLikeHeader(filled) ? i : -1;
  }
  return -1;
}

function mode(xs: number[]): number | undefined {
  const f = new Map<number, number>();
  let best: number | undefined;
  let bf = 0;
  for (const x of xs) {
    const n = (f.get(x) ?? 0) + 1;
    f.set(x, n);
    if (n > bf || (n === bf && best !== undefined && x > best)) {
      bf = n;
      best = x;
    }
  }
  return best;
}

/** Header cells are short labels — not emails, not phone numbers, not dates. */
export function looksLikeHeader(cells: string[]): boolean {
  let dataLike = 0;
  for (const c of cells) {
    const t = c.trim();
    if (/@/.test(t) && /\.\w{2,}$/.test(t)) dataLike++;
    else if (/^[+\d][\d\s().\-/]{5,}$/.test(t)) dataLike++;
    else if (/^\d{1,4}[./-]\d{1,2}[./-]\d{1,4}$/.test(t)) dataLike++;
    else if (/^https?:\/\//i.test(t)) dataLike++;
  }
  return dataLike === 0 || dataLike / cells.length < 0.25;
}
