---
url: xls-to-vcf
title: 'XLS to VCF Converter: Old Excel Contact Files to vCard'
h1: XLS to VCF converter
description: 'Convert .xls contact lists from Excel 97–2003, old CRMs and phone software to a VCF file. Legacy code pages are decoded, so names keep their letters. No upload.'
lead: 'Reads the old binary Excel format (.xls) — including files from Excel 95, accounting programs and phone-sync software — and writes a .vcf that current phones import.'
nav: XLS to VCF
summary: 'Legacy .xls contact files (Excel 97–2003 and older) to vCard.'
steps:
  - 'Drop the .xls file above. The format is detected from the file itself, so a workbook with the wrong extension still opens.'
  - 'Pick the sheet if there are several, and check the preview: names in Cyrillic, Greek, Turkish or Central European letters should read correctly.'
  - 'Check the column plugs and choose the country for numbers without a country code.'
  - 'Download the .vcf. Choose vCard 2.1 only if the file goes back to an old phone; current phones want 3.0.'
features:
  - feature: Formats
    value: 'BIFF8 (.xls from Excel 97–2003), BIFF5 (Excel 95), BIFF2–4 and Excel 2003 XML, plus .xlsx and .ods.'
  - feature: Old code pages
    value: 'Text in pre-Unicode .xls files (Windows-1250/1251/1252/1253/1254, Shift_JIS, Big5…) is decoded with the code page stored in the file.'
  - feature: Numbers and dates
    value: 'Phone numbers are read in full; date cells, including the 1904 date system of old Mac workbooks, become birthdays.'
  - feature: Output
    value: 'vCard 3.0 (default), 4.0 or 2.1, one file or one per contact; Google CSV; Outlook CSV.'
  - feature: Not supported
    value: 'Encrypted .xls (password to open), Lotus 1-2-3 and Quattro files.'
faq:
  - q: What is the difference between XLS and XLSX?
    a: '.xls is the binary format Excel used until 2003; .xlsx is the zipped XML format used since Excel 2007. Both are read the same way here. Old programs and some phone-sync tools still export .xls.'
  - q: Names from my old file show as `Ãëåá` or question marks. What now?
    a: 'In this converter they should not: .xls files store their code page, and it is applied when reading. If letters are still wrong, the text was probably already garbled when it was typed into Excel. Open the file in Excel and check the cells there.'
  - q: Can I convert an .xls with thousands of contacts?
    a: 'Yes. There is no row limit; 100,000 rows convert in a few seconds. For Google Contacts, split the result into files of up to 3,000 contacts.'
  - q: Which vCard version suits an old phone?
    a: 'vCard 2.1. It writes non-Latin text as Quoted-Printable with `CHARSET=UTF-8`, which phones from the 2000s understand. Smartphones should get 3.0.'
related: [excel-to-vcf, xlsx-to-vcf, home, garbled-contacts, what-is-vcf, import-android]
updated: 2026-11-04
---

**XLS** is the file format Excel used before 2007. It is still common for contact lists exported from older CRMs, accounting software, telephone systems and phone-sync programs. Phones cannot read it, and Google Contacts only imports CSV or vCard. The converter reads the .xls itself, so you do not need Excel installed.

**Code pages.** Excel 97–2003 stores text as Unicode, but files from Excel 95 and some generators store it in the code page of the computer that wrote them — Windows-1251 for Russian, 1250 for Polish or Czech, 1254 for Turkish. The converter applies the code page recorded in the file, so `Иванов` stays `Иванов`. The .vcf is always written in UTF-8.

**From rows to cards.** The header row is found automatically. Columns are matched by name in many languages: “Teléfono”, “Handy”, “Телефон” and “Cep Telefonu” all become phone numbers. Every row becomes one card with the required `N` and `FN` fields; rows with no name, phone, e-mail, company or address are skipped and listed with their row number.

**Which version to download.** vCard 3.0 imports on iPhone, Android, Google Contacts and Outlook. vCard 2.1 is there for the phones such .xls files often came from: feature phones and early Nokia or Sony Ericsson models. [How the versions differ](/what-is-a-vcf-file/).
