---
url: xls-in-vcf-umwandeln
title: 'XLS in VCF umwandeln: alte Excel-Kontaktdateien als vCard'
h1: 'XLS in VCF umwandeln'
description: '.xls-Kontaktlisten aus Excel 97–2003, alten CRMs und Handy-Software in eine VCF-Datei umwandeln. Alte Codepages werden dekodiert, Umlaute bleiben erhalten. Kein Upload.'
lead: 'Liest das alte binäre Excel-Format (.xls) – auch Dateien aus Excel 95, Buchhaltungsprogrammen und Handy-Synchronisationssoftware – und schreibt eine .vcf, die aktuelle Telefone importieren.'
nav: 'XLS in VCF'
summary: 'Alte .xls-Kontaktdateien (Excel 97–2003 und älter) als vCard.'
steps:
  - 'Legen Sie die .xls-Datei oben ab. Das Format wird an der Datei selbst erkannt, sodass auch eine Arbeitsmappe mit falscher Dateiendung geöffnet wird.'
  - 'Wählen Sie bei mehreren Tabellenblättern das richtige und prüfen Sie die Vorschau: Namen mit Umlauten sowie kyrillischen, griechischen, türkischen oder mitteleuropäischen Buchstaben sollten korrekt erscheinen.'
  - 'Prüfen Sie die Zuordnung der Spalten und wählen Sie das Land für Nummern ohne Ländervorwahl.'
  - 'Laden Sie die .vcf herunter. Wählen Sie vCard 2.1 nur, wenn die Datei zurück auf ein altes Handy soll; aktuelle Telefone erwarten 3.0.'
features:
  - feature: 'Formate'
    value: 'BIFF8 (.xls aus Excel 97–2003), BIFF5 (Excel 95), BIFF2–4 und Excel-2003-XML, dazu .xlsx und .ods.'
  - feature: 'Alte Codepages'
    value: 'Text in .xls-Dateien aus der Zeit vor Unicode (Windows-1250/1251/1252/1253/1254, Shift_JIS, Big5 …) wird mit der in der Datei gespeicherten Codepage dekodiert.'
  - feature: 'Zahlen und Datumsangaben'
    value: 'Telefonnummern werden vollständig gelesen; Datumszellen – auch im 1904-Datumssystem alter Mac-Arbeitsmappen – werden zu Geburtstagen.'
  - feature: 'Ausgabe'
    value: 'vCard 3.0 (Standard), 4.0 oder 2.1, eine Datei oder eine pro Kontakt; Google-CSV; Outlook-CSV.'
  - feature: 'Nicht unterstützt'
    value: 'Verschlüsselte .xls (Kennwort zum Öffnen), Dateien aus Lotus 1-2-3 und Quattro.'
faq:
  - q: 'Was ist der Unterschied zwischen XLS und XLSX?'
    a: '.xls ist das Binärformat, das Excel bis 2003 verwendet hat; .xlsx ist das gezippte XML-Format seit Excel 2007. Beide werden hier gleich gelesen. Alte Programme und manche Handy-Synchronisationstools exportieren noch .xls.'
  - q: 'Namen aus meiner alten Datei erscheinen als `Ãëåá` oder Fragezeichen. Was nun?'
    a: 'In diesem Konverter sollte das nicht passieren: .xls-Dateien speichern ihre Codepage, und sie wird beim Lesen angewendet. Sind die Buchstaben trotzdem falsch, war der Text vermutlich schon beim Eintippen in Excel verstümmelt. Öffnen Sie die Datei in Excel und prüfen Sie die Zellen dort.'
  - q: 'Kann ich eine .xls mit Tausenden Kontakten umwandeln?'
    a: 'Ja. Es gibt kein Zeilenlimit; 100.000 Zeilen werden in wenigen Sekunden umgewandelt. Für Google Kontakte teilen Sie das Ergebnis in Dateien mit höchstens 3.000 Kontakten auf.'
  - q: 'Welche vCard-Version passt zu einem alten Handy?'
    a: 'vCard 2.1. Sie schreibt Umlaute und andere Nicht-ASCII-Zeichen als Quoted-Printable mit `CHARSET=UTF-8`, was Handys aus den 2000er-Jahren verstehen. Smartphones sollten 3.0 bekommen.'
related: [excel-to-vcf, xlsx-to-vcf, home, garbled-contacts, what-is-vcf, import-android]
updated: 2026-11-04
---

**XLS** ist das Dateiformat, das Excel vor 2007 verwendet hat. Es ist bis heute verbreitet bei Kontaktlisten aus älteren CRMs, Buchhaltungssoftware, Telefonanlagen und Handy-Synchronisationsprogrammen. Telefone können es nicht lesen, und Google Kontakte importiert nur CSV oder vCard. Der Konverter liest die .xls selbst, Sie brauchen also kein installiertes Excel.

**Codepages.** Excel 97–2003 speichert Text als Unicode, Dateien aus Excel 95 und manchen Exportprogrammen aber in der Codepage des Rechners, auf dem sie entstanden sind – Windows-1252 für Deutsch und andere westeuropäische Sprachen, 1251 für Russisch, 1250 für Polnisch oder Tschechisch, 1254 für Türkisch. Der Konverter wendet die in der Datei vermerkte Codepage an, sodass `Müller` `Müller` bleibt und `Иванов` `Иванов`. Die .vcf wird immer in UTF-8 geschrieben.

**Von Zeilen zu Karten.** Die Kopfzeile wird automatisch gefunden. Spalten werden in vielen Sprachen an ihrem Namen erkannt: „Handy“, „Teléfono“, „Телефон“ und „Cep Telefonu“ werden alle zu Telefonnummern. Jede Zeile wird zu einer Karte mit den Pflichtfeldern `N` und `FN`; Zeilen ohne Name, Telefon, E-Mail, Firma oder Adresse werden übersprungen und mit ihrer Zeilennummer aufgeführt.

**Welche Version Sie herunterladen.** vCard 3.0 lässt sich auf iPhone und Android, in Google Kontakte und in Outlook importieren. vCard 2.1 gibt es für die Telefone, von denen solche .xls-Dateien oft stammen: einfache Tastenhandys und frühe Nokia- oder Sony-Ericsson-Modelle. [Wie sich die Versionen unterscheiden](/de/was-ist-eine-vcf-datei/).
