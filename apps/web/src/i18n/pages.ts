import type { Lang } from './config';

export type PageKind = 'tool' | 'guide' | 'article' | 'legal';

export const PAGE_IDS = [
  'home',
  'excel-to-vcf',
  'xls-to-vcf',
  'xlsx-to-vcf',
  'google-sheets-to-vcf',
  'google-contacts-csv-to-vcf',
  'outlook-csv-to-vcf',
  'import-iphone',
  'import-android',
  'import-google-contacts',
  'import-outlook',
  'what-is-vcf',
  'garbled-contacts',
  'bulk-add-contacts',
  'excel-phone-e11',
  'about',
  'privacy',
  'terms',
  'licenses',
] as const;
export type PageId = (typeof PAGE_IDS)[number];

export const PAGE_KIND: Record<PageId, PageKind> = {
  home: 'tool',
  'excel-to-vcf': 'tool',
  'xls-to-vcf': 'tool',
  'xlsx-to-vcf': 'tool',
  'google-sheets-to-vcf': 'tool',
  'google-contacts-csv-to-vcf': 'tool',
  'outlook-csv-to-vcf': 'tool',
  'import-iphone': 'guide',
  'import-android': 'guide',
  'import-google-contacts': 'guide',
  'import-outlook': 'guide',
  'what-is-vcf': 'article',
  'garbled-contacts': 'article',
  'bulk-add-contacts': 'article',
  'excel-phone-e11': 'article',
  about: 'legal',
  privacy: 'legal',
  terms: 'legal',
  licenses: 'legal',
};

export const TOOL_PAGES = PAGE_IDS.filter((p) => PAGE_KIND[p] === 'tool');
export const GUIDE_PAGES = PAGE_IDS.filter((p) => PAGE_KIND[p] === 'guide');
export const ARTICLE_PAGES = PAGE_IDS.filter((p) => PAGE_KIND[p] === 'article');
export const LEGAL_PAGES = PAGE_IDS.filter((p) => PAGE_KIND[p] === 'legal');

/** Pages whose body is generated (not prose) still need a markdown file for title/description/slug. */
export type { Lang };
