import { describe, expect, it } from 'vitest';
import { buildVCard, escapeText, foldLine, qpEncode, utf8Length, vcardFileNames } from '../src/vcard';
import { emptyContact, type Contact } from '../src/types';

function contact(p: Partial<Contact>): Contact {
  return { ...emptyContact(0, 2), ...p };
}

const lines = (v: string) => v.split('\r\n');

/** Unfold per RFC: CRLF followed by one space/tab is removed. */
const unfold = (v: string) => v.replace(/\r\n[ \t]/g, '');

describe('escaping', () => {
  it('escapes backslash, comma, semicolon and newlines', () => {
    expect(escapeText('a\\b,c;d\ne\r\nf')).toBe('a\\\\b\\,c\\;d\\ne\\nf');
  });
  it('N and ADR components keep ";" as separator but escape it inside', () => {
    const v = buildVCard(
      contact({ family: 'Smith; Jr', given: 'A,B', fullName: 'A Smith', addresses: [{ type: 'home', poBox: '', extended: '', street: '1 Main St\nApt 4', city: 'Town, ST', region: '', postalCode: '', country: '' }] }),
      { version: '3.0' },
    );
    expect(v).toContain('N:Smith\\; Jr;A\\,B;;;\r\n');
    expect(v).toContain('ADR;TYPE=HOME:;;1 Main St\\nApt 4;Town\\, ST;;;\r\n');
  });
});

describe('folding', () => {
  it('folds at 75 octets with CRLF + space', () => {
    const f = foldLine('NOTE:' + 'x'.repeat(200));
    for (const l of lines(f)) expect(utf8Length(l)).toBeLessThanOrEqual(75);
    expect(lines(f).slice(1).every((l) => l.startsWith(' '))).toBe(true);
    expect(unfold(f)).toBe('NOTE:' + 'x'.repeat(200));
  });
  it.each([
    ['Cyrillic', 'Длинная заметка на русском языке, которая точно не поместится в одну строку vCard'],
    ['emoji', '🎉👩‍👩‍👧‍👦🇧🇷'.repeat(12)],
    ['CJK', '山田太郎は東京に住んでいます。電話番号はメモに書いてあります。'.repeat(3)],
    ['Arabic', 'محمد أحمد يعيش في الرياض ويعمل في شركة كبيرة للتقنية والاتصالات'],
  ])('never splits a multi-byte character or grapheme: %s', (_n, text) => {
    const f = foldLine('NOTE:' + text);
    const bytes = new TextEncoder().encode(f);
    // decoding each physical line separately must not produce U+FFFD
    for (const l of lines(f)) {
      expect(utf8Length(l)).toBeLessThanOrEqual(75);
      expect(new TextDecoder('utf-8', { fatal: true }).decode(new TextEncoder().encode(l))).toBe(l);
    }
    expect(bytes.length).toBeGreaterThan(75);
    expect(unfold(f)).toBe('NOTE:' + text);
  });
  it('does not separate a backslash escape from its character', () => {
    const value = 'a'.repeat(69) + '\\,b';
    const f = foldLine('NOTE:' + value);
    expect(lines(f)[0]!.endsWith('\\')).toBe(false);
    expect(unfold(f)).toBe('NOTE:' + value);
  });
});

