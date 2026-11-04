---
url: was-ist-eine-vcf-datei
title: 'Was ist eine VCF-Datei? vCard-Versionen 2.1, 3.0 und 4.0 erklärt'
h1: 'Was ist eine VCF-Datei (vCard)?'
description: 'Eine VCF-Datei ist eine vCard: eine Kontaktkarte als reiner Text, die jedes Telefon und Mailprogramm importiert. Was drinsteht, wie sich 2.1, 3.0 und 4.0 unterscheiden.'
lead: 'Eine VCF-Datei ist eine vCard: reiner Text, der eine oder mehrere Kontaktkarten beschreibt – Name, Telefonnummern, E-Mail-Adressen, Anschrift, Geburtstag – in einem Standard, den jedes Telefon und jedes E-Mail-Programm versteht.'
nav: 'Was ist eine VCF-Datei'
summary: 'Was in einer vCard steht und wie sich die Versionen 2.1, 3.0 und 4.0 unterscheiden.'
faq:
  - q: 'Wie öffne ich eine VCF-Datei?'
    a: 'Auf dem Telefon tippen Sie sie an: iPhone und Android bieten an, die Kontakte hinzuzufügen. Am Computer öffnet ein Doppelklick das Adressbuch (Kontakte auf dem Mac, Outlook oder Personen unter Windows). Jeder Texteditor zeigt den reinen Text.'
  - q: 'Kann eine VCF-Datei viele Kontakte enthalten?'
    a: 'Ja. Eine Datei besteht einfach aus mehreren `BEGIN:VCARD … END:VCARD`-Blöcken hintereinander. iPhone, Android und Google Kontakte importieren sie alle auf einmal; das klassische Outlook geht sie einzeln durch.'
  - q: 'Welche Version soll ich verwenden?'
    a: 'vCard 3.0 für Telefone, Google und Outlook. 4.0 nur, wenn eine App sie verlangt; 2.1 für alte Tastenhandys.'
  - q: 'Ist es sicher, eine VCF-Datei zu öffnen?'
    a: 'Eine vCard ist reiner Text ohne Makros oder Code. Das übliche Risiko ist dasselbe wie bei jedem Anhang eines unbekannten Absenders: Die Kontaktdaten selbst können irreführend sein.'
  - q: 'Was ist der Unterschied zwischen .vcf und .vcard?'
    a: 'Keiner – beide Endungen stehen für dasselbe Format. Der MIME-Typ ist `text/vcard` (ältere Software verwendet `text/x-vcard`).'
related: [home, garbled-contacts, import-iphone, import-android, excel-to-vcf, bulk-add-contacts]
updated: 2026-11-04
---

## Was drinsteht

Eine vCard ist Text. Jede Karte beginnt mit `BEGIN:VCARD` und endet mit `END:VCARD`; jede Zeile dazwischen ist eine Eigenschaft:

```text
BEGIN:VCARD
VERSION:3.0
N:Müller;Jürgen;;;
FN:Jürgen Müller
TEL;TYPE=CELL:+4915123456789
TEL;TYPE=WORK,VOICE:+4930123456
EMAIL;TYPE=INTERNET,WORK:juergen@example.de
ORG:Müller GmbH
TITLE:Geschäftsführer
ADR;TYPE=WORK:;;Friedrichstraße 123;Berlin;;10117;Deutschland
BDAY:1990-05-17
NOTE:Kennengelernt auf der Messe
END:VCARD
```

Die wichtigsten Eigenschaften:

| Eigenschaft | Bedeutung |
| --- | --- |
| `N` | Namensteile: Nachname; Vorname; weitere Vornamen; Präfix; Suffix |
| `FN` | Anzeigename |
| `TEL` | Telefonnummer, mit Typen wie `CELL`, `WORK`, `HOME`, `FAX` |
| `EMAIL` | E-Mail-Adresse |
| `ADR` | Anschrift: Postfach; Adresszusatz; Straße; Ort; Region; Postleitzahl; Land |
| `ORG`, `TITLE` | Firma (und Abteilung), Position |
| `BDAY`, `ANNIVERSARY` | Datumsangaben |
| `NOTE`, `URL`, `CATEGORIES` | Notiz, Website, Gruppen |

## Die drei Versionen

| | vCard 2.1 | vCard 3.0 | vCard 4.0 |
| --- | --- | --- | --- |
| Veröffentlicht | 1996, Versit-Konsortium | 1998, [RFC 2426](https://www.rfc-editor.org/rfc/rfc2426) | 2011, [RFC 6350](https://www.rfc-editor.org/rfc/rfc6350) |
| Umlaute und andere Nicht-ASCII-Zeichen | `CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE` | standardmäßig UTF-8 | nur UTF-8 |
| Typ-Parameter | `TEL;CELL;VOICE` | `TEL;TYPE=CELL` | `TEL;TYPE=cell`, Nummern als `tel:`-URIs |
| Pflichtfelder | `N` | `N`, `FN` | `FN` |
| Typischer Einsatz | alte Handys, manche Android-Exporte | iPhone, Android, Google, Outlook | CardDAV-Server, neuere Apps |

**vCard 3.0** ist die sichere Wahl: In dieser Version exportieren iOS und Google Kontakte, und jedes Importprogramm liest sie. **4.0** räumt das Format auf (zum Beispiel Geburtstage ohne Jahr als `--0517`, Nummern als `tel:+4915123456789`), wird von Importprogrammen aber weniger einheitlich behandelt. **2.1** ist für Telefone aus den 2000er-Jahren wichtig, die UTF-8 nur verstehen, wenn jeder Wert mit Umlauten oder anderen Nicht-ASCII-Zeichen als Quoted-Printable kodiert ist.

## Details, an denen Importe scheitern

- **Zeilenenden** müssen CRLF sein.
- **Lange Zeilen** werden nach 75 Byte gefaltet: Die Zeile wird umbrochen, und die nächste beginnt mit einem Leerzeichen. Ein schlechter Konverter teilt dabei einen Mehrbyte-Buchstaben, und mitten im Namen erscheint `�`.
- **Kommas und Semikolons** in Werten müssen maskiert werden (`\,` `\;`), sonst zerfällt eine Adresse wie „Haus 4, 2. OG“.
- **Zeichenkodierung**: Eine vCard 3.0, die in Windows-1252 statt in UTF-8 geschrieben ist, zeigt Umlaute auf jedem Telefon als Symbole.

Der [Konverter auf dieser Website](/de/) schreibt all das in jeder Version korrekt, und im Tab *vCard-Text* sehen Sie vor dem Download den genauen Text der ersten Karte.
