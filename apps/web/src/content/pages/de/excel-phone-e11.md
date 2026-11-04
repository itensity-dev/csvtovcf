---
url: excel-telefonnummern-e11
title: 'Excel zeigt Telefonnummern als 4,9E+11 an: Ursache und Lösung'
h1: 'Warum Excel Telefonnummern in 4,9E+11 verwandelt'
description: 'Excel zeigt Zahlen ab 12 Stellen in wissenschaftlicher Schreibweise und speichert CSV-Dateien so – Ziffern gehen verloren. So retten Sie die Nummern und verhindern es.'
lead: 'Excel zeigt jede Zahl mit 12 oder mehr Stellen in wissenschaftlicher Schreibweise an – aus `491701234567` wird `4,91701E+11`. Das ist nur ein Anzeigeformat, bis Sie eine CSV speichern: Dann schreibt Excel den gekürzten Text, und die fehlenden Ziffern sind aus der Datei verschwunden.'
nav: 'Telefonnummern als 4,9E+11'
summary: 'Wissenschaftliche Schreibweise, verlorene Ziffern, verlorene Nullen – Ursachen und Lösungen.'
faq:
  - q: 'Lassen sich die ursprünglichen Nummern aus einer CSV mit 4,9E+11 wiederherstellen?'
    a: 'Nein. Die CSV enthält nur die angezeigten Ziffern, z. B. `4,91701E+11`; der Rest steht nicht in der Datei. Gehen Sie zurück zur Excel-Arbeitsmappe (in der die vollständige Zahl noch gespeichert ist) oder zur ursprünglichen Quelle.'
  - q: 'Warum ist die führende Null verschwunden?'
    a: 'Excel behandelt `015123456789` in einer Zelle mit dem Zahlenformat „Standard“ als die Zahl 15123456789, und Zahlen haben keine führenden Nullen. Dasselbe passiert mit dem `+` von `+491701234567`. Mit Leerzeichen geschriebene Nummern bleiben Text. Formatieren Sie die Spalte als Text, bevor Sie Nummern eingeben oder einfügen.'
  - q: 'Repariert der Konverter diese Nummern?'
    a: 'Wo es möglich ist. Nummern ohne führende 0 oder ohne `+` werden mit dem gewählten Land ergänzt und gegen dessen Nummernplan geprüft. Wissenschaftliche Schreibweise, in der jede Ziffer erhalten ist (`4,91701234567E+11`), wird wiederhergestellt. `4,9E+11` mit verlorenen Ziffern wird im Bericht markiert, nie geraten.'
  - q: 'Gibt es eine Excel-Einstellung, die das verhindert?'
    a: 'In Microsoft 365 für Windows: Datei → Optionen → Daten → Automatische Datenkonvertierung. Entfernen Sie dort die Haken bei „Die ersten 15 Ziffern langer Zahlen beibehalten und bei Bedarf in wissenschaftlicher Notation anzeigen“ (Keep first 15 digits of long numbers and display in scientific notation if needed) und „Führende Nullen entfernen“ (Remove leading zeros). Das gilt für neue Daten, die Sie eingeben oder öffnen.'
related: [excel-to-vcf, xlsx-to-vcf, home, garbled-contacts, bulk-add-contacts, google-sheets-to-vcf]
updated: 2026-11-04
---

## Was passiert, Schritt für Schritt

1. **Eingeben oder Einfügen.** Eine Telefonnummer ohne Leerzeichen in einer Zelle mit dem voreingestellten Zahlenformat *Standard* wird als Zahl gespeichert. Die führende `0` und das `+` verschwinden sofort: `+491701234567` → 491701234567, `01701234567` → 1701234567.
2. **Anzeigen.** Im Format *Standard* zeigt Excel Zahlen mit 12 oder mehr Stellen in wissenschaftlicher Schreibweise an, wenn die Spalte schmal ist: `4,91701E+11`. In der Zelle ist die vollständige Zahl weiterhin gespeichert (Excel behält bis zu 15 signifikante Stellen).
3. **Als CSV speichern.** Eine CSV ist reiner Text, und Excel schreibt jede Zelle so, wie sie *angezeigt* wird. Die Datei enthält jetzt `4,91701E+11`, und die letzten Ziffern `234567` sind weg. Microsoft dokumentiert dieses Verhalten seit Excel 97.

Schritt 3 ist der, der Daten zerstört. Davor lässt sich die Nummer noch retten.

## So retten Sie die Nummern

- **Arbeitsmappe statt CSV verwenden.** Legen Sie die .xlsx oder .xls im [Excel-in-VCF-Konverter](/de/excel-in-vcf-umwandeln/) ab: Er liest die gespeicherten Zahlen, nicht die Anzeige.
- **Oder die Spalte verbreitern und formatieren.** Spalte markieren → Zellen formatieren → **Zahl** mit 0 Dezimalstellen (oder benutzerdefiniertes Format `0`). Die vollständigen Ziffern erscheinen; speichern Sie die CSV erneut.
- **Wenn Sie nur die CSV haben,** lassen sich die verlorenen Ziffern nicht wiederherstellen. Suchen Sie die ursprüngliche Liste.

## So verhindern Sie es

- **Telefonspalte vor der Eingabe als Text formatieren** (Start → Zahlenformat → Text). Dann bleibt `+491701234567` genau so, wie eingegeben, mit Pluszeichen.
- **CSV-Dateien als Text importieren**, statt sie per Doppelklick zu öffnen: Daten → Aus Text/CSV → *Daten transformieren* → Telefonspalte auf *Text* setzen.
- **Microsoft 365:** Datei → Optionen → Daten → *Automatische Datenkonvertierung*: das Entfernen führender Nullen und das Kürzen auf 15 Stellen in wissenschaftlicher Schreibweise ausschalten.
- **Nummern in der Quelle international halten** (`+…`). Als Text gespeichert überstehen sie am besten.

## Was der Konverter mit beschädigten Nummern macht

| In der Datei | Ergebnis | Angezeigt als |
| --- | --- | --- |
| `1701234567` + Land Deutschland | `+491701234567` | gültig |
| `491701234567` (ohne `+`) | `+491701234567` | „Fehlendes + ergänzt“ |
| `4,91701234567E+11` | `+491701234567` | „Aus Excel-Schreibweise wiederhergestellt“ |
| `4,9E+11` | unverändert geschrieben | „Von Excel zerstört“, rot |

Beschädigte Nummern werden nie mit erfundenen Ziffern „vervollständigt“. Sie werden auf der Karte markiert und im Tab *Warnungen* mit ihren Zeilennummern aufgeführt, damit Sie sie in der Quelle korrigieren können.