describe('buildVCard 3.0', () => {
  const c = contact({
    prefix: 'Dr.',
    given: 'Alice',
    middle: 'B.',
    family: 'Example',
    fullName: 'Dr. Alice B. Example',
    nickname: 'Ali',
    org: 'Example Corp',
    department: 'R&D',
    title: 'Engineer',
    phones: [
      { value: '+12025550143', raw: '', type: 'cell', valid: true, e164: '+12025550143' },
      { value: '+12025550110', raw: '', type: 'work', valid: true, e164: '+12025550110' },
      { value: '+12025550111', raw: '', type: 'other', valid: true, label: 'WhatsApp' },
    ],
    emails: [{ value: 'alice@example.com', type: 'work' }],
    urls: [{ value: 'https://example.com/a,b', type: 'other' }],
    birthday: { year: 1990, month: 5, day: 17 },
    anniversary: { month: 6, day: 12 },
    note: 'Line 1\nLine 2',
    categories: ['Friends', 'Work, Team'],
  });
  const v = buildVCard(c, { version: '3.0' });
  it('uses CRLF everywhere and ends with CRLF', () => {
    expect(v.endsWith('END:VCARD\r\n')).toBe(true);
    expect(v.replace(/\r\n/g, '')).not.toMatch(/[\r\n]/);
  });
  it('starts with BEGIN, VERSION', () => {
    expect(lines(v).slice(0, 2)).toEqual(['BEGIN:VCARD', 'VERSION:3.0']);
  });
  it('writes all fields', () => {
    expect(v).toContain('N:Example;Alice;B.;Dr.;\r\n');
    expect(v).toContain('FN:Dr. Alice B. Example\r\n');
    expect(v).toContain('NICKNAME:Ali\r\n');
    expect(v).toContain('ORG:Example Corp;R&D\r\n');
    expect(v).toContain('TITLE:Engineer\r\n');
    expect(v).toContain('TEL;TYPE=CELL;TYPE=PREF:+12025550143\r\n');
    expect(v).toContain('TEL;TYPE=WORK,VOICE:+12025550110\r\n');
    expect(v).toContain('item1.TEL;TYPE=VOICE:+12025550111\r\nitem1.X-ABLabel:WhatsApp\r\n');
    expect(v).toContain('EMAIL;TYPE=INTERNET,WORK:alice@example.com\r\n');
    expect(v).toContain('URL:https://example.com/a,b\r\n');
    expect(v).toContain('BDAY:1990-05-17\r\n');
    expect(v).toContain('X-ABDATE:--06-12\r\n');
    expect(v).toContain('NOTE:Line 1\\nLine 2\r\n');
    expect(v).toContain('CATEGORIES:Friends,Work\\, Team\r\n');
  });
  it('optional CHARSET=UTF-8 for old Outlook', () => {
    const r = buildVCard(contact({ given: 'Иван', fullName: 'Иван' }), { version: '3.0', charset: true });
    expect(r).toContain('FN;CHARSET=UTF-8:Иван\r\n');
  });
});

describe('required fields', () => {
  it('builds FN from parts when empty', () => {
    const v = buildVCard(contact({ given: 'Ann', family: 'Lee' }), { version: '3.0' });
    expect(v).toContain('FN:Ann Lee\r\n');
  });
  it('company-only contact: FN = company, empty N, iOS shows as company', () => {
    const v = buildVCard(contact({ org: 'Acme' }), { version: '3.0' });
    expect(v).toContain('N:;;;;\r\n');
    expect(v).toContain('FN:Acme\r\n');
    expect(v).toContain('X-ABShowAs:COMPANY\r\n');
    const v4 = buildVCard(contact({ org: 'Acme' }), { version: '4.0' });
    expect(v4).toContain('KIND:org\r\n');
  });
  it('only a phone: FN = phone, N carries it as given name', () => {
    const v = buildVCard(contact({ phones: [{ value: '+12025550143', raw: '', type: 'cell', valid: true }] }), { version: '3.0' });
    expect(v).toContain('FN:+12025550143\r\n');
    expect(v).toContain('N:;+12025550143;;;\r\n');
  });
  it.each(['2.1', '3.0', '4.0'] as const)('%s always has N and FN', (version) => {
    const v = buildVCard(contact({ emails: [{ value: 'x@example.com', type: 'other' }] }), { version });
    expect(v).toMatch(/\r\nN[:;]/);
    expect(v).toMatch(/\r\nFN[:;]/);
    expect(v).toContain(`VERSION:${version}\r\n`);
  });
});

