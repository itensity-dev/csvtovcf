import type { ColumnMapping, FieldKey } from './fields';
import { looksLikeEmail, looksLikePhone, looksLikeUrl, normalizeHeader } from './text';
import { parseDate } from './dates';

// ───────────────────────────── Source detection ─────────────────────────────

export type SourceId =
  | 'google'
  | 'google-legacy'
  | 'outlook'
  | 'outlook-localized'
  | 'linkedin'
  | 'simple'
  | 'generic'
  | 'headerless';

export interface SourceInfo {
  id: SourceId;
  /** Language of localized headers, if recognized (de, fr, ru, es, pt, it, tr, id...). */
  headerLanguage?: string;
  confidence: number;
}

const OUTLOOK_EN = [
  'first name', 'middle name', 'last name', 'job title', 'business phone', 'mobile phone', 'home phone',
  'business street', 'home street', 'e mail address', 'e mail 2 address', 'business fax', 'company',
  'primary phone', 'other phone', 'business city', 'home city', 'categories',
];

/** Distinctive header words of localized Outlook/Windows contact exports and of hand-made tables. */
const LANG_SIGNATURES: Record<string, string[]> = {
  de: ['vorname', 'nachname', 'telefon geschaftlich', 'mobiltelefon', 'e mail adresse', 'firma', 'position', 'strasse privat', 'straße privat', 'ort geschaftlich', 'geburtstag', 'anrede', 'abteilung', 'notizen', 'telefon privat'],
  fr: ['prenom', 'nom', 'telephone bureau', 'tel mobile', 'adresse de messagerie', 'societe', 'fonction', 'rue domicile', 'ville bureau', 'anniversaire', 'titre', 'service', 'telephone domicile', 'code postal bureau'],
  ru: ['имя', 'фамилия', 'отчество', 'рабочии телефон', 'телефон переноснои', 'мобильныи телефон', 'адрес эл почты', 'организация', 'должность', 'день рождения', 'обращение', 'отдел', 'домашнии телефон', 'заметки'],
  es: ['nombre', 'apellidos', 'apellido', 'telefono del trabajo', 'telefono movil', 'organizacion', 'puesto', 'cumpleanos', 'direccion de correo electronico', 'segundo nombre', 'telefono particular', 'compania', 'notas'],
  pt: ['nome', 'sobrenome', 'telefone comercial', 'celular', 'telefone residencial', 'empresa', 'cargo', 'aniversario', 'endereco de email', 'segundo nome', 'observacoes', 'cidade'],
  it: ['nome', 'cognome', 'telefono ufficio', 'cellulare', 'societa', 'posizione', 'compleanno', 'indirizzo posta elettronica'],
  tr: ['ad', 'soyadi', 'soyad', 'is telefonu', 'cep telefonu', 'e posta adresi', 'sirket', 'is unvani', 'dogum gunu', 'ev telefonu'],
  id: ['nama depan', 'nama belakang', 'nama', 'nomor hp', 'no hp', 'nomor telepon', 'perusahaan', 'jabatan', 'alamat', 'tanggal lahir', 'kota'],
  nl: ['voornaam', 'achternaam', 'telefoon werk', 'mobiele telefoon', 'bedrijf', 'functie', 'verjaardag'],
  pl: ['imie', 'nazwisko', 'telefon sluzbowy', 'telefon komorkowy', 'firma', 'stanowisko', 'urodziny'],
};

function headerSet(headers: string[]): Set<string> {
  return new Set(headers.map(normalizeHeader));
}

export function detectHeaderLanguage(headers: string[]): { lang: string; hits: number } | null {
  const set = headerSet(headers);
  let best: { lang: string; hits: number } | null = null;
  for (const [lang, words] of Object.entries(LANG_SIGNATURES)) {
    const hits = words.filter((w) => set.has(w)).length;
    if (hits >= 2 && (!best || hits > best.hits)) best = { lang, hits };
  }
  return best;
}

export function detectSource(headers: string[] | null): SourceInfo {
  if (!headers) return { id: 'headerless', confidence: 0.9 };
  const set = headerSet(headers);
  const has = (h: string) => set.has(h);
  if (has('first name') && has('last name') && has('connected on') && (has('url') || has('email address'))) {
    return { id: 'linkedin', confidence: 0.98 };
  }
  const googleNumbered = headers.some((h) => /^(phone|e-mail|address|website) \d+ - (label|value)$/i.test(h.trim()));
  if (has('first name') && googleNumbered && (has('labels') || headers.some((h) => / - Label$/i.test(h)))) {
    return { id: 'google', confidence: 0.98 };
  }
  if ((has('given name') && has('family name')) || has('group membership')) {
    if (headers.some((h) => / - (Type|Value)$/i.test(h))) return { id: 'google-legacy', confidence: 0.97 };
  }
  const outlookHits = OUTLOOK_EN.filter((h) => set.has(h)).length;
  if (outlookHits >= 6) return { id: 'outlook', confidence: Math.min(0.98, 0.6 + outlookHits * 0.03) };
  const lang = detectHeaderLanguage(headers);
  if (lang && lang.hits >= 5 && headers.length >= 15) {
    return { id: 'outlook-localized', headerLanguage: lang.lang, confidence: 0.85 };
  }
  if (headers.length <= 5) {
    return { id: 'simple', confidence: 0.7, ...(lang ? { headerLanguage: lang.lang } : {}) };
  }
  return { id: 'generic', confidence: 0.5, ...(lang ? { headerLanguage: lang.lang } : {}) };
}

// ───────────────────────────── Exact presets ─────────────────────────────

type Rule = { field: FieldKey; type?: string; group?: string; conf?: number };

