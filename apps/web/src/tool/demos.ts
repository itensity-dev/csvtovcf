/**
 * Sample tables shown before the user loads a file. Every page/language gets its own:
 * local names, local number formats, local date format, the source's real header layout.
 * Each sample deliberately contains: a number without country code, an Excel-mangled number,
 * a duplicate, an empty row, a non-Latin name.
 * All data is invented; e-mails use example.* domains.
 */
import type { Lang } from '../i18n/config';
import type { PageId } from '../i18n/pages';

interface Person {
  name: string;
  given: string;
  family: string;
  phone: string;
  phone2?: string;
  email: string;
  org: string;
  title: string;
  bday: string;
  bdayIso: string;
}

interface LangSample {
  headers: [string, string, string, string, string];
  people: Person[];
  /** Same phone as people[0], written differently: the duplicate. */
  dupPhone: string;
  /** An Excel-ruined cell. */
  mangled: string;
}

const P = (name: string, given: string, family: string, phone: string, email: string, org: string, title: string, bday: string, bdayIso: string, phone2?: string): Person => ({
  name, given, family, phone, email, org, title, bday, bdayIso, ...(phone2 ? { phone2 } : {}),
});

const SAMPLES: Record<Lang, LangSample> = {
  en: {
    headers: ['Name', 'Mobile', 'Email', 'Company', 'Birthday'],
    people: [
      P('Ann Lee', 'Ann', 'Lee', '(202) 555-0143', 'ann.lee@example.com', 'Lee & Co', 'Founder', '05/17/1990', '1990-05-17', '(202) 555-0110'),
      P('Carlos Mendoza', 'Carlos', 'Mendoza', '+52 55 1234 5678', 'carlos@example.mx', 'Mendoza Logistics', 'Sales', '11/02/1985', '1985-11-02'),
      P('Иван Петров', 'Иван', 'Петров', '+7 999 123-45-67', 'ivan@example.ru', '', '', '', ''),
      P('Mei Chen', 'Mei', 'Chen', '4.4E+11', 'mei@example.com', 'Chen Studio', 'Designer', '', ''),
    ],
    dupPhone: '202 555 0143',
    mangled: '4.4E+11',
  },
  es: {
    headers: ['Nombre', 'Celular', 'Correo', 'Empresa', 'Cumpleaños'],
    people: [
      P('María José García López', 'María José', 'García López', '55 1234 5678', 'mjgarcia@example.mx', 'García y Asociados', 'Directora', '17/05/1990', '1990-05-17', '55 9876 5432'),
      P('Juan Pérez', 'Juan', 'Pérez', '+34 612 345 678', 'juan@example.es', '', '', '02/11/1985', '1985-11-02'),
      P('Ana Souza', 'Ana', 'Souza', '+55 11 91234-5678', 'ana@example.com.br', 'Souza Ltda', 'Ventas', '', ''),
      P('Luis Fernández', 'Luis', 'Fernández', '5,51235E+11', 'luis@example.mx', '', '', '', ''),
    ],
    dupPhone: '+52 55 1234 5678',
    mangled: '5,51235E+11',
  },
  'pt-br': {
    headers: ['Nome', 'Celular', 'E-mail', 'Empresa', 'Aniversário'],
    people: [
      P('João da Silva', 'João', 'da Silva', '(11) 91234-5678', 'joao@example.com.br', 'Silva Comércio', 'Gerente', '17/05/1990', '1990-05-17', '(11) 3123-4567'),
      P('Maria Souza Santos', 'Maria', 'Souza Santos', '21 99876-5432', 'maria@example.com.br', '', '', '02/11/1985', '1985-11-02'),
      P('Pedro Alves', 'Pedro', 'Alves', '+351 912 345 678', 'pedro@example.pt', 'Alves & Filhos', 'Vendas', '', ''),
      P('Lucas Pereira', 'Lucas', 'Pereira', '5,51199E+12', 'lucas@example.com.br', '', '', '', ''),
    ],
    dupPhone: '+55 11 91234 5678',
    mangled: '5,51199E+12',
  },
  id: {
    headers: ['Nama', 'No HP', 'Email', 'Perusahaan', 'Tanggal Lahir'],
    people: [
      P('Budi Santoso', 'Budi', 'Santoso', '0812-3456-7890', 'budi@example.co.id', 'CV Santoso Jaya', 'Pemilik', '17/05/1990', '1990-05-17', '021 1234567'),
      P('Siti Rahayu', 'Siti', 'Rahayu', '6281234567891', 'siti@example.co.id', '', '', '02/11/1985', '1985-11-02'),
      P('Ahmad bin Abdullah', 'Ahmad', 'bin Abdullah', '+60 12-345 6789', 'ahmad@example.my', 'Abdullah Trading', 'Sales', '', ''),
      P('Dewi Lestari', 'Dewi', 'Lestari', '6,28123E+12', 'dewi@example.co.id', '', '', '', ''),
    ],
    dupPhone: '+62 812 3456 7890',
    mangled: '6,28123E+12',
  },
  tr: {
    headers: ['Ad Soyad', 'Cep Telefonu', 'E-posta', 'Şirket', 'Doğum Tarihi'],
    people: [
      P('Ayşe Yılmaz', 'Ayşe', 'Yılmaz', '0532 123 45 67', 'ayse@example.com.tr', 'Yılmaz Tekstil', 'Müdür', '17.05.1990', '1990-05-17', '0212 555 01 23'),
      P('Çağrı Öztürk', 'Çağrı', 'Öztürk', '905551234567', 'cagri@example.com.tr', '', '', '02.11.1985', '1985-11-02'),
      P('Mehmet Demir', 'Mehmet', 'Demir', '+49 151 23456789', 'mehmet@example.de', 'Demir GmbH', 'Satış', '', ''),
      P('İsmail Işık', 'İsmail', 'Işık', '9,05321E+11', 'ismail@example.com.tr', '', '', '', ''),
    ],
    dupPhone: '+90 532 123 4567',
    mangled: '9,05321E+11',
  },
  de: {
    headers: ['Name', 'Mobil', 'E-Mail', 'Firma', 'Geburtstag'],
    people: [
      P('Jürgen Müller', 'Jürgen', 'Müller', '0151 23456789', 'juergen@example.de', 'Müller GmbH', 'Geschäftsführer', '17.05.1990', '1990-05-17', '030 123456'),
      P('Zoë Weiß', 'Zoë', 'Weiß', '+43 664 1234567', 'zoe@example.at', '', '', '02.11.1985', '1985-11-02'),
      P('Ayşe Kaya', 'Ayşe', 'Kaya', '+90 532 123 45 67', 'ayse@example.com.tr', 'Kaya Import', 'Einkauf', '', ''),
      P('Max Mustermann', 'Max', 'Mustermann', '4,91512E+11', 'max@example.de', '', '', '', ''),
    ],
    dupPhone: '+49 1512 3456789',
    mangled: '4,91512E+11',
  },
  fr: {
    headers: ['Nom complet', 'Portable', 'E-mail', 'Société', 'Anniversaire'],
    people: [
      P('François Martin', 'François', 'Martin', '06 12 34 56 78', 'francois@example.fr', 'Martin SARL', 'Gérant', '17/05/1990', '1990-05-17', '01 23 45 67 89'),
      P('Élodie Dubois', 'Élodie', 'Dubois', '+32 470 12 34 56', 'elodie@example.be', '', '', '02/11/1985', '1985-11-02'),
      P('Karim Benali', 'Karim', 'Benali', '+212 612 345 678', 'karim@example.ma', 'Benali Conseil', 'Consultant', '', ''),
      P('Chloé Bernard', 'Chloé', 'Bernard', '3,36123E+10', 'chloe@example.fr', '', '', '', ''),
    ],
    dupPhone: '+33 6 12 34 56 78',
    mangled: '3,36123E+10',
  },
  ru: {
    headers: ['ФИО', 'Телефон', 'Эл. почта', 'Компания', 'День рождения'],
    people: [
      P('Петров Иван Сергеевич', 'Иван', 'Петров', '8 (999) 123-45-67', 'petrov@example.ru', 'ООО «Пример»', 'Директор', '17.05.1990', '1990-05-17', '+7 495 000-00-01'),
      P('Смирнова Анна', 'Анна', 'Смирнова', '79991234568', 'anna@example.ru', '', '', '02.11.1985', '1985-11-02'),
      P('Алия Нуртаева', 'Алия', 'Нуртаева', '+375 29 123-45-67', 'aliya@example.by', 'ИП Нуртаева', 'Бухгалтер', '', ''),
      P('Ёлкин Пётр', 'Пётр', 'Ёлкин', '7,99912E+10', 'elkin@example.ru', '', '', '', ''),
    ],
    dupPhone: '+7 999 123 45 67',
    mangled: '7,99912E+10',
  },
};

