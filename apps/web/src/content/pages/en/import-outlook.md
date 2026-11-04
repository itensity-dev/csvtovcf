---
url: import-vcf-to-outlook
title: 'How to Import Contacts into Outlook (VCF and CSV)'
h1: How to import contacts into Outlook
description: 'Import many contacts into Outlook: CSV for new Outlook, Outlook.com and classic Outlook (a multi-contact .vcf imports one card at a time), plus Outlook for Mac.'
lead: 'For Outlook, a CSV is the bulk route. New Outlook and Outlook.com import CSV only, and classic Outlook asks you to confirm each card of a multi-contact .vcf. The converter writes both formats.'
nav: Import to Outlook
summary: 'CSV for new Outlook and Outlook.com, CSV or vCard for classic Outlook and Mac.'
steps:
  - 'In the [converter](/), choose **Outlook CSV** under *Download as* and download the file.'
  - '**New Outlook / Outlook.com:** People → **Manage contacts** → **Import contacts** → Browse → choose the CSV → **Import**.'
  - '**Classic Outlook for Windows:** File → **Open & Export** → **Import/Export** → *Import from another program or file* → *Comma Separated Values* → choose the file and duplicate handling → choose the **Contacts** folder → **Finish**.'
  - 'Check a few contacts. If fields are missing, run the import again and use **Map Custom Fields** in the last step of the wizard.'
faq:
  - q: Why not import the .vcf into Outlook?
    a: 'New Outlook and Outlook.com do not import vCard files. Classic Outlook opens a multi-contact .vcf one contact at a time — you confirm each card, and users often report that only the first contact arrives. Microsoft itself recommends going through CSV for many contacts.'
  - q: My Outlook is in German / French. Will the English CSV headers work?
    a: 'Microsoft notes that the CSV header language should match Outlook’s language. If fields stay empty after import, use **Map Custom Fields** in the import wizard and drag each column to its Outlook field — Mobile Phone → Mobiltelefon and so on.'
  - q: Names show as `Ã¶` or `???` after import.
    a: 'Classic Outlook sometimes misreads UTF-8 CSV files. Try the .vcf route for a few contacts to check, or open the CSV in Excel, save it as “CSV (Comma delimited)” in your Windows language, and import that file.'
  - q: How do I import into Outlook for Mac?
    a: 'Drag the .vcf onto People, or File → Import. Microsoft documents that only the first contact is shown in the window, but every contact in the vCard is saved.'
related: [outlook-csv-to-vcf, import-google-contacts, import-iphone, home, garbled-contacts, what-is-vcf]
updated: 2026-11-04
---

## Which file for which Outlook

| Outlook | Best file | Path |
| --- | --- | --- |
| New Outlook for Windows, Outlook.com, Outlook on the web | Outlook CSV | People → Manage contacts → Import contacts |
| Classic Outlook for Windows (2016–2024, Microsoft 365) | Outlook CSV | File → Open & Export → Import/Export |
| Outlook for Mac | .vcf (vCard 3.0) | Drag onto People, or File → Import |
| One contact into any Outlook | .vcf | Open the file → Save & Close |

## Classic Outlook: the import wizard

1. **File** → **Open & Export** → **Import/Export**.
2. Choose **Import from another program or file** → **Next**.
3. Choose **Comma Separated Values** → **Next**.
4. Browse to the CSV. Choose how to handle duplicates: *Replace*, *Allow duplicates* or *Do not import*. → **Next**.
5. Select the **Contacts** folder of the right account → **Next**.
6. Tick the action for the file. If Outlook’s language is not English, click **Map Custom Fields**, check that each column lands in the right field, then **OK** → **Finish**.

## What the Outlook CSV from this converter contains

Columns use Outlook’s own names: `First Name`, `Last Name`, `Mobile Phone`, `Business Phone`, `E-mail Address`, `Company`, `Job Title`, `Business Street`, `Birthday` and so on. Phones go into the matching slot by type. Extra numbers go to *Other Phone*, *Car Phone* and *Callback*. Anything that does not fit (a fourth e-mail, a fourth address) is added to *Notes* rather than dropped. Birthdays are written as `M/D/YYYY`, the form Outlook exports itself.

## If you only need a few contacts

Open each .vcf (choose “ZIP, one .vcf per contact” in the converter). Outlook shows the contact window; click **Save & Close**. That is fine for ten contacts and tedious for a thousand.