/** Google Contacts CSV, current and legacy. Header names are always English. */
function googleRule(header: string): Rule | null {
  const h = header.trim();
  const simple: Record<string, Rule> = {
    'First Name': { field: 'name.given' },
    'Given Name': { field: 'name.given' },
    'Middle Name': { field: 'name.middle' },
    'Additional Name': { field: 'name.middle' },
    'Last Name': { field: 'name.family' },
    'Family Name': { field: 'name.family' },
    Name: { field: 'name.full' },
    'Name Prefix': { field: 'name.prefix' },
    'Name Suffix': { field: 'name.suffix' },
    Nickname: { field: 'name.nickname' },
    'Phonetic First Name': { field: 'name.phoneticGiven' },
    'Phonetic Middle Name': { field: 'name.phoneticMiddle' },
    'Phonetic Last Name': { field: 'name.phoneticFamily' },
    'Given Name Yomi': { field: 'name.phoneticGiven' },
    'Additional Name Yomi': { field: 'name.phoneticMiddle' },
    'Family Name Yomi': { field: 'name.phoneticFamily' },
    'Organization Name': { field: 'org.name' },
    'Organization Title': { field: 'org.title' },
    'Organization Department': { field: 'org.department' },
    Birthday: { field: 'birthday' },
    Notes: { field: 'note' },
    Labels: { field: 'categories' },
    'Group Membership': { field: 'categories' },
  };
  const s = simple[h];
  if (s) return s;
  const m = /^(E-mail|Phone|Address|Website|Relation|Event|Custom Field|Organization|IM|Instant Messenger) (\d+) - (.+)$/i.exec(h);
  if (!m) return null;
  const kind = m[1]!.toLowerCase();
  const n = m[2]!;
  const part = m[3]!.toLowerCase();
  const isLabel = part === 'label' || part === 'type';
  switch (kind) {
    case 'e-mail':
      return isLabel ? { field: 'email.label', group: `e${n}` } : part === 'value' ? { field: 'email', group: `e${n}` } : null;
    case 'phone':
      return isLabel ? { field: 'phone.label', group: `p${n}` } : part === 'value' ? { field: 'phone', group: `p${n}` } : null;
    case 'website':
      return isLabel ? { field: 'url.label', group: `w${n}` } : part === 'value' ? { field: 'url', group: `w${n}` } : null;
    case 'event':
      return isLabel ? { field: 'event.label', group: `ev${n}` } : part === 'value' ? { field: 'event', group: `ev${n}` } : null;
    case 'relation':
    case 'custom field':
      return isLabel ? { field: 'custom.label', group: `c${kind[0]}${n}` } : part === 'value' ? { field: 'custom', group: `c${kind[0]}${n}` } : null;
    case 'organization': {
      const map: Record<string, FieldKey> = { name: 'org.name', title: 'org.title', department: 'org.department' };
      const f = map[part];
      return f && n === '1' ? { field: f } : { field: 'ignore' };
    }
    case 'address': {
      const map: Record<string, FieldKey> = {
        label: 'adr.label',
        type: 'adr.label',
        formatted: 'adr.full',
        street: 'adr.street',
        city: 'adr.city',
        'po box': 'adr.poBox',
        region: 'adr.region',
        'postal code': 'adr.postalCode',
        country: 'adr.country',
        'extended address': 'adr.extended',
      };
      const f = map[part];
      return f ? { field: f, group: `a${n}` } : { field: 'ignore' };
    }
    default:
      return { field: 'ignore' };
  }
}

const GOOGLE_IGNORE = new Set(
  ['File As', 'Photo', 'Yomi Name', 'Initials', 'Short Name', 'Maiden Name', 'Gender', 'Location', 'Billing Information',
    'Directory Server', 'Mileage', 'Occupation', 'Hobby', 'Sensitivity', 'Priority', 'Subject', 'Language'].map((s) => s.toLowerCase()),
);

