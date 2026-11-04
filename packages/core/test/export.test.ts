import { describe, expect, it } from 'vitest';
import { toGoogleCsv, toOutlookCsv } from '../src/export-csv';
import { parseCsv } from '../src/csv';
import { autoMap } from '../src/mapping';
import { convertTable } from '../src/convert';
import { tableFromRows } from '../src/table';
import { pipeline } from './helpers';

describe('CSV export', () => {
  it('Google CSV re-imports through our own Google preset without loss', async () => {
    const { result } = await pipeline('google-contacts.csv', { defaultCountry: 'US' });
    const csv = toGoogleCsv(result.contacts);
    expect(csv.startsWith('﻿First Name,Middle Name,Last Name')).toBe(true);
    const table = tableFromRows(parseCsv(csv).rows);
    const auto = autoMap({ headers: table.headers, sample: table.rows });
    expect(auto.source.id).toBe('google');
    const again = convertTable(table, auto.mapping, { phoneMode: 'e164', defaultCountry: 'US' });
    expect(again.contacts.map((x) => [x.fullName, x.phones.map((p) => p.value), x.emails.map((e) => e.value), x.note])).toEqual(
      result.contacts.map((x) => [x.fullName, x.phones.map((p) => p.value), x.emails.map((e) => e.value), x.note]),
    );
  });
  it('Outlook CSV puts phones in typed slots', async () => {
    const { result } = await pipeline('outlook-en.csv', { defaultCountry: 'US' });
    const rows = parseCsv(toOutlookCsv(result.contacts)).rows;
    const h = rows[0]!;
    const carl = rows[1]!;
    expect(carl[h.indexOf('Mobile Phone')]).toBe('+14155550177');
    expect(carl[h.indexOf('Business Phone')]).toBe('+14155550123');
    expect(carl[h.indexOf('Business Fax')]).toBe('+14155550199');
    expect(carl[h.indexOf('Birthday')]).toBe('7/4/1980');
    expect(carl[h.indexOf('Title')]).toBe('Mr.');
  });
});