const OUTLOOK_HEADERS: Partial<Record<Lang, string[]>> = {
  de: ['Vorname', 'Nachname', 'Mobiltelefon', 'Telefon geschäftlich', 'E-Mail-Adresse', 'Firma', 'Position', 'Geburtstag'],
  fr: ['Prénom', 'Nom', 'Tél. mobile', 'Téléphone (bureau)', 'Adresse de messagerie', 'Société', 'Fonction', 'Anniversaire'],
  ru: ['Имя', 'Фамилия', 'Телефон переносной', 'Рабочий телефон', 'Адрес эл. почты', 'Организация', 'Должность', 'День рождения'],
};
const OUTLOOK_EN = ['First Name', 'Last Name', 'Mobile Phone', 'Business Phone', 'E-mail Address', 'Company', 'Job Title', 'Birthday'];

export interface DemoTable {
  name: string;
  rows: string[][];
}

/** Excel stores phone numbers as numbers: the "+" and the leading 0 are gone. */
function asExcelNumber(phone: string): string {
  if (/e\+/i.test(phone)) return phone;
  const digits = phone.replace(/\D/g, '');
  return phone.trim().startsWith('+') ? digits : digits.replace(/^0+/, '');
}

export function demoTable(page: PageId, lang: Lang): DemoTable {
  const s = SAMPLES[lang];
  const [a, b, c, d] = s.people as [Person, Person, Person, Person];
  const empty = ['', '', '', '', ''];
  const simple = (phone: (p: Person) => string) => [
    [...s.headers],
    [a.name, phone(a), a.email, a.org, a.bday],
    [b.name, phone(b), b.email, b.org, b.bday],
    [c.name, phone(c), c.email, c.org, c.bday],
    empty,
    [d.name, s.mangled, d.email, d.org, d.bday],
    [a.name, s.dupPhone, a.email.toUpperCase(), '', ''],
  ];
  switch (page) {
    case 'google-contacts-csv-to-vcf': {
      const h = ['First Name', 'Last Name', 'Organization Name', 'Organization Title', 'Birthday', 'Labels', 'E-mail 1 - Label', 'E-mail 1 - Value', 'Phone 1 - Label', 'Phone 1 - Value', 'Phone 2 - Label', 'Phone 2 - Value'];
      return {
        name: 'contacts.csv',
        rows: [
          h,
          [a.given, a.family, a.org, a.title, a.bdayIso, '* myContacts ::: Clients', '* Work', a.email, 'Mobile', `${a.phone} ::: ${a.phone2 ?? ''}`.replace(/ ::: $/, ''), 'Work', a.phone2 ?? ''],
          [b.given, b.family, b.org, b.title, b.bdayIso, '* myContacts', 'Home', b.email, 'Mobile', b.phone, '', ''],
          [c.given, c.family, c.org, c.title, '', '* myContacts ::: Family', 'Other', c.email, 'WhatsApp', c.phone, '', ''],
          [d.given, d.family, d.org, d.title, '', '* myContacts', 'Work', d.email, 'Mobile', s.mangled, '', ''],
          [a.given, a.family, '', '', '', '* myContacts', 'Other', a.email.toUpperCase(), 'Mobile', s.dupPhone, '', ''],
        ],
      };
    }
    case 'outlook-csv-to-vcf': {
      const h = OUTLOOK_HEADERS[lang] ?? OUTLOOK_EN;
      return {
        name: 'outlook-contacts.csv',
        rows: [
          h,
          [a.given, a.family, a.phone, a.phone2 ?? '', a.email, a.org, a.title, a.bday],
          [b.given, b.family, b.phone, '', b.email, b.org, b.title, b.bday],
          [c.given, c.family, c.phone, '', c.email, c.org, c.title, ''],
          ['', '', '', '', '', '', '', ''],
          [d.given, d.family, s.mangled, '', d.email, d.org, d.title, ''],
        ],
      };
    }
    case 'excel-to-vcf':
    case 'xlsx-to-vcf':
      return { name: 'contacts.xlsx', rows: simple((p) => asExcelNumber(p.phone)) };
    case 'xls-to-vcf':
      return { name: 'contacts.xls', rows: simple((p) => asExcelNumber(p.phone)) };
    case 'google-sheets-to-vcf':
      return { name: 'Google Sheets', rows: simple((p) => p.phone) };
    default:
      return { name: 'contacts.csv', rows: simple((p) => p.phone) };
  }
}
