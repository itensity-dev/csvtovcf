---
url: ueber-uns
title: 'Über csvtovcf – wer es macht und wie es funktioniert'
h1: 'Über csvtovcf'
description: 'csvtovcf ist ein kostenloser Open-Source-Konverter für Kontakttabellen in vCard, komplett im Browser. Wer ihn macht, wie er finanziert wird und wie Sie uns erreichen.'
lead: 'csvtovcf wandelt Kontakttabellen in vCard-Dateien um, ohne sie irgendwohin zu senden. Es ist ein kleines unabhängiges Projekt mit einer Open-Source-Engine.'
nav: 'Über uns'
summary: 'Wer csvtovcf macht, wie es funktioniert und wie Sie uns erreichen.'
updated: 2026-11-04
---

## Was es ist

csvtovcf.com macht aus Kontaktlisten aus Excel, Google Sheets, Google Kontakte, Outlook, LinkedIn oder einem beliebigen CRM **vCard-Dateien (.vcf)**, die Telefone und E-Mail-Programme importieren. Entstanden ist es, weil die bestehenden Angebote entweder kostenpflichtige Desktop-Programme mit Testversionen für zehn Kontakte waren oder Websites, die Ihr Adressbuch auf einen Server hochladen und die Spalten raten.

**Fakten:**

- Start: November 2026. Diese Seite wurde zuletzt an dem unten angegebenen Datum aktualisiert.
- Sprachen: Englisch, Spanisch, Portugiesisch (Brasilien), Indonesisch, Türkisch, Deutsch, Französisch, Russisch.
- Formate: CSV, TSV, XLSX, XLS, ODS als Eingabe; vCard 2.1, 3.0, 4.0, Google-CSV und Outlook-CSV als Ausgabe.
- Preis: kostenlos, ohne Konto, ohne Zeilenlimit.

## Wie es funktioniert

Die Seite wird einmal geladen. Danach läuft jeder Schritt – Datei lesen, Zeichenkodierung erkennen, Spalten zuordnen, Telefonnummern bereinigen, vCard schreiben – in einem Web Worker in Ihrem Browser. Nichts wird hochgeladen, und nach dem ersten Besuch funktioniert der Konverter offline. Die [Datenschutzseite](/de/datenschutz/) erklärt genau, was über das Netzwerk gesendet wird und was nicht.

Die Umwandlungs-Engine ist Open Source unter der MIT-Lizenz: [github.com/itensity-dev/csvtovcf](https://github.com/itensity-dev/csvtovcf), und auf npm als [`csvtovcf`](https://www.npmjs.com/package/csvtovcf). Telefonnummern werden mit [libphonenumber-js](https://gitlab.com/catamphetamine/libphonenumber-js) geprüft; Tabellen werden mit [SheetJS](https://sheetjs.com/) gelesen. Alle Bibliotheken und Schriften stehen auf der [Lizenzseite](/de/lizenzen/).

## Wer es macht

csvtovcf wird von einem unabhängigen Entwickler betrieben, der auch einige andere Werkzeuge für jeweils einen Zweck anbietet: [ibangenerator.io](https://ibangenerator.io/), [metasnitch.com](https://metasnitch.com/), [woff2tottf.com](https://woff2tottf.com/), [vtttosrt.com](https://vtttosrt.com/) und weitere, die unten auf jeder Seite aufgeführt sind. Jedes erledigt eine Aufgabe und braucht kein Konto.

## Kontakt

Fehlerberichte, falsche Spaltenzuordnungen, ein Telefon, das eine Datei nicht importiert: Schreiben Sie an **hello@csvtovcf.com** oder eröffnen Sie ein Issue auf [GitHub](https://github.com/itensity-dev/csvtovcf/issues). Wird eine Datei falsch umgewandelt, beschreiben Sie ihre Spalten und eine erfundene Beispielzeile – bitte senden Sie keine echten Kontaktdaten.

csvtovcf steht in keiner Verbindung zu Apple, Google, Microsoft, Samsung oder LinkedIn; deren Produktnamen werden nur verwendet, um die Kompatibilität zu beschreiben.