describe('buildVCard 4.0', () => {
  it('uses tel: URIs, lower-case types, basic dates', () => {
    const v = buildVCard(
      contact({
        given: 'Bo',
        fullName: 'Bo',
        phones: [{ value: '+12025550143 ext. 12', raw: '', type: 'home', valid: true, e164: '+12025550143' }],
        birthday: { month: 2, day: 29 },
        anniversary: { year: 2015, month: 6, day: 12 },
      }),
      { version: '4.0' },
    );
    expect(v).toContain('TEL;VALUE=uri;TYPE=home,voice:tel:+12025550143;ext=12\r\n');
    expect(v).toContain('BDAY:--0229\r\n');
    expect(v).toContain('ANNIVERSARY:20150612\r\n');
  });
  it('invalid numbers stay text', () => {
    const v = buildVCard(contact({ given: 'X', fullName: 'X', phones: [{ value: '12345', raw: '12345', type: 'cell', valid: false }] }), { version: '4.0' });
    expect(v).toContain('TEL;TYPE=cell:12345\r\n');
  });
});

describe('buildVCard 2.1', () => {
  it('ASCII stays plain, bare type params', () => {
    const v = buildVCard(
      contact({ given: 'Ann', family: 'Lee', fullName: 'Ann Lee', phones: [{ value: '+12025550143', raw: '', type: 'cell', valid: true }], emails: [{ value: 'a@example.com', type: 'home' }] }),
      { version: '2.1' },
    );
    expect(v).toContain('N:Lee;Ann;;;\r\n');
    expect(v).toContain('TEL;CELL:+12025550143\r\n');
    expect(v).toContain('EMAIL;INTERNET;HOME:a@example.com\r\n');
  });
  it('non-ASCII uses CHARSET=UTF-8 and QUOTED-PRINTABLE', () => {
    const v = buildVCard(contact({ given: 'Иван', family: 'Петров', fullName: 'Иван Петров' }), { version: '2.1' });
    const joined = v.replace(/=\r\n/g, '');
    expect(joined).toContain('N;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:=D0=9F=D0=B5=D1=82=D1=80=D0=BE=D0=B2;=D0=98=D0=B2=D0=B0=D0=BD;;;\r\n');
    expect(joined).toContain('FN;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:=D0=98=D0=B2=D0=B0=D0=BD =D0=9F=D0=B5=D1=82=D1=80=D0=BE=D0=B2\r\n');
    for (const l of v.split('\r\n')) expect(l.length).toBeLessThanOrEqual(76);
  });
  it('QP soft line breaks keep lines ≤ 76 chars and never split =XX', () => {
    const v = buildVCard(contact({ given: 'X', fullName: 'X', note: 'Заметка '.repeat(20) + '\nвторая строка' }), { version: '2.1' });
    const noteLines = v.slice(v.indexOf('NOTE')).split('\r\n');
    const physical = noteLines.slice(0, noteLines.findIndex((l) => !l.endsWith('=')) + 1);
    expect(physical.length).toBeGreaterThan(2);
    for (const l of physical) {
      expect(l.length).toBeLessThanOrEqual(76);
      expect(l).not.toMatch(/=[0-9A-F]?=$/); // no broken triplet before the soft break
    }
    expect(v).toContain('=0D=0A');
  });
  it('qpEncode encodes "=" and trailing space', () => {
    expect(qpEncode('a=b ').join('')).toBe('a=3Db=20');
  });
});

describe('file names for ZIP', () => {
  it('sanitizes and deduplicates', () => {
    const names = vcardFileNames([
      contact({ fullName: 'Ann: Lee?' }),
      contact({ fullName: 'ann: lee' }),
      contact({ fullName: 'CON' }),
      contact({ fullName: '' , org: 'Acme/Inc' }),
    ]);
    expect(names).toEqual(['Ann Lee.vcf', 'ann lee (2).vcf', 'contact-2.vcf', 'AcmeInc.vcf']);
  });
});
