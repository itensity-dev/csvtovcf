---
url: ''
title: 'CSV in VCF umwandeln: Kontakte als vCard, kostenlos und ohne Upload'
h1: 'CSV in VCF (vCard) umwandeln'
description: 'CSV- oder Excel-Kontaktliste in eine VCF-Datei (vCard 3.0, 4.0 oder 2.1) für iPhone, Android, Google Kontakte und Outlook umwandeln. Läuft im Browser, ohne Upload.'
lead: 'Macht aus einer Kontakttabelle eine einzige .vcf-Datei, die iPhone, Android, Google Kontakte und Outlook importieren – Spalten werden zugeordnet, Telefonnummern bereinigt, Duplikate gefunden. Die Datei wird auf diesem Gerät gelesen und nie hochgeladen.'
nav: 'CSV in VCF'
summary: 'Jede Kontakttabelle als .vcf-Datei, mit Spaltenzuordnung und bereinigten Telefonnummern.'
steps:
  - 'Legen Sie Ihre CSV-, Excel- oder ODS-Datei oben im Feld ab oder fügen Sie Zellen aus Google Sheets ein. Zeichenkodierung und Trennzeichen werden erkannt – auch Semikolon und Windows-1252, mit denen ein deutsches Excel CSV-Dateien speichert. Zeigt die Vorschau Zeichen wie `Ã¼` statt `ü`, wählen Sie eine andere Zeichenkodierung.'
  - 'Prüfen Sie die Zuordnung der Spalten. Jede Spalte ist mit einem vCard-Feld verbunden; Zuordnungen mit der Markierung **vermutet** sollten Sie sich ansehen. Spalten auf „überspringen“ werden nicht übernommen.'
  - 'Wählen Sie das Land für Nummern ohne Ländervorwahl. Nummern werden als `+4915123456789` gespeichert, damit sie aus jedem Land richtig gewählt werden und Messenger sie erkennen.'
  - 'Laden Sie die .vcf herunter – vCard 3.0, sofern ein Gerät nichts anderes verlangt – und importieren Sie sie: [iPhone](/de/vcf-auf-iphone-importieren/), [Android](/de/vcf-auf-android-importieren/), [Google Kontakte](/de/vcf-in-google-kontakte-importieren/), [Outlook](/de/vcf-in-outlook-importieren/).'
features:
  - feature: 'Eingabe'
    value: 'CSV, TSV und TXT mit beliebigem Trennzeichen (Komma, Semikolon, Tabulator, senkrechter Strich, die `sep=`-Zeile von Excel); XLSX, XLS, ODS mit Auswahl des Tabellenblatts; aus Google Sheets oder Excel eingefügte Zellen. Mehrere Dateien auf einmal.'
  - feature: 'Zeichenkodierungen'
    value: 'UTF-8 mit oder ohne BOM, UTF-16, Windows-1250 bis 1258, KOI8-R, ISO-8859, Mac Roman, Shift_JIS, GB18030, Big5, EUC-KR. Automatisch erkannt; Umschalten mit Live-Vorschau.'
  - feature: 'Erkannte Exporte'
    value: 'Google-Kontakte-CSV (aktuelles und altes Format), Outlook-CSV mit deutschen, englischen, französischen, russischen, spanischen, portugiesischen oder türkischen Spaltennamen, LinkedIn-Connections.csv, einfache Listen „Name + Telefon“ mit oder ohne Kopfzeile.'
  - feature: 'Telefonnummern'
    value: 'Nach den Regeln von libphonenumber ins internationale Format gebracht; Mobilnummern werden als mobil gekennzeichnet. Ungültige Nummern bleiben erhalten und werden markiert. Excels `4,9E+11` und ohne „+“ gespeicherte Nummern werden erkannt.'
  - feature: 'Namen'
    value: 'Ein vollständiger Name in einer Zelle wird in Vorname, zweiten Vornamen und Nachname aufgeteilt – auch „Nachname, Vorname“, russische Vatersnamen, spanische Doppelnamen und Namenspartikel wie *van* oder *da*.'
  - feature: 'Duplikate'
    value: 'Werden über Telefonnummer und E-Mail gefunden. Zusammenführen ist optional; Sie sehen die Gruppen vor dem Download.'
  - feature: 'Ausgabe'
    value: 'vCard 3.0 (Standard), 4.0 oder 2.1; eine .vcf oder ein ZIP mit einer Datei pro Kontakt; Google-Kontakte-CSV; Outlook-CSV.'
  - feature: 'Größe'
    value: 'Mit 100.000 Zeilen getestet: wenige Sekunden auf einem Laptop. Kein Zeilenlimit – die Grenze ist der Arbeitsspeicher Ihres Geräts.'
  - feature: 'Datenschutz'
    value: 'Kein Upload, kein Konto, keine Auswertung von Dateiinhalten. Funktioniert nach dem ersten Besuch auch offline.'
  - feature: 'Nicht unterstützt'
    value: 'Kontaktfotos (Tabellen enthalten keine), Apple-Numbers-Dateien (vorher als CSV exportieren), passwortgeschützte Excel-Dateien.'
