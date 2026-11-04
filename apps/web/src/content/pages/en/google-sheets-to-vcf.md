---
url: google-sheets-to-vcf
title: 'Google Sheets to VCF: Paste Contacts, Get a vCard File'
h1: Google Sheets to VCF converter
description: 'Copy contact cells from Google Sheets, paste them here and download a VCF file for iPhone, Android or Google Contacts. No download, no add-on, no account access needed.'
lead: 'Select the contact rows in Google Sheets, copy them, paste them here — and download a .vcf. No add-on and no access to your Google account: the cells go from your clipboard to this page only.'
nav: Google Sheets to VCF
summary: 'Paste cells from Google Sheets and download a .vcf.'
steps:
  - 'In Google Sheets, select the contact rows including the header row (click the first row number, Shift+click the last) and copy them with Ctrl+C (⌘C on a Mac).'
  - 'Click **Paste cells** above, paste with Ctrl+V and press **Use these cells**. Pasted cells arrive tab-separated, so commas inside names or addresses are safe.'
  - 'Check the column plugs and pick the country for numbers without a country code.'
  - 'Download the .vcf and import it: on [Android](/import-vcf-to-android/), [iPhone](/import-vcf-to-iphone/) or in [Google Contacts](/import-vcf-to-google-contacts/).'
features:
  - feature: Input
    value: 'Cells pasted from Google Sheets, Excel, LibreOffice or Numbers (tab-separated); or a file downloaded with File → Download → .xlsx or .csv.'
  - feature: Account access
    value: 'None. No add-on, no sign-in, no Google API: the converter only sees what you paste.'
  - feature: Phone numbers
    value: 'Sheets often keep numbers as numbers (no “+”, no leading 0). They are completed from the selected country and written in international format.'
  - feature: Output
    value: 'vCard 3.0, 4.0 or 2.1; one file or a ZIP; Google Contacts CSV if you prefer to import the list into Google Contacts as a table.'
  - feature: Limits
    value: 'None in the converter. Very large pastes (100,000+ rows) are smoother as a downloaded .xlsx file.'
faq:
  - q: Is there a Google Sheets add-on for this?
    a: 'This page is the alternative to an add-on: an add-on needs permission to read your spreadsheets, while copy and paste gives this page only the cells you select.'
  - q: Should I download the sheet as CSV or as Excel?
    a: 'Either works. File → Download → Microsoft Excel (.xlsx) keeps numbers and dates as typed values; CSV is fine too, because Google Sheets writes CSV in UTF-8.'
  - q: The pasted numbers lost their leading zero. Can they be repaired?
    a: 'Yes, if you select the right country: the national number is completed with the country code. To keep them as typed in the future, format the column in Sheets as Format → Number → Plain text.'
  - q: Can I send the contacts straight into Google Contacts?
    a: 'Import the downloaded .vcf at contacts.google.com → Import. Google accepts up to 3,000 contacts per file. [Guide](/import-vcf-to-google-contacts/).'
related: [google-contacts-csv-to-vcf, excel-to-vcf, home, import-google-contacts, bulk-add-contacts, import-android]
updated: 2026-11-04
---

Google Sheets is where many contact lists are kept and shared: event sign-ups, team lists, customer exports. To get those people into a phone, the sheet must become a **VCF** (vCard) file.

**Why paste instead of an add-on.** Add-ons that create vCards from a sheet ask for permission to see your spreadsheets. Copying cells gives this page exactly what you selected and nothing more. When you copy from Sheets, the clipboard holds the cells as tab-separated text. The converter reads that format exactly, including line breaks inside cells and quotes.

**Headers.** Copy the header row too: “Name”, “Phone”, “Email” are then recognised and connected automatically. Without a header, columns are matched by their content. An e-mail column, a phone column and a column with two-word values are still found, but check the plugs.

**Numbers in Sheets.** Like Excel, Google Sheets treats `0812 3456 7890` as a number unless the column is plain text, and drops the leading zero. The converter knows each country’s numbering plan. With Indonesia selected, `81234567890` becomes `+6281234567890` and is checked as a valid mobile number.

**Duplicates.** Shared sheets often contain the same person twice. Open the *Duplicates* tab after pasting: people with the same phone number or e-mail are grouped, and you can merge them before downloading.
