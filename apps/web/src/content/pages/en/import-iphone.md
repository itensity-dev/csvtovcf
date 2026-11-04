---
url: import-vcf-to-iphone
title: 'How to Import a VCF File to iPhone (All Contacts at Once)'
h1: How to import a VCF file to iPhone
description: 'Add every contact from a .vcf file to your iPhone at once: via AirDrop, Mail or Files on the phone, or via iCloud.com on a computer. Steps for iOS 26, with common problems.'
lead: 'Two ways that import a whole .vcf with many contacts: open the file on the iPhone and tap “Add All Contacts”, or import it on iCloud.com and let it sync.'
nav: Import to iPhone
summary: 'Get all contacts from one .vcf onto an iPhone: on the phone or via iCloud.com.'
steps:
  - 'Make the .vcf with the [converter](/) — vCard 3.0, phone format “+E.164”.'
  - 'Send it to the iPhone: AirDrop from a Mac, an e-mail to yourself, or save it to iCloud Drive and open it in the Files app.'
  - 'Tap the file. iOS shows the contacts it contains; tap **Add All Contacts** (iOS shows the number, e.g. “Add All 248 Contacts”). If Files only shows a preview, tap Share → **Contacts**.'
  - 'Check that the contacts are in the right account: Settings → Apps → Contacts → **Default Account** decides whether they go to iCloud, Gmail or “On My iPhone”.'
faq:
  - q: The iPhone only shows the first contact. Where are the others?
    a: 'If the file came through a preview (Quick Look), only one card is shown. Use Share → Contacts, or open the file from Mail, Messages or Files, which shows the full list with “Add All Contacts”. Or import it on iCloud.com: each card becomes a separate contact.'
  - q: Do I need iCloud to import contacts?
    a: 'No. Opening the .vcf on the phone works without iCloud; the contacts are saved to the default account. iCloud.com is useful when you have the file on a computer.'
  - q: Some contacts were skipped. Why?
    a: 'When you import through Messages, iOS adds only cards that are not already in your contacts. Check the duplicates and the list of skipped rows in the converter’s report.'
  - q: Names show strange characters after import.
    a: 'The vCard was probably 2.1 or not UTF-8. Convert again with vCard 3.0 — the converter always writes UTF-8. [Why names get garbled](/fix-garbled-contact-names/).'
  - q: Birthdays without a year show 1604.
    a: 'iOS uses 1604 internally as “no year”. Contacts converted here keep birthdays without a year as `--05-17`; if your iOS version shows a year, edit the card once and remove it.'
related: [import-android, import-google-contacts, home, bulk-add-contacts, excel-to-vcf, what-is-vcf]
updated: 2026-11-04
---

## Method 1: on the iPhone

This is the fastest way when the file is already on the phone or in your inbox.

1. **Get the file onto the iPhone.** AirDrop it from a Mac, mail it to yourself, send it in Messages, or put it in iCloud Drive.
2. **Open it.** In Mail or Messages, tap the attachment. In Files, tap the file; if you only see a single card preview, tap the Share button and choose **Contacts**.
3. **Add them all.** The list shows every card in the file. Tap **Add All Contacts**; the exact label depends on the iOS version and may include the number of contacts.
4. **Done.** The contacts appear in the Contacts app and in the Phone app. WhatsApp, Telegram and other apps see them after their next contact sync.

## Method 2: iCloud.com on a computer

Apple documents this route. It also handles files with many contacts, and it is convenient when the .vcf is on your computer.

1. Sign in at [icloud.com](https://www.icloud.com/) and open **Contacts**.
2. Click the **+** button and choose **Import Contact**. Some versions of the page show a gear icon with **Import vCard** instead.
3. Choose the .vcf file. Each person in the file becomes a separate contact in *All Contacts*.
4. On the iPhone, iCloud Contacts must be turned on: Settings → your name → iCloud → Contacts. The new contacts arrive within a minute.

## Before you import

- **Use vCard 3.0.** It is what iPhones export themselves. vCard 2.1 is only for old phones.
- **Write numbers in international format.** `+447911123456` works when you travel and in messaging apps; numbers without a country code may not be matched to WhatsApp accounts.
- **Remove duplicates first.** The converter’s *Duplicates* tab shows people listed twice in your spreadsheet; tick “Merge” to combine them.
- **Back up.** Import is easy to repeat but tedious to undo: export your current contacts from iCloud.com before importing hundreds of new ones.

## Undoing an import

iOS has no “undo import”. On iCloud.com you can select several contacts with Shift- or Cmd-click and delete them together, so test the file with a handful of rows before importing thousands.
