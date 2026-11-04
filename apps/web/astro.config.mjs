import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import { fileURLToPath } from 'node:url';

const core = (p) => fileURLToPath(new URL(`../../packages/core/src/${p}`, import.meta.url));

export default defineConfig({
  site: process.env.SITE_URL || 'https://csvtovcf.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  markdown: { syntaxHighlight: false },
  integrations: [preact()],
  vite: {
    resolve: {
      // Use the core package from source: no separate build step for the site.
      alias: [
        { find: /^csvtovcf\/fields$/, replacement: core('fields.ts') },
        { find: /^csvtovcf\/spreadsheet$/, replacement: core('spreadsheet.ts') },
        { find: /^csvtovcf$/, replacement: core('index.ts') },
      ],
    },
    worker: { format: 'es' },
    build: { assetsInlineLimit: 0 },
  },
});
