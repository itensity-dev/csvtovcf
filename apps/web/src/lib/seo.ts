import type { PageRef } from './routes';
import { LANG_META } from '../i18n/config';
import { dict } from '../i18n';
import { SITE_URL } from '../config/env';
import { CONTACT_EMAIL, SOURCE_URL } from '../config/network';

const abs = (p: string) => SITE_URL + p;

export function ogPath(p: PageRef): string {
  return `/og/${p.lang}/${p.id}.png`;
}

export function organization() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#org`,
    name: 'csvtovcf',
    url: `${SITE_URL}/`,
    email: CONTACT_EMAIL,
    sameAs: [SOURCE_URL, 'https://www.npmjs.com/package/csvtovcf'],
    logo: `${SITE_URL}/icon-512.png`,
  };
}

/** Markdown-ish text → plain text for JSON-LD answers. */
export function plain(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|\s)\*([^*\s][^*]*)\*/g, '$1$2')
    .replace(/`/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function jsonLd(p: PageRef, home: PageRef | undefined): object[] {
  const d = p.entry.data;
  const out: object[] = [];
  const crumbs = [{ name: dict(p.lang).page.breadcrumbHome, item: abs(home?.path ?? '/') }];
  if (p.id !== 'home') crumbs.push({ name: d.nav, item: abs(p.path) });
  out.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })),
  });
  if (p.kind === 'tool') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: d.h1,
      alternateName: 'csvtovcf',
      url: abs(p.path),
      description: d.description,
      inLanguage: LANG_META[p.lang].hreflang,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any — runs in a web browser (Windows, macOS, Linux, Android, iOS)',
      browserRequirements: 'Requires JavaScript and Web Workers',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: d.features.map((f) => `${f.feature}: ${plain(f.value)}`),
      dateModified: d.updated.toISOString().slice(0, 10),
      publisher: { '@id': `${SITE_URL}/#org` },
    });
  }
  if (p.kind === 'guide' || p.kind === 'article') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: d.h1,
      description: d.description,
      inLanguage: LANG_META[p.lang].hreflang,
      url: abs(p.path),
      dateModified: d.updated.toISOString().slice(0, 10),
      author: { '@id': `${SITE_URL}/#org` },
      publisher: { '@id': `${SITE_URL}/#org` },
    });
  }
  if (d.faq.length) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: d.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
    });
  }
  if (p.id === 'about' || p.id === 'home') out.push({ '@context': 'https://schema.org', ...organization() });
  if (p.id === 'home') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'csvtovcf',
      url: abs(p.path),
      inLanguage: LANG_META[p.lang].hreflang,
      publisher: { '@id': `${SITE_URL}/#org` },
    });
  }
  return out;
}
