import { analyse } from 'chardet';

export interface EncodingOption {
  /** WHATWG label accepted by TextDecoder. */
  id: string;
  /** Human label (English; UI translates the group). */
  label: string;
  group: 'unicode' | 'cyrillic' | 'latin' | 'other' | 'cjk';
}

/** Encodings offered in the manual picker. All are supported by TextDecoder in every modern browser. */
export const ENCODINGS: EncodingOption[] = [
  { id: 'utf-8', label: 'UTF-8', group: 'unicode' },
  { id: 'utf-16le', label: 'UTF-16 LE', group: 'unicode' },
  { id: 'utf-16be', label: 'UTF-16 BE', group: 'unicode' },
  { id: 'windows-1252', label: 'Windows-1252 (Western Europe, Americas)', group: 'latin' },
  { id: 'windows-1250', label: 'Windows-1250 (Central Europe)', group: 'latin' },
  { id: 'windows-1254', label: 'Windows-1254 (Turkish)', group: 'latin' },
  { id: 'windows-1257', label: 'Windows-1257 (Baltic)', group: 'latin' },
  { id: 'windows-1258', label: 'Windows-1258 (Vietnamese)', group: 'latin' },
  { id: 'iso-8859-15', label: 'ISO-8859-15 (Latin-9)', group: 'latin' },
  { id: 'iso-8859-2', label: 'ISO-8859-2 (Latin-2)', group: 'latin' },
  { id: 'macintosh', label: 'Mac Roman', group: 'latin' },
  { id: 'windows-1251', label: 'Windows-1251 (Cyrillic)', group: 'cyrillic' },
  { id: 'koi8-r', label: 'KOI8-R', group: 'cyrillic' },
  { id: 'koi8-u', label: 'KOI8-U', group: 'cyrillic' },
  { id: 'ibm866', label: 'CP866 (DOS Cyrillic)', group: 'cyrillic' },
  { id: 'iso-8859-5', label: 'ISO-8859-5 (Cyrillic)', group: 'cyrillic' },
  { id: 'x-mac-cyrillic', label: 'Mac Cyrillic', group: 'cyrillic' },
  { id: 'windows-1256', label: 'Windows-1256 (Arabic)', group: 'other' },
  { id: 'iso-8859-6', label: 'ISO-8859-6 (Arabic)', group: 'other' },
  { id: 'windows-1253', label: 'Windows-1253 (Greek)', group: 'other' },
  { id: 'windows-1255', label: 'Windows-1255 (Hebrew)', group: 'other' },
  { id: 'windows-874', label: 'Windows-874 (Thai)', group: 'other' },
  { id: 'shift_jis', label: 'Shift_JIS (Japanese)', group: 'cjk' },
  { id: 'euc-jp', label: 'EUC-JP (Japanese)', group: 'cjk' },
  { id: 'gb18030', label: 'GB18030 / GBK (Chinese, simplified)', group: 'cjk' },
  { id: 'big5', label: 'Big5 (Chinese, traditional)', group: 'cjk' },
  { id: 'euc-kr', label: 'EUC-KR (Korean)', group: 'cjk' },
];

/** The single-byte encoding Excel uses for "CSV" in a given UI language (Windows ANSI code page). */
export const LOCALE_ANSI: Record<string, string> = {
  ru: 'windows-1251',
  uk: 'windows-1251',
  bg: 'windows-1251',
  sr: 'windows-1251',
  kk: 'windows-1251',
  tr: 'windows-1254',
  pl: 'windows-1250',
  cs: 'windows-1250',
  sk: 'windows-1250',
  hu: 'windows-1250',
  ro: 'windows-1250',
  hr: 'windows-1250',
  sl: 'windows-1250',
  ar: 'windows-1256',
  fa: 'windows-1256',
  ur: 'windows-1256',
  el: 'windows-1253',
  he: 'windows-1255',
  vi: 'windows-1258',
  th: 'windows-874',
  lt: 'windows-1257',
  lv: 'windows-1257',
  et: 'windows-1257',
  ja: 'shift_jis',
  zh: 'gb18030',
  ko: 'euc-kr',
};

const CHARDET_TO_WHATWG: Record<string, string> = {
  'UTF-8': 'utf-8',
  ASCII: 'utf-8',
  'UTF-16LE': 'utf-16le',
  'UTF-16BE': 'utf-16be',
  'ISO-8859-1': 'windows-1252',
  'ISO-8859-2': 'iso-8859-2',
  'ISO-8859-5': 'iso-8859-5',
  'ISO-8859-6': 'windows-1256',
  'ISO-8859-7': 'windows-1253',
  'ISO-8859-8': 'windows-1255',
  'ISO-8859-9': 'windows-1254',
  'KOI8-R': 'koi8-r',
  'windows-1250': 'windows-1250',
  'windows-1251': 'windows-1251',
  'windows-1252': 'windows-1252',
  'windows-1253': 'windows-1253',
  'windows-1254': 'windows-1254',
  'windows-1255': 'windows-1255',
  'windows-1256': 'windows-1256',
  'windows-1257': 'windows-1257',
  'windows-1258': 'windows-1258',
  'windows-874': 'windows-874',
  Shift_JIS: 'shift_jis',
  'EUC-JP': 'euc-jp',
  'EUC-KR': 'euc-kr',
  GB18030: 'gb18030',
  Big5: 'big5',
  'ISO-2022-JP': 'iso-2022-jp',
};

