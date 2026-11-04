import { getCollection, type CollectionEntry } from 'astro:content';
import { LANGS, LANG_META, type Lang } from '../i18n/config';
import { PAGE_IDS, PAGE_KIND, type PageId, type PageKind } from '../i18n/pages';

export interface PageRef {
  lang: Lang;
  id: PageId;
  kind: PageKind;
  slug: string;
  /** Path with trailing slash: "/", "/es/convertir-excel-a-vcf/" */
  path: string;
  /** Markdown twin: "/index.md", "/es/convertir-excel-a-vcf.md" */
  mdPath: string;
  entry: CollectionEntry<'pages'>;
}

export function pathFor(lang: Lang, slug: string): string {
  const prefix = LANG_META[lang].prefix;
  return slug ? `${prefix}/${slug}/` : `${prefix}/`;
}

export function mdPathFor(lang: Lang, slug: string): string {
  const prefix = LANG_META[lang].prefix;
  return slug ? `${prefix}/${slug}.md` : `${prefix}/index.md`;
}

let cache: PageRef[] | null = null;

/** Every published page in every language. A language is listed only if all its pages exist. */
export async function allPages(): Promise<PageRef[]> {
  if (cache) return cache;
  const entries = await getCollection('pages');
  const out: PageRef[] = [];
  for (const lang of LANGS) {
    const mine = entries.filter((e) => e.id.startsWith(`${lang}/`));
    const ids = new Set(mine.map((e) => e.id.slice(lang.length + 1)));
    const complete = PAGE_IDS.every((p) => ids.has(p));
    if (!complete) continue;
    for (const e of mine) {
      const id = e.id.slice(lang.length + 1) as PageId;
      if (!PAGE_IDS.includes(id)) continue;
      const slug = id === 'home' ? '' : e.data.url;
      out.push({ lang, id, kind: PAGE_KIND[id], slug, path: pathFor(lang, slug), mdPath: mdPathFor(lang, slug), entry: e });
    }
  }
  out.sort((a, b) => PAGE_IDS.indexOf(a.id) - PAGE_IDS.indexOf(b.id));
  cache = out;
  return out;
}

export async function publishedLangs(): Promise<Lang[]> {
  const pages = await allPages();
  return LANGS.filter((l) => pages.some((p) => p.lang === l));
}

export async function pageRef(lang: Lang, id: PageId): Promise<PageRef | undefined> {
  return (await allPages()).find((p) => p.lang === lang && p.id === id);
}

export async function alternates(id: PageId): Promise<PageRef[]> {
  return (await allPages()).filter((p) => p.id === id);
}
