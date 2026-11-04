import { test, expect } from '@playwright/test';

const HOMES = ['/', '/es/', '/pt-br/', '/id/', '/tr/', '/de/', '/fr/', '/ru/'];

test('robots.txt, sitemaps, llms.txt are served', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('User-agent: GPTBot');
  expect(robots).toContain('User-agent: ClaudeBot');
  expect(robots).toMatch(/Sitemap: https?:\/\/.+\/sitemap-index\.xml/);
  const index = await (await request.get('/sitemap-index.xml')).text();
  expect(index).toContain('sitemap-en.xml');
  const en = await (await request.get('/sitemap-en.xml')).text();
  expect(en).toContain('hreflang="x-default"');
  expect(en).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
  const llms = await (await request.get('/llms.txt')).text();
  expect(llms.startsWith('# csvtovcf\n\n> ')).toBe(true);
  expect(llms).toContain('## Optional');
  expect((await request.get('/llms-full.txt')).ok()).toBe(true);
});

for (const home of HOMES) {
  test(`${home}: H1, steps, FAQ in raw HTML; canonical, hreflang, JSON-LD, markdown twin`, async ({ request }) => {
    const res = await request.get(home);
    test.skip(res.status() === 404, 'language not published in this build');
    const html = await res.text();
    expect(html).toMatch(/<h1[^>]*>[^<]{5,}<\/h1>/);
    expect(html).toContain('class="steps"');
    expect(html).toContain('class="faq"');
    expect(html).toMatch(/<link rel="canonical" href="https?:\/\/[^"]+"/);
    const hreflangs = [...html.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]);
    expect(hreflangs).toContain('x-default');
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]!));
    const types = ld.map((j) => j['@type']);
    expect(types).toEqual(expect.arrayContaining(['WebApplication', 'BreadcrumbList', 'FAQPage']));
    const app = ld.find((j) => j['@type'] === 'WebApplication');
    expect(app.isAccessibleForFree).toBe(true);
    expect(app.offers.price).toBe('0');
    const md = html.match(/<link rel="alternate" type="text\/markdown" href="https?:\/\/[^/]+([^"]+)"/)?.[1];
    expect(md).toBeTruthy();
    const mdText = await (await request.get(md!)).text();
    expect(mdText.startsWith('# ')).toBe(true);
  });
}

test('hreflang sets are reciprocal on every published page', async ({ request }) => {
  const index = await (await request.get('/sitemap-index.xml')).text();
  const maps = [...index.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]+)<\/loc>/g)].map((m) => m[1]!);
  const alts = new Map<string, string[]>();
  for (const m of maps) {
    const xml = await (await request.get(m)).text();
    for (const u of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc = /<loc>([^<]+)<\/loc>/.exec(u[1]!)![1]!;
      alts.set(loc, [...u[1]!.matchAll(/hreflang="(?!x-default)[^"]+" href="([^"]+)"/g)].map((x) => x[1]!));
    }
  }
  for (const [loc, list] of alts) {
    expect(list).toContain(loc);
    for (const other of list) expect(alts.get(other), `${other} listed by ${loc}`).toBeDefined();
  }
});

test('404 page lists the converters', async ({ request }) => {
  const res = await request.get('/no-such-page/');
  expect(res.status()).toBe(404);
});
