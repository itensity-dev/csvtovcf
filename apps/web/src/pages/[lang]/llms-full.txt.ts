import type { APIRoute, GetStaticPaths } from 'astro';
import { llmsFullTxt } from '../../lib/llms';
import { publishedLangs } from '../../lib/routes';
import { LANG_META, type Lang } from '../../i18n/config';

export const getStaticPaths: GetStaticPaths = async () =>
  (await publishedLangs()).filter((l) => l !== 'en').map((l) => ({ params: { lang: LANG_META[l].prefix.slice(1) }, props: { l } }));

export const GET: APIRoute = async ({ props }) =>
  new Response(await llmsFullTxt((props as { l: Lang }).l), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
