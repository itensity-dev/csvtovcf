import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import { fileURLToPath } from 'node:url';

const core = (p) => fileURLToPath(new URL(`../../packages/core/src/${p}`, import.meta.url));
const env = (k, d = '') => (process.env[k] ?? d).trim();


const analytics = env('ANALYTICS_PROVIDER', 'none');
const plausibleSrc = env('PLAUSIBLE_SRC', 'https://plausible.io/js/script.js');
const plausibleOrigin = analytics === 'plausible' ? new URL(plausibleSrc).origin : null;
const ads = env('ADS_ENABLED', 'false') === 'true';

// connect-src is the proof that contact data cannot leave the page: only our own origin
// (plus the analytics counter if enabled, which never receives file data).
const connect = ["'self'", plausibleOrigin].filter(Boolean);
const adHosts = ads
  ? ['https://pagead2.googlesyndication.com', 'https://*.googlesyndication.com', 'https://*.doubleclick.net', 'https://fundingchoicesmessages.google.com', 'https://*.google.com', 'https://*.gstatic.com', 'https://*.adtrafficquality.google']
  : [];

export default defineConfig({
  site: env('SITE_URL', 'https://csvtovcf.com'),
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  markdown: { syntaxHighlight: false },
  integrations: [preact()],
  security: {
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        `img-src 'self' data: blob:${ads ? ' https:' : ''}`,
        "font-src 'self'",
        `connect-src ${[...connect, ...(ads ? adHosts : [])].join(' ')}`,
        "worker-src 'self' blob:",
        "manifest-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        ...(ads ? [`frame-src ${adHosts.join(' ')}`] : ["frame-src 'none'"]),
      ],
      scriptDirective: {
        resources: ["'self'", ...(plausibleOrigin ? [plausibleOrigin] : []), ...adHosts],
      },
      styleDirective: { resources: ["'self'"] },
    },
  },
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
