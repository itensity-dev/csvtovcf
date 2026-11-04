---
url: xlsx-to-vcf
title: 'XLSX to VCF Converter: Excel Workbook Contacts to vCard'
h1: XLSX to VCF converter
description: 'Convert an .xlsx contact sheet to a VCF (vCard) file. Choose the sheet, keep full phone numbers and dates, get one .vcf for iPhone, Android or Google. No upload.'
lead: 'Pick a sheet from your .xlsx workbook and get a .vcf with one card per row. Phone numbers are read in full and date cells become birthdays.'
nav: XLSX to VCF
summary: 'Modern Excel workbooks (.xlsx) to vCard, with sheet choice.'
steps:
  - 'Drop the .xlsx above. The first visible sheet with data is opened; switch sheets in the “Sheet” list.'
  - 'Look at the preview of the first rows: column letters are the same as in Excel, and so are row numbers.'
  - 'Check the column plugs, set the phone country and the vCard version (3.0 fits all current phones).'
  - 'Download the .vcf — or a ZIP with one file per contact if you need to attach cards one by one.'
features:
  - feature: Workbooks
    value: '.xlsx, .xlsm and .xlsb; every sheet can be chosen, hidden ones are marked.'
  - feature: Formulas
    value: 'The last calculated value is used, e.g. a name built with `=B2&" "&C2`.'
  - feature: Merged and empty cells
    value: 'A merged cell is read once, in its top-left cell. Empty columns are hidden in the mapping panel.'
  - feature: Long numbers
    value: 'Up to 15 digits are read exactly — Excel’s own precision limit. Longer digit strings must be stored as text in Excel.'
  - feature: Output
    value: 'vCard 3.0, 4.0 or 2.1; single file or ZIP; Google or Outlook CSV.'
faq:
  - q: Why not export the sheet as CSV and convert that?
    a: 'Because Excel’s CSV export writes what the cell displays. A phone number shown as `4.47911E+11` is exported with its digits cut off. The .xlsx still holds the whole number, so convert the workbook itself.'
  - q: My contacts are spread over several sheets. Can I combine them?
    a: 'Convert each sheet and import the files one after the other, or copy the rows into one sheet first. Combining several files is supported: drop them together.'
  - q: How are birthdays stored in Excel read?
    a: 'Cells formatted as dates are read as dates whatever their display format. Text dates are read too: `17.05.1990`, `05/17/1990`, `1990-05-17`, `17 May 1990` in 13 languages.'
  - q: Are formulas or macros executed?
    a: 'No. Macros never run. Formula cells are read as the values Excel saved in the file.'
related: [excel-to-vcf, xls-to-vcf, google-sheets-to-vcf, home, import-iphone, excel-phone-e11]
updated: 2026-11-04
---

An **.xlsx** file is a ZIP archive of XML parts: one per sheet, plus the shared text and the cell styles. The converter unpacks it in your browser with [SheetJS](https://sheetjs.com/) and reads the cells of the sheet you choose. Nothing is sent anywhere.

**Numbers and text.** Excel keeps a phone number either as a number or as text. Numbers lose the leading `0` and the `+`. The converter puts them back using the country you select and checks each result against the numbering plan of that country. Numbers that do not pass are written unchanged and marked, so nothing disappears quietly. If more than a few numbers in a column are affected, a note under the file name says how many.

**Dates.** Excel stores a date as the number of days since 1900 (or 1904 in old Mac workbooks). The converter reads the cell type and turns real date cells into `BDAY` values. A birthday without a year (`--05-17`) stays without a year.

**Mapping.** The patch panel shows every non-empty column with its letter, header and sample values. Change any plug with its list; a second list sets the type, so you can mark a column as mobile, work or home. Your changes are applied immediately to the card preview.

For the general case and CSV input, see the [CSV to VCF converter](/).
