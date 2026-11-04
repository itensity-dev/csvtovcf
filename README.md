# csvtovcf

**[csvtovcf.com](https://csvtovcf.com)** converts contact spreadsheets — CSV, Excel (XLSX/XLS/ODS), Google Contacts, Outlook, LinkedIn, cells pasted from Google Sheets — into vCard (.vcf) files that iPhone, Android, Google Contacts and Outlook import. Everything runs in the browser; files are never uploaded.

- Encoding detection (UTF-8/16, Windows-1250…1258, KOI8-R, Shift_JIS, GB18030…) with a live preview
- Recognises Google CSV (new and old layout), Outlook CSV in many languages, LinkedIn exports, headerless lists
- Column auto-mapping with confidence, shown as a patch panel; full names split into N parts
- Phones normalised with libphonenumber; Excel's `4.4E+11` and missing `+` detected
- Duplicates by phone/e-mail with optional merge; report of skipped rows
- vCard 2.1 / 3.0 / 4.0, one file or ZIP; Google CSV; Outlook CSV
- 8 languages (en, es, pt-BR, id, tr, de, fr, ru), offline after the first visit

## Repository

```
packages/core   npm package "csvtovcf": parsers, mapping, vCard builder (no UI, MIT, 184 tests)
apps/web        Astro 7 site + Preact island; the converter runs in a Web Worker
deploy/         Caddyfile for the container and an edge Caddyfile for a VPS
docs/           RESEARCH, DESIGN, DECISIONS, IMPORT_TESTS, screenshots
```

## Local development

Requirements: Node ≥ 22.23.4 (24 LTS recommended), pnpm 10.

```bash
pnpm install
```

```bash
pnpm dev
```

Opens http://localhost:4321. Content lives in `apps/web/src/content/pages/<lang>/*.md`, UI strings in `apps/web/src/i18n/ui/<lang>.json`. `CONTENT_LANGS=en,ru pnpm dev` limits the site to some languages.

Checks:

```bash
pnpm lint && pnpm typecheck && pnpm test
```

```bash
pnpm --filter @csvtovcf/web i18n:check
```

```bash
pnpm --filter @csvtovcf/web build && pnpm --filter @csvtovcf/web test:e2e
```

The build writes `apps/web/dist/` — static HTML, Markdown twins (`/page.md`), sitemaps, `llms.txt`, OG images, the service worker and `.br`/`.gz` copies.

## Run with Docker

```bash
cp .env.example .env
```

```bash
docker compose up --build
```

The site is at http://localhost:8080 and `docker compose ps` shows the health check. The image is Alpine + a UPX-compressed Caddy, runs as a non-root user and stays under 60 MB. Settings in `.env` are build-time (the site is static), so rebuild after changing them.

## Deploy to a VPS in about 10 minutes

1. Point the A/AAAA records of `csvtovcf.com` and `www.csvtovcf.com` to the server.
2. Install Docker on the server, then copy `docker-compose.yml`, `.env` and the `deploy/` folder:

   ```bash
   scp -r docker-compose.yml .env deploy user@server:/srv/csvtovcf/
   ```

3. In `.env` set `DOMAIN` and `ACME_EMAIL`. Use the image CI published by setting `IMAGE=ghcr.io/itensity-dev/csvtovcf` and `TAG=latest`, or a fixed version.
4. Start the site and the HTTPS edge (Let's Encrypt certificates, `www` → apex redirect, 14-day access log):

   ```bash
   cd /srv/csvtovcf && docker compose --profile vps pull && docker compose --profile vps up -d
   ```

5. Verify: `curl -I https://csvtovcf.com/` shows `strict-transport-security` and `content-security-policy`.

### Update and rollback

```bash
docker compose --profile vps pull && docker compose --profile vps up -d
```

To roll back, set `TAG` in `.env` to a previous version or `sha-<commit>` and run the same command. Every CI build on `main` is pushed with the tags `sha-<commit>`, the version from `package.json` and `latest`.

After a deploy, notify Bing/Yandex/Seznam/Naver of changed pages with IndexNow (needs `INDEXNOW_KEY` at build time):

```bash
SITE_URL=https://csvtovcf.com INDEXNOW_KEY=… node apps/web/scripts/indexnow.mjs
```

The *IndexNow* GitHub workflow does the same on demand.

## Environment variables

All are documented in [`.env.example`](.env.example): `SITE_URL`, `ANALYTICS_PROVIDER` (none | plausible), `PLAUSIBLE_DOMAIN`, `PLAUSIBLE_SRC`, `CSP_CONNECT`, `ADS_ENABLED`, `ADSENSE_CLIENT`, `GSC_VERIFICATION`, `BING_VERIFICATION`, `INDEXNOW_KEY`, plus deployment settings. Plausible can be self-hosted with its own compose file ([Plausible CE](https://github.com/plausible/community-edition)); point `PLAUSIBLE_SRC` and `CSP_CONNECT` at it.

## CI

`.github/workflows/ci.yml`: lint → typecheck → unit tests → i18n gate → contrast check → build → Playwright (tool flows, offline, SEO, axe accessibility) → Lighthouse CI (mobile, ≥ 95 in all categories, LCP < 2 s, CLS < 0.05) → Docker build, size and health check → push to GHCR. Repository variables (`vars.SITE_URL`, `vars.INDEXNOW_KEY`, …) feed the build.

## Privacy, verifiable

The converter makes no network request with your data. Open DevTools → Network and convert a file: only the site's own scripts load (the spreadsheet reader on first use of an Excel file). The page's Content-Security-Policy sets `connect-src 'self'`; the Playwright suite fails if any request leaves the origin.

## Adding a language

1. Add it to `LANGS` and `LANG_META` in `apps/web/src/i18n/config.ts` (and to `scripts/check-i18n.mjs`, `deploy/Caddyfile` 404 rules).
2. Create `src/i18n/ui/<lang>.json` and the 19 pages in `src/content/pages/<lang>/` — localized, with slugs people search for.
3. `pnpm --filter @csvtovcf/web i18n:check <lang>` must pass. A language is published only when all its pages exist.

## License

Code: MIT. Fonts: IBM Plex (SIL OFL 1.1), Noto Sans Devanagari (OFL). Third-party packages: see `/licenses/` on the site.
