---
url: outlook-csv-to-vcf
title: 'Outlook CSV to VCF: Convert Outlook Contacts to vCard'
h1: Outlook CSV to VCF converter
description: 'Convert contacts exported from Outlook (CSV, any language) to one VCF file for iPhone, Android or Gmail. Reads localized headers and Windows encodings. No upload.'
lead: 'Turns an Outlook contacts export into a single .vcf. Works with headers in English, German, French, Russian and other Outlook languages, and with the Windows encodings Outlook writes.'
nav: Outlook CSV to VCF
summary: 'Outlook contacts export (CSV, any language) to one vCard file.'
steps:
  - 'Export from Outlook: classic Outlook — File → Open & Export → Import/Export → Export to a file → Comma Separated Values → Contacts. New Outlook and Outlook.com — People → Manage contacts → Export contacts.'
  - 'Drop the .csv above. The converter detects the encoding (Outlook often writes Windows-1252 or 1251, not UTF-8) and the separator (`;` in many European setups).'
  - 'Check the plugs: Outlook’s `Title` is the name prefix (Mr., Dr.), `Job Title` is the position. Empty columns — Outlook exports about 90 — are hidden.'
  - 'Download the .vcf and import it on the [iPhone](/import-vcf-to-iphone/) or [Android](/import-vcf-to-android/).'
features:
  - feature: Outlook versions
    value: 'Classic Outlook for Windows (2010–2024, Microsoft 365), new Outlook, Outlook.com, Outlook for Mac CSV exports.'
  - feature: Header languages
    value: 'English, German (`Vorname`, `Telefon geschäftlich`), French (`Prénom`, `Tél. mobile`), Russian (`Имя`, `Рабочий телефон`), Spanish, Portuguese, Italian, Dutch, Polish, Turkish.'
  - feature: Phones
    value: 'Business, Home, Mobile, Primary, Company Main, Fax and Pager columns keep their type; Car, Callback, ISDN, Radio become “other”.'
  - feature: Addresses
    value: 'Business / Home / Other street, city, state, postal code and country become three typed `ADR` entries; Street 2 and 3 are joined.'
  - feature: Empty values
    value: 'Outlook writes empty dates as `0/0/00` — they are ignored, not turned into the year 2000.'
  - feature: Not carried over
    value: 'Photos, flags, “Internet Free Busy”, user fields 1–4 (map them to the note if needed).'
faq:
  - q: Outlook can save a contact as a vCard. Why convert the CSV?
    a: 'Outlook saves one vCard per contact; there is no export of all contacts into one .vcf. The CSV export contains everyone, and this page turns it into one .vcf file — or a ZIP with one card per contact.'
  - q: My export has German (or French, Russian…) headers. Does that work?
    a: 'Yes. Classic Outlook writes headers in its interface language, and the converter knows them. The file panel shows “Outlook CSV, localized headers” and the language it detected.'
  - q: Why do I see `Mr.` in the name?
    a: 'Outlook’s `Title` column holds the salutation, so it is written to the name prefix. If you do not want it on the phone, set that column to *skip*.'
  - q: Names come out as `MÃ¼ller` or question marks.
    a: 'The encoding was misread. Choose the encoding Outlook used: Windows-1252 for Western European languages, Windows-1251 for Cyrillic, Windows-1250 for Central European. The preview updates immediately. [More on garbled names](/fix-garbled-contact-names/).'
related: [google-contacts-csv-to-vcf, import-outlook, home, garbled-contacts, import-iphone, excel-to-vcf]
updated: 2026-11-04
---

Outlook exports contacts as a CSV with up to ~90 columns: three addresses, nineteen phone fields, three e-mails, user fields and more. Most of them are empty for most people. The converter hides the empty columns, connects the rest to vCard fields and writes one card per contact.

**Localized headers.** Classic Outlook names the columns in its interface language. Microsoft’s documentation says the header language must match Outlook’s language for import, so a German Outlook writes `Vorname, Nachname, Mobiltelefon`. The converter recognises these headers by their words, not by a fixed list. That is why `Telefon geschäftlich`, `Téléphone (bureau)` and `Рабочий телефон` all end up as a work phone.

**Fields that confuse other converters.**

- `Title` is the salutation (Mr., Mrs., Dr.); `Job Title` is the position.
- `Business Street`, `Business Street 2`, `Business Street 3` belong to one address.
- `E-mail Type` (`SMTP`) and `E-mail Display Name` are not addresses and are skipped.
- `Birthday` = `0/0/00` means “no birthday”.

**Encodings.** Classic Outlook often writes the CSV in the Windows code page of your system, not in UTF-8, and a CSV re-saved by a European Excel uses semicolons. Both are detected. If names look wrong, switch the encoding in the file panel and watch the preview change.

**Back into Outlook?** To move contacts *into* Outlook, a CSV is the safer route: classic Outlook imports a multi-contact .vcf one card at a time. Choose “Outlook CSV” under *Download as*. [Import guide for Outlook](/import-vcf-to-outlook/).
