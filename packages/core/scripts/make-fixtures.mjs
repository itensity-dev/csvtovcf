#!/usr/bin/env node
/**
 * Generates synthetic contact exports for tests. Every name, number and address is invented:
 * phone numbers come from fictional/drama ranges (US 555-01xx, UK +44 7911 123xxx) or are random,
 * e-mails use the reserved example.com/.org/.net domains.
 *
 *   node scripts/make-fixtures.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as XLSX from 'xlsx';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, '..', 'fixtures');
mkdirSync(out, { recursive: true });

// ── encoders ──────────────────────────────────────────────────────────────
const sbcsCache = new Map();
function sbcsTable(enc) {
  if (sbcsCache.has(enc)) return sbcsCache.get(enc);
  const dec = new TextDecoder(enc);
  const map = new Map();
  for (let b = 0; b < 256; b++) {
    const ch = dec.decode(new Uint8Array([b]));
    if (ch !== '�' && !map.has(ch)) map.set(ch, b);
  }
  sbcsCache.set(enc, map);
  return map;
}
function encodeSbcs(text, enc) {
  const map = sbcsTable(enc);
  const bytes = [];
  for (const ch of text) {
    const b = map.get(ch);
    if (b === undefined) throw new Error(`${enc} cannot encode ${JSON.stringify(ch)}`);
    bytes.push(b);
  }
  return new Uint8Array(bytes);
}
let sjisMap;
function encodeShiftJis(text) {
  if (!sjisMap) {
    sjisMap = new Map();
    const dec = new TextDecoder('shift_jis');
    for (let b = 0; b < 0x80; b++) sjisMap.set(String.fromCharCode(b), [b]);
    for (let b = 0xa1; b <= 0xdf; b++) sjisMap.set(dec.decode(new Uint8Array([b])), [b]);
    for (let hi = 0x81; hi <= 0xfc; hi++) {
      if (hi > 0x9f && hi < 0xe0) continue;
      for (let lo = 0x40; lo <= 0xfc; lo++) {
        if (lo === 0x7f) continue;
        const ch = dec.decode(new Uint8Array([hi, lo]));
        if (ch.length === 1 && ch !== '�' && !sjisMap.has(ch)) sjisMap.set(ch, [hi, lo]);
      }
    }
  }
  const bytes = [];
  for (const ch of text) {
    const b = sjisMap.get(ch);
    if (!b) throw new Error(`shift_jis cannot encode ${ch}`);
    bytes.push(...b);
  }
  return new Uint8Array(bytes);
}
function encodeUtf16le(text, bom = true) {
  const buf = new Uint8Array((text.length + (bom ? 1 : 0)) * 2);
  let o = 0;
  if (bom) {
    buf[o++] = 0xff;
    buf[o++] = 0xfe;
  }
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    buf[o++] = c & 0xff;
    buf[o++] = c >> 8;
  }
  return buf;
}
const utf8 = (t, bom = false) => new TextEncoder().encode((bom ? '﻿' : '') + t);

function csv(rows, d = ',', eol = '\r\n') {
  return (
    rows
      .map((r) =>
        r
          .map((v) => {
            const s = String(v ?? '');
            return s.includes(d) || /["\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
          })
          .join(d),
      )
      .join(eol) + eol
  );
}
function write(name, bytes) {
  writeFileSync(join(out, name), bytes);
  console.log('wrote', name, bytes.length, 'bytes');
}

// ── 1. Google Contacts, current format ──────────────────────────────────
const googleHeader = [
  'First Name', 'Middle Name', 'Last Name', 'Phonetic First Name', 'Phonetic Middle Name', 'Phonetic Last Name',
  'Name Prefix', 'Name Suffix', 'Nickname', 'File As', 'Organization Name', 'Organization Title',
  'Organization Department', 'Birthday', 'Notes', 'Photo', 'Labels',
  'E-mail 1 - Label', 'E-mail 1 - Value', 'E-mail 2 - Label', 'E-mail 2 - Value',
  'Phone 1 - Label', 'Phone 1 - Value', 'Phone 2 - Label', 'Phone 2 - Value',
  'Address 1 - Label', 'Address 1 - Formatted', 'Address 1 - Street', 'Address 1 - City', 'Address 1 - PO Box',
  'Address 1 - Region', 'Address 1 - Postal Code', 'Address 1 - Country', 'Address 1 - Extended Address',
  'Website 1 - Label', 'Website 1 - Value', 'Event 1 - Label', 'Event 1 - Value',
];
const googleRows = [
  ['Alice', 'B.', 'Example', '', '', '', 'Dr.', '', 'Ali', '', 'Example Corp', 'Engineer', 'R&D', '1990-05-17',
    'Met at the "conference"; likes tea, coffee\nSecond line 🎉', '', '* myContacts ::: Friends ::: Work',
    '* Work', 'alice@example.com', 'Home', 'alice.home@example.org',
    'Mobile', '+1 202-555-0143 ::: +1 202-555-0187', 'Work', '(202) 555-0110',
    'Home', '1 Main St\nSpringfield, IL 62701', '1 Main St', 'Springfield', '', 'IL', '62701', 'USA', 'Apt 4',
    'Profile', 'https://example.com/alice', 'Anniversary', '2015-06-12'],
  ['Иван', 'Иванович', 'Петров', '', '', '', '', '', '', '', 'ООО «Пример»', 'Директор', '', '--03-08',
    'Заметка с запятой, точкой с запятой; и обратной косой \\ чертой', '', '* myContacts',
    '', 'ivan@example.ru', '', '', 'Mobile', '+7 999 000-12-34', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', 'Acme Widgets', '', '', '', '', '', '* myContacts',
    'Work', 'sales@example.net', '', '', 'Work', '+44 7911 123456', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['Yuki', '', 'Tanaka', 'ゆき', '', 'たなか', '', '', '', '', '', '', '', '', '', '', '* myContacts ::: VIP',
    '', 'yuki@example.jp', '', '', 'WhatsApp', '+81 90-1234-5678', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['Alice', '', 'Example', '', '', '', '', '', '', '', '', '', '', '', 'duplicate by e-mail', '', '* myContacts',
    'Other', 'ALICE@example.com', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', ''],
];
write('google-contacts.csv', utf8(csv([googleHeader, ...googleRows])));

// ── 2. Google Contacts, legacy format ───────────────────────────────────
const legacyHeader = ['Name', 'Given Name', 'Additional Name', 'Family Name', 'Yomi Name', 'Given Name Yomi',
  'Additional Name Yomi', 'Family Name Yomi', 'Name Prefix', 'Name Suffix', 'Initials', 'Nickname', 'Short Name',
  'Maiden Name', 'Birthday', 'Gender', 'Location', 'Billing Information', 'Directory Server', 'Mileage',
  'Occupation', 'Hobby', 'Sensitivity', 'Priority', 'Subject', 'Notes', 'Language', 'Photo', 'Group Membership',
  'E-mail 1 - Type', 'E-mail 1 - Value', 'Phone 1 - Type', 'Phone 1 - Value', 'Phone 2 - Type', 'Phone 2 - Value',
  'Organization 1 - Type', 'Organization 1 - Name', 'Organization 1 - Title'];
const legacyRows = [
  ['Bruno Exemplo', 'Bruno', '', 'Exemplo', '', '', '', '', '', '', '', '', '', '', '1985-11-02', '', '', '', '', '',
    '', '', '', '', '', 'Cliente desde 2019', '', '', '* My Contacts ::: Clientes',
    '* Work', 'bruno@example.com.br', 'Mobile', '+55 11 91234-5678', 'Home', '+55 11 3123-4567', '', 'Exemplo Ltda', 'Gerente'],
];
write('google-contacts-legacy.csv', utf8(csv([legacyHeader, ...legacyRows])));

// ── 3. Outlook (English) ─────────────────────────────────────────────────
const outlookHeader = ['Title', 'First Name', 'Middle Name', 'Last Name', 'Suffix', 'Company', 'Department', 'Job Title',
  'Business Street', 'Business Street 2', 'Business City', 'Business State', 'Business Postal Code',
  'Business Country/Region', 'Home Street', 'Home City', 'Home State', 'Home Postal Code', 'Home Country/Region',
  'Business Fax', 'Business Phone', 'Business Phone 2', 'Home Phone', 'Mobile Phone', 'Other Phone', 'Pager',
  'Primary Phone', 'Anniversary', 'Birthday', 'Categories', 'E-mail Address', 'E-mail Type', 'E-mail Display Name',
  'E-mail 2 Address', 'Gender', 'Initials', 'Notes', 'Web Page'];
const outlookRows = [
  ['Mr.', 'Carl', '', 'Sample', 'Jr.', 'Sample & Sons', 'Sales', 'Account Manager', '500 Market St', 'Suite 200',
    'San Francisco', 'CA', '94105', 'United States', '', '', '', '', '', '(415) 555-0199', '(415) 555-0123', '', '',
    '(415) 555-0177', '', '', '', '0/0/00', '7/4/1980', 'Clients;VIP', 'carl@example.com', 'SMTP', 'Carl Sample (carl@example.com)',
    '', 'Unspecified', 'C.S.', 'Prefers e-mail', 'www.example.com'],
  ['', 'Dana', '', 'Demo', '', '', '', '', '', '', '', '', '', '', '22 Elm Rd', 'London', '', 'SW1A 1AA', 'United Kingdom',
    '', '', '', '020 7946 0018', '07911 123457', '', '', '', '', '12/25/1975', '', 'dana@example.co.uk', 'SMTP', '', '',
    'Unspecified', '', '', ''],
];
write('outlook-en.csv', utf8(csv([outlookHeader, ...outlookRows])));

// ── 4. Outlook (German), Windows-1252 ────────────────────────────────────
const deHeader = ['Anrede', 'Vorname', 'Weitere Vornamen', 'Nachname', 'Suffix', 'Firma', 'Abteilung', 'Position',
  'Straße geschäftlich', 'Ort geschäftlich', 'Region geschäftlich', 'Postleitzahl geschäftlich',
  'Land/Region geschäftlich', 'Straße privat', 'Ort privat', 'Postleitzahl privat', 'Land/Region privat',
  'Fax geschäftlich', 'Telefon geschäftlich', 'Telefon privat', 'Mobiltelefon', 'Weiteres Telefon',
  'Geburtstag', 'Jahrestag', 'E-Mail-Adresse', 'E-Mail-Typ', 'E-Mail: Angezeigter Name', 'E-Mail 2: Adresse',
  'Kategorien', 'Notizen', 'Webseite'];
const deRows = [
  ['Herr', 'Jürgen', '', 'Müßig', '', 'Beispiel GmbH', 'Einkauf', 'Leiter Einkauf', 'Hauptstraße 5', 'München', 'Bayern',
    '80331', 'Deutschland', '', '', '', '', '089 1234567', '089 1234560', '', '0151 23456789', '', '3.10.1972', '0.0.00',
    'juergen@example.de', 'SMTP', 'Jürgen Müßig', '', 'Lieferanten', 'Größe: XL; Äpfel', ''],
  ['Frau', 'Zoë', '', 'Ölmann', '', '', '', '', '', '', '', '', '', 'Gartenweg 2', 'Köln', '50667', 'Deutschland', '', '',
    '0221 987654', '0170 1234567', '', '24.12.1988', '', 'zoe@example.de', 'SMTP', '', '', '', '', ''],
];
write('outlook-de-cp1252.csv', encodeSbcs(csv([deHeader, ...deRows]), 'windows-1252'));

// ── 5. Outlook (Russian), Windows-1251 ───────────────────────────────────
const ruHeader = ['Обращение', 'Имя', 'Отчество', 'Фамилия', 'Суффикс', 'Организация', 'Отдел', 'Должность',
  'Улица (раб. адрес)', 'Город (раб. адрес)', 'Область (раб. адрес)', 'Индекс (раб. адрес)',
  'Страна или регион (раб. адрес)', 'Улица (дом. адрес)', 'Город (дом. адрес)', 'Почтовый индекс (дом. адрес)',
  'Рабочий телефон', 'Домашний телефон', 'Телефон переносной', 'Рабочий факс', 'День рождения', 'Годовщина',
  'Адрес эл. почты', 'Тип эл. почты', 'Краткое имя эл. почты', 'Категории', 'Заметки', 'Веб-страница'];
const ruRows = [
  ['', 'Анна', 'Сергеевна', 'Смирнова', '', 'АО «Образец»', 'Бухгалтерия', 'Главный бухгалтер', 'ул. Ленина, д. 1',
    'Москва', '', '101000', 'Россия', '', '', '', '+7 495 000-00-01', '', '8 (999) 000-11-22', '', '01.02.1985', '',
    'anna@example.ru', 'SMTP', 'Анна Смирнова', 'Работа', 'Звонить после 10:00', ''],
  ['', 'Пётр', '', 'Ёлкин', '', '', '', '', '', '', '', '', '', 'пр. Мира, 7, кв. 3', 'Санкт-Петербург', '190000',
    '', '', '89990003344', '', '15.07.1990', '', 'petr@example.ru', 'SMTP', '', '', '', ''],
];
write('outlook-ru-cp1251.csv', encodeSbcs(csv([ruHeader, ...ruRows]), 'windows-1251'));

// ── 6. Outlook (French), UTF-8 with BOM, semicolons (saved again by Excel) ───
const frHeader = ['Titre', 'Prénom', 'Deuxième prénom', 'Nom', 'Suffixe', 'Société', 'Service', 'Fonction',
  'Rue (bureau)', 'Ville (bureau)', 'Code postal (bureau)', 'Pays/Région (bureau)', 'Téléphone (bureau)',
  'Tél. mobile', 'Télécopie (bureau)', 'Anniversaire', 'Adresse de messagerie', 'Type de messagerie', 'Notes', 'Page Web'];
const frRows = [
  ['M.', 'François', '', 'Exemple', '', 'Société Exemple', 'Ventes', 'Directeur commercial', '10 rue de la Paix',
    'Paris', '75002', 'France', '01 23 45 67 89', '06 12 34 56 78', '01 23 45 67 80', '14/07/1979',
    'francois@example.fr', 'SMTP', 'Préfère le téléphone', 'https://example.fr'],
];
write('outlook-fr-semicolon.csv', utf8(csv([frHeader, ...frRows], ';'), true));

// ── 7. LinkedIn connections export ───────────────────────────────────────
const linkedin =
  'Notes:\r\n' +
  '"When exporting your connection data, you may notice that some of the email addresses are missing. You will only see email addresses for connections who have allowed their connections to see or download their email address using this setting https://www.linkedin.com/psettings/privacy/email. You can learn more here https://www.linkedin.com/help/linkedin/answer/261"\r\n' +
  '\r\n' +
  csv([
    ['First Name', 'Last Name', 'URL', 'Email Address', 'Company', 'Position', 'Connected On'],
    ['Erin', 'Example', 'https://www.linkedin.com/in/erin-example-000', 'erin@example.com', 'Example Inc', 'CTO', '04 Nov 2026'],
    ['Farid', 'Contoh', 'https://www.linkedin.com/in/farid-contoh-000', '', 'PT Contoh', 'Sales Lead', '12 Mar 2024'],
  ]);
write('linkedin-connections.csv', utf8(linkedin));

// ── 8. Simple list, no header, Russian, Windows-1251, semicolons ─────────
const simpleRu = csv(
  [
    ['Иванов Иван Иванович', '+7 999 123-45-67'],
    ['Петрова Ирина', '89991234568'],
    ['Сидоров С.', '79991234569'],
    ['', ''],
    ['Кузнецова Анна Петровна', '8 999 123 45 70'],
  ],
  ';',
);
write('simple-ru-cp1251-noheader.csv', encodeSbcs(simpleRu, 'windows-1251'));

// ── 9. German Excel: semicolons, Windows-1252, phones mangled to 4.4E+11 ─
const excelDe = csv(
  [
    ['Name', 'Telefon', 'E-Mail', 'Geburtsdatum'],
    ['Max Mustermann', '4,91512E+11', 'max@example.de', '01.04.1980'],
    ['Erika Beispiel', '4,91761234567E+11', 'erika@example.de', '31.12.1990'],
    ['Jörg Größer', '015123456789', 'joerg@example.de', ''],
  ],
  ';',
);
write('excel-de-semicolon-cp1252.csv', encodeSbcs(excelDe, 'windows-1252'));

// ── 10. Turkish Excel, Windows-1254 ───────────────────────────────────────
const excelTr = csv(
  [
    ['Ad Soyad', 'Cep Telefonu', 'E-posta', 'Şirket', 'Doğum Tarihi'],
    ['Ayşe Yılmaz', '0532 123 45 67', 'ayse@example.com.tr', 'Örnek A.Ş.', '15.03.1987'],
    ['Çağrı Öztürk', '05551234567', 'cagri@example.com.tr', 'Şeker Ltd. Şti.', ''],
    ['İsmail Işık', '+90 212 555 01 23', '', 'Ğ Ü İ Ş Ç Ö test', ''],
  ],
  ';',
);
write('excel-tr-cp1254.csv', encodeSbcs(excelTr, 'windows-1254'));

// ── 11. Arabic, Windows-1256 ──────────────────────────────────────────────
const excelAr = csv([
  ['الاسم', 'الهاتف', 'البريد الإلكتروني'],
  ['محمد أحمد', '+966 50 123 4567', 'mohammed@example.sa'],
  ['فاطمة علي', '0501234568', 'fatima@example.sa'],
]);
write('excel-ar-cp1256.csv', encodeSbcs(excelAr, 'windows-1256'));

// ── 12. Excel "Unicode text": UTF-16LE + BOM, tab-separated ──────────────
const utf16 = csv(
  [
    ['First Name', 'Last Name', 'Mobile Phone', 'E-mail Address'],
    ['Đức', 'Nguyễn', '+84 91 234 56 78', 'duc@example.vn'],
    ['李', '小明', '+86 138 0013 8000', 'li@example.cn'],
    ['Øyvind', 'Ærø', '+47 412 34 567', 'oyvind@example.no'],
  ],
  '\t',
);
write('excel-unicode-utf16le.txt', encodeUtf16le(utf16));

// ── 13. Japanese, Shift_JIS ───────────────────────────────────────────────
const sjis = csv([
  ['氏名', '電話番号', 'メール'],
  ['山田 太郎', '090-1234-5678', 'taro@example.jp'],
  ['佐藤 花子', '03-1234-5678', 'hanako@example.jp'],
]);
write('japanese-shift_jis.csv', encodeShiftJis(sjis));

// ── 14. Indonesian simple list, comma, UTF-8 ─────────────────────────────
write(
  'indonesia-nama-hp.csv',
  utf8(
    csv([
      ['Nama', 'No HP', 'Alamat', 'Kota'],
      ['Budi Santoso', '0812-3456-7890', 'Jl. Merdeka No. 1', 'Jakarta'],
      ['Siti Rahayu', '6281234567891', 'Jl. Sudirman 2', 'Bandung'],
      ['Agus', '081234567892', '', ''],
    ]),
  ),
);

// ── 15. Brazilian list, semicolon, pipe-separated variant ───────────────
write(
  'brasil-pipe.csv',
  utf8(
    csv(
      [
        ['Nome', 'Sobrenome', 'Celular', 'CEP', 'Cidade', 'Aniversário'],
        ['João', 'da Silva', '(11) 91234-5678', '01310-100', 'São Paulo', '25/12/1990'],
        ['Maria', 'Souza Santos', '21 99876-5432', '20040-002', 'Rio de Janeiro', '05/03'],
      ],
      '|',
    ),
  ),
);

// ── 16–18. Workbooks: xlsx (2 sheets, numbers, dates), xls (BIFF8), ods ──
function workbook() {
  const wb = XLSX.utils.book_new();
  const contacts = XLSX.utils.aoa_to_sheet([
    ['Full name', 'Mobile', 'Email', 'Company', 'Birthday', 'Notes'],
    ['Grace Hopper-Example', 12025550143, 'grace@example.com', 'Example Navy', new Date(Date.UTC(1906, 11, 9)), 'Numbers stored as numbers'],
    ['Hiro Example', 447911123456, 'hiro@example.co.uk', '', new Date(Date.UTC(1999, 0, 31)), ''],
    ['Inès Exemple', '+33 6 12 34 56 78', 'ines@example.fr', 'Exemple SARL', '', 'Text phone'],
  ], { cellDates: true });
  contacts['!cols'] = [{ wch: 24 }, { wch: 10 }];
  const other = XLSX.utils.aoa_to_sheet([
    ['Name', 'Phone'],
    ['Second Sheet Person', '+1 202 555 0111'],
  ]);
  XLSX.utils.book_append_sheet(wb, contacts, 'Contacts');
  XLSX.utils.book_append_sheet(wb, other, 'Archive');
  return wb;
}
write('workbook.xlsx', new Uint8Array(XLSX.write(workbook(), { type: 'array', bookType: 'xlsx', cellDates: true })));
write('workbook.xls', new Uint8Array(XLSX.write(workbook(), { type: 'array', bookType: 'biff8' })));
write('workbook.ods', new Uint8Array(XLSX.write(workbook(), { type: 'array', bookType: 'ods' })));

console.log('done →', out);
