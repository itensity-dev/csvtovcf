import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * One Markdown file per page and language: src/content/pages/{lang}/{pageId}.md
 * Frontmatter holds the structured parts (title, steps, FAQ…), the body holds the prose.
 */
const pages = defineCollection({
  // CONTENT_LANGS=en,ru limits the build to some languages (local work only); default: all.
  loader: glob({
    pattern: process.env.CONTENT_LANGS
      ? process.env.CONTENT_LANGS.includes(',')
        ? `{${process.env.CONTENT_LANGS}}/*.md`
        : `${process.env.CONTENT_LANGS}/*.md`
      : '**/*.md',
    base: './src/content/pages',
  }),
  schema: z.object({
    /** URL segment in this language ("convertir-excel-a-vcf"); empty for the home page. */
    url: z.string().default(''),
    /** <title> — the search phrase people type in this language. */
    title: z.string().max(70),
    h1: z.string(),
    /** meta description: a concrete answer, not an ad. */
    description: z.string().max(170),
    /** One sentence under the H1: what this page/tool does. */
    lead: z.string(),
    /** Short label for menus and related links. */
    nav: z.string(),
    /** One line for related links and llms.txt. */
    summary: z.string(),
    steps: z.array(z.string()).default([]),
    features: z.array(z.object({ feature: z.string(), value: z.string() })).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]),
    updated: z.coerce.date(),
  }),
});

export const collections = { pages };
