import { clean, isCjk } from './text.js';

export interface NameParts {
  prefix: string;
  given: string;
  middle: string;
  family: string;
  suffix: string;
}

const PREFIXES = new Set(
  [
    'mr', 'mrs', 'ms', 'miss', 'mx', 'dr', 'prof', 'sir', 'madam', 'rev', 'fr',
    'herr', 'frau', 'fräulein', 'hr', 'fr', 'dipl', 'ing',
    'm', 'mme', 'mlle', 'me', 'pr',
    'sr', 'sra', 'srta', 'don', 'doña', 'dña', 'dra', 'lic', 'ing',
    'sr', 'sra', 'srta', 'dom', 'dona',
    'bapak', 'bpk', 'pak', 'ibu', 'bu', 'sdr', 'sdri', 'h', 'hj', 'ir', 'drs',
    'bay', 'bayan', 'av', 'op', 'doç', 'doc',
    'г-н', 'г-жа', 'тов', 'д-р', 'проф',
  ].map((s) => s.normalize('NFC')),
);

const SUFFIXES = new Set([
  'jr', 'sr', 'ii', 'iii', 'iv', 'v', 'phd', 'md', 'esq', 'mba', 'dds', 'cpa', 'pe', 'rn', 'jnr', 'snr',
  'filho', 'neto', 'júnior', 'junior', 'sobrinho',
  'se', 'st', 'sh', 'mh', 'mm', 'mt', 'mkom', 'mpd', 'ssi', 'skom', 'spd', 'amd', 'kom',
]);

/** Particles that belong to the family name: "van der Berg", "da Silva", "bin Abdullah". */
const PARTICLES = new Set([
  'van', 'von', 'der', 'den', 'de', 'del', 'della', 'di', 'da', 'das', 'do', 'dos', 'du', 'la', 'le',
  'lo', 'zu', 'ter', 'ten', 'bin', 'binti', 'bint', 'al', 'el', 'ibn', 'ben', 'abu', 'st', 'mac',
]);

/** Conjunctions joining two surnames: "Ortega y Gasset", "Sousa e Silva". */
const CONJUNCTIONS = new Set(['y', 'e', 'i']);

/** Russian given names that look like surnames by their ending (-ина, -ов, -ев). */
const RU_GIVEN = new Set(
  'ирина марина галина нина алина полина кристина карина ангелина екатерина валентина зарина арина регина дина лина эвелина алевтина яков лев'.split(' '),
);

const RU_PATRONYMIC = /(ович|евич|ич|овна|евна|ична|инична|оглы|кызы|улы)$/iu;

function key(w: string): string {
  return w.toLowerCase().replace(/\.$/, '').normalize('NFC');
}

export interface SplitOptions {
  /** Page/content language: "es", "pt", "ru" ... tweaks multi-surname handling. */
  locale?: string;
}

/**
 * Split a one-cell full name into vCard N parts.
 * Handles "Family, Given", Russian "Фамилия Имя Отчество", Spanish double surnames,
 * particles (van, da, bin), prefixes (Dr., Sra.) and suffixes (Jr., PhD).
 * CJK names without spaces stay whole in `given` — guessing is worse than not splitting.
 */
