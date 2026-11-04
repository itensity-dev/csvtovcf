import { describe, expect, it } from 'vitest';
import { detectDateOrder, formatPartialDate, fromExcelSerial, parseDate } from '../src/dates';

describe('parseDate', () => {
  it.each([
    ['1990-05-17', 'dmy', { year: 1990, month: 5, day: 17 }],
    ['19900517', 'dmy', { year: 1990, month: 5, day: 17 }],
    ['--05-17', 'dmy', { month: 5, day: 17 }],
    ['--0517', 'dmy', { month: 5, day: 17 }],
    ['17.05.1990', 'mdy', { year: 1990, month: 5, day: 17 }],
    ['05/17/1990', 'dmy', { year: 1990, month: 5, day: 17 }],
    ['03/04/1990', 'dmy', { year: 1990, month: 4, day: 3 }],
    ['03/04/1990', 'mdy', { year: 1990, month: 3, day: 4 }],
    ['7/4/80', 'mdy', { year: 1980, month: 7, day: 4 }],
    ['1990/05/17', 'dmy', { year: 1990, month: 5, day: 17 }],
    ['17 May 1990', 'dmy', { year: 1990, month: 5, day: 17 }],
    ['May 17, 1990', 'dmy', { year: 1990, month: 5, day: 17 }],
    ['17. Mai 1990', 'dmy', { year: 1990, month: 5, day: 17 }],
    ['17 мая 1990 г.', 'dmy', { year: 1990, month: 5, day: 17 }],
    ['17 de maio de 1990', 'dmy', { year: 1990, month: 5, day: 17 }],
    ['17 Mayıs 1990', 'dmy', { year: 1990, month: 5, day: 17 }],
    ['17 Agustus 1990', 'dmy', { year: 1990, month: 8, day: 17 }],
    ['25/12', 'dmy', { month: 12, day: 25 }],
    ['33010', 'dmy', { year: 1990, month: 5, day: 17 }],
    ['29.02.2000', 'dmy', { year: 2000, month: 2, day: 29 }],
  ] as const)('%s', (input, order, expected) => {
    expect(parseDate(input, order)).toEqual(expected);
  });
  it.each(['0/0/00', '0.0.00', '', 'tomorrow', '31.02.1990', '2023-13-01', 'n/a'])('rejects %j', (v) => {
    expect(parseDate(v)).toBeNull();
  });
});

describe('detectDateOrder', () => {
  it('uses unambiguous values in the column', () => {
    expect(detectDateOrder(['03/04/1990', '25/12/1980'], 'en')).toBe('dmy');
    expect(detectDateOrder(['03/04/1990', '12/25/1980'], 'ru')).toBe('mdy');
  });
  it('falls back to the locale', () => {
    expect(detectDateOrder(['03/04/1990'], 'en')).toBe('mdy');
    expect(detectDateOrder(['03/04/1990'], 'de')).toBe('dmy');
  });
});

describe('Excel serials and formatting', () => {
  it('handles the 1900 leap-year bug', () => {
    expect(fromExcelSerial(59)).toEqual({ year: 1900, month: 2, day: 28 });
    expect(fromExcelSerial(61)).toEqual({ year: 1900, month: 3, day: 1 });
    expect(fromExcelSerial(45000)).toEqual({ year: 2023, month: 3, day: 15 });
  });
  it('formats', () => {
    expect(formatPartialDate({ year: 1990, month: 5, day: 7 })).toBe('1990-05-07');
    expect(formatPartialDate({ month: 5, day: 7 }, 'basic')).toBe('--0507');
  });
});
