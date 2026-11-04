import type { APIRoute, GetStaticPaths } from 'astro';
import { allPages, type PageRef } from '../../../lib/routes';
import { ogPng } from '../../../lib/og';
import { dict } from '../../../i18n';

export const getStaticPaths: GetStaticPaths = async () =>
  (await allPages()).map((p) => ({ params: { lang: p.lang, id: p.id }, props: { ref: p } }));

export const GET: APIRoute = async ({ props }) => {
  const { ref } = props as { ref: PageRef };
  const d = dict(ref.lang);
  const label = ref.kind === 'tool' ? d.footer.tools : ref.kind === 'legal' ? d.footer.project : d.footer.guides;
  const png = await ogPng({ title: ref.entry.data.h1, summary: ref.entry.data.summary, label, lang: ref.lang });
  return new Response(new Uint8Array(png).buffer as ArrayBuffer, { headers: { 'Content-Type': 'image/png' } });
};
