---
url: fix-garbled-contact-names
title: 'Contact Names Garbled After Import (Ã©, Ð¸, ???) — How to Fix'
h1: Why imported contacts show garbled names, and how to fix them
description: 'Names like “MÃ¼ller”, “Ð˜Ð²Ð°Ð½” or “????” after importing contacts come from a wrong text encoding. How to recognise the cause and convert the file correctly.'
lead: 'Garbled names — `MÃ¼ller`, `Ð˜Ð²Ð°Ð½`, `Èâàí`, `????` — mean the file was read in a different text encoding than it was written in. The fix is to read the source with the right encoding and write the vCard in UTF-8.'
nav: Garbled contact names
summary: 'Recognise the encoding mix-up behind Ã©, Ð¸ or ??? and fix it.'
faq:
  - q: Can I repair names that are already garbled on my phone?
    a: 'Usually it is easier to delete the imported batch and import a correct file. Repairing in place only works when the garbling is reversible (UTF-8 read as Latin-1); question marks mean the letters were lost.'
  - q: Why does Excel save my CSV with question marks?
    a: '“CSV (Comma delimited)” saves in the Windows code page of your system. Letters outside it — Cyrillic on a Western PC, Turkish ğ on a German one — become `?`. Save as “CSV UTF-8 (Comma delimited)” instead, or convert the .xlsx directly.'
  - q: What encoding should a vCard have?
    a: 'UTF-8. vCard 3.0 and 4.0 assume it; for vCard 2.1, each non-ASCII value must carry `CHARSET=UTF-8` and Quoted-Printable encoding. The converter on this site always does this.'
related: [home, outlook-csv-to-vcf, what-is-vcf, import-android, import-iphone, excel-to-vcf]
updated: 2026-11-04
---

## Recognise the pattern

Each kind of garbling has a typical look, and the look tells you what went wrong:

| What you see | Should read | Cause |
| --- | --- | --- |
| `MÃ¼ller`, `JosÃ©` | Müller, José | UTF-8 file read as Windows-1252 / Latin-1 |
| `Ð˜Ð²Ð°Ð½ ÐŸÐµÑ‚Ñ€Ð¾Ð²` | Иван Петров | Cyrillic UTF-8 read as Windows-1252 |
| `Èâàí Ïåòðîâ` | Иван Петров | Windows-1251 file read as Windows-1252 |
| `Ayþe Yýlmaz` | Ayşe Yılmaz | Windows-1254 (Turkish) read as Windows-1252 |
| `ÇáÇÓã` | الاسم | Windows-1256 (Arabic) read as Latin-1 |
| `Иван` → `????` | Иван | letters lost when saving in a code page without them |
| `Ã` or `�` in the middle of a name | — | a long line was cut inside a multi-byte letter |

The first six cases can be repaired from the original file. Question marks cannot: the letters were replaced when the file was saved.

## How to fix it

1. **Go back to the original file** — the CSV or Excel workbook, not the garbled vCard.
2. **Open it in the [converter](/).** It detects the encoding (UTF-8, UTF-16, Windows-1250…1258, KOI8-R, Shift_JIS and others) and shows the first rows. If names still look wrong, choose another encoding in the *Encoding* list. The preview changes immediately, so you can see which one is right.
3. **Download vCard 3.0.** The file is written in UTF-8, which every current phone reads.
4. **Delete the garbled import and import the new file.** On Google Contacts, the “Imported on …” label lets you delete the whole batch.

## Why it happens

A text file does not say which encoding it uses. Excel’s classic “CSV” format, Outlook’s CSV export and many CRMs write in the **Windows code page** of the computer: Windows-1252 in Western Europe and the Americas, 1251 for Cyrillic, 1254 for Turkish, 1256 for Arabic. A phone or web service then reads the file as UTF-8, and every non-English letter turns into two or three symbols. The reverse happens too: a UTF-8 file opened by old software that expects Windows-1252 shows `Ã©` for `é`.

Old phones add a third problem. They expect vCard 2.1 and only understand non-Latin text when it is marked `CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE`. Without that marking, a perfectly good UTF-8 file looks broken on them. Choose **vCard 2.1** in the converter for such phones.

## Prevent it next time

- In Excel, use **File → Save As → CSV UTF-8**, or skip CSV and convert the .xlsx.
- In Outlook, export and convert right away; do not re-save the CSV in Excel.
- In Google Sheets, CSV downloads are always UTF-8.
