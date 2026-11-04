---
url: google-sheets-in-vcf-umwandeln
title: 'Google Sheets in VCF umwandeln: Kontakte einfügen, vCard laden'
h1: 'Google Sheets in VCF umwandeln'
description: 'Kontaktzellen aus Google Sheets kopieren, hier einfügen und eine VCF-Datei für iPhone, Android oder Google Kontakte laden. Ohne Installation, Add-on oder Kontozugriff.'
lead: 'Markieren Sie die Kontaktzeilen in Google Sheets, kopieren Sie sie, fügen Sie sie hier ein – und laden Sie eine .vcf herunter. Kein Add-on und kein Zugriff auf Ihr Google-Konto: Die Zellen gelangen nur aus Ihrer Zwischenablage auf diese Seite.'
nav: 'Google Sheets in VCF'
summary: 'Zellen aus Google Sheets einfügen und eine .vcf herunterladen.'
steps:
  - 'Markieren Sie in Google Sheets die Kontaktzeilen samt Kopfzeile (erste Zeilennummer anklicken, letzte mit gedrückter Umschalttaste) und kopieren Sie sie mit Strg+C (⌘C auf dem Mac).'
  - 'Klicken Sie oben auf **Zellen einfügen**, fügen Sie mit Strg+V ein und klicken Sie auf **Zellen übernehmen**. Eingefügte Zellen kommen tabulatorgetrennt an, Kommas in Namen oder Adressen sind also kein Problem.'
  - 'Prüfen Sie die Zuordnung der Spalten und wählen Sie das Land für Nummern ohne Ländervorwahl.'
  - 'Laden Sie die .vcf herunter und importieren Sie sie: unter [Android](/de/vcf-auf-android-importieren/), auf dem [iPhone](/de/vcf-auf-iphone-importieren/) oder in [Google Kontakte](/de/vcf-in-google-kontakte-importieren/).'
features:
  - feature: 'Eingabe'
    value: 'Aus Google Sheets, Excel, LibreOffice oder Numbers eingefügte Zellen (tabulatorgetrennt); oder eine über Datei → Herunterladen als .xlsx oder .csv gespeicherte Datei.'
  - feature: 'Kontozugriff'
    value: 'Keiner. Kein Add-on, keine Anmeldung, keine Google-API: Der Konverter sieht nur, was Sie einfügen.'
  - feature: 'Telefonnummern'
    value: 'Sheets speichert Nummern oft als Zahlen (ohne „+“, ohne führende 0). Sie werden mit dem gewählten Land ergänzt und im internationalen Format geschrieben.'
  - feature: 'Ausgabe'
    value: 'vCard 3.0, 4.0 oder 2.1; eine Datei oder ein ZIP; Google-Kontakte-CSV, wenn Sie die Liste lieber als Tabelle in Google Kontakte importieren.'
  - feature: 'Grenzen'
    value: 'Im Konverter keine. Sehr große Mengen (100.000+ Zeilen) laufen als heruntergeladene .xlsx-Datei flüssiger.'
faq:
  - q: 'Gibt es dafür ein Add-on für Google Sheets?'
    a: 'Diese Seite ist die Alternative zu einem Add-on: Ein Add-on braucht die Berechtigung, Ihre Tabellen zu lesen, während diese Seite durch Kopieren und Einfügen nur die Zellen erhält, die Sie markieren.'
  - q: 'Soll ich das Blatt als CSV oder als Excel herunterladen?'
    a: 'Beides funktioniert. Datei → Herunterladen → Microsoft Excel (.xlsx) behält Zahlen und Datumsangaben als typisierte Werte; CSV geht ebenfalls, weil Google Sheets CSV in UTF-8 schreibt.'
  - q: 'Bei den eingefügten Nummern fehlt die führende Null. Lässt sich das reparieren?'
    a: 'Ja, wenn Sie das richtige Land wählen: Die nationale Nummer wird mit der Ländervorwahl ergänzt. Damit Nummern künftig so bleiben, wie sie eingegeben wurden, formatieren Sie die Spalte in Sheets über Format → Zahl → Nur Text.'
  - q: 'Kann ich die Kontakte direkt an Google Kontakte senden?'
    a: 'Importieren Sie die heruntergeladene .vcf unter contacts.google.com → Importieren. Google nimmt bis zu 3.000 Kontakte pro Datei an. [Anleitung](/de/vcf-in-google-kontakte-importieren/).'
related: [google-contacts-csv-to-vcf, excel-to-vcf, home, import-google-contacts, bulk-add-contacts, import-android]
updated: 2026-11-04
---

In Google Sheets (auf Deutsch auch Google Tabellen) werden viele Kontaktlisten geführt und geteilt: Anmeldungen zu Veranstaltungen, Teamlisten, Kundenexporte. Damit diese Menschen ins Telefon kommen, muss das Blatt zu einer **VCF**-Datei (vCard) werden.

**Warum Einfügen statt Add-on.** Add-ons, die aus einem Blatt vCards erzeugen, verlangen die Berechtigung, Ihre Tabellen zu sehen. Kopierte Zellen geben dieser Seite genau das, was Sie markiert haben, und nicht mehr. Beim Kopieren aus Sheets enthält die Zwischenablage die Zellen als tabulatorgetrennten Text. Der Konverter liest dieses Format exakt, einschließlich Zeilenumbrüchen in Zellen und Anführungszeichen.

**Kopfzeilen.** Kopieren Sie die Kopfzeile mit: „Name“, „Telefon“, „E-Mail“ werden dann erkannt und automatisch zugeordnet. Ohne Kopfzeile werden die Spalten anhand ihres Inhalts zugeordnet. Eine E-Mail-Spalte, eine Telefonspalte und eine Spalte mit zweiteiligen Werten werden trotzdem gefunden – prüfen Sie aber die Zuordnung.

**Nummern in Sheets.** Wie Excel behandelt Google Sheets `015123456789` als Zahl, sofern die Spalte nicht als Nur Text formatiert ist, und entfernt die führende Null. Der Konverter kennt den Nummernplan jedes Landes. Mit Deutschland als Land wird aus `15123456789` die Nummer `+4915123456789`, geprüft als gültige Mobilnummer.

**Duplikate.** In geteilten Tabellen steht dieselbe Person oft doppelt. Öffnen Sie nach dem Einfügen den Tab *Duplikate*: Personen mit gleicher Telefonnummer oder E-Mail werden gruppiert, und Sie können sie vor dem Download zusammenführen.
