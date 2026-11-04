---
url: outlook-csv-in-vcf-umwandeln
title: 'Outlook-CSV in VCF umwandeln: Outlook-Kontakte als vCard'
h1: 'Outlook-CSV in VCF umwandeln'
description: 'Outlook-Kontakte (CSV-Export, auch mit deutschen Spaltennamen) in eine VCF-Datei für iPhone, Android oder Gmail umwandeln. Liest Windows-Kodierungen. Kein Upload.'
lead: 'Macht aus einem Outlook-Kontaktexport eine einzige .vcf. Funktioniert mit deutschen Spaltennamen wie `Vorname` und `Telefon geschäftlich`, mit englischen, französischen, russischen und weiteren Outlook-Sprachen sowie mit den Windows-Kodierungen, die Outlook schreibt.'
nav: 'Outlook-CSV in VCF'
summary: 'Outlook-Kontaktexport (CSV, jede Sprache) als eine vCard-Datei.'
steps:
  - 'Exportieren Sie aus Outlook: klassisches Outlook – Datei → Öffnen und exportieren → Importieren/Exportieren → In Datei exportieren → Kommagetrennte Werte → Kontakte. Neues Outlook und Outlook.com – Personen → Kontakte verwalten → Kontakte exportieren.'
  - 'Legen Sie die .csv oben ab. Der Konverter erkennt die Zeichenkodierung (Outlook schreibt oft Windows-1252 oder 1251, nicht UTF-8) und das Trennzeichen (`;` bei deutschen und vielen anderen europäischen Systemeinstellungen).'
  - 'Prüfen Sie die Zuordnung: Die Outlook-Spalte `Anrede` (englisch `Title`) ist das Namenspräfix (Herr, Dr.), `Position` (`Job Title`) die berufliche Funktion. Leere Spalten – Outlook exportiert rund 90 – werden ausgeblendet.'
  - 'Laden Sie die .vcf herunter und importieren Sie sie auf dem [iPhone](/de/vcf-auf-iphone-importieren/) oder unter [Android](/de/vcf-auf-android-importieren/).'
features:
  - feature: 'Outlook-Versionen'
    value: 'CSV-Exporte aus klassischem Outlook für Windows (2010–2024, Microsoft 365), neuem Outlook, Outlook.com und Outlook für Mac.'
  - feature: 'Sprachen der Spaltennamen'
    value: 'Deutsch (`Vorname`, `Telefon geschäftlich`), Englisch, Französisch (`Prénom`, `Tél. mobile`), Russisch (`Имя`, `Рабочий телефон`), Spanisch, Portugiesisch, Italienisch, Niederländisch, Polnisch, Türkisch.'
  - feature: 'Telefone'
    value: 'Die Spalten für geschäftlich, privat, mobil, Haupttelefon, Firmenzentrale, Fax und Pager behalten ihren Typ; Autotelefon, Rückruf, ISDN und Funk werden zu „sonstige“.'
  - feature: 'Adressen'
    value: 'Straße, Ort, Bundesland, Postleitzahl und Land für geschäftlich, privat und weitere werden zu drei typisierten `ADR`-Einträgen; Straße 2 und 3 werden angehängt.'
  - feature: 'Leere Werte'
    value: 'Outlook schreibt leere Datumsangaben als `0/0/00` (in deutschen Exporten `0.0.00`) – sie werden ignoriert und nicht zum Jahr 2000.'
  - feature: 'Nicht übernommen'
    value: 'Fotos, Kennzeichnungen, „Internet-Frei/Gebucht“ (Internet Free Busy), Benutzerfelder 1–4 (bei Bedarf der Notiz zuordnen).'
