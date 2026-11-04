import type { CountryCode, PhoneNumber } from 'libphonenumber-js/max';
import { getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js/max';
import type { PhoneIssue, PhoneMode, PhoneType } from './types.js';

export type { CountryCode };

export interface NormalizedPhone {
  value: string;
  e164?: string;
  valid: boolean | null;
  issue?: PhoneIssue;
  /** From numbering-plan metadata: mobile vs fixed line, when known. */
  kind?: 'mobile' | 'fixed' | 'other';
  country?: CountryCode;
}

const SCI = /^([+-]?)(\d+)(?:[.,](\d+))?e\+?(\d+)$/i;

/**
 * Excel shows long numbers as 4.4E+11. If every digit survived ("4.47911123456E+11")
 * the number is restored; otherwise the original digits are gone for good.
 */
export function fromScientific(raw: string): { digits: string; lossless: boolean } | null {
  const m = SCI.exec(raw.trim().replace(/\s/g, ''));
  if (!m) return null;
  const int = m[2] ?? '';
  const frac = m[3] ?? '';
  const exp = Number(m[4]);
  const mantissa = int + frac;
  const totalDigits = int.length + exp;
  if (mantissa.length > totalDigits) return null; // not an integer — not a phone
  const digits = (mantissa + '0'.repeat(totalDigits - mantissa.length)).replace(/^0+/, '');
  // lossless only if the significant digits cover the whole number
  // (trailing zeros of a real phone are rare; 15 is Excel's precision limit)
  const lossless = mantissa.replace(/0+$/, '').length >= totalDigits - 1 && totalDigits <= 15;
  return { digits, lossless };
}

function format(p: PhoneNumber, mode: PhoneMode): string {
  const ext = p.ext ? ` ext. ${p.ext}` : '';
  switch (mode) {
    case 'e164':
      return p.number + ext;
    case 'international':
      return p.formatInternational();
    case 'national':
      return p.formatNational();
    default:
      return p.number + ext;
  }
}

function kindOf(p: PhoneNumber): NormalizedPhone['kind'] {
  const t = p.getType();
  if (t === 'MOBILE') return 'mobile';
  if (t === 'FIXED_LINE') return 'fixed';
  return 'other';
}

export interface NormalizeOptions {
  defaultCountry?: CountryCode;
  mode: PhoneMode;
}

/**
 * Normalize one phone number.
 * Order: explicit international (+ or 00) → default country → retry with a "+" added
 * (numbers saved by Excel without the plus) → keep as is and flag.
 */
export function normalizePhone(rawInput: string, opts: NormalizeOptions): NormalizedPhone {
  let raw = rawInput.trim();
  // Excel/pandas float artefacts: "79161234567.0"
  if (/^\+?\d{6,}\.0+$/.test(raw)) raw = raw.replace(/\.0+$/, '');

  let issue: PhoneIssue | undefined;
  const sci = fromScientific(raw);
  if (sci) {
    if (!sci.lossless) {
      return { value: raw, valid: false, issue: 'excel-scientific' };
    }
    raw = sci.digits;
    issue = 'excel-scientific-restored';
  }

  const digitCount = raw.replace(/\D/g, '').length;
  if (digitCount < 3) return { value: raw, valid: false, issue: 'not-a-number' };

  let candidate = raw;
  if (/^00[1-9]/.test(candidate.replace(/[\s().-]/g, ''))) {
    candidate = '+' + candidate.replace(/[\s().-]/g, '').slice(2);
  }

  const tryParse = (s: string, country?: CountryCode): PhoneNumber | undefined => {
    try {
      return country
        ? parsePhoneNumberFromString(s, { defaultCountry: country, extract: false })
        : parsePhoneNumberFromString(s, { extract: false });
    } catch {
      return undefined;
    }
  };

  const keep = opts.mode === 'keep';
  const original = rawInput.trim();
  const digits = candidate.replace(/\D/g, '');
  // "491761234567", "79161234567": a number that starts with the default country's calling code
  // and has no "+" or trunk "0" was most likely saved by Excel without its "+".
  if (opts.defaultCountry && !candidate.startsWith('+') && !candidate.startsWith('0') && digits.length >= 10) {
    const cc = getCountryCallingCode(opts.defaultCountry);
    if (digits.startsWith(cc)) {
      const plus = tryParse('+' + digits);
      if (plus?.isValid() && plus.country === opts.defaultCountry) {
        return {
          value: keep ? original : format(plus, opts.mode),
          e164: plus.number,
          valid: true,
          kind: kindOf(plus),
          country: plus.country,
          ...(keep ? (issue ? { issue } : {}) : { issue: issue ?? 'added-plus' }),
        };
      }
    }
  }
  let p = tryParse(candidate, opts.defaultCountry);
  if (p?.isValid()) {
    return {
      value: keep ? original : format(p, opts.mode),
      e164: p.number,
      valid: true,
      kind: kindOf(p),
      ...(p.country ? { country: p.country } : {}),
      ...(issue ? { issue } : {}),
    };
  }
  // Excel dropped the "+": 79161234567, 447911123456, 905321234567
  if (!candidate.startsWith('+') && digitCount >= 10) {
    const plus = tryParse('+' + candidate.replace(/\D/g, ''));
    if (plus?.isValid()) {
      return {
        value: keep ? original : format(plus, opts.mode),
        e164: plus.number,
        valid: true,
        kind: kindOf(plus),
        ...(plus.country ? { country: plus.country } : {}),
        ...(keep ? (issue ? { issue } : {}) : { issue: issue ?? 'added-plus' }),
      };
    }
  }
  p = p ?? tryParse(candidate);
  return {
    value: keep ? original : raw,
    ...(p ? { e164: p.number } : {}),
    valid: false,
    issue: issue === 'excel-scientific-restored' ? issue : 'invalid',
  };
}

/** Phone type for an untyped column: mobile numbers become CELL, landlines VOICE. */
export function inferPhoneType(kind: NormalizedPhone['kind'], fallback: PhoneType): PhoneType {
  if (fallback !== 'voice') return fallback;
  if (kind === 'mobile') return 'cell';
  if (kind === 'fixed') return 'voice';
  return 'cell';
}

/** Key for duplicate detection: E.164 if known, else the last 9 digits. */
export function phoneKey(value: string, e164?: string): string | null {
  if (e164) return e164;
  const d = value.replace(/\D/g, '');
  if (d.length < 7) return null;
  return d.slice(-9);
}

/** Country calling codes users pick from; the UI sorts them by localized name. */
export { getCountries, getCountryCallingCode } from 'libphonenumber-js/max';
