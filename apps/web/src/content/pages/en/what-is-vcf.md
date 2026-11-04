---
url: what-is-a-vcf-file
title: 'What Is a VCF File? vCard Versions 2.1, 3.0 and 4.0 Explained'
h1: What is a VCF file (vCard)?
description: 'A VCF file is a vCard: a plain-text contact card that every phone and mail app can import. What is inside, how versions 2.1, 3.0 and 4.0 differ, and how to open one.'
lead: 'A VCF file is a vCard: plain text that describes one or more contact cards — name, phone numbers, e-mails, address, birthday — in a standard every phone and e-mail program understands.'
nav: What is a VCF file
summary: 'What is inside a vCard and how versions 2.1, 3.0 and 4.0 differ.'
faq:
  - q: How do I open a VCF file?
    a: 'On a phone, tap it: iPhone and Android offer to add the contacts. On a computer, double-click opens the address book (Contacts on Mac, Outlook or People on Windows). Any text editor shows the raw text.'
  - q: Can one VCF file contain many contacts?
    a: 'Yes. A file is simply several `BEGIN:VCARD … END:VCARD` blocks one after another. iPhone, Android and Google Contacts import them all at once; classic Outlook goes one by one.'
  - q: Which version should I use?
    a: 'vCard 3.0 for phones, Google and Outlook. 4.0 only when an app asks for it; 2.1 for old feature phones.'
  - q: Is a VCF file safe to open?
    a: 'A vCard is plain text with no macros or code. The usual risk is the same as for any attachment from an unknown sender: the contact data itself may be misleading.'
  - q: What is the difference between .vcf and .vcard?
    a: 'None — both extensions are used for the same format. The MIME type is `text/vcard` (older software uses `text/x-vcard`).'
related: [home, garbled-contacts, import-iphone, import-android, excel-to-vcf, bulk-add-contacts]
updated: 2026-11-04
---

## What is inside

A vCard is text. Each card starts with `BEGIN:VCARD` and ends with `END:VCARD`; every line in between is one property:

```text
BEGIN:VCARD
VERSION:3.0
N:García López;María José;;;
FN:María José García López
TEL;TYPE=CELL:+525512345678
EMAIL;TYPE=INTERNET,WORK:mj@example.mx
ORG:García y Asociados
ADR;TYPE=WORK:;;Av. Reforma 222;Ciudad de México;CDMX;06600;México
BDAY:1990-05-17
NOTE:Met at the trade fair
END:VCARD
```

The most common properties:

| Property | Meaning |
| --- | --- |
| `N` | Name parts: family; given; middle; prefix; suffix |
| `FN` | Display name |
| `TEL` | Phone number, with types such as `CELL`, `WORK`, `HOME`, `FAX` |
| `EMAIL` | E-mail address |
| `ADR` | Address: PO box; extended; street; city; region; postal code; country |
| `ORG`, `TITLE` | Company (and department), job title |
| `BDAY`, `ANNIVERSARY` | Dates |
| `NOTE`, `URL`, `CATEGORIES` | Note, website, groups |

## The three versions

| | vCard 2.1 | vCard 3.0 | vCard 4.0 |
| --- | --- | --- | --- |
| Published | 1996, Versit Consortium | 1998, [RFC 2426](https://www.rfc-editor.org/rfc/rfc2426) | 2011, [RFC 6350](https://www.rfc-editor.org/rfc/rfc6350) |
| Non-Latin text | `CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE` | UTF-8 by default | UTF-8 only |
| Type parameters | `TEL;CELL;VOICE` | `TEL;TYPE=CELL` | `TEL;TYPE=cell`, numbers as `tel:` URIs |
| Required | `N` | `N`, `FN` | `FN` |
| Typical use | old phones, some Android exports | iPhone, Android, Google, Outlook | CardDAV servers, newer apps |

**vCard 3.0** is the safe choice: it is the version iOS and Google Contacts export, and every importer reads it. **4.0** cleans up the format (for example, birthdays without a year as `--0517`, numbers as `tel:+15551234567`), but importers handle it less consistently. **2.1** matters for phones from the 2000s, which do not understand UTF-8 unless every non-Latin value is encoded as Quoted-Printable.

## Details that break imports

- **Line endings** must be CRLF.
- **Long lines** are folded at 75 bytes: the line breaks and the next line starts with a space. A bad converter cuts a multi-byte letter in half, and you see `�` in the middle of a name.
- **Commas and semicolons** inside values must be escaped (`\,` `\;`), otherwise an address like “Suite 4, Floor 2” falls apart.
- **Encoding**: a vCard 3.0 file written in Windows-1251 instead of UTF-8 shows Cyrillic as symbols on every phone.

The [converter on this site](/) writes all of this correctly in each version, and you can look at the exact text of the first card in its *vCard text* tab before downloading.
