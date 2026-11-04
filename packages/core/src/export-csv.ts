import type { Address, Contact, PartialDate, PhoneType } from './types';
import { formatPartialDate } from './dates';

function csvCell(v: string): string {
  if (/[",\r\n]/.test(v) || /^\s|\s$/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

export function toCsv(rows: string[][], bom = true): string {
  return (bom ? '﻿' : '') + rows.map((r) => r.map(csvCell).join(',')).join('\r\n') + '\r\n';
}

const GOOGLE_PHONE_LABEL: Record<PhoneType, string> = {
  cell: 'Mobile',
  voice: 'Mobile',
  home: 'Home',
  work: 'Work',
  main: 'Main',
  fax: 'Other Fax',
  homefax: 'Home Fax',
  workfax: 'Work Fax',
  pager: 'Pager',
  other: 'Other',
};
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Google Contacts CSV ("Google CSV"), current column layout. */
export function toGoogleCsv(contacts: Contact[]): string {
  const maxE = Math.max(1, ...contacts.map((c) => c.emails.length));
  const maxP = Math.max(1, ...contacts.map((c) => c.phones.length));
  const maxA = Math.max(1, ...contacts.map((c) => c.addresses.length));
  const maxW = Math.max(1, ...contacts.map((c) => c.urls.length));
  const header = [
    'First Name', 'Middle Name', 'Last Name', 'Phonetic First Name', 'Phonetic Middle Name', 'Phonetic Last Name',
    'Name Prefix', 'Name Suffix', 'Nickname', 'File As', 'Organization Name', 'Organization Title',
    'Organization Department', 'Birthday', 'Notes', 'Photo', 'Labels',
  ];
  for (let i = 1; i <= maxE; i++) header.push(`E-mail ${i} - Label`, `E-mail ${i} - Value`);
  for (let i = 1; i <= maxP; i++) header.push(`Phone ${i} - Label`, `Phone ${i} - Value`);
  for (let i = 1; i <= maxA; i++) {
    header.push(
      `Address ${i} - Label`, `Address ${i} - Formatted`, `Address ${i} - Street`, `Address ${i} - City`,
      `Address ${i} - PO Box`, `Address ${i} - Region`, `Address ${i} - Postal Code`, `Address ${i} - Country`,
      `Address ${i} - Extended Address`,
    );
  }
  for (let i = 1; i <= maxW; i++) header.push(`Website ${i} - Label`, `Website ${i} - Value`);
  header.push('Event 1 - Label', 'Event 1 - Value');

  const rows = [header];
  for (const c of contacts) {
    const nameless = !c.given && !c.family && !c.middle;
    const r = [
      nameless ? c.fullName : c.given, c.middle, c.family, c.phoneticGiven, c.phoneticMiddle, c.phoneticFamily,
      c.prefix, c.suffix, c.nickname, '', c.org, c.title, c.department,
      c.birthday ? formatPartialDate(c.birthday) : '', c.note, '', c.categories.join(' ::: '),
    ];
    for (let i = 0; i < maxE; i++) {
      const e = c.emails[i];
      r.push(e ? e.label ?? cap(e.type) : '', e?.value ?? '');
    }
    for (let i = 0; i < maxP; i++) {
      const p = c.phones[i];
      r.push(p ? p.label ?? GOOGLE_PHONE_LABEL[p.type] : '', p?.value ?? '');
    }
    for (let i = 0; i < maxA; i++) {
      const a = c.addresses[i];
      r.push(
        a ? a.label ?? cap(a.type) : '', a ? formatAddress(a) : '', a?.street ?? '', a?.city ?? '', a?.poBox ?? '',
        a?.region ?? '', a?.postalCode ?? '', a?.country ?? '', a?.extended ?? '',
      );
    }
    for (let i = 0; i < maxW; i++) {
      const u = c.urls[i];
      r.push(u ? u.label ?? (u.type === 'profile' ? 'Profile' : cap(u.type)) : '', u?.value ?? '');
    }
    r.push(c.anniversary ? 'Anniversary' : '', c.anniversary ? formatPartialDate(c.anniversary) : '');
    rows.push(r);
  }
  return toCsv(rows);
}

export function formatAddress(a: Address): string {
  const line2 = [a.postalCode, a.city].filter(Boolean).join(' ');
  return [a.poBox, a.street, a.extended, line2, a.region, a.country].filter(Boolean).join('\n');
}

const OUTLOOK_HEADER = [
  'First Name', 'Middle Name', 'Last Name', 'Title', 'Suffix', 'Nickname', 'Given Yomi', 'Surname Yomi',
  'E-mail Address', 'E-mail 2 Address', 'E-mail 3 Address', 'Home Phone', 'Home Phone 2', 'Business Phone',
  'Business Phone 2', 'Mobile Phone', 'Car Phone', 'Other Phone', 'Primary Phone', 'Pager', 'Business Fax',
  'Home Fax', 'Other Fax', 'Company Main Phone', 'Callback', 'Radio Phone', 'Telex', 'TTY/TDD Phone',
  'IMAddress', 'Job Title', 'Department', 'Company', 'Office Location', "Manager's Name", "Assistant's Name",
  "Assistant's Phone", 'Company Yomi', 'Business Street', 'Business City', 'Business State',
  'Business Postal Code', 'Business Country/Region', 'Home Street', 'Home City', 'Home State',
  'Home Postal Code', 'Home Country/Region', 'Other Street', 'Other City', 'Other State', 'Other Postal Code',
  'Other Country/Region', 'Personal Web Page', 'Spouse', 'Schools', 'Hobby', 'Location', 'Web Page',
  'Birthday', 'Anniversary', 'Notes', 'Categories',
];

function usDate(d: PartialDate): string {
  // Outlook's own CSV uses M/D/YYYY; a missing year cannot be expressed — 1604 is Apple's "no year" marker, so we skip.
  return d.year ? `${d.month}/${d.day}/${d.year}` : '';
}

/** Outlook CSV (Outlook.com / new Outlook / classic "Comma Separated Values" import), English headers. */
export function toOutlookCsv(contacts: Contact[]): string {
  const col = new Map(OUTLOOK_HEADER.map((h, i) => [h, i]));
  const rows = [OUTLOOK_HEADER];
  for (const c of contacts) {
    const r = OUTLOOK_HEADER.map(() => '');
    const set = (h: string, v: string) => {
      const i = col.get(h);
      if (i !== undefined) r[i] = v;
    };
    const overflow: string[] = [];
    const nameless = !c.given && !c.family && !c.middle;
    set('First Name', nameless ? c.fullName : c.given);
    set('Middle Name', c.middle);
    set('Last Name', c.family);
    set('Title', c.prefix);
    set('Suffix', c.suffix);
    set('Nickname', c.nickname);
    set('Given Yomi', c.phoneticGiven);
    set('Surname Yomi', c.phoneticFamily);
    set('Company', c.org);
    set('Department', c.department);
    set('Job Title', c.title);
    ['E-mail Address', 'E-mail 2 Address', 'E-mail 3 Address'].forEach((h, i) => set(h, c.emails[i]?.value ?? ''));
    c.emails.slice(3).forEach((e) => overflow.push(`E-mail: ${e.value}`));

    const slots: Record<PhoneType, string[]> = {
      cell: ['Mobile Phone'],
      voice: ['Mobile Phone', 'Other Phone'],
      home: ['Home Phone', 'Home Phone 2'],
      work: ['Business Phone', 'Business Phone 2'],
      main: ['Primary Phone'],
      fax: ['Other Fax', 'Business Fax'],
      homefax: ['Home Fax'],
      workfax: ['Business Fax'],
      pager: ['Pager'],
      other: ['Other Phone'],
    };
    const fallback = ['Other Phone', 'Car Phone', 'Callback', 'Radio Phone', 'Home Phone 2', 'Business Phone 2'];
    for (const p of c.phones) {
      const slot = [...slots[p.type], ...fallback].find((h) => !r[col.get(h)!]);
      if (slot) set(slot, p.value);
      else overflow.push(`Phone: ${p.value}`);
    }
    const usedAdr = new Set<string>();
    for (const a of c.addresses) {
      const kind = a.type === 'work' ? 'Business' : a.type === 'home' ? 'Home' : 'Other';
      const k = !usedAdr.has(kind) ? kind : ['Home', 'Business', 'Other'].find((x) => !usedAdr.has(x));
      if (!k) {
        overflow.push(`Address: ${formatAddress(a).replace(/\n/g, ', ')}`);
        continue;
      }
      usedAdr.add(k);
      set(`${k} Street`, [a.poBox, a.street, a.extended].filter(Boolean).join('\n'));
      set(`${k} City`, a.city);
      set(`${k} State`, a.region);
      set(`${k} Postal Code`, a.postalCode);
      set(`${k} Country/Region`, a.country);
    }
    const home = c.urls.find((u) => u.type === 'home');
    const work = c.urls.find((u) => u !== home);
    set('Personal Web Page', home?.value ?? '');
    set('Web Page', work?.value ?? '');
    if (c.birthday) set('Birthday', usDate(c.birthday));
    if (c.anniversary) set('Anniversary', usDate(c.anniversary));
    set('Notes', [c.note, ...overflow].filter(Boolean).join('\n'));
    set('Categories', c.categories.join(';'));
    rows.push(r);
  }
  return toCsv(rows);
}