export interface EncodingGuess {
  encoding: string;
  /** 0..1 */
  confidence: number;
  /** Why: 'bom' | 'utf8-valid' | 'ascii' | 'utf16-pattern' | 'statistics' */
  method: 'bom' | 'utf8-valid' | 'ascii' | 'utf16-pattern' | 'statistics';
  bom: boolean;
  /** Ranked alternatives for the picker (best first). */
  candidates: { encoding: string; score: number }[];
}

const SAMPLE = 256 * 1024;

function hasBom(b: Uint8Array): string | null {
  if (b.length >= 3 && b[0] === 0xef && b[1] === 0xbb && b[2] === 0xbf) return 'utf-8';
  if (b.length >= 2 && b[0] === 0xff && b[1] === 0xfe) return 'utf-16le';
  if (b.length >= 2 && b[0] === 0xfe && b[1] === 0xff) return 'utf-16be';
  return null;
}

function utf16Pattern(b: Uint8Array): string | null {
  const n = Math.min(b.length, 4096) & ~1;
  if (n < 8) return null;
  let evenZero = 0;
  let oddZero = 0;
  for (let i = 0; i < n; i += 2) {
    if (b[i] === 0) evenZero++;
    if (b[i + 1] === 0) oddZero++;
  }
  const half = n / 2;
  if (oddZero / half > 0.3 && evenZero / half < 0.05) return 'utf-16le';
  if (evenZero / half > 0.3 && oddZero / half < 0.05) return 'utf-16be';
  return null;
}

/** Trim a sample so it does not end in the middle of a UTF-8 sequence. */
function trimUtf8Tail(b: Uint8Array): Uint8Array {
  let end = b.length;
  let i = end - 1;
  let cont = 0;
  while (i >= 0 && cont < 4 && ((b[i] ?? 0) & 0xc0) === 0x80) {
    i--;
    cont++;
  }
  if (i < 0) return b;
  const lead = b[i] ?? 0;
  const need = lead >= 0xf0 ? 3 : lead >= 0xe0 ? 2 : lead >= 0xc0 ? 1 : 0;
  if (need > cont) end = i;
  return b.subarray(0, end);
}

function isAscii(b: Uint8Array): boolean {
  for (let i = 0; i < b.length; i++) if ((b[i] ?? 0) > 0x7f) return false;
  return true;
}

export function isValidUtf8(b: Uint8Array): boolean {
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(b);
    return true;
  } catch {
    return false;
  }
}

/** Expected script for single-byte code pages; letters from other scripts count as noise. */
const SCRIPT_OF: Record<string, RegExp> = {
  'windows-1251': /\p{Script=Cyrillic}/u,
  'koi8-r': /\p{Script=Cyrillic}/u,
  'koi8-u': /\p{Script=Cyrillic}/u,
  ibm866: /\p{Script=Cyrillic}/u,
  'iso-8859-5': /\p{Script=Cyrillic}/u,
  'x-mac-cyrillic': /\p{Script=Cyrillic}/u,
  'windows-1253': /\p{Script=Greek}/u,
  'windows-1255': /\p{Script=Hebrew}/u,
  'windows-1256': /\p{Script=Arabic}/u,
  'iso-8859-6': /\p{Script=Arabic}/u,
  'windows-874': /\p{Script=Thai}/u,
};

/** Letters that exist in a code page but are rare in contact data — usually a sign of the wrong code page. */
const RARE = /[ðþÐÞđĐţŢŕŔĺĹľĽťŤďĎňŇŷÿ¤¦¨¯´¸¹²³µ¶·¼½¾×÷ƒ†‡‰‹›˜™ˆ]/u;

/**
 * Score how plausible a decoded text is: letters inside words are good,
 * replacement chars, C1 controls and symbols glued to letters are bad.
 */