/** Outlook (classic Windows export and Outlook.com), English headers. */
const OUTLOOK_RULES: Record<string, Rule> = {
  title: { field: 'name.prefix' },
  'first name': { field: 'name.given' },
  'middle name': { field: 'name.middle' },
  'last name': { field: 'name.family' },
  suffix: { field: 'name.suffix' },
  nickname: { field: 'name.nickname' },
  'given yomi': { field: 'name.phoneticGiven' },
  'surname yomi': { field: 'name.phoneticFamily' },
  company: { field: 'org.name' },
  department: { field: 'org.department' },
  'job title': { field: 'org.title' },
  'e mail address': { field: 'email', type: 'other' },
  'e mail 2 address': { field: 'email', type: 'other' },
  'e mail 3 address': { field: 'email', type: 'other' },
  'primary phone': { field: 'phone', type: 'main' },
  'home phone': { field: 'phone', type: 'home' },
  'home phone 2': { field: 'phone', type: 'home' },
  'mobile phone': { field: 'phone', type: 'cell' },
  pager: { field: 'phone', type: 'pager' },
  'home fax': { field: 'phone', type: 'homefax' },
  'business phone': { field: 'phone', type: 'work' },
  'business phone 2': { field: 'phone', type: 'work' },
  'business fax': { field: 'phone', type: 'workfax' },
  'company main phone': { field: 'phone', type: 'work' },
  "assistant s phone": { field: 'phone', type: 'other' },
  'other phone': { field: 'phone', type: 'other' },
  'other fax': { field: 'phone', type: 'fax' },
  'car phone': { field: 'phone', type: 'other' },
  callback: { field: 'phone', type: 'other' },
  'radio phone': { field: 'phone', type: 'other' },
  isdn: { field: 'phone', type: 'other' },
  'tty tdd phone': { field: 'phone', type: 'other' },
  telex: { field: 'phone', type: 'other' },
  'home address': { field: 'adr.full', type: 'home', group: 'home' },
  'home street': { field: 'adr.street', type: 'home', group: 'home' },
  'home street 2': { field: 'adr.street', type: 'home', group: 'home' },
  'home street 3': { field: 'adr.street', type: 'home', group: 'home' },
  'home address po box': { field: 'adr.poBox', type: 'home', group: 'home' },
  'home city': { field: 'adr.city', type: 'home', group: 'home' },
  'home state': { field: 'adr.region', type: 'home', group: 'home' },
  'home postal code': { field: 'adr.postalCode', type: 'home', group: 'home' },
  'home country': { field: 'adr.country', type: 'home', group: 'home' },
  'home country region': { field: 'adr.country', type: 'home', group: 'home' },
  'business address': { field: 'adr.full', type: 'work', group: 'work' },
  'business street': { field: 'adr.street', type: 'work', group: 'work' },
  'business street 2': { field: 'adr.street', type: 'work', group: 'work' },
  'business street 3': { field: 'adr.street', type: 'work', group: 'work' },
  'business address po box': { field: 'adr.poBox', type: 'work', group: 'work' },
  'business city': { field: 'adr.city', type: 'work', group: 'work' },
  'business state': { field: 'adr.region', type: 'work', group: 'work' },
  'business postal code': { field: 'adr.postalCode', type: 'work', group: 'work' },
  'business country': { field: 'adr.country', type: 'work', group: 'work' },
  'business country region': { field: 'adr.country', type: 'work', group: 'work' },
  'other address': { field: 'adr.full', type: 'other', group: 'other' },
  'other street': { field: 'adr.street', type: 'other', group: 'other' },
  'other street 2': { field: 'adr.street', type: 'other', group: 'other' },
  'other street 3': { field: 'adr.street', type: 'other', group: 'other' },
  'other address po box': { field: 'adr.poBox', type: 'other', group: 'other' },
  'other city': { field: 'adr.city', type: 'other', group: 'other' },
  'other state': { field: 'adr.region', type: 'other', group: 'other' },
  'other postal code': { field: 'adr.postalCode', type: 'other', group: 'other' },
  'other country': { field: 'adr.country', type: 'other', group: 'other' },
  'other country region': { field: 'adr.country', type: 'other', group: 'other' },
  birthday: { field: 'birthday' },
  anniversary: { field: 'anniversary' },
  notes: { field: 'note' },
  'web page': { field: 'url', type: 'work' },
  'personal web page': { field: 'url', type: 'home' },
  categories: { field: 'categories' },
};

const OUTLOOK_IGNORE = new Set([
  'initials', 'gender', 'location', 'language', 'internet free busy', 'spouse', 'children', 'manager s name',
  'assistant s name', 'referred by', 'office location', 'organizational id number', 'profession', 'account',
  'user 1', 'user 2', 'user 3', 'user 4', 'keywords', 'mileage', 'hobby', 'billing information',
  'directory server', 'sensitivity', 'priority', 'private', 'e mail type', 'e mail display name',
  'e mail 2 type', 'e mail 2 display name', 'e mail 3 type', 'e mail 3 display name', 'company yomi',
  'schools', 'imaddress', 'government id number', 'computer network name', 'customer id', 'ftp site',
]);

const LINKEDIN_RULES: Record<string, Rule> = {
  'first name': { field: 'name.given' },
  'last name': { field: 'name.family' },
  url: { field: 'url', type: 'profile' },
  'email address': { field: 'email', type: 'other' },
  company: { field: 'org.name' },
  position: { field: 'org.title' },
  'connected on': { field: 'ignore' },
};

// ───────────────────────────── Keyword rules (any language) ─────────────────────────────

/** Match whole words or word prefixes (`stem*`) inside a normalized header. */
function hasAny(h: string, keys: string[]): boolean {
  const padded = ` ${h} `;
  for (const k of keys) {
    if (k.endsWith('*')) {
      const stem = k.slice(0, -1);
      if (padded.includes(` ${stem}`)) return true;
    } else if (padded.includes(` ${k} `)) return true;
  }
  return false;
}

/** Keys are written by hand; run them through the same normalization as headers (ß, й, إ ...). */
function normalizeKeys<T extends Record<string, string[]>>(o: T): T {
  const out = {} as Record<string, string[]>;
  for (const [k, list] of Object.entries(o)) {
    out[k] = list.map((x) => (x.endsWith('*') ? normalizeHeader(x.slice(0, -1)) + '*' : normalizeHeader(x)));
  }
  return out as T;
}

