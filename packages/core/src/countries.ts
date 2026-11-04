import { getCountries, type CountryCode } from 'libphonenumber-js/max';
import { normalizeHeader } from './text.js';

const LOCALES = ['en', 'es', 'pt', 'id', 'tr', 'de', 'fr', 'ru', 'it', 'pl', 'nl', 'vi', 'ar', 'ja', 'zh', 'ko', 'uk'];

const ALIASES: Record<string, CountryCode> = {
  usa: 'US', 'u s a': 'US', 'u s': 'US', 'united states of america': 'US', america: 'US', сша: 'US', eua: 'US', eeuu: 'US', abd: 'US',
  uk: 'GB', 'u k': 'GB', 'great britain': 'GB', britain: 'GB', england: 'GB', scotland: 'GB', wales: 'GB', 'northern ireland': 'GB', англия: 'GB', великобритания: 'GB',
  uae: 'AE', emirates: 'AE', оаэ: 'AE', ksa: 'SA', рф: 'RU', 'российская федерация': 'RU', россия: 'RU',
  holland: 'NL', 'the netherlands': 'NL', turkiye: 'TR', 'türkiye': 'TR', 'south korea': 'KR', korea: 'KR', 'czech republic': 'CZ',
  'viet nam': 'VN', 'hong kong sar': 'HK', 'macao sar': 'MO', 'ivory coast': 'CI', 'cote d ivoire': 'CI',
};

let MAP: Map<string, CountryCode> | null = null;

function build(): Map<string, CountryCode> {
  const m = new Map<string, CountryCode>();
  const codes = getCountries();
  for (const loc of LOCALES) {
    let dn: Intl.DisplayNames;
    try {
      dn = new Intl.DisplayNames([loc], { type: 'region' });
    } catch {
      continue;
    }
    for (const code of codes) {
      const name = dn.of(code);
      if (name && name !== code) {
        const k = normalizeHeader(name);
        if (!m.has(k)) m.set(k, code);
      }
    }
  }
  for (const [k, v] of Object.entries(ALIASES)) m.set(normalizeHeader(k), v);
  return m;
}

const CODES = new Set<string>();

/** "Deutschland", "United Kingdom", "Россия", "DE", "Brasil" → ISO 3166-1 alpha-2, if known. */
export function countryFromName(name: string): CountryCode | undefined {
  const t = name.trim();
  if (!t) return undefined;
  if (CODES.size === 0) for (const c of getCountries()) CODES.add(c);
  if (/^[A-Za-z]{2}$/.test(t) && CODES.has(t.toUpperCase())) return t.toUpperCase() as CountryCode;
  MAP ??= build();
  return MAP.get(normalizeHeader(t));
}
