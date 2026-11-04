import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const path of ['/', '/import-vcf-to-iphone/', '/what-is-a-vcf-file/', '/privacy/']) {
  test(`axe: no serious or critical issues on ${path}`, async ({ page }) => {
    await page.goto(path);
    const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    const bad = res.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(bad.map((v) => `${v.id}: ${v.nodes.length} × ${v.nodes[0]?.target.join(' ')}`)).toEqual([]);
  });
}

test('layout: no horizontal scroll on phones', async ({ page }) => {
  for (const path of ['/', '/outlook-csv-to-vcf/', '/import-vcf-to-android/']) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