const K = normalizeKeys({
  postal: ['الرمز البريدي', '郵便番号', '邮编', '邮政编码', '우편번호', 'ma buu dien', 'zip', 'zip code', 'zipcode', 'postal code', 'postcode', 'post code', 'postal', 'plz', 'postleitzahl', 'code postal', 'cp', 'индекс', 'почтовыи индекс', 'codigo postal', 'kode pos', 'kodepos', 'posta kodu', 'cap', 'kod pocztowy', 'postcode'],
  emailWord: ['البريد الإلكتروني', 'البريد الالكتروني', 'البريد', 'ايميل', 'メール', 'メールアドレス', 'eメール', '邮箱', '电子邮件', '電子郵件', '이메일', '메일', 'thu dien tu', 'email', 'e mail', 'mail', 'emails', 'correo', 'correo electronico', 'courriel', 'messagerie', 'eposta', 'e posta', 'surel', 'surat elektronik', 'почта', 'почты', 'эл почты', 'электронная почта', 'емеил', 'имеил', 'e mail adresse', 'mailadresse', 'posta elettronica', 'emailadres'],
  emailNoise: ['display', 'angezeigter', 'type', 'typ', 'тип', 'краткое', 'отображаемое', 'nom complet', 'type de'],
  phoneWord: ['الهاتف', 'هاتف', 'رقم الهاتف', 'رقم', 'تلفون', '電話', '電話番号', '电话', '電話號碼', '电话号码', '전화', '전화번호', 'dien thoai', 'so dien thoai', 'sdt', 'phone', 'phones', 'telephone', 'tel', 'telefon', 'telefone', 'telefono', 'telefonu', 'телефон', 'тел', 'nomor', 'no hp', 'hp', 'handphone', 'ponsel', 'telp', 'no telp', 'gsm', 'whatsapp', 'wa', 'number', 'numero', 'номер', 'phone number', 'mobile number', 'contact number', 'telefoon', 'telefonnummer', 'rufnummer', 'cell', 'cellphone', 'tlf', 'fone'],
  mobile: ['الجوال', 'جوال', 'موبايل', 'المحمول', 'محمول', '携帯', '携帯電話', '携帯番号', '手机', '手機', '휴대폰', '핸드폰', '휴대전화', 'di dong', 'mobile', 'mobil', 'mobiltelefon', 'mobilfunk', 'movil', 'celular', 'cel', 'cell', 'cellular', 'cellphone', 'handy', 'portable', 'сотовыи', 'мобильныи', 'моб', 'переноснои', 'hp', 'handphone', 'ponsel', 'cep', 'gsm', 'whatsapp', 'wa', 'cellulare', 'mobiele', 'komorkowy', 'mobile number'],
  fax: ['fax', 'факс', 'telecopie', 'telefax', 'faks', 'fax number'],
  pager: ['pager', 'пеиджер', 'beeper', 'radiomessagerie', 'bip'],
  work: ['business', 'work', 'office', 'company main', 'geschaftlich', 'gesch', 'arbeit', 'buro', 'bureau', 'travail', 'professionnel', 'рабочии', 'раб', 'служебныи', 'trabajo', 'oficina', 'comercial', 'trabalho', 'kantor', 'kerja', 'is', 'isyeri', 'ofis', 'ufficio', 'werk', 'sluzbowy'],
  home: ['home', 'private', 'privat', 'personal', 'domicile', 'perso', 'домашнии', 'дом', 'casa', 'particular', 'residencial', 'residencia', 'rumah', 'ev', 'thuis', 'domowy'],
  main: ['primary', 'main', 'haupttelefon', 'principal', 'основнои', 'utama'],
  other: ['other', 'weitere', 'weiteres', 'autre', 'другои', 'otro', 'outro', 'lainnya', 'diger', 'altro'],
  street: ['الشارع', '番地', '街道', '도로명', 'duong', 'street', 'address line', 'address 1', 'address line 1', 'strasse', 'straße', 'str', 'rue', 'улица', 'calle', 'rua', 'logradouro', 'jalan', 'jl', 'sokak', 'cadde', 'mahalle', 'via', 'straat', 'ulica'],
  extended: ['address line 2', 'address 2', 'extended', 'apartment', 'apt', 'suite', 'unit', 'kvartira', 'квартира', 'complemento', 'piso'],
  city: ['المدينة', 'مدينة', '市区町村', '城市', '도시', 'thanh pho', 'city', 'town', 'ort', 'stadt', 'ville', 'город', 'ciudad', 'cidade', 'municipio', 'kota', 'kabupaten', 'sehir', 'il', 'ilce', 'localidad', 'localite', 'citta', 'plaats', 'miasto', 'населенныи пункт'],
  region: ['المنطقة', '都道府県', '省', '시도', 'tinh', 'state', 'province', 'region', 'county', 'bundesland', 'kanton', 'departement', 'dep region', 'область', 'регион', 'краи', 'estado', 'provincia', 'provinsi', 'uf', 'state province', 'wojewodztwo'],
  country: ['الدولة', 'البلد', '国', '国家', '국가', 'quoc gia', 'country', 'land', 'pays', 'страна', 'pais', 'negara', 'ulke', 'nation', 'country region', 'land region', 'pays region', 'paese', 'kraj'],
  poBox: ['po box', 'p o box', 'postfach', 'boite postale', 'bp', 'абонентскии ящик', 'apartado', 'apartado postal', 'caixa postal', 'kotak pos', 'posta kutusu'],
  address: ['العنوان', '住所', '地址', '주소', 'dia chi', 'address', 'adresse', 'адрес', 'direccion', 'endereco', 'alamat', 'adres', 'indirizzo', 'anschrift', 'adres'],
  fullCombo: ['الاسم الكامل', '氏名', '姓名', '이름', 'ho ten', 'ho va ten', 'full name', 'fullname', 'display name', 'contact name', 'first and last name', 'name and surname', 'ad soyad', 'adi soyadi', 'isim soyisim', 'имя и фамилия', 'фамилия имя', 'фамилия и имя', 'фамилия имя отчество', 'фио', 'ф и о', 'nombre completo', 'nombre y apellido', 'nombre y apellidos', 'nome completo', 'nome e sobrenome', 'nama lengkap', 'nom complet', 'prenom et nom', 'nom et prenom', 'vollstandiger name', 'vor und nachname', 'anzeigename', 'volledige naam', 'imie i nazwisko', 'nome e cognome'],
  fullName: ['الاسم', 'اسم', '名前', '名字', '성명', 'ten', 'name', 'full name', 'fullname', 'display name', 'contact', 'contact name', 'nombre completo', 'nome completo', 'nama', 'nama lengkap', 'ad soyad', 'adi soyadi', 'isim', 'isim soyisim', 'имя и фамилия', 'фио', 'ф и о', 'контакт', 'nom complet', 'vollstandiger name', 'anzeigename', 'nome', 'naam', 'customer', 'client', 'клиент', 'cliente', 'pelanggan', 'musteri', 'kunde'],
  given: ['الاسم الأول', 'الاسم الاول', '名', 'ten rieng', 'first name', 'firstname', 'first', 'given name', 'given', 'forename', 'vorname', 'prenom', 'имя', 'nombre', 'primeiro nome', 'nama depan', 'ad', 'adi', 'voornaam', 'imie', 'nome proprio'],
  family: ['اسم العائلة', 'العائلة', '姓', '성', 'last name', 'lastname', 'last', 'surname', 'family name', 'nachname', 'familienname', 'nom', 'nom de famille', 'фамилия', 'apellido', 'apellidos', 'sobrenome', 'ultimo nome', 'nama belakang', 'soyad', 'soyadi', 'soyisim', 'achternaam', 'nazwisko', 'cognome'],
  middle: ['middle name', 'middle', 'additional name', 'second name', 'weitere vornamen', 'zweiter vorname', 'deuxieme prenom', 'autres prenoms', 'отчество', 'segundo nombre', 'nome do meio', 'segundo nome', 'nama tengah', 'ikinci ad', 'tussenvoegsel', 'drugie imie', 'patronymic'],
  prefix: ['prefix', 'name prefix', 'salutation', 'anrede', 'civilite', 'обращение', 'tratamiento', 'saludo', 'tratamento', 'sapaan', 'gelar depan', 'hitap', 'aanhef', 'zwrot grzecznosciowy', 'honorific'],
  suffix: ['suffix', 'name suffix', 'namenszusatz', 'suffixe', 'суффикс', 'sufijo', 'sufixo', 'akhiran', 'gelar belakang', 'sonek', 'achtervoegsel'],
  nickname: ['nickname', 'nick', 'spitzname', 'surnom', 'ник', 'псевдоним', 'прозвище', 'apodo', 'apelido', 'nama panggilan', 'panggilan', 'takma ad', 'lakap', 'bijnaam', 'pseudonim'],
  org: ['الشركة', 'شركة', '会社', '会社名', '公司', '회사', 'cong ty', 'company', 'organization', 'organisation', 'org', 'firm', 'firma', 'unternehmen', 'societe', 'entreprise', 'организация', 'компания', 'фирма', 'empresa', 'compania', 'organizacion', 'organizacao', 'perusahaan', 'instansi', 'sirket', 'kurum', 'kurulus', 'bedrijf', 'azienda', 'company name', 'business name', 'employer'],
  department: ['department', 'dept', 'abteilung', 'service', 'departement', 'отдел', 'подразделение', 'departamento', 'divisao', 'departemen', 'bagian', 'divisi', 'departman', 'bolum', 'afdeling', 'dzial', 'reparto'],
  jobTitle: ['المسمى الوظيفي', 'الوظيفة', '役職', '职位', '직책', 'chuc vu', 'job title', 'jobtitle', 'position', 'role', 'occupation', 'designation', 'beruf', 'berufsbezeichnung', 'fonction', 'poste', 'должность', 'позиция', 'cargo', 'puesto', 'ocupacao', 'profissao', 'jabatan', 'posisi', 'pekerjaan', 'unvan', 'is unvani', 'pozisyon', 'gorev', 'meslek', 'functie', 'stanowisko', 'ruolo', 'mansione'],
  title: ['title', 'titel', 'titre', 'titulo', 'gelar', 'tytul', 'titolo'],
  birthday: ['تاريخ الميلاد', 'عيد الميلاد', '誕生日', '生日', '생일', 'ngay sinh', 'birthday', 'birth date', 'birthdate', 'date of birth', 'dob', 'bday', 'geburtstag', 'geburtsdatum', 'anniversaire', 'date de naissance', 'день рождения', 'дата рождения', 'др', 'cumpleanos', 'fecha de nacimiento', 'data de nascimento', 'nascimento', 'tanggal lahir', 'tgl lahir', 'ulang tahun', 'dogum tarihi', 'dogum gunu', 'verjaardag', 'geboortedatum', 'urodziny', 'data urodzenia', 'compleanno', 'data di nascita'],
  anniversary: ['anniversary', 'jahrestag', 'hochzeitstag', 'годовщина', 'aniversario de boda', 'yildonumu', 'evlilik yildonumu', 'jubileum', 'rocznica', 'anniversario'],
  aniversario: ['aniversario'],
  note: ['ملاحظات', 'ملاحظة', 'メモ', '備考', '备注', '메모', 'ghi chu', 'notes', 'note', 'comment', 'comments', 'remarks', 'remark', 'description', 'memo', 'notizen', 'notiz', 'bemerkung', 'bemerkungen', 'kommentar', 'remarques', 'commentaire', 'commentaires', 'заметки', 'примечание', 'примечания', 'комментарии', 'описание', 'notas', 'nota', 'observaciones', 'comentarios', 'observacoes', 'catatan', 'keterangan', 'notlar', 'not', 'aciklama', 'opmerkingen', 'uwagi', 'info', 'information'],
  url: ['الموقع', '网站', 'ウェブサイト', '웹사이트', 'website', 'web site', 'web page', 'webpage', 'homepage', 'home page', 'url', 'site', 'web', 'webseite', 'internetseite', 'page web', 'site web', 'сайт', 'веб страница', 'веб саит', 'sitio web', 'pagina web', 'situs', 'laman', 'web sitesi', 'linkedin', 'profile', 'profile url', 'strona www', 'sito web'],
  categories: ['categories', 'category', 'group', 'groups', 'labels', 'tags', 'tag', 'kategorien', 'kategorie', 'gruppe', 'gruppen', 'categorie', 'категории', 'категория', 'группа', 'группы', 'метки', 'categorias', 'categoria', 'grupo', 'grupos', 'etiquetas', 'kategori', 'grup', 'etiket', 'kelompok', 'groep', 'grupa'],
  ignore: ['id', 'uid', 'gender', 'الجنس', '性別', '性别', '성별', 'gioi tinh', 'geschlecht', 'sexe', 'пол', 'sexo', 'jenis kelamin', 'cinsiyet', 'initials', 'language', 'hobby', 'mileage', 'billing information', 'sensitivity', 'priority', 'private', 'created', 'modified', 'updated', 'created at', 'updated at', 'photo', 'connected on', 'file as', 'age', 'возраст', 'edad', 'idade', 'usia', 'yas'],
});

