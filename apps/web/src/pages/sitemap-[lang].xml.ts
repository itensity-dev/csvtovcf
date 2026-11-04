import type { APIRoute, GetStaticPaths } from 'astro';
import { allPages, publishedLangs } from '../lib/routes';
import { LANG_META, type Lang } from '../i18n/config';
import { SITE_URL } from '../config/env';

export const getStaticPaths: GetStaticPaths = async () => (await publishedLangs()).map((lang) => ({ params: { lang } }));

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** One sitemap per language, with real lastmod and hreflang alternates (incl. x-default). */
export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as Lang;
  const pages = await allPages();
  const urls = pages
    .filter((p) => p.lang === lang)
    .map((p) => {
      const alts = pages.filter((a) => a.id === p.id);
      const en = alts.find((a) => a.lang === 'en');
      const links = alts.map((a) => `    <xhtml:link rel="alternate" hreflang="${LANG_META[a.lang].hreflang}" href="${esc(SITE_URL + a.path)}"/>`);
      if (en) links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(SITE_URL + en.path)}"/>`);
      return `  <url>\n    <loc>${esc(SITE_URL + p.path)}</loc>\n    <lastmod>${p.entry.data.updated.toISOString().slice(0, 10)}</lastmod>\n${links.join('\n')}\n  </url>`;
    });
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
