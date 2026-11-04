import { test, expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const fx = (n: string) => fileURLToPath(new URL(`../../../packages/core/fixtures/${n}`, import.meta.url));
const cards = (page: Page) => page.locator('.tool__result .ccard__name');

/** Every request the page makes must go to our own origin — the privacy promise, tested. */
function watchRequests(page: Page) {
  const foreign: string[] = [];
  page.on('request', (r) => {
    const u = new URL(r.url());
    if (u.protocol === 'blob:' || u.protocol === 'data:') return;
    if (u.hostname !== 'localhost') foreign.push(r.url());
  });
  return foreign;
}

test('sample is rendered before any file is loaded (no JS needed)', async ({ request }) => {
  const html = await (await request.get('/')).text();
  expect(html).toContain('ccard');
  expect(html).toContain('Ann Lee');
  expect(html).toMatch(/<h1[^>]*>CSV to VCF converter<\/h1>/);
});

test('Windows-1251 Outlook export: detection, live encoding switch, cards', async ({ page }) => {
  const foreign = watchRequests(page);
  await page.goto('/');
  await page.locator('input[type=file]').setInputFiles(fx('outlook-ru-cp1251.csv'));
  await expect(page.locator('.fileinfo__name .mono')).toHaveText('outlook-ru-cp1251.csv');
  await expect(cards(page)).toHaveText(['Анна Сергеевна Смирнова', 'Пётр Ёлкин']);
  const enc = page.locator('.fileinfo__ctl select').first();
  await expect(enc).toHaveValue('windows-1251');
  await enc.selectOption('windows-1252');
  await expect(cards(page).first()).not.toHaveText('Анна Сергеевна Смирнова');
  await enc.selectOption('windows-1251');
  await expect(cards(page).first()).toHaveText('Анна Сергеевна Смирнова');
  expect(foreign).toEqual([]);
});

test('XLSX with two sheets, numbers stored as numbers', async ({ page }) => {
  await page.goto('/excel-to-vcf/');
  await page.locator('input[type=file]').setInputFiles(fx('workbook.xlsx'));
  await expect(cards(page)).toHaveText(['Grace Hopper-Example', 'Hiro Example', 'Inès Exemple']);
  await expect(page.locator('.tool__result')).toContainText('+12025550143');
  const sheet = page.locator('.fileinfo__ctl select', { hasText: 'Archive' });
  await sheet.selectOption({ index: 1 });
  await expect(cards(page)).toHaveText(['Second Sheet Person']);
});

test('pasted cells from a spreadsheet', async ({ page }) => {
  await page.goto('/google-sheets-to-vcf/');
  await page.locator('#t-paste-area').fill('Name\tPhone\nZoë Exemple\t+33 6 12 34 56 78\nBob Example\t+44 7911 123456');
  await page.getByRole('button', { name: 'Use these cells' }).click();
  await expect(cards(page)).toHaveText(['Zoë Exemple', 'Bob Example']);
});

test('download: valid vCard 3.0 with CRLF, then 4.0 and ZIP', async ({ page }) => {
  await page.goto('/');
  await page.locator('input[type=file]').setInputFiles(fx('google-contacts.csv'));
  await expect(cards(page).first()).toHaveText('Dr. Alice B. Example');
  const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('.result__download').click()]);
  expect(dl.suggestedFilename()).toBe('google-contacts.vcf');
  const text = readFileSync((await dl.path())!, 'utf8');
  expect(text.startsWith('BEGIN:VCARD\r\nVERSION:3.0\r\n')).toBe(true);
  expect(text.match(/BEGIN:VCARD/g)).toHaveLength(5);
  expect(text).toContain('FN:Иван Иванович Петров\r\n');
  expect(text).not.toMatch(/[^\r]\n/);

  await page.locator('input[name=t-version][value="4.0"]').check();
  await page.locator('input[name=t-output][value="zip"]').check();
  const [zip] = await Promise.all([page.waitForEvent('download'), page.locator('.result__download').click()]);
  expect(zip.suggestedFilename()).toBe('google-contacts-vcards.zip');
  expect(readFileSync((await zip.path())!).subarray(0, 2).toString()).toBe('PK');
});

test('changing a plug updates the cards', async ({ page }) => {
  await page.goto('/');
  // demo: column B "Mobile" → skip, phones disappear from the cards
  const select = page.locator('#map-0-1');
  await select.selectOption('ignore');
  await expect(page.locator('.tool__result .ccard').first()).not.toContainText('+1202');
  await expect(page.locator('.patch__row').nth(1)).toHaveClass(/is-off/);
});

test('report lists Excel-damaged numbers and skipped rows', async ({ page }) => {
  await page.goto('/');
  await page.locator('input[type=file]').setInputFiles(fx('excel-de-semicolon-cp1252.csv'));
  await expect(page.locator('.report')).toContainText('Destroyed by Excel');
  await page.locator('#tab-warnings').click();
  await expect(page.locator('#panel-warnings')).toContainText('4,91512E+11');
});

test('keyboard: the file button and options are reachable with Tab', async ({ page }) => {
  await page.goto('/');
  const choose = page.getByRole('button', { name: 'Choose file' });
  await choose.focus();
  await expect(choose).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Paste cells' })).toBeFocused();
});
