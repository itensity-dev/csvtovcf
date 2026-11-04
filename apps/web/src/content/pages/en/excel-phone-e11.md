---
url: excel-phone-numbers-e11
title: 'Excel Phone Numbers Showing as 4.4E+11 — Why and How to Fix'
h1: Why Excel turns phone numbers into 4.4E+11
description: 'Excel shows numbers with 12+ digits in scientific notation and saves CSV files that way, losing digits. How to get the full numbers back and stop it happening.'
lead: 'Excel shows any number with 12 or more digits as scientific notation — `447911123456` becomes `4.47911E+11`. That is only a display format until you save a CSV: then Excel writes the shortened text and the missing digits are gone from the file.'
nav: Phone numbers as 4.4E+11
summary: 'Scientific notation, lost digits, lost zeros — causes and fixes.'
faq:
  - q: Can the original numbers be recovered from a CSV with 4.4E+11?
    a: 'No. The CSV contains only the digits shown, e.g. `4.4E+11`; the rest is not in the file. Go back to the Excel workbook (where the full number is still stored) or to the original source.'
  - q: Why did the leading zero disappear?
    a: 'Excel treats `07911123456` typed into a General cell as the number 7911123456, and numbers have no leading zeros. The same happens to the `+` of `+447911123456`. Numbers written with spaces stay text. Format the column as Text before typing or pasting.'
  - q: Does the converter fix these numbers?
    a: 'Where possible. Numbers missing the leading 0 or the `+` are completed from the country you select and checked against its numbering plan. Scientific notation where every digit survived (`4.47911123456E+11`) is restored. `4.4E+11` with lost digits is flagged in the report, never guessed.'
  - q: Is there an Excel setting to stop this?
    a: 'In Microsoft 365 for Windows: File → Options → Data → Automatic data conversion, untick “Keep first 15 digits of long numbers and display in scientific notation if needed” and “Remove leading zeros”. It applies to new data you type or open.'
related: [excel-to-vcf, xlsx-to-vcf, home, garbled-contacts, bulk-add-contacts, google-sheets-to-vcf]
updated: 2026-11-04
---

## What happens, step by step

1. **Typing or pasting.** A phone number without spaces in a cell with the default *General* format is stored as a number. The leading `0` and the `+` disappear immediately: `+447911123456` → 447911123456, `07911123456` → 7911123456.
2. **Displaying.** In General format, Excel shows numbers of 12 or more digits in scientific notation if the column is narrow: `4.47911E+11`. Inside the cell the full number is still stored (Excel keeps up to 15 significant digits).
3. **Saving as CSV.** A CSV is plain text, and Excel writes each cell the way it is *displayed*. The file now contains `4.47911E+11`, and the last digits `123456` are gone. Microsoft has documented this behaviour since Excel 97.

Step 3 is the one that destroys data. Before it, the number can still be rescued.

## How to rescue the numbers

- **Use the workbook, not the CSV.** Drop the .xlsx or .xls into the [Excel to VCF converter](/excel-to-vcf/): it reads the stored numbers, not the display.
- **Or widen the column and format it.** Select the column → Format Cells → **Number** with 0 decimals (or a custom format `0`). The full digits appear; save as CSV again.
- **If you only have the CSV,** the lost digits cannot be recovered. Find the original list.

## How to stop it

- **Format the phone column as Text before entering numbers** (Home → Number format → Text). Then `+447911123456` stays exactly as typed, with the plus.
- **Import CSV files as text** instead of double-clicking them: Data → From Text/CSV → *Transform Data* → set the phone column to *Text*.
- **Microsoft 365:** File → Options → Data → *Automatic data conversion*: switch off removing leading zeros and keeping only 15 digits in scientific notation.
- **Keep numbers international** (`+…`) in the source. They survive best when stored as text.

## What the converter does with damaged numbers

| In the file | Result | Shown as |
| --- | --- | --- |
| `7911123456` + country United Kingdom | `+447911123456` | valid |
| `447911123456` (no `+`) | `+447911123456` | “missing + added” |
| `4.47911123456E+11` | `+447911123456` | “restored from Excel notation” |
| `4.4E+11` | written unchanged | “destroyed by Excel”, red |

Damaged numbers are never “completed” with invented digits. They are marked on the card and listed in the *Warnings* tab with their row numbers, so you can fix them in the source.
