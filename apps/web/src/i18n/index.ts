import type en from './ui/en.json';
import { LANGS, LANG_META, type Lang } from './config';

export type Dict = typeof en;

const modules = import.meta.glob<{ default: Dict }>('./ui/*.json', { eager: true });
const DICTS = Object.fromEntries(Object.entries(modules).map(([p, m]) => [p.replace(/^\.\/ui\/|\.json$/g, ''), m.default])) as Record<string, Dict>;

export function dict(lang: Lang): Dict {
  return DICTS[lang] ?? DICTS.en!;
}

export function fmt(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => (vars[k] !== undefined ? String(vars[k]) : `{${k}}`));
}

export function formatDate(d: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(LANG_META[lang].intl, { dateStyle: 'long', timeZone: 'UTC' }).format(d);
}

export { LANGS, LANG_META };
export type { Lang };
