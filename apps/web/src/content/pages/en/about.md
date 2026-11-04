---
url: about
title: 'About csvtovcf — who makes it and how it works'
h1: About csvtovcf
description: 'csvtovcf is a free, open-source converter from contact spreadsheets to vCard that runs entirely in your browser. Who makes it, how it is funded, how to get in touch.'
lead: 'csvtovcf converts contact spreadsheets into vCard files without sending them anywhere. It is a small independent project with an open-source engine.'
nav: About
summary: 'Who makes csvtovcf, how it works and how to reach us.'
updated: 2026-11-04
---

## What it is

csvtovcf.com turns contact lists from Excel, Google Sheets, Google Contacts, Outlook, LinkedIn or any CRM into **vCard (.vcf)** files that phones and e-mail programs import. It was built because the existing options were either paid desktop programs with ten-contact trials, or websites that upload your address book to a server and guess the columns.

**Facts:**

- Launched: November 2026. This page was last updated on the date shown below.
- Languages: English, Spanish, Portuguese (Brazil), Indonesian, Turkish, German, French, Russian.
- Formats: CSV, TSV, XLSX, XLS, ODS in; vCard 2.1, 3.0, 4.0, Google CSV and Outlook CSV out.
- Price: free, no account, no row limit.

## How it works

The page loads once. After that, every step — reading the file, detecting the encoding, matching columns, cleaning phone numbers, writing the vCard — runs in a Web Worker in your browser. Nothing is uploaded, and after the first visit the converter works offline. The [privacy page](/privacy/) explains exactly what is and is not sent over the network.

The conversion engine is open source under the MIT license: [github.com/itensity-dev/csvtovcf](https://github.com/itensity-dev/csvtovcf), and on npm as [`csvtovcf`](https://www.npmjs.com/package/csvtovcf). Phone numbers are checked with [libphonenumber-js](https://gitlab.com/catamphetamine/libphonenumber-js); spreadsheets are read with [SheetJS](https://sheetjs.com/). All libraries and fonts are listed on the [licenses page](/licenses/).

## Who makes it

csvtovcf is made by an independent developer who also runs a few other single-purpose tools: [ibangenerator.io](https://ibangenerator.io/), [metasnitch.com](https://metasnitch.com/), [woff2tottf.com](https://woff2tottf.com/), [vtttosrt.com](https://vtttosrt.com/) and others listed at the bottom of every page. Each one does one job and does not need an account.

## Contact

Bug reports, wrong column matches, a phone that will not import a file: write to **hello@csvtovcf.com** or open an issue on [GitHub](https://github.com/itensity-dev/csvtovcf/issues). If a file is converted wrongly, describe its columns and a made-up example row — please do not send real contact data.

csvtovcf is not affiliated with Apple, Google, Microsoft, Samsung or LinkedIn; their product names are used only to describe compatibility.