faq:
  - q: 'Outlook kann einen Kontakt als vCard speichern. Warum die CSV umwandeln?'
    a: 'Outlook speichert eine vCard pro Kontakt; einen Export aller Kontakte in eine .vcf gibt es nicht. Der CSV-Export enthält alle, und diese Seite macht daraus eine .vcf-Datei – oder ein ZIP mit einer Karte pro Kontakt.'
  - q: 'Mein Export hat deutsche (oder französische, russische …) Spaltennamen. Funktioniert das?'
    a: 'Ja. Das klassische Outlook schreibt die Spaltennamen in seiner Oberflächensprache, und der Konverter kennt sie. Im Dateibereich steht „Outlook-CSV, lokalisierte Spaltennamen“ und die erkannte Sprache.'
  - q: 'Warum steht `Herr` im Namen?'
    a: 'Die Outlook-Spalte `Anrede` (`Title`) enthält die Anrede und wird deshalb ins Namenspräfix geschrieben. Wenn Sie sie nicht im Telefon haben möchten, setzen Sie die Spalte auf *überspringen*.'
  - q: 'Namen erscheinen als `MÃ¼ller` oder mit Fragezeichen.'
    a: 'Die Zeichenkodierung wurde falsch gelesen. Wählen Sie die Kodierung, die Outlook verwendet hat: Windows-1252 für Deutsch und andere westeuropäische Sprachen, Windows-1251 für Kyrillisch, Windows-1250 für Mitteleuropa. Die Vorschau aktualisiert sich sofort. [Mehr zu Zeichensalat in Namen](/de/zeichensalat-in-kontakten-beheben/).'
related: [google-contacts-csv-to-vcf, import-outlook, home, garbled-contacts, import-iphone, excel-to-vcf]
updated: 2026-11-04
---

Outlook exportiert Kontakte als CSV mit bis zu rund 90 Spalten: drei Adressen, neunzehn Telefonfelder, drei E-Mail-Adressen, Benutzerfelder und mehr. Die meisten davon sind bei den meisten Personen leer. Der Konverter blendet leere Spalten aus, ordnet die übrigen vCard-Feldern zu und schreibt pro Kontakt eine Karte.

**Lokalisierte Spaltennamen.** Das klassische Outlook benennt die Spalten in seiner Oberflächensprache. Laut Microsoft muss die Sprache der Spaltenüberschriften beim Import der Standardsprache von Outlook entsprechen. Ein deutsches Outlook schreibt deshalb zum Beispiel (gekürzt):

| Vorname | Nachname | Mobiltelefon | Telefon geschäftlich | E-Mail-Adresse | Firma | Position | Geburtstag |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Jürgen | Müller | 0151 23456789 | 030 123456 | juergen@example.de | Müller GmbH | Geschäftsführer | 17.05.1990 |

Der Konverter erkennt solche Spaltennamen an ihren Wörtern, nicht an einer festen Liste. Deshalb landen `Telefon geschäftlich`, `Téléphone (bureau)` und `Рабочий телефон` alle als geschäftliche Telefonnummer.

**Felder, die andere Konverter verwirren.**

- `Anrede` (`Title`) ist die Anrede (Herr, Frau, Dr.); `Position` (`Job Title`) ist die berufliche Funktion.
- `Straße geschäftlich`, `Straße geschäftlich 2`, `Straße geschäftlich 3` gehören zu einer Adresse.
- `E-Mail-Typ` (`E-mail Type`, Wert `SMTP`) und `E-Mail: Angezeigter Name` (`E-mail Display Name`) sind keine Adressen und werden übersprungen.
- `Geburtstag` = `0/0/00` bzw. `0.0.00` bedeutet „kein Geburtstag“.

**Zeichenkodierungen.** Das klassische Outlook schreibt die CSV oft in der Windows-Codepage Ihres Systems – in Deutschland Windows-1252 – statt in UTF-8, und eine von einem deutschen Excel erneut gespeicherte CSV verwendet Semikolons. Beides wird erkannt. Sehen Namen falsch aus, wechseln Sie die Zeichenkodierung im Dateibereich und beobachten Sie die Vorschau.

**Zurück in Outlook?** Um Kontakte *in* Outlook zu bringen, ist eine CSV der sicherere Weg: Das klassische Outlook importiert eine .vcf mit mehreren Kontakten nur Karte für Karte. Wählen Sie unter *Herunterladen als* „Outlook-CSV“. [Import-Anleitung für Outlook](/de/vcf-in-outlook-importieren/).
