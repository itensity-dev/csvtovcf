# Fixtures

Synthetic contact exports for tests. **No real personal data**: names are invented,
e-mails use the reserved `example.*` domains, phone numbers are fictional
(US 555-01xx) or random numbers that merely pass libphonenumber validation.

Regenerate with `pnpm --filter csvtovcf fixtures` (script: `scripts/make-fixtures.mjs`).

| File | Shape |
| --- | --- |
| google-contacts.csv | Google Contacts export, current layout (`First Name`, `Phone 1 - Label`, `Labels`, ` ::: ` multi-values) |
| google-contacts-legacy.csv | Old Google CSV (`Given Name`, `Group Membership`, `E-mail 1 - Type`) |
| outlook-en.csv | Classic Outlook export, English headers, `0/0/00` empty dates |
| outlook-de-cp1252.csv | Outlook, German headers, Windows-1252 |
| outlook-ru-cp1251.csv | Outlook, Russian headers, Windows-1251 |
| outlook-fr-semicolon.csv | Outlook, French headers, re-saved by Excel: `;` + UTF-8 BOM |
| linkedin-connections.csv | LinkedIn `Connections.csv` with the `Notes:` preamble |
| simple-ru-cp1251-noheader.csv | Name + phone, no header row, `;`, Windows-1251 |
| excel-de-semicolon-cp1252.csv | German Excel CSV: `;`, Windows-1252, phones mangled to `4,91512E+11` |
| excel-tr-cp1254.csv | Turkish Excel CSV, Windows-1254 (ğ ş ı İ) |
| excel-ar-cp1256.csv | Arabic, Windows-1256 |
| excel-unicode-utf16le.txt | Excel "Unicode text": UTF-16 LE + BOM, tab-separated |
| japanese-shift_jis.csv | Japanese, Shift_JIS |
| indonesia-nama-hp.csv | Indonesian list (`Nama`, `No HP`, `Alamat`, `Kota`) |
| brasil-pipe.csv | Brazilian list, `|` separator, `CEP` postal codes |
| workbook.xlsx / .xls / .ods | Two sheets, phones stored as numbers, real date cells |

The 100 000-row table is generated in memory by `test/large.test.ts`.
