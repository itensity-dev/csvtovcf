---
url: excel-to-vcf
title: 'Excel to VCF Converter: Excel Contacts to vCard Online'
h1: Excel to VCF converter
description: 'Convert an Excel contact list (.xlsx or .xls) to a VCF file for iPhone, Android and Google. Reads the workbook directly, so long phone numbers are not lost. No upload.'
lead: 'Opens your Excel workbook directly — no “Save as CSV” step — and turns each row into a contact card in one .vcf file. Phone numbers stored as numbers get their country code back; the file never leaves this device.'
nav: Excel to VCF
summary: 'XLSX or XLS workbook straight to vCard, sheet picker included.'
steps:
  - 'Drop the Excel file (.xlsx, .xls or .ods) above. If the workbook has several sheets, pick the one with the contacts; hidden sheets are marked.'
  - 'Check that the header row was found and the columns are plugged into the right fields — “Name”, “Mobile”, “E-mail”, “Company” are recognised in many languages.'
  - 'Set the country your numbers belong to. Excel drops the leading 0 and the “+” of numbers stored as numbers; the country is used to restore them.'
  - 'Download the .vcf and import it on the phone: [iPhone](/import-vcf-to-iphone/), [Android](/import-vcf-to-android/).'
features:
  - feature: Excel files
    value: '.xlsx and .xlsm (Excel 2007 and later), .xls (Excel 97–2003 and older, including Excel 95 code pages), .ods. Any sheet; hidden sheets are listed.'
  - feature: Cell values
    value: 'Numbers are read in full (`447911123456`, never `4.47911E+11`). Date cells become birthdays. Formulas are read as their last calculated value.'
  - feature: Header row
    value: 'Found automatically, also when title rows sit above it. Untick “First row is a header” if your sheet starts with data.'
  - feature: Phone clean-up
    value: 'Numbers without “+” or leading 0 are completed from the selected country and written as `+44 7911 123456`-style international numbers. Invalid numbers are flagged, not dropped.'
  - feature: Output
    value: 'One .vcf (vCard 3.0, 4.0 or 2.1), a ZIP with one card per contact, or a Google / Outlook CSV.'
  - feature: Not supported
    value: 'Password-protected workbooks (remove the password in Excel first), Apple Numbers files, contact photos embedded in cells.'
faq:
  - q: Do I need to save the Excel file as CSV first?
    a: 'No — and it is better not to. When Excel saves a CSV it writes numbers the way they are displayed, so a phone number shown as `4.47911E+11` is saved with its last digits missing. Reading the .xlsx directly keeps every digit.'
  - q: My numbers have no leading zero or plus sign. Will they work?
    a: 'Yes. Choose the country under “Phone format”; a number like `7911123456` with United Kingdom selected becomes `+447911123456`. Numbers that start with the country code without “+” (`447911123456`) are recognised too.'
  - q: The first rows of my sheet are a title and an empty line. Is that a problem?
    a: 'No. Rows above the real header are skipped, and the row numbers in the report match the numbers Excel shows on the left.'
  - q: Can I convert several sheets or workbooks at once?
    a: 'Drop several files together and they are combined into one result. Within one workbook, convert one sheet, then switch the sheet and download again.'
  - q: Does it work with Excel on a Mac or with LibreOffice?
    a: 'Yes. The converter reads the file, not the program: .xlsx from Excel for Mac, Excel online or Google Sheets downloads, and .ods from LibreOffice all work.'
related: [xlsx-to-vcf, xls-to-vcf, google-sheets-to-vcf, home, excel-phone-e11, import-android]
updated: 2026-11-04
---

Excel files are not a contact format, so phones cannot import them. A **VCF** (vCard) file can be imported everywhere, with one card per person. The converter reads the cells of the sheet, matches the columns to vCard fields and writes one card per row.

**Why reading the workbook is better than reading a CSV.** Inside an .xlsx a phone number is stored as a full number (up to 15 digits), even if the cell shows `4.4E+11`. Only when Excel *saves a CSV* does it write the display text, and the hidden digits are lost. That is why this page opens .xlsx and .xls directly. Read more in [why Excel shows phone numbers as 4.4E+11](/excel-phone-numbers-e11/).

**What Excel does to phone numbers.** A number typed without spaces into a General-formatted cell loses its leading zero (`07911123456` → `7911123456`) and the plus sign (`+4915123456789` → `4915123456789`). The converter does not guess blindly. It parses each number with the numbering rules of the country you select and checks that the result is a real number for that country. If a number begins with that country’s calling code, it is treated as international. The report counts how many numbers were completed this way, and the cards show the result before you download.

**Dates.** Birthday cells formatted as dates are read as dates, whatever display format the sheet uses. Text dates such as `17.05.1990` or `05/17/1990` are read too; the converter looks at the whole column to decide whether it is day-first or month-first.

**Columns that are not contact fields** — “Notes”, “Customer ID”, “Last order” — can be plugged into the note or skipped. Nothing is exported that you set to *skip*.
