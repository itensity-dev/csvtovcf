import { test, expect } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const fx = (n: string) => fileURLToPath(new URL(`../../../packages/core/fixtures/${n}`, import.meta.url));

test('after the first visit the converter works offline, including Excel files', async ({ page, context }) => {
  await page.goto('/');
  await page.waitForFunction(() => navigator.serviceWorker.ready.then(() => true));
  await page.reload({ waitUntil: 'networkidle' });
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
  await context.setOffline(true);
  await page.reload();
  await page.locator('input[type=file]').setInputFiles(fx('workbook.xls'));
  await expect(page.locator('.tool__result .ccard__name')).toHaveText(['Grace Hopper-Example', 'Hiro Example', 'Inès Exemple']);
});
