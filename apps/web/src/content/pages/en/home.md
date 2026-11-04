---
url: ''
title: 'CSV to VCF Converter: Contacts to vCard, No Upload'
h1: CSV to VCF converter
description: 'Convert a CSV or Excel contact list to a VCF file (vCard 3.0, 4.0 or 2.1) for iPhone, Android, Google Contacts and Outlook. Runs in your browser, no upload.'
lead: 'Turns a contact spreadsheet into one .vcf file that iPhone, Android, Google Contacts and Outlook import — columns matched, phone numbers cleaned, duplicates found. The file is read on this device and is never uploaded.'
nav: CSV to VCF
summary: 'Any contact spreadsheet to a .vcf file, with column matching and phone clean-up.'
steps:
  - 'Drop your CSV, Excel or ODS file into the box above, or paste cells from Google Sheets. Encoding and separator are detected; if the preview shows symbols like `Ã©` instead of letters, pick another encoding.'
  - 'Check the column plugs. Each column is connected to a vCard field; plugs marked **guess** are worth a look. Columns set to “skip” are left out.'
  - 'Choose the country for numbers written without a country code. Numbers are saved as `+12025550143`, so they dial correctly from any country and messaging apps recognise them.'
  - 'Download the .vcf — vCard 3.0 unless a device asks for something else — and import it: [iPhone](/import-vcf-to-iphone/), [Android](/import-vcf-to-android/), [Google Contacts](/import-vcf-to-google-contacts/), [Outlook](/import-vcf-to-outlook/).'
features:
  - feature: Input
    value: 'CSV, TSV and TXT with any separator (comma, semicolon, tab, pipe, Excel’s `sep=` line); XLSX, XLS, ODS with a sheet picker; cells pasted from Google Sheets or Excel. Several files at once.'
  - feature: Encodings
    value: 'UTF-8 with or without BOM, UTF-16, Windows-1250 to 1258, KOI8-R, ISO-8859, Mac Roman, Shift_JIS, GB18030, Big5, EUC-KR. Detected automatically; switch with a live preview.'
  - feature: Recognised exports
    value: 'Google Contacts CSV (current and old layout), Outlook CSV with English, German, French, Russian, Spanish, Portuguese or Turkish headers, LinkedIn Connections.csv, plain “name + phone” lists with or without a header row.'
  - feature: Phone numbers
    value: 'Converted to international format with libphonenumber rules; mobile numbers are typed as mobile. Invalid numbers are kept and flagged. Excel’s `4.4E+11` and numbers saved without “+” are detected.'
  - feature: Names
    value: 'A full name in one cell is split into first, middle and last name — including “Last, First”, Russian patronymics, Spanish double surnames and particles like *van* or *da*.'
  - feature: Duplicates
    value: 'Found by phone number and e-mail. Merging is optional; you see the groups before downloading.'
  - feature: Output
    value: 'vCard 3.0 (default), 4.0 or 2.1; one .vcf or a ZIP with one file per contact; Google Contacts CSV; Outlook CSV.'
  - feature: Size
    value: 'Tested with 100,000 rows: a few seconds on a laptop. No row limit — the limit is your device’s memory.'
  - feature: Privacy
    value: 'No upload, no account, no tracking of file contents. Works offline after the first visit.'
  - feature: Not supported
    value: 'Contact photos (spreadsheets have none), Apple Numbers files (export to CSV first), password-protected Excel files.'
faq:
  - q: Is my contact list uploaded anywhere?
    a: 'No. Your browser reads the file and a Web Worker on your device converts it. To check, open the developer tools (F12), go to the Network tab and convert a file: no request carries your data. After the first visit the converter also works without an internet connection.'
  - q: Which vCard version should I choose?
    a: 'vCard 3.0. iPhone, Android, Google Contacts and Outlook all import it. Pick 4.0 only if an app asks for it, and 2.1 for old phones (feature phones, old Nokia or Sony Ericsson) that show garbled letters with 3.0.'
  - q: Why are my phone numbers shown as 4.4E+11?
    a: 'Excel displayed the long number in scientific notation and the CSV was saved that way, so the original digits are no longer in the file. Format the phone column as Text in Excel and export again — or drop the .xlsx file itself, where the full number is still stored. [Why this happens](/excel-phone-numbers-e11/).'
  - q: Will names with accents, Cyrillic or Arabic letters survive?
    a: 'Yes, if the encoding is read correctly. The converter detects it and shows the first rows; if you see `Ã©`, `Ð¸` or question marks, choose another encoding in the list. The .vcf is always written in UTF-8, which every current phone reads.'
  - q: Can I add all contacts to an iPhone at once?
    a: 'Yes. Send the single .vcf to the iPhone by AirDrop, Mail or Files, open it and tap “Add All Contacts”. [Step-by-step guide](/import-vcf-to-iphone/).'
  - q: How many contacts can I convert?
    a: 'The converter has no limit. Google Contacts accepts up to 3,000 contacts per imported file and 25,000 per account; split bigger lists into several files.'
  - q: Is it really free?
    a: 'Yes — no account, no watermark, no row limit. The conversion engine is open source under the MIT license.'
related: [excel-to-vcf, google-contacts-csv-to-vcf, outlook-csv-to-vcf, import-iphone, import-android, garbled-contacts]
updated: 2026-11-04
---

**VCF** (vCard) is the standard file for contact cards: every phone and e-mail app can import it. A CSV is just a table, and phones do not import tables. The converter turns each row into one card:

```text
BEGIN:VCARD
VERSION:3.0
N:Lee;Ann;;;
FN:Ann Lee
TEL;TYPE=CELL:+12025550143
EMAIL;TYPE=INTERNET:ann.lee@example.com
ORG:Lee & Co
BDAY:1990-05-17
END:VCARD
```

**Why vCard 3.0 is the default.** Version 3.0 ([RFC 2426](https://www.rfc-editor.org/rfc/rfc2426)) is the format iPhone, Android and Google Contacts export themselves, so it imports cleanly everywhere. Version 4.0 ([RFC 6350](https://www.rfc-editor.org/rfc/rfc6350)) is newer but adds nothing a phone book needs. Version 2.1 exists for old phones: non-Latin text is written in Quoted-Printable with `CHARSET=UTF-8`, the only form those phones understand.

**What the file contains.** Every card has the two required fields: `N` (name parts) and `FN` (display name). If a row has no name, the company is used, then the e-mail, then the number. Text is escaped and long lines are folded at 75 bytes without cutting a letter in half, so Cyrillic, Arabic, Chinese and emoji arrive intact. Line endings are CRLF, as the standard requires.

**Phone types.** A column called “Mobile”, “Celular”, “Handy” or “Cep Telefonu” becomes `TYPE=CELL`. For a generic “Phone” column the numbering plan decides: mobile numbers become mobile, landlines stay “phone”.

**What happens to the rest.** Columns you do not need can be set to *skip*. Dates the converter cannot read are not dropped; they go into the note. Each skipped row is listed with its row number — as Excel shows it — and the reason.

Read more: [what a VCF file is and how the versions differ](/what-is-a-vcf-file/), [why imported names turn into symbols](/fix-garbled-contact-names/).
