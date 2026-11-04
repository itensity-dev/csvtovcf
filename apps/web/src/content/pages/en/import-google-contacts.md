---
url: import-vcf-to-google-contacts
title: 'How to Import a VCF or CSV File into Google Contacts'
h1: How to import contacts into Google Contacts
description: 'Import a .vcf (or Google CSV) into Google Contacts on the web: Import → Select file. Limits (3,000 per file, 25,000 per account), labels, and how to merge duplicates.'
lead: 'Google Contacts on the web imports a .vcf or a Google CSV in a few clicks. Contacts then sync to every Android phone, to Gmail and to an iPhone with the Google account added.'
nav: Import to Google Contacts
summary: 'Import a .vcf or CSV at contacts.google.com, with limits.'
steps:
  - 'Convert your table with the [converter](/) — .vcf (vCard 3.0) or “Google Contacts CSV” under *Download as*.'
  - 'Open [contacts.google.com](https://contacts.google.com/) and sign in with the account the contacts should go to.'
  - 'Click **Import** in the left menu, then **Select file**, choose the file and click **Import**.'
  - 'The imported contacts get a label such as “Imported on 4/11/2026”. Open **Merge & fix** to combine duplicates with contacts you already had.'
faq:
  - q: VCF or Google CSV — which is better for Google?
    a: 'Both import fully. vCard keeps phone and e-mail types and works for other apps too; Google CSV is handy if you want to look at or edit the list in a spreadsheet before importing.'
  - q: How many contacts can I import?
    a: 'Google asks to split files with more than 3,000 contacts, and an account holds up to 25,000 contacts (about 20 MB without photos). Split bigger lists into several files.'
  - q: How do I undo an import?
    a: 'Click the “Imported on …” label in the left menu, select all contacts in it (checkbox at the top) and delete them. They stay in the bin for 30 days.'
  - q: The imported contacts do not appear on my phone.
    a: 'Make sure the phone syncs this Google account: on Android, Settings → Passwords & accounts → Google → Account sync → Contacts; on iPhone, Settings → Apps → Contacts → Accounts → Gmail → Contacts on.'
related: [import-android, import-iphone, google-contacts-csv-to-vcf, google-sheets-to-vcf, home, bulk-add-contacts]
updated: 2026-11-04
---

## Import step by step

1. Go to [contacts.google.com](https://contacts.google.com/) on a computer.
2. In the left menu click **Import**.
3. Click **Select file** and choose the .vcf or .csv.
4. Click **Import**.

Google adds every imported contact to a new label named after the date of the import. That makes it easy to check the result — or to delete the whole batch if something went wrong.

## Limits worth knowing

| Limit | Value |
| --- | --- |
| Contacts per import file | about 3,000 — split bigger files |
| Contacts per account | 25,000 |
| Storage for contacts | 20 MB (photos not counted) |
| One contact | up to 128 KB, 500 fields |

The converter writes a single file for any number of contacts. For more than 3,000 rows, filter the spreadsheet into parts and convert each part, or import the same .vcf on an Android phone, which has no per-file limit.

## Duplicates

Google does not merge on import. If you import the same person twice, you get two cards. Two ways to avoid that:

- **before** the import: open the *Duplicates* tab in the converter and tick “Merge” — people with the same phone or e-mail become one card;
- **after** the import: Google Contacts → **Merge & fix** suggests duplicates across your whole account.

## Phone numbers

Google stores numbers as text, exactly as imported. Numbers in international form (`+49 151 23456789`) display correctly in every country, and messaging apps can match them. Numbers without a country code are interpreted with the phone’s region and may be wrong abroad. That is why the converter writes `+` numbers by default.
