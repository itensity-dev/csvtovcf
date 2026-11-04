/** Phase-1 languages. A language is published only when all its pages and UI keys exist (scripts/check-i18n.mjs). */
export const LANGS = ['en', 'es', 'pt-br', 'id', 'tr', 'de', 'fr', 'ru'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

export interface LangMeta {
  /** hreflang / html lang */
  hreflang: string;
  /** Name of the language in itself */
  name: string;
  dir: 'ltr' | 'rtl';
  /** URL prefix: '' for English, '/es' … */
  prefix: string;
  /** Phone country for numbers without a country code */
  country: string;
  ogLocale: string;
  /** Intl locale for numbers and dates */
  intl: string;
}

export const LANG_META: Record<Lang, LangMeta> = {
  en: { hreflang: 'en', name: 'English', dir: 'ltr', prefix: '', country: 'US', ogLocale: 'en_US', intl: 'en-US' },
  es: { hreflang: 'es', name: 'Español', dir: 'ltr', prefix: '/es', country: 'MX', ogLocale: 'es_ES', intl: 'es' },
  'pt-br': { hreflang: 'pt-BR', name: 'Português (Brasil)', dir: 'ltr', prefix: '/pt-br', country: 'BR', ogLocale: 'pt_BR', intl: 'pt-BR' },
  id: { hreflang: 'id', name: 'Bahasa Indonesia', dir: 'ltr', prefix: '/id', country: 'ID', ogLocale: 'id_ID', intl: 'id-ID' },
  tr: { hreflang: 'tr', name: 'Türkçe', dir: 'ltr', prefix: '/tr', country: 'TR', ogLocale: 'tr_TR', intl: 'tr-TR' },
  de: { hreflang: 'de', name: 'Deutsch', dir: 'ltr', prefix: '/de', country: 'DE', ogLocale: 'de_DE', intl: 'de-DE' },
  fr: { hreflang: 'fr', name: 'Français', dir: 'ltr', prefix: '/fr', country: 'FR', ogLocale: 'fr_FR', intl: 'fr-FR' },
  ru: { hreflang: 'ru', name: 'Русский', dir: 'ltr', prefix: '/ru', country: 'RU', ogLocale: 'ru_RU', intl: 'ru-RU' },
};

/** Core locale code (for name splitting, date order, encoding priors). */
export function coreLocale(lang: Lang): string {
  return lang === 'pt-br' ? 'pt' : lang;
}

export function isLang(x: string): x is Lang {
  return (LANGS as readonly string[]).includes(x);
}
