import type { APIRoute, GetStaticPaths } from 'astro';
import { allPages, type PageRef } from '../lib/routes';
import { pageMarkdown } from '../lib/markdown';

/** Markdown twin of every page: same path + ".md" (home → /index.md, /es/index.md). */
export const getStaticPaths: GetStaticPaths = async () =>
  (await allPages()).map((p) => ({ params: { mdpath: p.mdPath.replace(/^\//, '').replace(/\.md$/, '') }, props: { ref: p } }));

export const GET: APIRoute = async ({ props }) =>
  new Response(await pageMarkdown((props as { ref: PageRef }).ref), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
