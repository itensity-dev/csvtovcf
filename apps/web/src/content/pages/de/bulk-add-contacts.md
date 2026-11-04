---
url: mehrere-kontakte-aufs-handy-importieren
title: 'Mehrere Kontakte auf einmal aufs Handy importieren (aus Excel)'
h1: 'Viele Kontakte auf einmal aufs Handy bringen'
description: 'Hunderte Kontakte aus einer Excel- oder CSV-Liste in einem Schritt aufs Handy (iPhone, Android): in eine VCF-Datei umwandeln, importieren. Auch für WhatsApp und Telegram.'
lead: 'Kontakte einzeln abzutippen ist nicht nötig. Machen Sie aus der Liste eine einzige .vcf-Datei und importieren Sie sie – das Telefon fügt alle Kontakte in einem Schritt hinzu, und Messenger übernehmen sie aus dem Adressbuch.'
nav: 'Viele Kontakte aufs Handy'
summary: 'Von der Tabelle zu Hunderten Telefonkontakten mit einem einzigen Import.'
steps:
  - 'Tragen Sie die Kontakte in eine Tabelle ein: eine Zeile pro Person, eine Kopfzeile mit „Name“ und „Telefon“ (weitere Spalten sind willkommen).'
  - 'Legen Sie die Datei im [Konverter](/de/) ab und wählen Sie das Land der Nummern; sie werden mit internationaler Vorwahl (+…) geschrieben.'
  - 'Laden Sie eine .vcf mit allen Kontakten herunter.'
  - 'Importieren Sie sie: unter [Android](/de/vcf-auf-android-importieren/) über Kontakte → Organisieren → Aus Datei importieren; auf dem [iPhone](/de/vcf-auf-iphone-importieren/), indem Sie die Datei öffnen und auf „Alle Kontakte hinzufügen“ tippen.'
faq:
  - q: 'Wie viele Kontakte kann ein Telefon auf einmal importieren?'
    a: 'Tausende. Eine einzelne .vcf mit mehreren Tausend Karten lässt sich auf iPhone und Android importieren. Google Kontakte im Web verlangt Dateien mit höchstens 3.000 Kontakten und fasst 25.000 pro Konto.'
  - q: 'Erscheinen die Kontakte in WhatsApp oder Telegram?'
    a: 'Ja, sobald die Nummern im internationalen Format vorliegen und die App ihre Kontakte aktualisiert hat. Nummern ohne Ländervorwahl werden oft keinem Konto zugeordnet.'
  - q: 'Brauche ich eine App oder ein kostenpflichtiges Programm?'
    a: 'Nein. Die Kontakte-App des Telefons importiert .vcf-Dateien, und der Konverter auf dieser Website ist kostenlos und läuft im Browser.'
  - q: 'Kann ich die importierten Kontakte später wieder entfernen?'
    a: 'In Google Kontakte löschen Sie das Label „Importiert am …“ samt Kontakten. Auf dem iPhone löschen Sie sie auf iCloud.com, wo Sie viele auf einmal auswählen können. Testen Sie vorher mit einer kurzen Datei.'
related: [import-android, import-iphone, home, excel-to-vcf, google-sheets-to-vcf, excel-phone-e11]
updated: 2026-11-04
---

## Der schnellste Weg

Telefone können keine Tabellen importieren, wohl aber **vCard-Dateien (.vcf)**, und eine Datei kann beliebig viele Kontakte enthalten. Der Ablauf ist also: Tabelle → eine .vcf → Import.

**Tabelle vorbereiten.** Eine Zeile pro Person. Mindestens eine Namens- und eine Telefonspalte; Spalten für E-Mail, Firma und Geburtstag werden ebenfalls erkannt. Der Name kann in einer Spalte stehen („Name“) oder in zweien („Vorname“, „Nachname“).

**Umwandeln.** Der [Konverter](/de/) erkennt die Spalten, schreibt Nummern im internationalen Format und warnt vor Nummern, die ungültig aussehen – bevor sie in Ihrem Telefon landen. Doppelt aufgeführte Personen lassen sich zusammenführen.

**Importieren.** Eine Datei, einmal tippen auf dem Telefon. Details für [Android](/de/vcf-auf-android-importieren/) und [iPhone](/de/vcf-auf-iphone-importieren/).

## Für WhatsApp, Telegram und Signal

Messenger lesen das Adressbuch und suchen jede Nummer in internationaler Form. Zwei Dinge entscheiden, ob ein Kontakt erscheint:

- **Die Ländervorwahl.** `+49 151 23456789` wird zugeordnet; `0151 23456789` nur, wenn das Telefon selbst eine deutsche Nummer hat. Der Konverter ergänzt die Vorwahl des gewählten Landes.
- **Eine Aktualisierung.** Öffnen Sie nach dem Import in der App den Bildschirm für einen neuen Chat. In WhatsApp unter Android: ⋮ → Aktualisieren.

Kontakte massenhaft hinzuzufügen, nur um Fremde anzuschreiben, ist Spam und führt zu gesperrten Konten. Nutzen Sie es für Menschen, die mit Ihrer Nachricht rechnen: Ihr Team, Vereinsmitglieder, Kunden, die Ihnen ihre Nummer gegeben haben.

## Große Listen

- **Für Google Kontakte aufteilen.** Der Web-Import nimmt etwa 3.000 Kontakte pro Datei. Filtern Sie Ihre Tabelle in Teile und wandeln Sie jeden Teil um.
- **Konto wählen.** Im Google- oder iCloud-Konto gespeicherte Kontakte werden gesichert und erscheinen auf allen Ihren Geräten. Der Speicher „Nur Telefon“ bleibt auf diesem Gerät.
- **Vor dem Import prüfen.** Der Bericht des Konverters listet übersprungene Zeilen, ungültige Nummern und Duplikate mit Zeilennummern, die Sie in Excel wiederfinden.
