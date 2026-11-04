import type { APIRoute } from 'astro';
import { SITE_URL } from '../config/env';

/**
 * Everyone may crawl, including AI search and assistant bots — we want to be cited.
 * The named groups are explicit on purpose: some bots only obey a group with their own name.
 * List reviewed against github.com/ai-robots-txt/ai.robots.txt (2026-11-04) and vendor docs.
 */
const AI_BOTS = [
  // OpenAI
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ChatGPT Agent',
  // Anthropic
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
  // Perplexity
  'PerplexityBot', 'Perplexity-User',
  // Google (training opt-in token + agents)
  'Google-Extended', 'GoogleAgent-URLContext', 'Google-NotebookLM', 'Gemini-Deep-Research', 'Google-Agent',
  // Apple
  'Applebot', 'Applebot-Extended',
  // Microsoft, Amazon, Meta
  'AzureAI-SearchBot', 'Amazonbot', 'Amzn-SearchBot', 'Amzn-User', 'meta-externalagent', 'Meta-ExternalAgent', 'Meta-ExternalFetcher', 'FacebookBot', 'facebookexternalhit',
  // Other search engines and assistants
  'DuckAssistBot', 'Bravebot', 'PetalBot', 'YandexAdditional', 'YandexAdditionalBot', 'MistralAI-User', 'MistralAI-Index', 'cohere-ai',
  'kagi-fetcher', 'YouBot', 'PhindBot', 'GrokBot', 'xAI-Grok', 'Kimi-SearchBot', 'Kimi-User', 'ExaSearchBot', 'TavilyBot', 'LinkupBot', 'iAskBot',
  // Open datasets many models learn from
  'CCBot', 'AI2Bot', 'DeepSeekBot',
];

export const GET: APIRoute = () => {
  const lines = [
    '# csvtovcf.com — all crawlers welcome, including AI search and assistants.',
    '# Converted files never reach this server; there is nothing private to crawl.',
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /styleguide/',
    '',
    ...AI_BOTS.map((b) => `User-agent: ${b}`),
    'Allow: /',
    'Disallow: /styleguide/',
    '',
    `Sitemap: ${SITE_URL}/sitemap-index.xml`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
