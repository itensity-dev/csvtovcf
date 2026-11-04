# csvtovcf

The engine behind **[csvtovcf.com](https://csvtovcf.com)**: turns contact spreadsheets into vCard files.
No network, no UI dependencies — runs in browsers, Web Workers and Node 22+.

- **Input:** CSV with any delimiter (`,` `;` tab `|`, Excel's `sep=` line), XLSX / XLS / ODS (via SheetJS, optional), pasted TSV.
- **Encodings:** BOM, strict UTF-8 check, UTF-16 without BOM, Windows-1250…1258, KOI8-R, ISO-8859-x, Shift_JIS, GB18030, Big5, EUC-KR — detected statistically, with a per-language prior.
- **Sources recognised:** Google Contacts CSV (current and legacy), Outlook CSV (English and localized headers: German, French, Russian, Spanish, Portuguese, Turkish…), LinkedIn `Connections.csv`, plain "name + phone" lists with or without a header.
- **Column mapping** with a confidence score; one-cell full names split into N parts (Russian patronymics, Spanish double surnames, particles like *van*, *da*, *bin*).
- **Phones:** E.164 / international / national / keep-as-is via libphonenumber-js; detects Excel's `4.4E+11` (and restores the number when no digit was lost) and numbers saved without `+`.
- **Dates:** ISO, dd.mm.yyyy, mm/dd/yyyy (decided per column), month names in 13 languages, Excel serials, Outlook's `0/0/00`.
- **Duplicates** by phone and e-mail, with merge.
- **Output:** vCard 2.1 (Quoted-Printable + CHARSET for old phones), 3.0 (default), 4.0; Google CSV; Outlook CSV. Lines folded at 75 octets without breaking UTF-8 sequences or grapheme clusters, CRLF line endings, N and FN always present.

```sh
npm i csvtovcf
# optional, for .xlsx/.xls/.ods (the npm "xlsx" package is outdated; use the SheetJS CDN build)
npm i https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz
```

```ts
import { readFileSync } from 'node:fs';
import { detectEncoding, decode, parseCsv, tableFromRows, autoMap, convertTable, buildVCards } from 'csvtovcf';

const bytes = new Uint8Array(readFileSync('contacts.csv'));
const { encoding } = detectEncoding(bytes, { locale: 'de' });
const table = tableFromRows(parseCsv(decode(bytes, encoding)).rows);
const { source, mapping } = autoMap({ headers: table.headers, sample: table.rows.slice(0, 200), locale: 'de' });
const { contacts, skipped, stats } = convertTable(table, mapping, { phoneMode: 'e164', defaultCountry: 'DE', locale: 'de' });
const vcf = buildVCards(contacts, { version: '3.0' });
```

Spreadsheets: `import { readWorkbook } from 'csvtovcf/spreadsheet'` (loads SheetJS lazily).

MIT © csvtovcf.com
