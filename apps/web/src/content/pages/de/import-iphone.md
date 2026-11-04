---
url: vcf-auf-iphone-importieren
title: 'VCF-Datei auf dem iPhone importieren: alle Kontakte auf einmal'
h1: 'VCF-Datei auf dem iPhone importieren'
description: 'Alle Kontakte einer .vcf-Datei auf einmal aufs iPhone: per AirDrop, Mail oder Dateien-App am iPhone oder über iCloud.com am Computer. Schritte für iOS 26 und Lösungen.'
lead: 'Zwei Wege importieren eine ganze .vcf mit vielen Kontakten: die Datei auf dem iPhone öffnen und auf „Alle Kontakte hinzufügen“ tippen oder sie auf iCloud.com importieren und synchronisieren lassen.'
nav: 'Import aufs iPhone'
summary: 'Alle Kontakte aus einer .vcf aufs iPhone: direkt am Telefon oder über iCloud.com.'
steps:
  - 'Erstellen Sie die .vcf mit dem [Konverter](/de/) – vCard 3.0, Telefonformat „E.164“.'
  - 'Senden Sie sie ans iPhone: per AirDrop vom Mac, per E-Mail an sich selbst oder in iCloud Drive speichern und in der Dateien-App öffnen.'
  - 'Tippen Sie auf die Datei. iOS zeigt die enthaltenen Kontakte; tippen Sie auf **Alle Kontakte hinzufügen** (iOS nennt die Anzahl, z. B. „Alle 248 Kontakte hinzufügen“). Zeigt die Dateien-App nur eine Vorschau, tippen Sie auf Teilen → **Kontakte**.'
  - 'Prüfen Sie, ob die Kontakte im richtigen Account landen: Einstellungen → Apps → Kontakte → **Standardaccount** legt fest, ob sie in iCloud, Gmail oder „Auf meinem iPhone“ gespeichert werden.'
faq:
  - q: 'Das iPhone zeigt nur den ersten Kontakt. Wo sind die anderen?'
    a: 'Kam die Datei über eine Vorschau (Quick Look), wird nur eine Karte angezeigt. Nutzen Sie Teilen → Kontakte oder öffnen Sie die Datei aus Mail, Nachrichten oder der Dateien-App, die die vollständige Liste mit „Alle Kontakte hinzufügen“ zeigen. Oder importieren Sie sie auf iCloud.com: Jede Karte wird zu einem eigenen Kontakt.'
  - q: 'Brauche ich iCloud, um Kontakte zu importieren?'
    a: 'Nein. Das Öffnen der .vcf auf dem Telefon funktioniert ohne iCloud; die Kontakte werden im Standardaccount gespeichert. iCloud.com ist praktisch, wenn die Datei auf einem Computer liegt.'
  - q: 'Einige Kontakte wurden übersprungen. Warum?'
    a: 'Beim Import über Nachrichten fügt iOS nur Karten hinzu, die noch nicht in Ihren Kontakten sind. Prüfen Sie die Duplikate und die Liste der übersprungenen Zeilen im Bericht des Konverters.'
  - q: 'Namen zeigen nach dem Import seltsame Zeichen.'
    a: 'Die vCard war vermutlich Version 2.1 oder nicht in UTF-8. Wandeln Sie erneut mit vCard 3.0 um – der Konverter schreibt immer UTF-8. [Warum Namen verstümmelt werden](/de/zeichensalat-in-kontakten-beheben/).'
  - q: 'Geburtstage ohne Jahr zeigen 1604.'
    a: 'iOS verwendet intern 1604 als „kein Jahr“. Hier umgewandelte Kontakte behalten Geburtstage ohne Jahr als `--05-17`; zeigt Ihre iOS-Version trotzdem ein Jahr, bearbeiten Sie die Karte einmal und entfernen Sie es.'
related: [import-android, import-google-contacts, home, bulk-add-contacts, excel-to-vcf, what-is-vcf]
updated: 2026-11-04
---

## Methode 1: direkt auf dem iPhone

Das ist der schnellste Weg, wenn die Datei schon auf dem Telefon oder in Ihrem Posteingang liegt.

1. **Datei aufs iPhone bringen.** Per AirDrop vom Mac, per Mail an sich selbst, per Nachrichten oder über iCloud Drive.
2. **Öffnen.** In Mail oder Nachrichten tippen Sie auf den Anhang. In der Dateien-App tippen Sie auf die Datei; sehen Sie nur die Vorschau einer einzelnen Karte, tippen Sie auf die Teilen-Taste und wählen **Kontakte**.
3. **Alle hinzufügen.** Die Liste zeigt jede Karte der Datei. Tippen Sie auf **Alle Kontakte hinzufügen**; die genaue Beschriftung hängt von der iOS-Version ab und kann die Anzahl der Kontakte enthalten.
4. **Fertig.** Die Kontakte erscheinen in der Kontakte-App und in der Telefon-App. WhatsApp, Telegram und andere Apps sehen sie nach ihrer nächsten Kontaktsynchronisierung.

## Methode 2: iCloud.com am Computer

Diesen Weg dokumentiert Apple. Er funktioniert auch bei Dateien mit vielen Kontakten und ist praktisch, wenn die .vcf auf Ihrem Computer liegt.

1. Melden Sie sich auf [icloud.com](https://www.icloud.com/) an und öffnen Sie **Kontakte**.
2. Klicken Sie auf die Taste **+** und wählen Sie **Kontakt importieren** (Import Contact). Manche Versionen der Seite zeigen stattdessen ein Zahnradsymbol mit **vCard importieren**.
3. Wählen Sie die .vcf-Datei. Jede Person in der Datei wird zu einem eigenen Kontakt unter *Alle Kontakte*.
4. Auf dem iPhone müssen iCloud-Kontakte eingeschaltet sein: Einstellungen → Ihr Name → iCloud → Kontakte. Die neuen Kontakte kommen innerhalb einer Minute an.

## Vor dem Import

- **vCard 3.0 verwenden.** In diesem Format exportieren iPhones selbst. vCard 2.1 ist nur für alte Handys gedacht.
- **Nummern international schreiben.** `+4915123456789` funktioniert auch auf Reisen und in Messengern; Nummern ohne Ländervorwahl werden womöglich keinem WhatsApp-Konto zugeordnet.
- **Duplikate vorher entfernen.** Der Tab *Duplikate* im Konverter zeigt Personen, die doppelt in Ihrer Tabelle stehen; aktivieren Sie „Kontakte mit gleicher Nummer oder E-Mail zusammenführen“, um sie zu kombinieren.
- **Sicherung anlegen.** Ein Import ist leicht zu wiederholen, aber mühsam rückgängig zu machen: Exportieren Sie Ihre aktuellen Kontakte auf iCloud.com, bevor Sie Hunderte neue importieren.

## Import rückgängig machen

iOS kennt kein „Import rückgängig“. Auf iCloud.com können Sie mehrere Kontakte mit Umschalt- oder Cmd-Klick auswählen und gemeinsam löschen – testen Sie die Datei deshalb mit ein paar Zeilen, bevor Sie Tausende importieren.