faq:
  - q: 'Wird meine Kontaktliste irgendwohin hochgeladen?'
    a: 'Nein. Ihr Browser liest die Datei, und ein Web Worker auf Ihrem Gerät wandelt sie um. Zur Kontrolle öffnen Sie die Entwicklertools (F12), wechseln zum Tab „Netzwerk“ und wandeln eine Datei um: Keine Anfrage enthält Ihre Daten. Nach dem ersten Besuch funktioniert der Konverter auch ohne Internetverbindung.'
  - q: 'Welche vCard-Version soll ich wählen?'
    a: 'vCard 3.0. iPhone, Android, Google Kontakte und Outlook importieren sie alle. Wählen Sie 4.0 nur, wenn eine App sie verlangt, und 2.1 für alte Handys (einfache Tastenhandys, alte Nokia- oder Sony-Ericsson-Modelle), die mit 3.0 Zeichensalat anzeigen.'
  - q: 'Warum werden meine Telefonnummern als 4,9E+11 angezeigt?'
    a: 'Excel hat die lange Zahl in wissenschaftlicher Schreibweise angezeigt, und die CSV wurde so gespeichert – die ursprünglichen Ziffern stehen nicht mehr in der Datei. Formatieren Sie die Telefonspalte in Excel als Text und exportieren Sie erneut – oder legen Sie direkt die .xlsx-Datei ab, in der die vollständige Nummer noch gespeichert ist. [Warum das passiert](/de/excel-telefonnummern-e11/).'
  - q: 'Bleiben Umlaute, kyrillische oder arabische Buchstaben erhalten?'
    a: 'Ja, wenn die Zeichenkodierung richtig gelesen wird. Der Konverter erkennt sie und zeigt die ersten Zeilen; sehen Sie `Ã¼`, `Ð¸` oder Fragezeichen, wählen Sie in der Liste eine andere Zeichenkodierung. Die .vcf wird immer in UTF-8 geschrieben, das jedes aktuelle Telefon liest.'
  - q: 'Kann ich alle Kontakte auf einmal zum iPhone hinzufügen?'
    a: 'Ja. Senden Sie die eine .vcf per AirDrop, Mail oder über die Dateien-App ans iPhone, öffnen Sie sie und tippen Sie auf „Alle Kontakte hinzufügen“. [Schritt-für-Schritt-Anleitung](/de/vcf-auf-iphone-importieren/).'
  - q: 'Wie viele Kontakte kann ich umwandeln?'
    a: 'Der Konverter hat kein Limit. Google Kontakte nimmt bis zu 3.000 Kontakte pro Importdatei und 25.000 pro Konto an; teilen Sie größere Listen auf mehrere Dateien auf.'
  - q: 'Ist das wirklich kostenlos?'
    a: 'Ja – kein Konto, kein Wasserzeichen, kein Zeilenlimit. Die Umwandlungs-Engine ist Open Source unter der MIT-Lizenz.'
related: [excel-to-vcf, google-contacts-csv-to-vcf, outlook-csv-to-vcf, import-iphone, import-android, garbled-contacts]
updated: 2026-11-04
---

**VCF** (vCard) ist das Standardformat für Kontaktkarten: Jedes Telefon und jedes E-Mail-Programm kann es importieren. Eine CSV ist nur eine Tabelle, und Telefone importieren keine Tabellen. Der Konverter macht aus jeder Zeile eine Karte:

```text
BEGIN:VCARD
VERSION:3.0
N:Müller;Jürgen;;;
FN:Jürgen Müller
TEL;TYPE=CELL:+4915123456789
EMAIL;TYPE=INTERNET:juergen@example.de
ORG:Müller GmbH
BDAY:1990-05-17
END:VCARD
```

**Warum vCard 3.0 der Standard ist.** Version 3.0 ([RFC 2426](https://www.rfc-editor.org/rfc/rfc2426)) ist das Format, in dem iPhone, Android und Google Kontakte selbst exportieren; deshalb lässt sie sich überall sauber importieren. Version 4.0 ([RFC 6350](https://www.rfc-editor.org/rfc/rfc6350)) ist neuer, bringt aber nichts, was ein Adressbuch braucht. Version 2.1 gibt es für alte Handys: Umlaute und andere Nicht-ASCII-Zeichen werden als Quoted-Printable mit `CHARSET=UTF-8` geschrieben – die einzige Form, die diese Geräte verstehen.

**Was die Datei enthält.** Jede Karte hat die beiden Pflichtfelder `N` (Namensteile) und `FN` (Anzeigename). Hat eine Zeile keinen Namen, wird die Firma verwendet, dann die E-Mail, dann die Nummer. Text wird maskiert, und lange Zeilen werden nach 75 Byte umbrochen, ohne einen Buchstaben zu teilen – so kommen Umlaute, Kyrillisch, Arabisch, Chinesisch und Emojis unversehrt an. Die Zeilenenden sind CRLF, wie es der Standard verlangt.

**Telefontypen.** Eine Spalte namens „Mobil“, „Handy“, „Mobile“ oder „Celular“ wird zu `TYPE=CELL`. Bei einer allgemeinen Spalte „Telefon“ entscheidet der Nummernplan: Mobilnummern werden als mobil gespeichert, Festnetznummern bleiben „Telefon“.

**Was mit dem Rest passiert.** Spalten, die Sie nicht brauchen, setzen Sie auf *überspringen*. Datumsangaben, die der Konverter nicht lesen kann, gehen nicht verloren; sie landen in der Notiz. Jede übersprungene Zeile wird mit ihrer Zeilennummer – so, wie Excel sie anzeigt – und dem Grund aufgeführt.

Mehr dazu: [was eine VCF-Datei ist und wie sich die Versionen unterscheiden](/de/was-ist-eine-vcf-datei/), [warum importierte Namen zu Zeichensalat werden](/de/zeichensalat-in-kontakten-beheben/).