export function splitFullName(input: string, opts: SplitOptions = {}): NameParts {
  const out: NameParts = { prefix: '', given: '', middle: '', family: '', suffix: '' };
  let s = clean(input);
  if (!s) return out;
  const lang = (opts.locale ?? '').toLowerCase().slice(0, 2);

  // "Family, Given Middle" (but not "Given Family, Jr.")
  const comma = s.indexOf(',');
  if (comma > 0) {
    const left = s.slice(0, comma).trim();
    const right = s.slice(comma + 1).trim();
    const rightWords = right.split(' ').filter(Boolean);
    if (rightWords.length > 0 && !rightWords.every((w) => SUFFIXES.has(key(w)))) {
      const inner = splitFullName(right, opts);
      return {
        prefix: inner.prefix,
        given: inner.given,
        middle: [inner.middle, inner.family].filter(Boolean).join(' '),
        family: left,
        suffix: inner.suffix,
      };
    }
    s = `${left} ${right}`;
  }

  const words = s.split(' ').filter(Boolean);
  if (words.length === 1) {
    out.given = words[0]!;
    return out;
  }

  // prefixes (any number at the start)
  const prefix: string[] = [];
  while (words.length > 1 && PREFIXES.has(key(words[0]!))) prefix.push(words.shift()!);
  // suffixes at the end
  const suffix: string[] = [];
  while (words.length > 1 && SUFFIXES.has(key(words[words.length - 1]!).replace(/\./g, ''))) {
    suffix.unshift(words.pop()!);
  }
  out.prefix = prefix.join(' ');
  out.suffix = suffix.join(' ');

  if (words.length === 1) {
    out.given = words[0]!;
    return out;
  }

  if (isCjk(words.join(''))) {
    // With spaces, CJK names are written family-first: "王 小明", "山田 太郎".
    out.family = words[0]!;
    out.given = words.slice(1).join(' ');
    return out;
  }

  const cyr = /\p{Script=Cyrillic}/u.test(words.join(''));
  if (cyr && words.length === 3) {
    if (RU_PATRONYMIC.test(words[2]!)) {
      // Фамилия Имя Отчество
      out.family = words[0]!;
      out.given = words[1]!;
      out.middle = words[2]!;
      return out;
    }
    if (RU_PATRONYMIC.test(words[1]!)) {
      // Имя Отчество Фамилия
      out.given = words[0]!;
      out.middle = words[1]!;
      out.family = words[2]!;
      return out;
    }
  }
  if (cyr && words.length === 2 && (lang === 'ru' || lang === 'uk' || lang === '')) {
    // "Иванов Иван" vs "Иван Иванов": surnames typically end in -ов/-ев/-ин/-ский/-ова/-ая.
    const surname = /(ов|ев|ёв|ин|ын|ский|цкий|ская|цкая|ова|ева|ина|ына|енко|ук|юк|ко)$/iu;
    const w0 = words[0]!.toLowerCase();
    const w1 = words[1]!.toLowerCase();
    const s0 = surname.test(w0) && !RU_GIVEN.has(w0);
    const s1 = surname.test(w1) && !RU_GIVEN.has(w1);
    if ((s0 && !s1) || (RU_GIVEN.has(w1) && !RU_GIVEN.has(w0))) {
      out.family = words[0]!;
      out.given = words[1]!;
      return out;
    }
  }

  // Particles glue to the family name: find the first particle after the first word.
  let familyStart = words.length - 1;
  for (let i = 1; i < words.length - 1; i++) {
    const k = key(words[i]!);
    if (CONJUNCTIONS.has(k) && i >= 2) {
      familyStart = i - 1;
      break;
    }
    if (PARTICLES.has(k)) {
      familyStart = i;
      break;
    }
  }
  const hasJoiner = familyStart !== words.length - 1;
  if (!hasJoiner && (lang === 'es' || lang === 'pt') && words.length >= 3) {
    // Hispanic: "Juan García López" → given Juan, family "García López";
    // "María José García López" → given "María José".
    // Portuguese keeps the last surname as the family name used for sorting,
    // but most contact apps expect both: "Silva Santos".
    familyStart = words.length >= 4 ? words.length - 2 : lang === 'es' ? 1 : words.length - 1;
  }
  out.given = words[0]!;
  out.middle = words.slice(1, familyStart).join(' ');
  out.family = words.slice(familyStart).join(' ');
  if (!hasJoiner && lang === 'es' && words.length >= 4 && familyStart === words.length - 2) {
    out.given = words.slice(0, familyStart).join(' ');
    out.middle = '';
  }
  return out;
}

/** FN from parts, in the natural display order. */
export function joinName(p: Partial<NameParts>): string {
  return [p.prefix, p.given, p.middle, p.family, p.suffix]
    .map((x) => (x ?? '').trim())
    .filter(Boolean)
    .join(' ');
}
