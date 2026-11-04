import { describe, expect, it } from 'vitest';
import { fieldsByHeader, pipeline } from './helpers';
import { buildVCards } from '../src/vcard';

const brief = (c: { fullName: string; phones: { value: string }[]; emails: { value: string }[] }) => ({
  fn: c.fullName,
  phones: c.phones.map((p) => p.value),
  emails: c.emails.map((e) => e.value),
});

describe('real-world shaped exports (synthetic data)', () => {
  it('Google Contacts CSV (current format)', async () => {
    const { auto, result } = await pipeline('google-contacts.csv', { defaultCountry: 'US' });
    expect(auto.source.id).toBe('google');
    const [alice, ivan, acme, yuki] = result.contacts;
    expect(alice).toMatchObject({ prefix: 'Dr.', given: 'Alice', middle: 'B.', family: 'Example', org: 'Example Corp', department: 'R&D', title: 'Engineer' });
    expect(alice!.phones.map((p) => [p.type, p.value])).toEqual([
      ['cell', '+12025550143'],
      ['cell', '+12025550187'],
      ['work', '+12025550110'],
    ]);
    expect(alice!.emails.map((e) => e.type)).toEqual(['work', 'home']);
    expect(alice!.categories).toEqual(['Friends', 'Work']);
    expect(alice!.birthday).toEqual({ year: 1990, month: 5, day: 17 });
    expect(alice!.anniversary).toEqual({ year: 2015, month: 6, day: 12 });
    expect(alice!.addresses[0]).toMatchObject({ street: '1 Main St', city: 'Springfield', region: 'IL', postalCode: '62701', country: 'USA', extended: 'Apt 4' });
    expect(ivan!.birthday).toEqual({ month: 3, day: 8 });
    expect(acme).toMatchObject({ fullName: 'Acme Widgets', org: 'Acme Widgets' });
    expect(yuki!.phones[0]).toMatchObject({ label: 'WhatsApp', value: '+819012345678' });
    expect(yuki!.phoneticGiven).toBe('ゆき');
  });

  it('Google Contacts CSV (legacy format)', async () => {
    const { auto, result } = await pipeline('google-contacts-legacy.csv', { defaultCountry: 'BR', locale: 'pt' });
    expect(auto.source.id).toBe('google-legacy');
    expect(brief(result.contacts[0]!)).toEqual({ fn: 'Bruno Exemplo', phones: ['+5511912345678', '+551131234567'], emails: ['bruno@example.com.br'] });
    expect(result.contacts[0]!.categories).toEqual(['Clientes']);
  });

  it('Outlook CSV (English): Title is the prefix, 0/0/00 is empty, address country picks phone country', async () => {
    const { auto, table, result } = await pipeline('outlook-en.csv', { defaultCountry: 'US' });
    expect(auto.source.id).toBe('outlook');
    const f = fieldsByHeader(table.headers, auto.mapping);
    expect(f.Title).toBe('name.prefix');
    expect(f['Job Title']).toBe('org.title');
    const [carl, dana] = result.contacts;
    expect(carl).toMatchObject({ prefix: 'Mr.', suffix: 'Jr.', title: 'Account Manager' });
    expect(carl!.anniversary).toBeUndefined();
    expect(carl!.addresses[0]!.street).toBe('500 Market St\nSuite 200');
    expect(dana!.phones.map((p) => p.value)).toEqual(['+442079460018', '+447911123457']);
  });

  it('Outlook CSV (German, Windows-1252)', async () => {
    const { auto, encoding, table, result } = await pipeline('outlook-de-cp1252.csv', { defaultCountry: 'DE', locale: 'de' });
    expect(encoding).toBe('windows-1252');
    expect(auto.source).toMatchObject({ id: 'outlook-localized', headerLanguage: 'de' });
    const f = fieldsByHeader(table.headers, auto.mapping);
    expect(f).toMatchObject({
      Anrede: 'name.prefix',
      Vorname: 'name.given',
      Nachname: 'name.family',
      Mobiltelefon: 'phone:cell',
      'Telefon geschäftlich': 'phone:work',
      'Fax geschäftlich': 'phone:workfax',
      'Straße privat': 'adr.street:home',
      'Postleitzahl geschäftlich': 'adr.postalCode:work',
      'Land/Region geschäftlich': 'adr.country:work',
      'E-Mail-Adresse': 'email:other',
      'E-Mail-Typ': 'ignore',
      Geburtstag: 'birthday',
    });
    expect(result.contacts[0]).toMatchObject({ given: 'Jürgen', family: 'Müßig', note: 'Größe: XL; Äpfel' });
    expect(result.contacts[0]!.birthday).toEqual({ year: 1972, month: 10, day: 3 });
  });

  it('Outlook CSV (Russian, Windows-1251)', async () => {
    const { auto, table, result } = await pipeline('outlook-ru-cp1251.csv', { defaultCountry: 'RU', locale: 'ru' });
    expect(auto.source).toMatchObject({ id: 'outlook-localized', headerLanguage: 'ru' });
    const f = fieldsByHeader(table.headers, auto.mapping);
    expect(f).toMatchObject({
      Имя: 'name.given',
      Отчество: 'name.middle',
      Фамилия: 'name.family',
      'Индекс (раб. адрес)': 'adr.postalCode:work',
      'Почтовый индекс (дом. адрес)': 'adr.postalCode:home',
      'Телефон переносной': 'phone:cell',
      'Адрес эл. почты': 'email:other',
      'Тип эл. почты': 'ignore',
      'Страна или регион (раб. адрес)': 'adr.country:work',
    });
    expect(brief(result.contacts[0]!)).toEqual({ fn: 'Анна Сергеевна Смирнова', phones: ['+74950000001', '+79990001122'], emails: ['anna@example.ru'] });
    expect(result.contacts[1]!.phones[0]!.value).toBe('+79990003344');
  });

  it('Outlook CSV (French, semicolons, BOM)', async () => {
    const { delimiter, table, auto, result } = await pipeline('outlook-fr-semicolon.csv', { defaultCountry: 'FR', locale: 'fr' });
    expect(delimiter).toBe(';');
    const f = fieldsByHeader(table.headers, auto.mapping);
    expect(f).toMatchObject({ Titre: 'name.prefix', Prénom: 'name.given', Nom: 'name.family', Fonction: 'org.title', Anniversaire: 'birthday', 'Tél. mobile': 'phone:cell' });
    expect(result.contacts[0]!.birthday).toEqual({ year: 1979, month: 7, day: 14 });
  });

  it('LinkedIn connections: preamble skipped, row numbers kept', async () => {
    const { auto, result } = await pipeline('linkedin-connections.csv');
    expect(auto.source.id).toBe('linkedin');
    expect(result.contacts.map((c) => c.fullName)).toEqual(['Erin Example', 'Farid Contoh']);
    expect(result.contacts[0]!.row).toBe(5);
    expect(result.contacts[0]!.urls[0]).toMatchObject({ type: 'profile' });
  });

  it('headerless Russian list, ; and Windows-1251', async () => {
    const { auto, result } = await pipeline('simple-ru-cp1251-noheader.csv', { defaultCountry: 'RU', locale: 'ru' });
    expect(auto.source.id).toBe('headerless');
    expect(result.contacts.map((c) => [c.family, c.given, c.middle, c.phones[0]!.value])).toEqual([
      ['Иванов', 'Иван', 'Иванович', '+79991234567'],
      ['Петрова', 'Ирина', '', '+79991234568'],
      ['Сидоров', 'С.', '', '+79991234569'],
      ['Кузнецова', 'Анна', 'Петровна', '+79991234570'],
    ]);
    expect(result.skipped).toEqual([{ file: 0, row: 4, reason: 'empty' }]);
  });

  it('Excel 4.4E+11 is reported; restorable numbers are restored', async () => {
    const { result } = await pipeline('excel-de-semicolon-cp1252.csv', { defaultCountry: 'DE', locale: 'de' });
    expect(result.stats.phonesExcelLost).toBe(1);
    expect(result.stats.phonesExcelRestored).toBe(1);
    expect(result.contacts[0]!.warnings.map((w) => w.code)).toContain('phone-excel-scientific');
    expect(result.contacts[1]!.phones[0]!.value).toBe('+491761234567');
    expect(result.contacts[2]!.phones[0]!.value).toBe('+4915123456789');
  });

  it('Turkish (Windows-1254): Ad Soyad, Cep Telefonu', async () => {
    const { result } = await pipeline('excel-tr-cp1254.csv', { defaultCountry: 'TR', locale: 'tr' });
    expect(result.contacts.map((c) => [c.given, c.family, c.phones[0]?.value])).toEqual([
      ['Ayşe', 'Yılmaz', '+905321234567'],
      ['Çağrı', 'Öztürk', '+905551234567'],
      ['İsmail', 'Işık', '+902125550123'],
    ]);
  });

  it('Arabic (Windows-1256)', async () => {
    const { result } = await pipeline('excel-ar-cp1256.csv', { defaultCountry: 'SA', locale: 'ar' });
    expect(result.contacts.map((c) => [c.fullName, c.phones[0]!.value])).toEqual([
      ['محمد أحمد', '+966501234567'],
      ['فاطمة علي', '+966501234568'],
    ]);
  });

  it('UTF-16 tab-separated "Unicode text"', async () => {
    const { encoding, delimiter, result } = await pipeline('excel-unicode-utf16le.txt');
    expect([encoding, delimiter]).toEqual(['utf-16le', '\t']);
    expect(result.contacts.map((c) => c.fullName)).toEqual(['Đức Nguyễn', '李 小明', 'Øyvind Ærø']);
  });

  it('Japanese Shift_JIS', async () => {
    const { result } = await pipeline('japanese-shift_jis.csv', { defaultCountry: 'JP' });
    expect(result.contacts.map((c) => [c.family, c.given, c.phones[0]!.value])).toEqual([
      ['山田', '太郎', '+819012345678'],
      ['佐藤', '花子', '+81312345678'],
    ]);
  });

  it('Indonesian list: Nama, No HP, Alamat + Kota', async () => {
    const { result } = await pipeline('indonesia-nama-hp.csv', { defaultCountry: 'ID', locale: 'id' });
    expect(result.contacts.map((c) => c.phones[0]!.value)).toEqual(['+6281234567890', '+6281234567891', '+6281234567892']);
    expect(result.contacts[0]!.addresses[0]).toMatchObject({ street: 'Jl. Merdeka No. 1', city: 'Jakarta' });
  });

  it('Brazilian list: pipe-separated, CEP is a postal code', async () => {
    const { delimiter, result } = await pipeline('brasil-pipe.csv', { defaultCountry: 'BR', locale: 'pt' });
    expect(delimiter).toBe('|');
    expect(result.contacts[0]!.addresses[0]!.postalCode).toBe('01310-100');
    expect(result.contacts[1]!.birthday).toEqual({ month: 3, day: 5 });
  });

  it.each(['workbook.xlsx', 'workbook.xls', 'workbook.ods'])('%s: numbers stay whole, dates become dates', async (file) => {
    const { result } = await pipeline(file, { defaultCountry: 'US' });
    const [grace, hiro, ines] = result.contacts;
    expect(grace!.phones[0]!.value).toBe('+12025550143');
    expect(grace!.birthday).toEqual({ year: 1906, month: 12, day: 9 });
    expect(hiro!.phones[0]!.value).toBe('+447911123456');
    expect(ines!.phones[0]!.value).toBe('+33612345678');
    expect(ines!.fullName).toBe('Inès Exemple');
  });

  it('second sheet is readable', async () => {
    const { result } = await pipeline('workbook.xlsx', { sheet: 1, defaultCountry: 'US' });
    expect(result.contacts[0]!.fullName).toBe('Second Sheet Person');
  });

  it('every fixture produces valid-looking vCards in all versions', async () => {
    for (const f of ['google-contacts.csv', 'outlook-ru-cp1251.csv', 'excel-ar-cp1256.csv', 'japanese-shift_jis.csv']) {
      const { result } = await pipeline(f);
      for (const version of ['2.1', '3.0', '4.0'] as const) {
        const v = buildVCards(result.contacts, { version });
        expect(v.match(/BEGIN:VCARD\r\n/g)!.length).toBe(result.contacts.length);
        expect(v.match(/END:VCARD\r\n/g)!.length).toBe(result.contacts.length);
        expect(v).not.toMatch(/[^\r]\n/);
      }
    }
  });
});
