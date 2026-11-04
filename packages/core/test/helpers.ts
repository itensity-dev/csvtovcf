import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  autoMap,
  convertTable,
  decode,
  detectEncoding,
  parseCsv,
  tableFromRows,
  type ConvertOptions,
} from '../src/index';
import { isSpreadsheet, readWorkbook } from '../src/spreadsheet';

export const fixture = (name: string): Uint8Array => new Uint8Array(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'fixtures', name)));

export async function pipeline(name: string, opts: Partial<ConvertOptions> & { locale?: string; sheet?: number } = {}) {
  const bytes = fixture(name);
  let rows: string[][];
  let encoding = 'n/a';
  let delimiter = 'n/a';
  if (isSpreadsheet(bytes)) {
    const wb = await readWorkbook(bytes);
    rows = wb.sheets[opts.sheet ?? 0]!.rows;
  } else {
    const enc = detectEncoding(bytes, { locale: opts.locale ?? 'en' });
    encoding = enc.encoding;
    const text = decode(bytes, enc.encoding);
    const parsed = parseCsv(text);
    delimiter = parsed.delimiter;
    rows = parsed.rows;
  }
  const table = tableFromRows(rows);
  const auto = autoMap({ headers: table.headers, sample: table.rows.slice(0, 200), locale: opts.locale ?? 'en' });
  const result = convertTable(table, auto.mapping, {
    phoneMode: 'e164',
    locale: opts.locale ?? 'en',
    ...opts,
  });
  return { encoding, delimiter, table, auto, result };
}

/** Map of header → field for readable assertions. */
export function fieldsByHeader(headers: string[] | null, mapping: { field: string; type?: string }[]): Record<string, string> {
  const out: Record<string, string> = {};
  mapping.forEach((m, i) => {
    out[headers?.[i] ?? `#${i}`] = m.type ? `${m.field}:${m.type}` : m.field;
  });
  return out;
}