function indexIn(h: string): string | undefined {
  const m = /\b(\d{1,2})\b/.exec(h);
  return m ? m[1] : undefined;
}

function qualifier(h: string): string | undefined {
  if (hasAny(h, K.fax)) return hasAny(h, K.home) ? 'homefax' : hasAny(h, K.work) ? 'workfax' : 'fax';
  if (hasAny(h, K.pager)) return 'pager';
  if (hasAny(h, K.mobile)) return 'cell';
  if (hasAny(h, K.main)) return 'main';
  if (hasAny(h, K.home)) return 'home';
  if (hasAny(h, K.work)) return 'work';
  if (hasAny(h, K.other)) return 'other';
  return undefined;
}

function adrType(h: string): 'home' | 'work' | 'other' | undefined {
  if (hasAny(h, K.home)) return 'home';
  if (hasAny(h, K.work)) return 'work';
  if (hasAny(h, K.other)) return 'other';
  return undefined;
}

/** Classify one header by keywords. Returns null if nothing matched. */
export function classifyHeader(raw: string, hintLang?: string): Rule | null {
  const h = normalizeHeader(raw);
  if (!h) return null;
  const idx = indexIn(h);

  if (hasAny(h, K.ignore) && h.split(' ').length <= 3 && !hasAny(h, K.phoneWord) && !hasAny(h, K.emailWord)) {
    return { field: 'ignore', conf: 0.7 };
  }
  if (h === 'cep') {
    // Brazil: CEP = postal code; Turkey: "cep" = mobile. Content decides when the language is unknown.
    if (hintLang === 'pt') return { field: 'adr.postalCode', group: 'a', conf: 0.85 };
    if (hintLang === 'tr') return { field: 'phone', type: 'cell', conf: 0.8 };
    return { field: 'phone', type: 'cell', conf: 0.45 };
  }
  if (hasAny(h, K.postal) || /почтов\S* индекс|индекс/.test(h)) {
    const t = adrType(h);
    return { field: 'adr.postalCode', ...(t ? { type: t } : {}), group: t ?? idx ?? 'a', conf: 0.85 };
  }
  if (hasAny(h, K.emailWord) || /(^|\s)e ?mail|эл почт|электронн/.test(h)) {
    if (hasAny(h, K.emailNoise)) return { field: 'ignore', conf: 0.6 };
    const t = adrType(h);
    return { field: 'email', type: t ?? 'other', conf: 0.9 };
  }
  const q = qualifier(h);
  const phoneish = hasAny(h, K.phoneWord) || /телефон|telefon|phone|fone/.test(h);
  if (phoneish || q === 'cell' || q === 'fax' || q === 'homefax' || q === 'workfax' || q === 'pager') {
    let type = q ?? 'voice';
    if (type === 'other') type = 'other';
    const bare = ['number', 'numero', 'номер', 'nomor'].includes(h);
    return { field: 'phone', type, conf: bare ? 0.6 : 0.88 };
  }
  // Address parts
  const t = adrType(h);
  const g = t ?? idx ?? 'a';
  if (hasAny(h, K.poBox)) return { field: 'adr.poBox', ...(t ? { type: t } : {}), group: g, conf: 0.85 };
  if (hasAny(h, K.extended)) return { field: 'adr.extended', ...(t ? { type: t } : {}), group: t ?? 'a', conf: 0.75 };
  if (hasAny(h, K.street)) return { field: 'adr.street', ...(t ? { type: t } : {}), group: g, conf: 0.85 };
  if (hasAny(h, K.city)) return { field: 'adr.city', ...(t ? { type: t } : {}), group: g, conf: 0.85 };
  if (hasAny(h, K.country)) return { field: 'adr.country', ...(t ? { type: t } : {}), group: g, conf: 0.8 };
  if (hasAny(h, K.region)) return { field: 'adr.region', ...(t ? { type: t } : {}), group: g, conf: 0.8 };

  // Names
  if (hasAny(h, K.fullCombo)) return { field: 'name.full', conf: 0.9 };
  if (hasAny(h, K.middle)) return { field: 'name.middle', conf: 0.88 };
  if (hasAny(h, K.prefix)) return { field: 'name.prefix', conf: 0.85 };
  if (hasAny(h, K.suffix)) return { field: 'name.suffix', conf: 0.85 };
  if (hasAny(h, K.nickname)) return { field: 'name.nickname', conf: 0.85 };
  if (hasAny(h, K.family)) return { field: 'name.family', conf: h === 'nom' ? 0.75 : 0.9 };
  if (hasAny(h, K.given)) return { field: 'name.given', conf: ['nombre', 'имя', 'ad', 'adi'].includes(h) ? 0.7 : 0.9 };
  if (hasAny(h, K.jobTitle)) return { field: 'org.title', conf: 0.85 };
  if (hasAny(h, K.department)) return { field: 'org.department', conf: h === 'service' ? 0.65 : 0.85 };
  if (hasAny(h, K.org)) return { field: 'org.name', conf: 0.88 };
  if (hasAny(h, K.title)) return { field: 'org.title', conf: 0.55 }; // resolved by content (Mr./Dr. → prefix)
  if (hasAny(h, K.anniversary)) return { field: 'anniversary', conf: 0.85 };
  if (hasAny(h, K.aniversario)) {
    return hintLang === 'es' ? { field: 'anniversary', conf: 0.6 } : { field: 'birthday', conf: 0.7 };
  }
  if (hasAny(h, K.birthday)) return { field: 'birthday', conf: 0.9 };
  if (hasAny(h, K.url)) return { field: 'url', type: t ?? 'other', conf: 0.85 };
  if (hasAny(h, K.categories)) return { field: 'categories', conf: 0.8 };
  if (hasAny(h, K.note)) return { field: 'note', conf: 0.85 };
  if (hasAny(h, K.address)) return { field: 'adr.full', ...(t ? { type: t } : {}), group: g, conf: 0.75 };
  if (hasAny(h, K.fullName)) return { field: 'name.full', conf: h === 'name' || h === 'nama' || h === 'nome' ? 0.85 : 0.75 };
  return null;
}

