#!/usr/bin/env node
/**
 * Writes the files for the manual import matrix (docs/IMPORT_TESTS.md) into docs/import-tests/.
 * Synthetic contacts only. Run after `pnpm --filter csvtovcf build`.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { emptyContact, buildVCards, toGoogleCsv, toOutlookCsv } from '../dist/index.js';

const out = fileURLToPath(new URL('../../../docs/import-tests/', import.meta.url));
mkdirSync(out, { recursive: true });

const ph = (value, type, extra = {}) => ({ value, raw: value, type, valid: true, e164: value, ...extra });
const c = (row, p) => ({ ...emptyContact(0, row), ...p });

const contacts = [
  c(2, {
    prefix: 'Dr.', given: 'Ann', middle: 'B.', family: 'Test-Lee', suffix: 'Jr.', fullName: 'Dr. Ann B. Test-Lee Jr.', nickname: 'Annie',
    org: 'Example & Co', department: 'R&D', title: 'Engineer',
    phones: [ph('+12025550143', 'cell'), ph('+12025550110', 'work'), ph('+12025550111', 'homefax'), ph('+447911123456', 'other', { label: 'WhatsApp' })],
    emails: [{ value: 'ann.test@example.com', type: 'work' }, { value: 'ann.home@example.org', type: 'home' }],
    addresses: [{ type: 'work', poBox: '', extended: 'Suite 4, Floor 2', street: '500 Market St', city: 'San Francisco', region: 'CA', postalCode: '94105', country: 'United States' }],
    urls: [{ value: 'https://example.com/ann', type: 'work' }],
    birthday: { year: 1990, month: 5, day: 17 }, anniversary: { year: 2015, month: 6, day: 12 },
    note: 'Line one; with a semicolon, a comma and a backslash \\\nLine two — long enough to be folded at 75 octets in every vCard version: 🎉👩‍👩‍👧‍👦',
    categories: ['Test', 'Clients, VIP'],
  }),
  c(3, { given: 'Иван', middle: 'Сергеевич', family: 'Петров', fullName: 'Петров Иван Сергеевич', phones: [ph('+79991234567', 'cell')], birthday: { month: 3, day: 8 }, note: 'Кириллица в заметке, длинная строка для проверки переноса по октетам UTF-8 без разрыва букв.' }),
  c(4, { given: 'محمد', family: 'أحمد', fullName: 'محمد أحمد', phones: [ph('+966501234567', 'cell')] }),
  c(5, { given: '太郎', family: '山田', fullName: '山田 太郎', phoneticGiven: 'たろう', phoneticFamily: 'やまだ', phones: [ph('+819012345678', 'cell')] }),
  c(6, { given: 'Ayşe', family: 'Yılmaz', fullName: 'Ayşe Yılmaz', phones: [ph('+905321234567', 'cell')], addresses: [{ type: 'home', poBox: '', extended: '', street: 'Bağdat Cd. 1\nDaire 3', city: 'İstanbul', region: '', postalCode: '34728', country: 'Türkiye' }] }),
  c(7, { org: 'Company Only Ltd', fullName: '', phones: [ph('+4930123456', 'work')], emails: [{ value: 'office@example.de', type: 'work' }] }),
  c(8, { given: 'Zoë', family: 'Ölmann-Ñúñez', fullName: 'Zoë Ölmann-Ñúñez', phones: [{ value: '12345', raw: '12345', type: 'cell', valid: false }], note: 'Invalid number kept as typed' }),
];

for (const v of ['3.0', '4.0', '2.1']) {
  writeFileSync(join(out, `test-contacts-v${v}.vcf`), buildVCards(contacts, { version: v }));
}
writeFileSync(join(out, 'test-contacts-v3.0-outlook-charset.vcf'), buildVCards(contacts, { version: '3.0', charset: true }));
writeFileSync(join(out, 'test-contacts-google.csv'), toGoogleCsv(contacts));
writeFileSync(join(out, 'test-contacts-outlook.csv'), toOutlookCsv(contacts));
// one contact per file (for Outlook "open each file")
writeFileSync(join(out, 'test-single-ann-v3.0.vcf'), buildVCards([contacts[0]], { version: '3.0' }));
console.log('import test files →', out);
