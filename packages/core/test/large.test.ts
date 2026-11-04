import { describe, expect, it } from 'vitest';
import { parseCsv } from '../src/csv';
import { tableFromRows } from '../src/table';
import { autoMap } from '../src/mapping';
import { convertTable } from '../src/convert';
import { buildVCards } from '../src/vcard';
import { findDuplicates } from '../src/dedupe';

describe('100 000 rows', () => {
  it('parses, maps, converts and builds in reasonable time', () => {
    const N = 100_000;
    const lines = ['First Name,Last Name,Mobile Phone,E-mail Address,Company,Notes'];
    for (let i = 0; i < N; i++) {
      const n = String(i % 60_000).padStart(7, '0');
      lines.push(`Name${i},Фамилия${i % 97},+1 202 55${n.slice(-5, -4)} ${n.slice(-4)},user${i}@example.com,"Co, ${i % 50}",note ${i}`);
    }
    const text = lines.join('\r\n');
    const t0 = performance.now();
    const rows = parseCsv(text).rows;
    const table = tableFromRows(rows);
    const auto = autoMap({ headers: table.headers, sample: table.rows.slice(0, 200) });
    const res = convertTable(table, auto.mapping, { phoneMode: 'e164', defaultCountry: 'US' });
    const vcf = buildVCards(res.contacts, { version: '3.0' });
    const dups = findDuplicates(res.contacts);
    const ms = performance.now() - t0;
    expect(res.contacts.length).toBe(N);
    expect(vcf.length).toBeGreaterThan(N * 100);
    expect(dups.length).toBeGreaterThan(0); // the synthetic phones repeat every 100 000 / 10 000
    console.log(`100k rows: ${Math.round(ms)} ms, ${(vcf.length / 1e6).toFixed(1)} MB vcf`);
    expect(ms).toBeLessThan(60_000);
  });
});
