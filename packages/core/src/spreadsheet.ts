/**
 * XLSX / XLS / ODS reading via SheetJS. Kept in a separate entry point
 * ("csvtovcf/spreadsheet") so the ~400 KB library is only loaded when a workbook is opened.
 */
import { fromExcelSerial, formatPartialDate } from './dates';

export interface SheetData {
  name: string;
  hidden: boolean;
  rows: string[][];
  /** Per column: how many cells were stored as numbers (phones may have lost "+" or a leading 0). */
  numericCells: number[];
}

export interface WorkbookData {
  sheets: SheetData[];
}

type XLSXModule = typeof import('xlsx');
let xlsxPromise: Promise<XLSXModule> | null = null;
let cptableLoaded = false;

async function loadXlsx(legacy: boolean): Promise<XLSXModule> {
  xlsxPromise ??= import('xlsx');
  const X = await xlsxPromise;
  if (legacy && !cptableLoaded) {
    // Code pages for Excel 95 and older .xls files (Windows-1251, 1252, Shift_JIS ...)
    const cptable = await import('xlsx/dist/cpexcel.full.mjs');
    X.set_cptable(cptable);
    cptableLoaded = true;
  }
  return X;
}

function isLegacyXls(bytes: Uint8Array): boolean {
  // OLE2 compound document (.xls) or BIFF stream
  return (
    (bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0) ||
    (bytes[0] === 0x09 && (bytes[1] === 0x08 || bytes[1] === 0x04 || bytes[1] === 0x02))
  );
}

export function isSpreadsheet(bytes: Uint8Array): boolean {
  // ZIP (xlsx, ods) or OLE2 (xls)
  return (bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04) || isLegacyXls(bytes);
}

interface CellLike {
  t: string;
  v?: unknown;
  w?: string;
  z?: string | number;
}

export async function readWorkbook(bytes: Uint8Array): Promise<WorkbookData> {
  const X = await loadXlsx(isLegacyXls(bytes));
  const wb = X.read(bytes, { type: 'array', dense: true, cellDates: false, cellNF: true, cellText: true });
  const date1904 = !!wb.Workbook?.WBProps?.date1904;
  const sheets: SheetData[] = [];
  wb.SheetNames.forEach((name, si) => {
    const ws = wb.Sheets[name];
    if (!ws) return;
    const hidden = !!wb.Workbook?.Sheets?.[si]?.Hidden;
    const data = (ws as unknown as { '!data'?: (CellLike | undefined)[][] })['!data'] ?? [];
    const ref = ws['!ref'];
    const range = ref ? X.utils.decode_range(ref) : { s: { r: 0, c: 0 }, e: { r: -1, c: -1 } };
    const width = range.e.c + 1;
    const numericCells = new Array<number>(Math.max(0, width)).fill(0);
    const rows: string[][] = [];
    for (let r = 0; r <= range.e.r; r++) {
      const src = data[r] ?? [];
      const out = new Array<string>(width).fill('');
      for (let c = 0; c < width; c++) {
        const cell = src[c];
        if (!cell) continue;
        out[c] = cellText(X, cell, date1904, () => {
          numericCells[c] = (numericCells[c] ?? 0) + 1;
        });
      }
      rows.push(out);
    }
    while (rows.length && rows[rows.length - 1]!.every((x) => x === '')) rows.pop();
    sheets.push({ name, hidden, rows, numericCells });
  });
  return { sheets };
}

function cellText(X: XLSXModule, cell: CellLike, date1904: boolean, onNumber: () => void): string {
  switch (cell.t) {
    case 's':
      return String(cell.v ?? '');
    case 'b':
      return cell.v ? 'TRUE' : 'FALSE';
    case 'e':
    case 'z':
      return '';
    case 'd': {
      const d = cell.v instanceof Date ? cell.v : new Date(String(cell.v));
      return Number.isNaN(d.getTime()) ? (cell.w ?? '') : d.toISOString().slice(0, 10);
    }
    case 'n': {
      const v = Number(cell.v);
      const fmt = cell.z;
      if (fmt !== undefined && X.SSF.is_date(fmt)) {
        const pd = fromExcelSerial(v + (date1904 ? 1462 : 0));
        if (pd) return formatPartialDate(pd);
      }
      onNumber();
      // Integers are written out in full: 441234567890, never 4.41235E+11
      if (Number.isInteger(v) && Math.abs(v) < 1e21) return v.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 0 });
      return cell.w ?? String(v);
    }
    default:
      return cell.w ?? String(cell.v ?? '');
  }
}
