import type { APIRoute } from 'astro';
import { allPages, publishedLangs } from '../lib/routes';
import { SITE_URL } from '../config/env';

export const GET: APIRoute = async () => {
  const pages = await allPages();
  const langs = await publishedLangs();
  const items = langs.map((l) => {
    const last = pages.filter((p) => p.lang === l).reduce((m, p) => (p.entry.data.updated > m ? p.entry.data.updated : m), new Date(0));
    return `  <sitemap><loc>${SITE_URL}/sitemap-${l}.xml</loc><lastmod>${last.toISOString().slice(0, 10)}</lastmod></sitemap>`;
  });
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join('\n')}\n</sitemapindex>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
