---
url: google-kontakte-csv-in-vcf-umwandeln
title: 'Google-Kontakte-CSV in VCF umwandeln: Google-CSV als vCard'
h1: 'Google-Kontakte-CSV in VCF umwandeln'
description: 'Google-Kontakte-CSV (aktuelles oder altes Format) in eine VCF-Datei für iPhone oder Outlook umwandeln. Labels, mehrere Nummern pro Zelle und Geburtstage bleiben erhalten.'
lead: 'Wandelt einen Kontaktexport im Format „Google-CSV“ in eine vCard-Datei um. Telefon- und E-Mail-Labels, mehrere Werte in einer Zelle (` ::: `), Gruppen und Geburtstage ohne Jahr werden übernommen.'
nav: 'Google-Kontakte-CSV in VCF'
summary: 'CSV-Export aus Google Kontakte (neues und altes Format) als vCard.'
steps:
  - 'Legen Sie die aus Google Kontakte exportierte CSV ab (Exportieren → Google-CSV). Erkannt werden sowohl das aktuelle Format (`First Name`, `Phone 1 - Label`) als auch das alte (`Given Name`, `Group Membership`).'
  - 'Die Spalten werden automatisch zugeordnet und als **sicher** markiert; meist ist nichts zu ändern.'
  - 'Wählen Sie das Land für Nummern ohne Ländervorwahl und ob Duplikate zusammengeführt werden sollen.'
  - 'Laden Sie die .vcf herunter und importieren Sie sie auf dem [iPhone](/de/vcf-auf-iphone-importieren/) oder in [Outlook](/de/vcf-in-outlook-importieren/).'
features:
  - feature: 'Formate'
    value: 'Aktuelle Google-CSV (`First Name`, `Labels`, `E-mail 1 - Label` …) und die alte (`Name`, `Given Name`, `Group Membership`, `E-mail 1 - Type` …).'
  - feature: 'Mehrere Werte'
    value: 'Mehrere Nummern oder E-Mails in einer Zelle, getrennt durch ` ::: `, werden zu einzelnen `TEL`- bzw. `EMAIL`-Zeilen mit ihren Labels.'
  - feature: 'Labels'
    value: 'Mobile, Work, Home, Main, Work Fax, Home Fax, Pager werden zu vCard-Typen; eigene Labels (z. B. „WhatsApp“) bleiben als `X-ABLabel` erhalten.'
  - feature: 'Gruppen'
    value: '`Labels` / `Group Membership` werden zu `CATEGORIES`; die Systemlabels `* myContacts` und `* starred` entfallen.'
  - feature: 'Datumsangaben'
    value: 'Geburtstage mit und ohne Jahr (`--05-17`); der Jahrestag aus `Event 1` bleibt erhalten.'
  - feature: 'Nicht übernommen'
    value: 'Fotos (die CSV enthält nur einen Link) und „File As“; eigene Felder werden in die Notiz geschrieben.'
faq:
  - q: 'Google Kontakte kann selbst vCard exportieren. Warum die CSV umwandeln?'
    a: 'Wenn Sie das Google-Konto noch haben, ist Exportieren → vCard der einfachste Weg. Nutzen Sie diese Seite, wenn Sie nur die CSV haben – von jemand anderem geschickt, vor Jahren exportiert oder in Excel bearbeitet – oder wenn Sie vorher Nummern bereinigen und Duplikate zusammenführen möchten.'
  - q: 'Was bedeutet ` ::: ` in meiner CSV?'
    a: 'Google packt mehrere Werte derselben Art in eine Zelle und trennt sie mit ` ::: `. Zum Beispiel zwei Mobilnummern: `+49 151 23456789 ::: +49 170 1234567`. Daraus werden zwei getrennte Telefonzeilen auf der Karte.'
  - q: 'Bleiben die Gruppen (Labels) erhalten?'
    a: 'Ja, als `CATEGORIES`. Das iPhone zeigt Kategorien nicht an, Google Kontakte, Outlook und die meisten Android-Apps aber schon.'
  - q: 'Warum sind manche Nummern als ungültig markiert?'
    a: 'Google exportiert Nummern so, wie sie eingegeben wurden. Eine lokale Nummer ohne Ländervorwahl wird gegen das gewählte Land geprüft; passt sie nicht zum Nummernplan dieses Landes, wird sie unverändert geschrieben und markiert.'
related: [outlook-csv-to-vcf, home, import-iphone, import-outlook, google-sheets-to-vcf, what-is-vcf]
updated: 2026-11-04
---

**Google-CSV** ist das Tabellenformat, das Google Kontakte für Export und Import verwendet. Es unterscheidet sich von einer einfachen Liste. Jede Telefonnummer, E-Mail, Adresse und Website hat ein Spaltenpaar – `Phone 1 - Label` und `Phone 1 - Value` –, und eine einzelne Zelle kann mehrere Werte enthalten, getrennt durch ` ::: `. Allgemeine Konverter übersehen das oft: Sie schreiben `+49 151 23456789 ::: +49 170 1234567` in ein einziges Feld oder verlieren die Labels.

**Wie Labels zu vCard-Typen werden.** Das Label bestimmt den Typ jeder Zeile:

| Google-Label | vCard 3.0 |
| --- | --- |
| Mobile | `TEL;TYPE=CELL` |
| Work / Home | `TEL;TYPE=WORK,VOICE` / `TEL;TYPE=HOME,VOICE` |
| Work Fax / Home Fax | `TEL;TYPE=WORK,FAX` / `TEL;TYPE=HOME,FAX` |
| Main | `TEL;TYPE=MAIN` |
| eigenes, z. B. „WhatsApp“ | `item1.TEL` + `item1.X-ABLabel:WhatsApp` |

Ein Sternchen vor einem Label (`* Work`) markiert in alten Exporten den Hauptwert; es wird entfernt.

**Zwei Formate.** Google hat die Spaltennamen im CSV-Export geändert. Aktuelle Dateien beginnen mit `First Name, Middle Name, Last Name`, ältere mit `Name, Given Name, Additional Name, Family Name` und verwenden `Type` statt `Label`. Beide werden automatisch erkannt – im Dateibereich steht, welches Format gefunden wurde.

**Geburtstage ohne Jahr.** Google speichert sie als `--05-17`. In die vCard werden sie in derselben Form geschrieben, sodass das Jahr leer bleibt, statt zu 1604 oder 1900 zu werden.
