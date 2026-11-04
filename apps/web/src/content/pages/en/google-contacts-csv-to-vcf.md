---
url: google-contacts-csv-to-vcf
title: 'Google Contacts CSV to VCF: Convert Google CSV to vCard'
h1: Google Contacts CSV to VCF
description: 'Convert a Google Contacts CSV export (current or old layout) to a VCF file for iPhone or Outlook. Keeps labels, multiple numbers in one cell and birthdays. No upload.'
lead: 'Converts a “Google CSV” contacts export into a vCard file. Phone and e-mail labels, several values in one cell (` ::: `), groups and yearless birthdays are carried over.'
nav: Google Contacts CSV to VCF
summary: 'Google Contacts CSV export (new and old layout) to vCard.'
steps:
  - 'Drop the CSV exported from Google Contacts (Export → Google CSV). Both the current layout (`First Name`, `Phone 1 - Label`) and the old one (`Given Name`, `Group Membership`) are recognised.'
  - 'The columns are connected automatically and marked **sure**; there is usually nothing to change.'
  - 'Choose the country for numbers saved without a country code, and whether duplicates should be merged.'
  - 'Download the .vcf and import it on the [iPhone](/import-vcf-to-iphone/) or in [Outlook](/import-vcf-to-outlook/).'
features:
  - feature: Layouts
    value: 'Current Google CSV (`First Name`, `Labels`, `E-mail 1 - Label`…) and the old one (`Name`, `Given Name`, `Group Membership`, `E-mail 1 - Type`…).'
  - feature: Multiple values
    value: 'Several numbers or e-mails in one cell, separated by ` ::: `, become separate `TEL` / `EMAIL` lines with their labels.'
  - feature: Labels
    value: 'Mobile, Work, Home, Main, Work Fax, Home Fax, Pager become vCard types; custom labels (e.g. “WhatsApp”) are kept as `X-ABLabel`.'
  - feature: Groups
    value: '`Labels` / `Group Membership` become `CATEGORIES`; the system labels `* myContacts` and `* starred` are dropped.'
  - feature: Dates
    value: 'Birthdays with and without a year (`--05-17`); the anniversary from `Event 1` is kept.'
  - feature: Not carried over
    value: 'Photos (the CSV only holds a link), “File As”, custom fields are written into the note.'
faq:
  - q: Google Contacts can export vCard itself. Why convert the CSV?
    a: 'If you still have the Google account, Export → vCard is the simplest route. Use this page when you only have the CSV — sent by someone else, exported years ago, or edited in Excel — or when you want to clean numbers and merge duplicates first.'
  - q: 'What does ` ::: ` mean in my CSV?'
    a: 'Google packs several values of the same kind into one cell and separates them with ` ::: `. For example, two mobile numbers: `+1 202-555-0143 ::: +1 202-555-0187`. They become two separate phone lines on the card.'
  - q: Will the groups (labels) be kept?
    a: 'Yes, as `CATEGORIES`. iPhone does not show categories, but Google Contacts, Outlook and most Android apps do.'
  - q: Why are some numbers marked invalid?
    a: 'Google exports numbers as they were typed. A local number without a country code is checked against the country you select; if it does not fit that country’s numbering plan, it is written unchanged and marked.'
related: [outlook-csv-to-vcf, home, import-iphone, import-outlook, google-sheets-to-vcf, what-is-vcf]
updated: 2026-11-04
---

**Google CSV** is the table format Google Contacts uses for export and import. It differs from a plain list. Each phone, e-mail, address and website has a pair of columns — `Phone 1 - Label` and `Phone 1 - Value` — and a single cell can hold several values separated by ` ::: `. Generic converters often miss this: they put `+1 202-555-0143 ::: +1 202-555-0187` into one field, or lose the labels.

**How labels become vCard types.** The label decides the type of each line:

| Google label | vCard 3.0 |
| --- | --- |
| Mobile | `TEL;TYPE=CELL` |
| Work / Home | `TEL;TYPE=WORK,VOICE` / `TEL;TYPE=HOME,VOICE` |
| Work Fax / Home Fax | `TEL;TYPE=WORK,FAX` / `TEL;TYPE=HOME,FAX` |
| Main | `TEL;TYPE=MAIN` |
| custom, e.g. “WhatsApp” | `item1.TEL` + `item1.X-ABLabel:WhatsApp` |

A star in front of a label (`* Work`) marks the primary value in old exports; it is removed.

**Two layouts.** Google changed the column names in its CSV export. Current files start with `First Name, Middle Name, Last Name`; older ones with `Name, Given Name, Additional Name, Family Name`, and use `Type` instead of `Label`. Both are detected automatically — the file panel shows which one was found.

**Birthdays without a year.** Google stores them as `--05-17`. They are written to the vCard in the same form, so the year stays empty instead of becoming 1604 or 1900.
