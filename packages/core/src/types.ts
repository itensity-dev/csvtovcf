/** vCard versions the builder can write. 3.0 is the default: best compatibility. */
export type VCardVersion = '2.1' | '3.0' | '4.0';

export type PhoneType =
  | 'cell'
  | 'voice'
  | 'home'
  | 'work'
  | 'main'
  | 'fax'
  | 'homefax'
  | 'workfax'
  | 'pager'
  | 'other';

export type EmailType = 'home' | 'work' | 'other';
export type AddressType = 'home' | 'work' | 'other';
export type UrlType = 'home' | 'work' | 'profile' | 'other';

/** How phone numbers are written to the output. */
export type PhoneMode = 'e164' | 'international' | 'national' | 'keep';

export type PhoneIssue =
  /** Excel turned the number into 4.4E+11 and digits were lost. */
  | 'excel-scientific'
  /** Excel scientific notation, but every digit survived — restored. */
  | 'excel-scientific-restored'
  /** Parsed only after adding a leading "+" (number stored without it). */
  | 'added-plus'
  /** Not a valid number for the detected/default country. */
  | 'invalid'
  /** Fewer than 3 digits — probably not a phone at all. */
  | 'not-a-number';

export interface Phone {
  /** Value as it will be written (after normalization). */
  value: string;
  /** Original cell text. */
  raw: string;
  type: PhoneType;
  /** Free-text label from the source (e.g. Google "Phone 1 - Label"). */
  label?: string;
  /** E.164 form if the number could be parsed. */
  e164?: string;
  /** true = valid, false = invalid, null = not checked ("keep as is"). */
  valid: boolean | null;
  issue?: PhoneIssue;
}

export interface Email {
  value: string;
  type: EmailType;
  label?: string;
}

export interface Address {
  type: AddressType;
  label?: string;
  poBox: string;
  extended: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface Url {
  value: string;
  type: UrlType;
  label?: string;
}

/** A date that may have no year (birthdays are often stored as day + month). */
export interface PartialDate {
  year?: number;
  month: number;
  day: number;
}

export type ContactWarningCode =
  | 'phone-invalid'
  | 'phone-excel-scientific'
  | 'phone-excel-restored'
  | 'phone-added-plus'
  | 'email-invalid'
  | 'date-unparsed'
  | 'name-from-org'
  | 'name-from-email'
  | 'name-from-phone';

export interface ContactWarning {
  code: ContactWarningCode;
  /** The offending value, for display in the report. */
  value?: string;
}

export interface Contact {
  /** Index of the source file (0-based) when several files are combined. */
  file: number;
  /** 1-based row number in the source table (as the user sees it in Excel). */
  row: number;
  prefix: string;
  given: string;
  middle: string;
  family: string;
  suffix: string;
  /** FN — formatted name. Never empty in output (built from parts/org/email). */
  fullName: string;
  nickname: string;
  phoneticGiven: string;
  phoneticMiddle: string;
  phoneticFamily: string;
  org: string;
  department: string;
  title: string;
  phones: Phone[];
  emails: Email[];
  addresses: Address[];
  urls: Url[];
  birthday?: PartialDate;
  anniversary?: PartialDate;
  note: string;
  categories: string[];
  warnings: ContactWarning[];
}

export function emptyContact(file = 0, row = 0): Contact {
  return {
    file,
    row,
    prefix: '',
    given: '',
    middle: '',
    family: '',
    suffix: '',
    fullName: '',
    nickname: '',
    phoneticGiven: '',
    phoneticMiddle: '',
    phoneticFamily: '',
    org: '',
    department: '',
    title: '',
    phones: [],
    emails: [],
    addresses: [],
    urls: [],
    note: '',
    categories: [],
    warnings: [],
  };
}

export function emptyAddress(type: AddressType = 'home'): Address {
  return {
    type,
    poBox: '',
    extended: '',
    street: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
  };
}