// ───────────────────────────── Content analysis ─────────────────────────────

export interface ColumnProfile {
  filled: number;
  email: number;
  phone: number;
  url: number;
  date: number;
  multiWord: number;
  prefixLike: number;
  postalBr: number;
  numeric: number;
}

const PREFIX_VALUES = /^(mr|mrs|ms|miss|mx|dr|prof|sir|herr|frau|m|mme|mlle|sr|sra|srta|dona?|bapak|ibu|pak|bu|г-н|г-жа)\.?$/i;

export function profileColumn(values: string[]): ColumnProfile {
  const p: ColumnProfile = { filled: 0, email: 0, phone: 0, url: 0, date: 0, multiWord: 0, prefixLike: 0, postalBr: 0, numeric: 0 };
  for (const raw of values) {
    const v = raw.trim();
    if (!v) continue;
    p.filled++;
    if (looksLikeEmail(v.split(/\s*(?::::|[;,])\s*/)[0] ?? v)) p.email++;
    else if (looksLikePhone(v.split(/\s*(?::::|[;,])\s*/)[0] ?? v)) p.phone++;
    else if (looksLikeUrl(v)) p.url++;
    else if (parseDate(v)) p.date++;
    if (/^\S+\s+\S+/.test(v)) p.multiWord++;
    if (PREFIX_VALUES.test(v)) p.prefixLike++;
    if (/^\d{5}-?\d{3}$/.test(v)) p.postalBr++;
    if (/^\d+$/.test(v)) p.numeric++;
  }
  return p;
}