export function plausibility(text: string, encoding: string): number {
  let score = 0;
  let nonAscii = 0;
  const script = SCRIPT_OF[encoding];
  const words = text.match(/[^\s,;\t|"'()[\]{}<>]+/gu) ?? [];
  for (const w of words) {
    if (!/[^\x00-\x7f]/.test(w)) continue;
    let letters = 0;
    let bad = 0;
    let latinHigh = 0;
    let latinAll = 0;
    let otherScript = 0;
    let prevLower = false;
    for (const ch of w) {
      const cp = ch.codePointAt(0) ?? 0;
      if (cp < 0x80) {
        if (/[A-Za-z]/.test(ch)) {
          letters++;
          latinAll++;
          prevLower = ch >= 'a' && ch <= 'z';
        }
        continue;
      }
      nonAscii++;
      if (cp === 0xfffd) bad += 5;
      else if (cp >= 0x80 && cp <= 0x9f) bad += 4;
      else if (/\p{L}/u.test(ch)) {
        letters++;
        if (script && !script.test(ch)) bad += 1;
        if (RARE.test(ch)) bad += 1;
        if (/\p{Script=Latin}/u.test(ch)) {
          latinHigh++;
          latinAll++;
          // "ÑìèðÍîâà": an accented capital right after a lower-case letter
          if (prevLower && /\p{Lu}/u.test(ch)) bad += 1;
        } else otherScript++;
        prevLower = /\p{Ll}/u.test(ch);
      } else if (/\p{M}/u.test(ch)) {
        letters++;
      } else bad += 2; // symbol glued to a word: "Ð¸", "Ã©"
    }
    // Real Latin words are mostly ASCII ("Müller", "Çağrı"); "ÇáÇÓã" is Arabic read as Latin-1.
    if (latinAll >= 3 && latinHigh / latinAll > 0.6) bad += latinHigh - 1;
    // Mixed scripts inside one word: Latin text decoded as Big5/Shift_JIS.
    if (otherScript > 0 && latinAll > 0) bad += otherScript + 1;
    // Mojibake of UTF-8 read as Latin-1: "Ã©", "Ð¸" — upper-case letter followed by symbol/lower pattern.
    if (/[ÃÂÐÑ][\u0080-¿]/u.test(w)) bad += 3;
    score += letters - bad * 2;
  }
  return nonAscii === 0 ? 0 : score / Math.max(1, nonAscii);
}

/** Code pages our users actually have (Excel in the Americas/W. Europe, Russia, Turkey, Arab countries, C. Europe). */
const AUDIENCE_PRIOR: Record<string, number> = {
  'windows-1252': 0.15,
  'windows-1251': 0.12,
  'windows-1254': 0.12,
  'windows-1256': 0.08,
  'windows-1250': 0.06,
  'shift_jis': 0.04,
  'gb18030': 0.04,
};

export interface DetectOptions {
  /** Page language, e.g. "ru", "tr", "pt-BR": a prior for single-byte code pages. */
  locale?: string;
}

export function detectEncoding(bytes: Uint8Array, opts: DetectOptions = {}): EncodingGuess {
  const bom = hasBom(bytes);
  if (bom) {
    return {
      encoding: bom,
      confidence: 1,
      method: 'bom',
      bom: true,
      candidates: [{ encoding: bom, score: 1 }],
    };
  }
  const u16 = utf16Pattern(bytes);
  if (u16) {
    return {
      encoding: u16,
      confidence: 0.95,
      method: 'utf16-pattern',
      bom: false,
      candidates: [{ encoding: u16, score: 1 }],
    };
  }
  const sample = bytes.subarray(0, Math.min(bytes.length, SAMPLE));
  if (isAscii(sample) && isAscii(bytes)) {
    return {
      encoding: 'utf-8',
      confidence: 1,
      method: 'ascii',
      bom: false,
      candidates: [{ encoding: 'utf-8', score: 1 }],
    };
  }
  const head = bytes.length > 4 * 1024 * 1024 ? trimUtf8Tail(bytes.subarray(0, 4 * 1024 * 1024)) : bytes;
  if (isValidUtf8(head)) {
    return {
      encoding: 'utf-8',
      confidence: 0.99,
      method: 'utf8-valid',
      bom: false,
      candidates: [{ encoding: 'utf-8', score: 1 }],
    };
  }

  const lang = (opts.locale ?? '').toLowerCase().split(/[-_]/)[0] ?? '';
  const prior = LOCALE_ANSI[lang] ?? 'windows-1252';
  const found = new Map<string, number>();
  for (const m of analyse(sample)) {
    const id = CHARDET_TO_WHATWG[m.name];
    if (!id || id === 'utf-8' || id.startsWith('utf-16')) continue;
    if (!found.has(id)) found.set(id, m.confidence / 100);
  }
  for (const id of [prior, 'windows-1252', 'windows-1251', 'windows-1250', 'windows-1254']) {
    if (!found.has(id)) found.set(id, 0);
  }

  const scored: { encoding: string; score: number }[] = [];
  for (const [id, conf] of found) {
    let text: string;
    try {
      text = new TextDecoder(id).decode(sample);
    } catch {
      continue;
    }
    const p = plausibility(text, id);
    const score = p + conf * 0.6 + (id === prior ? 0.35 : 0) + (AUDIENCE_PRIOR[id] ?? 0);
    scored.push({ encoding: id, score });
  }
  scored.sort((a, b) => b.score - a.score);
  const best = scored[0] ?? { encoding: prior, score: 0 };
  const second = scored[1]?.score ?? -Infinity;
  const margin = best.score - second;
  const confidence = Math.max(0.3, Math.min(0.95, 0.5 + margin / 2));
  return {
    encoding: best.encoding,
    confidence,
    method: 'statistics',
    bom: false,
    candidates: scored,
  };
}

/** Decode bytes with the given encoding; strips a BOM. */
export function decode(bytes: Uint8Array, encoding: string): string {
  const text = new TextDecoder(encoding).decode(bytes);
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}
