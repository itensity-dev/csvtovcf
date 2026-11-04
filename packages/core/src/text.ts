/** Remove combining marks (é → e, й → и, ğ → g). Keeps base letters of every script. */
export function stripDiacritics(s: string): string {
  return s.normalize('NFKD').replace(/\p{M}+/gu, '');
}

/**
 * Normalize a column header for dictionary lookup:
 * lowercase, no diacritics, punctuation → single spaces.
 * "E-mail 2: Adresse" → "e mail 2 adresse"; "Téléphone (bureau)" → "telephone bureau".
 */
export function normalizeHeader(s: string): string {
  return stripDiacritics(s.replace(/İ/g, 'I').toLowerCase())
    .replace(/ı/g, 'i')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

export function isBlank(s: string | undefined | null): boolean {
  return s === undefined || s === null || s.trim() === '';
}

/** Collapse inner whitespace and trim. Keeps line breaks out of single-line fields. */
export function clean(s: string | undefined | null): string {
  if (!s) return '';
  return s.replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Trim but keep line breaks (for notes and street addresses). */
export function cleanMultiline(s: string | undefined | null): string {
  if (!s) return '';
  return s
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((l) => l.replace(/[   ]/g, ' ').replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export const EMAIL_RE = /^[^\s@<>()[\]",;:]+@[^\s@<>()[\]",;:]+\.[^\s@<>()[\]",;:]{2,}$/u;

export function looksLikeEmail(s: string): boolean {
  return EMAIL_RE.test(s.trim());
}

export function looksLikeUrl(s: string): boolean {
  const t = s.trim();
  return /^(https?:\/\/|www\.)\S+\.\S+$/i.test(t) || /^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}(\/\S*)?$/i.test(t);
}

/** Phone-ish: mostly digits and phone punctuation, 6–20 digits. Dates are excluded. */
export function looksLikePhone(s: string): boolean {
  const t = s.trim();
  if (!t) return false;
  if (/^\d{1,4}[./-]\d{1,2}[./-]\d{1,4}$/.test(t)) return false; // dates
  if (/^[+-]?\d+(?:[.,]\d+)?e\+?\d+$/i.test(t)) return true; // Excel 4.4E+11
  if (!/^[+(]?[\d\s().\-/+]*\d[\d\s().\-/]*(\s*(x|ext\.?|доб\.?|#)\s*\d+)?$/i.test(t)) return false;
  const digits = t.replace(/\D/g, '').length;
  return digits >= 7 && digits <= 20;
}

/** Split a cell holding several values: "a ::: b", "a; b", "a, b", line breaks. */
export function splitMulti(s: string, opts: { comma?: boolean } = {}): string[] {
  const re = opts.comma ? /\s*(?::::|[;\n,])\s*/ : /\s*(?::::|[;\n])\s*/;
  return s
    .split(re)
    .map((x) => x.trim())
    .filter(Boolean);
}

/** Letters of a script that has no spaces between given and family names. */
export function isCjk(s: string): boolean {
  return /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(s);
}

export function capitalizeFirst(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
