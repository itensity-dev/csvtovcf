import type { PageRef } from './routes';
import { allPages } from './routes';
import { dict, fmt, formatDate } from '../i18n';
import { LANG_META } from '../i18n/config';
import { SITE_URL } from '../config/env';

const abs = (p: string) => SITE_URL + p;

/** Make internal links absolute so the Markdown works outside the site. */
function absLinks(md: string): string {
  return md.replace(/\]\((\/[^)\s]*)\)/g, (_, p: string) => `](${abs(p)})`);
}

/** The Markdown twin of a page: same facts as the HTML, readable by people and LLMs. */
export async function pageMarkdown(p: PageRef): Promise<string> {
  const d = p.entry.data;
  const t = dict(p.lang);
  const alts = (await allPages()).filter((x) => x.id === p.id && x.lang !== p.lang);
  const out: string[] = [];
  out.push(`# ${d.h1}`, '', d.lead, '');
  if (p.kind === 'tool') out.push(`csvtovcf: ${abs(p.path)}`, '');
  if (d.steps.length) {
    out.push(`## ${p.kind === 'tool' ? t.page.howTo : t.page.steps}`, '');
    d.steps.forEach((s, i) => out.push(`${i + 1}. ${absLinks(s)}`));
    out.push('');
  }
  if (d.features.length) {
    out.push(`## ${t.page.features}`, '', `| ${t.page.feature} | ${t.page.value} |`, '| --- | --- |');
    for (const f of d.features) out.push(`| ${f.feature} | ${absLinks(f.value).replace(/\|/g, '\\|')} |`);
    out.push('');
  }
  const body = absLinks(p.entry.body ?? '').trim();
  if (body) {
    if (p.kind === 'tool') out.push(`## ${t.page.format}`, '');
    out.push(body, '');
  }
  if (d.faq.length) {
    out.push(`## ${t.page.faq}`, '');
    for (const f of d.faq) out.push(`### ${f.q}`, '', absLinks(f.a), '');
  }
  out.push('---', '', fmt(t.page.updated, { date: formatDate(d.updated, p.lang) }) + ` · ${abs(p.path)}`);
  if (alts.length) out.push('', alts.map((a) => `[${LANG_META[a.lang].name}](${abs(a.mdPath)})`).join(' · '));
  return out.join('\n') + '\n';
}