function ratio(n: number, p: ColumnProfile): number {
  return p.filled ? n / p.filled : 0;
}

function fromContent(p: ColumnProfile): Rule | null {
  if (p.filled === 0) return null;
  if (ratio(p.email, p) >= 0.6) return { field: 'email', type: 'other', conf: 0.75 };
  if (ratio(p.phone, p) >= 0.6) return { field: 'phone', type: 'voice', conf: 0.7 };
  if (ratio(p.url, p) >= 0.6) return { field: 'url', type: 'other', conf: 0.65 };
  if (ratio(p.date, p) >= 0.7) return { field: 'birthday', conf: 0.4 };
  return null;
}

// ───────────────────────────── Auto-mapping ─────────────────────────────

export interface AutoMapInput {
  /** Header cells, or null if the table has no header row. */
  headers: string[] | null;
  /** A sample of data rows (first ~200 is plenty). */
  sample: string[][];
  /** Page language — tie-breaker for ambiguous words ("aniversario", name order). */
  locale?: string;
}

export interface AutoMapResult {
  source: SourceInfo;
  mapping: ColumnMapping[];
}

export function autoMap(input: AutoMapInput): AutoMapResult {
  const { headers, sample } = input;
  const width = Math.max(headers?.length ?? 0, ...sample.slice(0, 50).map((r) => r.length), 0);
  const source = detectSource(headers);
  const hintLang = source.headerLanguage ?? (input.locale ?? '').slice(0, 2);
  const profiles: ColumnProfile[] = [];
  for (let c = 0; c < width; c++) profiles.push(profileColumn(sample.map((r) => r[c] ?? '')));

  const mapping: ColumnMapping[] = [];
  for (let c = 0; c < width; c++) {
    const header = headers?.[c] ?? '';
    const prof = profiles[c]!;
    let rule: Rule | null = null;
    let src: ColumnMapping['source'] = 'none';

    if (headers && (source.id === 'google' || source.id === 'google-legacy')) {
      rule = googleRule(header);
      if (!rule && GOOGLE_IGNORE.has(header.trim().toLowerCase())) rule = { field: 'ignore' };
      if (rule) {
        rule.conf = 0.98;
        src = 'preset';
      }
    } else if (headers && source.id === 'outlook') {
      const n = normalizeHeader(header);
      rule = OUTLOOK_RULES[n] ?? (OUTLOOK_IGNORE.has(n) ? { field: 'ignore' } : null);
      if (rule) {
        rule = { ...rule, conf: 0.97 };
        src = 'preset';
      }
    } else if (headers && source.id === 'linkedin') {
      const n = normalizeHeader(header);
      rule = LINKEDIN_RULES[n] ?? null;
      if (rule) {
        rule = { ...rule, conf: 0.98 };
        src = 'preset';
      }
    }
    if (!rule && headers && header.trim()) {
      rule = classifyHeader(header, hintLang);
      if (rule) src = 'header';
    }
    // Content checks: confirm, demote or replace header guesses.
    const content = fromContent(prof);
    if (rule && src === 'header') {
      const conf = rule.conf ?? 0.7;
      if (rule.field === 'email' && prof.filled && ratio(prof.email, prof) < 0.3) rule.conf = conf * 0.6;
      if (rule.field === 'phone' && (rule.conf ?? 1) < 0.5 && ratio(prof.postalBr, prof) > 0.6) {
        rule = { field: 'adr.postalCode', group: 'a', conf: 0.75 };
      } else if (rule.field === 'phone' && prof.filled && ratio(prof.phone, prof) < 0.3) {
        if (ratio(prof.postalBr, prof) > 0.6) rule = { field: 'adr.postalCode', group: 'a', conf: 0.7 };
        else rule.conf = conf * 0.6;
      }
      if (rule.field === 'adr.postalCode' && (rule.conf ?? 1) <= 0.5 && ratio(prof.phone, prof) > 0.6 && ratio(prof.postalBr, prof) < 0.3) {
        rule = { field: 'phone', type: 'cell', conf: 0.7 };
      }
      if (rule.field === 'org.title' && (rule.conf ?? 1) < 0.6) {
        rule = ratio(prof.prefixLike, prof) > 0.5 ? { field: 'name.prefix', conf: 0.8 } : { field: 'org.title', conf: 0.65 };
      }
      if (rule.field === 'name.prefix' && prof.filled && ratio(prof.prefixLike, prof) < 0.2 && ratio(prof.multiWord, prof) > 0.3) {
        rule = { field: 'org.title', conf: 0.6 };
      }
      if ((rule.field === 'name.full' || rule.field === 'name.given') && content && content.field !== 'birthday') {
        rule = { ...content, conf: 0.6 };
      }
      if (rule.field === 'birthday' && prof.filled && ratio(prof.date, prof) < 0.3) rule.conf = (rule.conf ?? 0.7) * 0.7;
    }
    if (!rule && content) {
      rule = content;
      src = 'content';
    }
    if (!rule) {
      mapping.push({ field: 'ignore', confidence: 0, source: 'none' });
      continue;
    }
    mapping.push({
      field: rule.field,
      ...(rule.type ? { type: rule.type } : {}),
      ...(rule.group ? { group: rule.group } : {}),
      confidence: Math.round((rule.conf ?? 0.7) * 100) / 100,
      source: src,
    });
  }

  postProcess(mapping, profiles, headers);
  return { source, mapping };
}

