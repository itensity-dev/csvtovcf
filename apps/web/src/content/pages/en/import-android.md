---
url: import-vcf-to-android
title: 'How to Import a VCF File on Android (Pixel, Samsung, Xiaomi)'
h1: How to import a VCF file on Android
description: 'Import all contacts from a .vcf file on Android: Google Contacts app (Pixel and most phones), Samsung Contacts and Xiaomi. Exact menu paths and fixes for common problems.'
lead: 'Android imports a multi-contact .vcf in one go. The menu path depends on the Contacts app: Google Contacts on Pixel and many other phones, Samsung’s own app on Galaxy phones.'
nav: Import to Android
summary: 'Menu paths for Google Contacts, Samsung and Xiaomi phones.'
steps:
  - 'Make the .vcf with the [converter](/) (vCard 3.0) and copy it to the phone: download it there, or move it to the Downloads folder.'
  - '**Google Contacts app:** open Contacts → **Organize** (bottom tab) → **Import from file** → pick the .vcf → choose the Google account.'
  - '**Samsung Contacts:** open Contacts → ☰ menu → **Manage contacts** → **Import or export contacts** → **Import** → choose where the file is → tick the .vcf → choose where to save (Samsung account, Google, phone) → **Import**.'
  - 'Open the Contacts app and check a few cards. Save them to the Google account if you want them on other devices and in Gmail.'
faq:
  - q: I cannot find “Import” in the Google Contacts app.
    a: 'In current versions it is under the **Organize** tab at the bottom → Import from file. In older versions: menu (☰) → Settings → Import, or “Fix & manage” → Import from file. Recent versions moved it to the Organize tab.'
  - q: Where should the contacts be saved?
    a: 'In your Google account if you want them backed up and on every device (and in Gmail). “Phone” or “Device” storage keeps them on this phone only and they are lost with it.'
  - q: Names appear as symbols on my Samsung phone.
    a: 'Convert again with vCard 3.0, not 2.1. Version 2.1 writes non-Latin text as Quoted-Printable, and some phones decode it wrongly.'
  - q: WhatsApp does not show the new contacts.
    a: 'WhatsApp matches contacts by full international number. Convert with the phone format “+E.164” and the right country, then refresh contacts in WhatsApp (New chat → ⋮ → Refresh).'
  - q: Can I import a CSV directly on Android?
    a: 'The Google Contacts app does not import CSV on the phone; the web version at contacts.google.com does. Converting to .vcf lets you import directly on the phone.'
related: [import-iphone, import-google-contacts, home, bulk-add-contacts, google-sheets-to-vcf, excel-to-vcf]
updated: 2026-11-04
---

## Google Contacts app (Pixel, Motorola, Nokia, OnePlus and others)

The Google Contacts app comes on Pixel phones and many others. It is also available for any Android phone in Google Play.

1. Open **Contacts**.
2. Tap **Organize** at the bottom of the screen.
3. Tap **Import from file**.
4. Pick the .vcf in the file picker (usually in *Downloads*).
5. If you have several accounts, choose the Google account to save into. All cards in the file are imported at once.

Google Contacts accepts up to 25,000 contacts per account. For very large lists, import in parts of a few thousand.

## Samsung Galaxy (Samsung Contacts, One UI)

1. Open **Contacts**.
2. Tap the **☰** menu (three lines).
3. Tap **Manage contacts**.
4. Tap **Import or export contacts** (older versions: *Import/Export contacts*).
5. Tap **Import**, choose the storage that holds the file (*Internal storage*), tick the .vcf and tap **Done**.
6. Choose where to save — *Samsung account*, a *Google* account or *Phone* — and tap **Import**.

Labels can differ slightly between One UI versions, but the path through **Manage contacts** has been stable for years.

## Xiaomi, Redmi, POCO (MIUI / HyperOS)

On phones with Xiaomi’s own Contacts app: Contacts → **⋮** → **Settings** → **Import and export** → **Import from storage**, then pick the file. Phones that use the Google Contacts app follow the Google steps above.

## Any phone: open the file

Tapping a .vcf in a file manager or an e-mail attachment usually offers *Open with → Contacts*. It runs the same import, but you choose the account in the next dialog.

## Before you import

- **vCard 3.0, UTF-8.** That is what this converter writes by default and what Android exports itself.
- **International numbers.** `+5511912345678` instead of `(11) 91234-5678` lets messaging apps match the contact and works when you roam.
- **One file.** A single .vcf with all contacts is easier than hundreds of small files; use the ZIP option only if a system asks for one card per file.
