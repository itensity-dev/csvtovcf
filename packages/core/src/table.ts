import { findHeaderRow } from './csv.js';

export interface LoadedTable {
  /** Header cells, or null when the first row is already data. */
  headers: string[] | null;
  /** Data rows (after the header). */
  rows: string[][];
  /** 1-based row number of rows[0] in the file, for the report ("row 17 skipped"). */
  firstRowNumber: number;
  /** 0-based index of the header row in the raw rows, -1 if none. */
  headerRow: number;
  /** Rows above the header (preamble such as LinkedIn's "Notes:") that were skipped. */
  preamble: number;
}

/**
 * Split raw rows into header + data. `hasHeader` overrides detection
 * (the user can untick "first row is a header").
 */
export function tableFromRows(raw: string[][], hasHeader?: boolean): LoadedTable {
  let headerRow = findHeaderRow(raw);
  let preamble = 0;
  if (hasHeader === false) {
    // keep detected preamble skipping, but treat the first content row as data
    const firstContent = raw.findIndex((r) => r.some((c) => c.trim() !== ''));
    preamble = Math.max(0, headerRow >= 0 ? headerRow : firstContent);
    headerRow = -1;
  } else if (hasHeader === true && headerRow < 0) {
    headerRow = Math.max(0, raw.findIndex((r) => r.some((c) => c.trim() !== '')));
  }
  if (headerRow >= 0) {
    const width = Math.max(...raw.slice(headerRow, headerRow + 200).map((r) => r.length));
    const headers = Array.from({ length: width }, (_, i) => (raw[headerRow]![i] ?? '').trim());
    return { headers, rows: raw.slice(headerRow + 1), firstRowNumber: headerRow + 2, headerRow, preamble: headerRow };
  }
  return { headers: null, rows: raw.slice(preamble), firstRowNumber: preamble + 1, headerRow: -1, preamble };
}

/** "A", "B", ... "AA" — column letters as Excel shows them. */
export function columnLetter(i: number): string {
  let s = '';
  let n = i + 1;
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}
