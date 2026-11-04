---
url: add-multiple-contacts-to-phone
title: 'How to Add Multiple Contacts to a Phone at Once (from Excel)'
h1: How to add many contacts to a phone at once
description: 'Add hundreds of contacts to an iPhone or Android phone from an Excel or CSV list in one step: convert to one VCF file, then import it. Also for WhatsApp and Telegram.'
lead: 'Typing contacts one by one is not necessary. Turn the list into a single .vcf file and import it — the phone adds every contact in one step, and messaging apps pick them up from the phone book.'
nav: Add many contacts to a phone
summary: 'From a spreadsheet to hundreds of phone contacts in one import.'
steps:
  - 'Put the contacts in a spreadsheet: one row per person, a header row with “Name” and “Phone” (more columns are welcome).'
  - 'Drop the file into the [converter](/) and choose the country of the numbers; they are written with the international prefix (+…).'
  - 'Download one .vcf with all contacts.'
  - 'Import it: on [Android](/import-vcf-to-android/) via Contacts → Organize → Import from file; on [iPhone](/import-vcf-to-iphone/) by opening the file and tapping “Add All Contacts”.'
faq:
  - q: How many contacts can a phone import at once?
    a: 'Thousands. A single .vcf with several thousand cards imports on iPhone and Android. Google Contacts on the web asks for files of at most 3,000 contacts and holds 25,000 per account.'
  - q: Will the contacts appear in WhatsApp or Telegram?
    a: 'Yes, once the numbers are in international format and the app has refreshed its contacts. Numbers without a country code are often not matched to an account.'
  - q: Do I need an app or a paid program?
    a: 'No. The phone’s own Contacts app imports .vcf files, and the converter on this site is free and runs in the browser.'
  - q: Can I remove the imported contacts later?
    a: 'On Google Contacts, delete the “Imported on …” label with its contacts. On iPhone, delete them on iCloud.com, where you can select many at once. Test with a short file first.'
related: [import-android, import-iphone, home, excel-to-vcf, google-sheets-to-vcf, excel-phone-e11]
updated: 2026-11-04
---

## The fastest route

Phones cannot import spreadsheets, but they import **vCard (.vcf)** files, and one file can hold any number of contacts. So the work is: spreadsheet → one .vcf → import.

**Prepare the spreadsheet.** One row per person. The minimum is a name column and a phone column; e-mail, company and birthday columns are recognised too. The name can be in one column (“Full name”) or in two (“First name”, “Last name”).

**Convert.** The [converter](/) recognises the columns, writes numbers in international format and warns about numbers that do not look valid — before they end up in your phone. People listed twice can be merged.

**Import.** One file, one tap on the phone. Details for [Android](/import-vcf-to-android/) and [iPhone](/import-vcf-to-iphone/).

## For WhatsApp, Telegram and Signal

Messaging apps read the phone book and look up each number in international form. Two things decide whether a contact shows up:

- **The country code.** `+62 812 3456 7890` is matched; `0812 3456 7890` is matched only if the phone’s own country is Indonesia. The converter adds the code from the country you choose.
- **A refresh.** After the import, open the app’s new-chat screen. In WhatsApp on Android: ⋮ → Refresh.

Adding contacts in bulk only to message strangers is spam and gets accounts blocked. Use it for people who expect to hear from you: your team, members, customers who gave their number.

## Large lists

- **Split for Google Contacts.** The web import takes about 3,000 contacts per file. Filter your sheet into parts and convert each part.
- **Choose the account.** Contacts saved to the Google or iCloud account are backed up and appear on all your devices. “Phone only” storage stays on this device.
- **Check before importing.** The converter’s report lists skipped rows, invalid numbers and duplicates with row numbers you can find in Excel.
