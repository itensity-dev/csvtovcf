import { allPages, pageRef } from './routes';
import { pageMarkdown } from './markdown';
import { dict } from '../i18n';
import { LANG_META, type Lang } from '../i18n/config';
import { SITE_URL } from '../config/env';
import { plain } from './seo';

const abs = (p: string) => SITE_URL + p;

/** /llms.txt per https://llmstxt.org: H1, blockquote summary, details, link lists. */
export async function llmsTxt(lang: Lang): Promise<string> {
  const pages = (await allPages()).filter((p) => p.lang === lang);
  const home = await pageRef(lang, 'home');
  const d = dict(lang);
  const out: string[] = ['# csvtovcf', ''];
  if (home) {
    out.push(`> ${home.entry.data.description}`, '', home.entry.data.lead, '');
    for (const f of home.entry.data.features) out.push(`- ${f.feature}: ${plain(f.value)}`);
    out.push('');
  }
  const section = (title: string, kind: string) => {
    const list = pages.filter((p) => p.kind === kind);
    if (!list.length) return;
    out.push(`## ${title}`, '');
    for (const p of list) out.push(`- [${p.entry.data.h1}](${abs(p.path)}): ${p.entry.data.summary} (Markdown: ${abs(p.mdPath)})`);
    out.push('');
  };
  section(d.footer.tools, 'tool');
  section(d.footer.guides, 'guide');
  section(d.nav.articles, 'article');
  out.push('## Optional', '');
  for (const p of pages.filter((x) => x.kind === 'legal')) out.push(`- [${p.entry.data.h1}](${abs(p.path)}): ${p.entry.data.summary}`);
  out.push(`- [llms-full.txt](${abs(`${LANG_META[lang].prefix}/llms-full.txt`)}): full text of the converter pages, guides and articles`);
  const others = (await allPages()).filter((p) => p.id === 'home' && p.lang !== lang);
  if (others.length) out.push(`- Other languages: ${others.map((p) => `[${LANG_META[p.lang].name}](${abs(`${LANG_META[p.lang].prefix}/llms.txt`)})`).join(', ')}`);
  out.push('- Source code (MIT): https://github.com/itensity-dev/csvtovcf', '');
  return out.join('\n');
}

export async function llmsFullTxt(lang: Lang): Promise<string> {
  const pages = (await allPages()).filter((p) => p.lang === lang && p.kind !== 'legal');
  const parts = await Promise.all(pages.map((p) => pageMarkdown(p)));
  return `# csvtovcf — ${LANG_META[lang].name}\n\n> ${SITE_URL}${LANG_META[lang].prefix}/\n\n` + parts.join('\n\n---\n\n');
}
