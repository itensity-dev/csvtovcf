import type { AddressType, EmailType, PhoneType, UrlType } from './types.js';

/** Every vCard field a spreadsheet column can be connected to. */
export const FIELD_KEYS = [
  'ignore',
  'name.full',
  'name.prefix',
  'name.given',
  'name.middle',
  'name.family',
  'name.suffix',
  'name.nickname',
  'name.phoneticGiven',
  'name.phoneticMiddle',
  'name.phoneticFamily',
  'org.name',
  'org.department',
  'org.title',
  'phone',
  'phone.label',
  'email',
  'email.label',
  'adr.full',
  'adr.street',
  'adr.extended',
  'adr.poBox',
  'adr.city',
  'adr.region',
  'adr.postalCode',
  'adr.country',
  'adr.label',
  'url',
  'url.label',
  'birthday',
  'anniversary',
  'event',
  'event.label',
  'note',
  'custom',
  'custom.label',
  'categories',
] as const;

export type FieldKey = (typeof FIELD_KEYS)[number];

/** Fields where several columns are allowed (each becomes one more value). */
export const MULTI_FIELDS: ReadonlySet<FieldKey> = new Set<FieldKey>([
  'phone',
  'email',
  'url',
  'adr.full',
  'adr.street',
  'adr.extended',
  'adr.poBox',
  'adr.city',
  'adr.region',
  'adr.postalCode',
  'adr.country',
  'note',
  'custom',
  'categories',
  'event',
]);

export const PHONE_TYPES: PhoneType[] = ['cell', 'voice', 'home', 'work', 'main', 'fax', 'homefax', 'workfax', 'pager', 'other'];
export const EMAIL_TYPES: EmailType[] = ['home', 'work', 'other'];
export const ADDRESS_TYPES: AddressType[] = ['home', 'work', 'other'];
export const URL_TYPES: UrlType[] = ['home', 'work', 'profile', 'other'];

export type MappingSource = 'preset' | 'header' | 'content' | 'user' | 'none';

export interface ColumnMapping {
  field: FieldKey;
  /** Fixed type for phone/email/address/url columns. */
  type?: string;
  /**
   * Columns of one entity share a group: "Address 1 - Street" + "Address 1 - City",
   * "Phone 1 - Label" + "Phone 1 - Value", Outlook "Home Street" + "Home City" (group "home").
   */
  group?: string;
  /** 0..1 — shown to the user as sure / likely / guess. */
  confidence: number;
  source: MappingSource;
}

export type ConfidenceLevel = 'sure' | 'likely' | 'guess' | 'none';

export function confidenceLevel(m: ColumnMapping): ConfidenceLevel {
  if (m.field === 'ignore' && m.source !== 'user') return 'none';
  if (m.source === 'user' || m.confidence >= 0.85) return 'sure';
  if (m.confidence >= 0.6) return 'likely';
  return 'guess';
}

export function fieldFamily(f: FieldKey): 'name' | 'org' | 'phone' | 'email' | 'adr' | 'url' | 'date' | 'other' {
  if (f.startsWith('name.')) return 'name';
  if (f.startsWith('org.')) return 'org';
  if (f.startsWith('phone')) return 'phone';
  if (f.startsWith('email')) return 'email';
  if (f.startsWith('adr.')) return 'adr';
  if (f.startsWith('url')) return 'url';
  if (f === 'birthday' || f === 'anniversary' || f.startsWith('event')) return 'date';
  return 'other';
}
