import { describe, expect, it } from 'vitest';
import { detectDelimiter, findHeaderRow, parseCsv } from '../src/csv';
import { tableFromRows, columnLetter } from '../src/table';

describe('detectDelimiter', () => {
  it.each([
    ['a,b,c\n1,2,3\n4,5,6', ','],
    ['a;b;c\n1;2;3\n4;5;6', ';'],
    ['a\tb\tc\n1\t2\t3', '\t'],
    ['a|b|c\n1|2|3', '|'],
    ['Name;Address\n"Smith, John";"1 Main St, Town"\n"Doe, Jane";"2 Elm, City"', ';'],
    ['Name,Note\nBob,"a;b;c;d"\nAnn,"x;y;z;w"', ','],
  ])('%j → %j', (text, d) => {
    expect(detectDelimiter(text).delimiter).toBe(d);
  });

  it('honours Excel "sep=" line and strips it', () => {
    const g = detectDelimiter('sep=;\nName;Phone\nA;1');
    expect(g).toMatchObject({ delimiter: ';', sepLine: true });
    const p = parseCsv('sep=;\r\nName;Phone\r\nA;1\r\n');
    expect(p.rows).toEqual([
      ['Name', 'Phone'],
      ['A', '1'],
    ]);
  });
});

describe('parseCsv', () => {
  it('keeps quoted line breaks, quotes and BOM-free first cell', () => {
    const p = parseCsv('﻿Name,Note\r\n"Bob","line1\r\nline2 ""quoted"""\r\n');
    expect(p.rows[0]![0]).toBe('Name');
    expect(p.rows[1]![1]).toBe('line1\r\nline2 "quoted"');
  });
});

describe('findHeaderRow', () => {
  it('skips the LinkedIn "Notes:" preamble', () => {
    const rows = parseCsv(
      'Notes:\r\n"When exporting your connection data, you may notice..."\r\n\r\nFirst Name,Last Name,URL,Email Address,Company,Position,Connected On\r\nA,B,https://x,a@example.com,C,D,04 Nov 2026\r\n',
    ).rows;
    expect(findHeaderRow(rows)).toBe(3);
    const t = tableFromRows(rows);
    expect(t.headers?.[0]).toBe('First Name');
    expect(t.firstRowNumber).toBe(5);
  });
  it('detects a headerless list', () => {
    const rows = [
      ['Ivan Petrov', '+7 999 123-45-67'],
      ['Anna', '+7 999 123-45-68'],
    ];
    expect(findHeaderRow(rows)).toBe(-1);
    const t = tableFromRows(rows);
    expect(t.headers).toBeNull();
    expect(t.firstRowNumber).toBe(1);
  });
  it('user can force "no header"', () => {
    const t = tableFromRows([['Name', 'Phone'], ['A', '1']], false);
    expect(t.headers).toBeNull();
    expect(t.rows.length).toBe(2);
  });
});

describe('columnLetter', () => {
  it('works like Excel', () => {
    expect([0, 25, 26, 27, 701, 702].map(columnLetter)).toEqual(['A', 'Z', 'AA', 'AB', 'ZZ', 'AAA']);
  });
});
