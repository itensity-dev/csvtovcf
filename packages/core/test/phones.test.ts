import { describe, expect, it } from 'vitest';
import { fromScientific, normalizePhone, phoneKey } from '../src/phones';

describe('fromScientific', () => {
  it('flags lost digits', () => {
    expect(fromScientific('4.4E+11')).toEqual({ digits: '440000000000', lossless: false });
    expect(fromScientific('4,91512E+11')?.lossless).toBe(false);
  });
  it('restores numbers whose digits all survived', () => {
    expect(fromScientific('4.47911123456E+11')).toEqual({ digits: '447911123456', lossless: true });
  });
  it('ignores non-scientific', () => {
    expect(fromScientific('+44 7911 123456')).toBeNull();
  });
});

describe('normalizePhone', () => {
  it('national number with default country → E.164', () => {
    const r = normalizePhone('(202) 555-0143', { defaultCountry: 'US', mode: 'e164' });
    expect(r).toMatchObject({ value: '+12025550143', valid: true });
  });
  it('international formats', () => {
    expect(normalizePhone('+7 999 000-12-34', { mode: 'international' }).value).toBe('+7 999 000 12 34');
    expect(normalizePhone('8 (999) 000-11-22', { defaultCountry: 'RU', mode: 'e164' }).value).toBe('+79990001122');
    expect(normalizePhone('0532 123 45 67', { defaultCountry: 'TR', mode: 'e164' }).value).toBe('+905321234567');
    expect(normalizePhone('0812-3456-7890', { defaultCountry: 'ID', mode: 'e164' }).value).toBe('+6281234567890');
    expect(normalizePhone('(11) 91234-5678', { defaultCountry: 'BR', mode: 'e164' }).value).toBe('+5511912345678');
    expect(normalizePhone('0151 23456789', { defaultCountry: 'DE', mode: 'national' }).value).toBe('01512 3456789');
  });
  it('00 prefix', () => {
    expect(normalizePhone('0049 151 23456789', { defaultCountry: 'US', mode: 'e164' }).value).toBe('+4915123456789');
  });
  it('Excel dropped the "+": retries as international', () => {
    const r = normalizePhone('447911123456', { defaultCountry: 'US', mode: 'e164' });
    expect(r).toMatchObject({ value: '+447911123456', valid: true, issue: 'added-plus' });
  });
  it('Excel dropped the leading 0 of a national number', () => {
    // UK mobile 07911 123456 saved as number 7911123456
    expect(normalizePhone('7911123456', { defaultCountry: 'GB', mode: 'e164' }).value).toBe('+447911123456');
  });
  it('float artefact ".0"', () => {
    expect(normalizePhone('79990001234.0', { defaultCountry: 'RU', mode: 'e164' }).value).toBe('+79990001234');
  });
  it('4.4E+11 is reported, not invented', () => {
    const r = normalizePhone('4.4E+11', { defaultCountry: 'GB', mode: 'e164' });
    expect(r).toMatchObject({ value: '4.4E+11', valid: false, issue: 'excel-scientific' });
  });
  it('invalid numbers are kept and flagged', () => {
    const r = normalizePhone('12345', { defaultCountry: 'US', mode: 'e164' });
    expect(r.valid).toBe(false);
    expect(r.value).toBe('12345');
  });
  it('"keep" mode keeps the text but still validates', () => {
    const r = normalizePhone('(202) 555-0143', { defaultCountry: 'US', mode: 'keep' });
    expect(r).toMatchObject({ value: '(202) 555-0143', valid: true, e164: '+12025550143' });
  });
  it('detects mobile vs fixed line', () => {
    expect(normalizePhone('+44 7911 123456', { mode: 'e164' }).kind).toBe('mobile');
    expect(normalizePhone('+44 20 7946 0018', { mode: 'e164' }).kind).toBe('fixed');
  });
  it('extensions', () => {
    expect(normalizePhone('+1 202-555-0143 ext. 12', { mode: 'e164' }).value).toBe('+12025550143 ext. 12');
  });
});

describe('phoneKey', () => {
  it('prefers E.164, else last 9 digits', () => {
    expect(phoneKey('x', '+12025550143')).toBe('+12025550143');
    expect(phoneKey('8 (999) 123-45-67')).toBe('991234567');
    expect(phoneKey('123')).toBeNull();
  });
});
