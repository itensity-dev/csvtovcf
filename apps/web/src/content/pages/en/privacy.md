---
url: privacy
title: 'Privacy — csvtovcf'
h1: Privacy
description: 'Your contact files are processed on your device and never uploaded. What csvtovcf stores, which logs exist, and which third-party services are used and why.'
lead: 'Short version: your files never leave your device. The site has no accounts, sets no tracking cookies, and does not see the names, numbers or column headers you convert.'
nav: Privacy
summary: 'What is processed where, what is logged, which services are used.'
updated: 2026-11-04
---

## Your files

- Files you drop, choose or paste are read by your browser and processed in a **Web Worker on your device**. They are not uploaded, not stored on a server and not shared with anyone.
- You can verify this: open your browser’s developer tools, Network tab, and convert a file. While the converter works, it only loads its own code from csvtovcf.com (the spreadsheet reader is fetched the first time you open an Excel file). No request contains your data.
- The site’s Content-Security-Policy limits network connections to csvtovcf.com itself. If analytics are switched on, it also allows the anonymous counter described below. Analytics scripts never receive data from the converter.
- When you close or reload the tab, the data is gone. Nothing is written to your browser’s storage.

## What the server sees

The server delivers the pages and keeps a standard access log: IP address, time, requested page, browser type and referring page. The log is used to keep the service running and to stop abuse. It is kept for at most 14 days and is not combined with other data. It never contains your files, because they are never sent.

## Storage in your browser

- `localStorage`: your colour theme choice (light, dark or automatic), if you changed it.
- `sessionStorage`: whether you closed the “this page is available in your language” notice.
- A service worker caches the site’s own files so the converter works offline. It never caches your files or results.

No cookies are set by csvtovcf itself.

## Analytics

By default, the site runs **without analytics**. If analytics are switched on, we use Plausible Analytics: no cookies, no personal data, and IP addresses are not stored. Only page views and one anonymous event per conversion are counted. The event records the vCard version, the output format, the detected source type (for example “Google CSV”) and the number of contacts as a range (such as “11–100”). Names, numbers, addresses, file names and column headers are never sent.

## Advertising

Advertising is currently **switched off**. If it is switched on, ads appear only outside the converter. In the European Economic Area, the United Kingdom and Switzerland, Google’s certified consent dialog asks for your choice before any ad cookies are used. Ad scripts cannot read your contact data, because it lives in the Web Worker and not on the page. This page will list the ad provider before ads go live.

## Links to other sites

Guides link to Apple, Google and Microsoft help pages, and the footer links to other tools by the same maker. Those sites have their own privacy policies.

## Your rights and contact

Because we do not collect personal data from the converter, there is nothing to view, export or delete. For questions about the server logs or anything on this page, write to **hello@csvtovcf.com**. You also have the right to complain to your data protection authority.