/**
 * Whole-table fixes:
 * - a "given name" column holding full names, with no family column → full name;
 * - headerless tables: the first text column with multi-word values → full name;
 * - only one column claims a single-value field (two "company" columns → keep the surer one).
 */
function postProcess(mapping: ColumnMapping[], profiles: ColumnProfile[], headers: string[] | null): void {
  const hasFamily = mapping.some((m) => m.field === 'name.family');
  const hasGiven = mapping.some((m) => m.field === 'name.given');
  const hasFull = mapping.some((m) => m.field === 'name.full');
  mapping.forEach((m, i) => {
    const p = profiles[i]!;
    if (m.field === 'name.given' && !hasFamily && !hasFull && p.filled && p.multiWord / p.filled > 0.5) {
      mapping[i] = { field: 'name.full', confidence: Math.min(m.confidence, 0.75), source: m.source };
    }
    // "Имя" / "Nombre" / "Ad" are sure once a family-name column exists next to them
    if (m.field === 'name.given' && hasFamily && m.confidence < 0.85) mapping[i] = { ...m, confidence: 0.88 };
    // "Nome" + "Sobrenome", "Nama" + "Nama Belakang": the generic name column is the given name
    if (m.field === 'name.full' && m.source === 'header' && hasFamily && !hasGiven && p.filled && p.multiWord / p.filled < 0.5) {
      mapping[i] = { field: 'name.given', confidence: Math.min(m.confidence, 0.8), source: m.source };
    }
  });
  if (!mapping.some((m) => m.field.startsWith('name.') && m.field !== 'name.nickname')) {
    // pick the first unmapped text column as full name
    const i = mapping.findIndex((m, idx) => {
      const p = profiles[idx]!;
      return m.field === 'ignore' && m.source === 'none' && p.filled > 0 && p.email === 0 && p.phone < p.filled * 0.3 && p.numeric < p.filled * 0.5;
    });
    if (i >= 0) mapping[i] = { field: 'name.full', confidence: headers ? 0.45 : 0.6, source: 'content' };
  }
  const single: FieldKey[] = [
    'name.full', 'name.prefix', 'name.given', 'name.middle', 'name.family', 'name.suffix', 'name.nickname',
    'org.name', 'org.department', 'org.title', 'birthday', 'anniversary',
  ];
  for (const f of single) {
    const idx = mapping.map((m, i) => (m.field === f ? i : -1)).filter((i) => i >= 0);
    if (idx.length <= 1) continue;
    idx.sort((a, b) => mapping[b]!.confidence - mapping[a]!.confidence || a - b);
    for (const j of idx.slice(1)) {
      // Second "name" column usually is extra info → note, not dropped silently
      mapping[j] = { field: 'note', confidence: 0.4, source: mapping[j]!.source };
    }
  }
}
