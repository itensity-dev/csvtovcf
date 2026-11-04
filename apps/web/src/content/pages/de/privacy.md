---
url: datenschutz
title: 'Datenschutz – csvtovcf'
h1: 'Datenschutz'
description: 'Ihre Kontaktdateien werden auf Ihrem Gerät verarbeitet und nie hochgeladen. Was csvtovcf speichert, welche Logs es gibt und welche Dienste Dritter wofür genutzt werden.'
lead: 'Kurz gesagt: Ihre Dateien verlassen Ihr Gerät nicht. Die Website hat keine Konten, setzt keine Tracking-Cookies und sieht weder die Namen noch die Nummern oder Spaltenüberschriften, die Sie umwandeln.'
nav: 'Datenschutz'
summary: 'Was wo verarbeitet wird, was protokolliert wird, welche Dienste genutzt werden.'
updated: 2026-11-04
---

## Ihre Dateien

- Dateien, die Sie ablegen, auswählen oder einfügen, werden von Ihrem Browser gelesen und in einem **Web Worker auf Ihrem Gerät** verarbeitet. Sie werden nicht hochgeladen, nicht auf einem Server gespeichert und an niemanden weitergegeben.
- Sie können das prüfen: Öffnen Sie die Entwicklertools Ihres Browsers, Tab „Netzwerk“, und wandeln Sie eine Datei um. Während der Konverter arbeitet, lädt er nur seinen eigenen Code von csvtovcf.com (das Modul zum Lesen von Tabellen wird beim ersten Öffnen einer Excel-Datei geladen). Keine Anfrage enthält Ihre Daten.
- Die Content-Security-Policy der Website beschränkt Netzwerkverbindungen auf csvtovcf.com selbst. Ist die Statistik eingeschaltet, erlaubt sie zusätzlich den unten beschriebenen anonymen Zähler. Statistik-Skripte erhalten nie Daten aus dem Konverter.
- Wenn Sie den Tab schließen oder neu laden, sind die Daten weg. Nichts davon wird in den Speicher Ihres Browsers geschrieben.

## Was der Server sieht

Der Server liefert die Seiten aus und führt ein übliches Zugriffsprotokoll: IP-Adresse, Uhrzeit, aufgerufene Seite, Browsertyp und verweisende Seite. Das Protokoll dient dem Betrieb des Dienstes und der Abwehr von Missbrauch. Es wird höchstens 14 Tage aufbewahrt und nicht mit anderen Daten zusammengeführt. Es enthält nie Ihre Dateien, weil diese nie gesendet werden.

## Speicher in Ihrem Browser

- `localStorage`: Ihre Wahl des Farbschemas (hell, dunkel oder automatisch), falls Sie sie geändert haben.
- `sessionStorage`: ob Sie den Hinweis „diese Seite gibt es auch in Ihrer Sprache“ geschlossen haben.
- Ein Service Worker speichert die eigenen Dateien der Website zwischen, damit der Konverter offline funktioniert. Ihre Dateien oder Ergebnisse speichert er nie.

csvtovcf selbst setzt keine Cookies.

## Statistik

Standardmäßig läuft die Website **ohne Statistik**. Ist die Statistik eingeschaltet, verwenden wir Plausible Analytics: keine Cookies, keine personenbezogenen Daten, IP-Adressen werden nicht gespeichert. Gezählt werden nur Seitenaufrufe und ein anonymes Ereignis pro Umwandlung. Das Ereignis erfasst die vCard-Version, das Ausgabeformat, den erkannten Quelltyp (zum Beispiel „Google-CSV“) und die Anzahl der Kontakte als Bereich (etwa „11–100“). Namen, Nummern, Adressen, Dateinamen und Spaltenüberschriften werden nie gesendet.

## Werbung

Werbung ist derzeit **ausgeschaltet**. Wird sie eingeschaltet, erscheinen Anzeigen nur außerhalb des Konverters. Im Europäischen Wirtschaftsraum, im Vereinigten Königreich und in der Schweiz fragt der zertifizierte Einwilligungsdialog von Google nach Ihrer Entscheidung, bevor Werbe-Cookies verwendet werden. Werbeskripte können Ihre Kontaktdaten nicht lesen, weil diese im Web Worker liegen und nicht auf der Seite. Diese Seite nennt den Werbeanbieter, bevor Anzeigen erscheinen.

## Links zu anderen Websites

Die Anleitungen verlinken auf Hilfeseiten von Apple, Google und Microsoft, und die Fußzeile verlinkt auf andere Werkzeuge desselben Entwicklers. Diese Websites haben eigene Datenschutzerklärungen.

## Ihre Rechte und Kontakt

Da wir über den Konverter keine personenbezogenen Daten erheben, gibt es nichts einzusehen, zu exportieren oder zu löschen. Bei Fragen zu den Server-Logs oder zu dieser Seite schreiben Sie an **hello@csvtovcf.com**. Sie haben außerdem das Recht, sich bei Ihrer Datenschutz-Aufsichtsbehörde zu beschweren.
