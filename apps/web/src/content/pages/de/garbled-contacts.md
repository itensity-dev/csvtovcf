---
url: zeichensalat-in-kontakten-beheben
title: 'Zeichensalat in Kontakten (MÃ¼ller, ???): Umlaute reparieren'
h1: 'Warum importierte Kontakte Zeichensalat zeigen – und wie Sie ihn beheben'
description: 'Namen wie „MÃ¼ller“, „Ð˜Ð²Ð°Ð½“ oder „????“ nach dem Import kommen von einer falschen Zeichenkodierung. So erkennen Sie die Ursache und wandeln die Datei richtig um.'
lead: 'Verstümmelte Namen – `MÃ¼ller`, `Ð˜Ð²Ð°Ð½`, `Èâàí`, `????` – bedeuten, dass die Datei in einer anderen Zeichenkodierung gelesen wurde, als sie geschrieben wurde. Die Lösung: die Quelle mit der richtigen Kodierung lesen und die vCard in UTF-8 schreiben.'
nav: 'Zeichensalat in Namen'
summary: 'Die Kodierungsverwechslung hinter Ã¼, Ð¸ oder ??? erkennen und beheben.'
faq:
  - q: 'Kann ich Namen reparieren, die schon verstümmelt im Telefon stehen?'
    a: 'Meist ist es einfacher, den importierten Stapel zu löschen und eine korrekte Datei zu importieren. Eine Reparatur an Ort und Stelle funktioniert nur, wenn die Verstümmelung umkehrbar ist (UTF-8 als Latin-1 gelesen); Fragezeichen bedeuten, dass die Buchstaben verloren sind.'
  - q: 'Warum speichert Excel meine CSV mit Fragezeichen?'
    a: '„CSV (Trennzeichen-getrennt)“ speichert in der Windows-Codepage Ihres Systems, in Deutschland Windows-1252, und mit Semikolon als Trennzeichen. Buchstaben außerhalb dieser Codepage – Kyrillisch oder das türkische ğ auf einem deutschen PC – werden zu `?`. Speichern Sie stattdessen als „CSV UTF-8 (durch Trennzeichen getrennt)“ oder wandeln Sie die .xlsx direkt um.'
  - q: 'Welche Zeichenkodierung sollte eine vCard haben?'
    a: 'UTF-8. vCard 3.0 und 4.0 setzen sie voraus; bei vCard 2.1 muss jeder Wert mit Nicht-ASCII-Zeichen `CHARSET=UTF-8` und Quoted-Printable-Kodierung tragen. Der Konverter auf dieser Website macht das immer.'
related: [home, outlook-csv-to-vcf, what-is-vcf, import-android, import-iphone, excel-to-vcf]
updated: 2026-11-04
---

## Das Muster erkennen

Jede Art von Zeichensalat sieht typisch aus, und das Aussehen verrät, was schiefgegangen ist:

| Was Sie sehen | Richtig wäre | Ursache |
| --- | --- | --- |
| `MÃ¼ller`, `JÃ¼rgen`, `WeiÃŸ` | Müller, Jürgen, Weiß | UTF-8-Datei als Windows-1252 / Latin-1 gelesen |
| `M�ller` | Müller | Windows-1252-Datei (z. B. CSV aus einem deutschen Excel) als UTF-8 gelesen |
| `Ð˜Ð²Ð°Ð½ ÐŸÐµÑ‚Ñ€Ð¾Ð²` | Иван Петров | kyrillisches UTF-8 als Windows-1252 gelesen |
| `Èâàí Ïåòðîâ` | Иван Петров | Windows-1251-Datei als Windows-1252 gelesen |
| `Ayþe Yýlmaz` | Ayşe Yılmaz | Windows-1254 (Türkisch) als Windows-1252 gelesen |
| `ÇáÇÓã` | الاسم | Windows-1256 (Arabisch) als Latin-1 gelesen |
| `Иван` → `????` | Иван | Buchstaben beim Speichern in einer Codepage ohne diese Zeichen verloren |
| einzelnes `Ã` oder `�` mitten im Namen | — | eine lange Zeile wurde innerhalb eines Mehrbyte-Buchstabens getrennt |

Die ersten sechs Fälle lassen sich aus der Originaldatei reparieren, der letzte ebenfalls, indem Sie mit einem korrekt arbeitenden Werkzeug erneut umwandeln. Fragezeichen nicht: Die Buchstaben wurden beim Speichern ersetzt.

## So beheben Sie es

1. **Zurück zur Originaldatei** – der CSV oder Excel-Arbeitsmappe, nicht der verstümmelten vCard.
2. **Öffnen Sie sie im [Konverter](/de/).** Er erkennt die Zeichenkodierung (UTF-8, UTF-16, Windows-1250…1258, KOI8-R, Shift_JIS und weitere) und zeigt die ersten Zeilen. Sehen Namen noch falsch aus, wählen Sie in der Liste *Zeichenkodierung* eine andere. Die Vorschau ändert sich sofort, sodass Sie sehen, welche stimmt.
3. **Laden Sie vCard 3.0 herunter.** Die Datei wird in UTF-8 geschrieben, das jedes aktuelle Telefon liest.
4. **Löschen Sie den verstümmelten Import und importieren Sie die neue Datei.** In Google Kontakte lässt sich über das Label „Importiert am …“ der ganze Stapel löschen.

## Warum das passiert

Eine Textdatei sagt nicht, in welcher Zeichenkodierung sie geschrieben ist. Das klassische „CSV“-Format von Excel, der CSV-Export von Outlook und viele CRMs schreiben in der **Windows-Codepage** des Rechners: Windows-1252 in Deutschland, Westeuropa und Amerika, 1251 für Kyrillisch, 1254 für Türkisch, 1256 für Arabisch. Ein Telefon oder Webdienst liest die Datei dann als UTF-8, und Umlaute werden zu Symbolen wie `�`. Umgekehrt passiert es ebenso: Eine UTF-8-Datei, geöffnet von alter Software, die Windows-1252 erwartet, zeigt `Ã¼` statt `ü`.

Alte Handys bringen ein drittes Problem mit. Sie erwarten vCard 2.1 und verstehen Umlaute und andere Nicht-ASCII-Zeichen nur, wenn sie als `CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE` gekennzeichnet sind. Ohne diese Kennzeichnung sieht selbst eine einwandfreie UTF-8-Datei auf ihnen kaputt aus. Wählen Sie für solche Telefone im Konverter **vCard 2.1**.

## Beim nächsten Mal vermeiden

- In Excel **Datei → Speichern unter → CSV UTF-8 (durch Trennzeichen getrennt)** verwenden oder CSV ganz auslassen und die .xlsx umwandeln.
- In Outlook exportieren und direkt umwandeln; die CSV nicht in Excel erneut speichern.
- Aus Google Sheets heruntergeladene CSV-Dateien sind immer UTF-8.
