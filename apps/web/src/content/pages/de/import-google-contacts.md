---
url: vcf-in-google-kontakte-importieren
title: 'VCF- oder CSV-Datei in Google Kontakte importieren'
h1: 'Kontakte in Google Kontakte importieren'
description: 'Eine .vcf oder Google-CSV in Google Kontakte im Web importieren: Importieren → Datei auswählen. Limits (3.000 pro Datei, 25.000 pro Konto) und Duplikate zusammenführen.'
lead: 'Google Kontakte im Web importiert eine .vcf oder eine Google-CSV direkt. Danach werden die Kontakte mit jedem Android-Telefon, mit Gmail und mit einem iPhone synchronisiert, auf dem das Google-Konto eingerichtet ist.'
nav: 'Import in Google Kontakte'
summary: 'Eine .vcf oder CSV unter contacts.google.com importieren, mit Limits.'
steps:
  - 'Wandeln Sie Ihre Tabelle mit dem [Konverter](/de/) um – als .vcf (vCard 3.0) oder als „Google-Kontakte-CSV“ unter *Herunterladen als*.'
  - 'Öffnen Sie [contacts.google.com](https://contacts.google.com/) und melden Sie sich mit dem Konto an, in das die Kontakte sollen.'
  - 'Klicken Sie im linken Menü auf **Importieren**, dann auf **Datei auswählen**, wählen Sie die Datei und klicken Sie auf **Importieren**.'
  - 'Die importierten Kontakte bekommen ein Label „Importiert am …“ mit dem Datum des Imports. Über **Zusammenführen und korrigieren** (Merge & fix) kombinieren Sie Duplikate mit bereits vorhandenen Kontakten.'
faq:
  - q: 'VCF oder Google-CSV – was ist für Google besser?'
    a: 'Beide werden vollständig importiert. vCard behält Telefon- und E-Mail-Typen und funktioniert auch für andere Apps; Google-CSV ist praktisch, wenn Sie die Liste vor dem Import in einer Tabelle ansehen oder bearbeiten möchten.'
  - q: 'Wie viele Kontakte kann ich importieren?'
    a: 'Google bittet darum, Dateien mit mehr als 3.000 Kontakten aufzuteilen, und ein Konto fasst bis zu 25.000 Kontakte (etwa 20 MB ohne Fotos). Teilen Sie größere Listen auf mehrere Dateien auf.'
  - q: 'Wie mache ich einen Import rückgängig?'
    a: 'Klicken Sie im linken Menü auf das Label „Importiert am …“, markieren Sie alle Kontakte darin (Kästchen oben) und löschen Sie sie. Sie bleiben 30 Tage im Papierkorb.'
  - q: 'Die importierten Kontakte erscheinen nicht auf meinem Telefon.'
    a: 'Prüfen Sie, ob das Telefon dieses Google-Konto synchronisiert: unter Android Einstellungen → Passwörter & Konten (Passwords & accounts) → Google → Kontosynchronisierung → Kontakte; auf dem iPhone Einstellungen → Apps → Kontakte → Accounts → Gmail → Kontakte einschalten.'
related: [import-android, import-iphone, google-contacts-csv-to-vcf, google-sheets-to-vcf, home, bulk-add-contacts]
updated: 2026-11-04
---

## Import Schritt für Schritt

1. Öffnen Sie [contacts.google.com](https://contacts.google.com/) auf einem Computer.
2. Klicken Sie im linken Menü auf **Importieren**.
3. Klicken Sie auf **Datei auswählen** und wählen Sie die .vcf oder .csv.
4. Klicken Sie auf **Importieren**.

Google fügt jeden importierten Kontakt einem neuen Label hinzu, das nach dem Datum des Imports benannt ist. So lässt sich das Ergebnis leicht prüfen – oder der ganze Stapel löschen, falls etwas schiefgegangen ist.

## Limits, die Sie kennen sollten

| Limit | Wert |
| --- | --- |
| Kontakte pro Importdatei | etwa 3.000 – größere Dateien aufteilen |
| Kontakte pro Konto | 25.000 |
| Speicher für Kontakte | 20 MB (Fotos nicht mitgerechnet) |
| Ein Kontakt | bis 128 KB, 500 Felder |

Der Konverter schreibt für jede Anzahl von Kontakten eine einzige Datei. Bei mehr als 3.000 Zeilen filtern Sie die Tabelle in Teile und wandeln jeden Teil um – oder importieren dieselbe .vcf auf einem Android-Telefon, das kein Limit pro Datei hat.

## Duplikate

Google führt beim Import nichts zusammen. Importieren Sie dieselbe Person zweimal, haben Sie zwei Karten. Zwei Wege, das zu vermeiden:

- **vor** dem Import: Öffnen Sie im Konverter den Tab *Duplikate* und aktivieren Sie „Kontakte mit gleicher Nummer oder E-Mail zusammenführen“ – Personen mit gleicher Nummer oder E-Mail werden zu einer Karte;
- **nach** dem Import: Google Kontakte → **Zusammenführen und korrigieren** schlägt Duplikate im gesamten Konto vor.

## Telefonnummern

Google speichert Nummern als Text, genau wie importiert. Nummern im internationalen Format (`+49 151 23456789`) werden in jedem Land richtig angezeigt, und Messenger können sie zuordnen. Nummern ohne Ländervorwahl werden mit der Region des Telefons interpretiert und können im Ausland falsch sein. Deshalb schreibt der Konverter standardmäßig Nummern mit `+`.
