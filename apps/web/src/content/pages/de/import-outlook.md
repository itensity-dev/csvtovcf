---
url: vcf-in-outlook-importieren
title: 'Kontakte in Outlook importieren: VCF oder CSV, alle auf einmal'
h1: 'Kontakte in Outlook importieren'
description: 'Viele Kontakte in Outlook importieren: CSV für neues Outlook, Outlook.com und klassisches Outlook (eine .vcf kommt dort Karte für Karte), dazu Outlook für Mac.'
lead: 'Für viele Kontakte ist in Outlook eine CSV der richtige Weg. Neues Outlook und Outlook.com importieren nur CSV, und das klassische Outlook lässt Sie jede Karte einer .vcf mit mehreren Kontakten einzeln bestätigen. Der Konverter schreibt beide Formate.'
nav: 'Import in Outlook'
summary: 'CSV für neues Outlook und Outlook.com, CSV oder vCard für klassisches Outlook und Mac.'
steps:
  - 'Wählen Sie im [Konverter](/de/) unter *Herunterladen als* **Outlook-CSV** und laden Sie die Datei herunter.'
  - '**Neues Outlook / Outlook.com:** Personen → **Kontakte verwalten** → **Kontakte importieren** → Durchsuchen → CSV wählen → **Importieren**.'
  - '**Klassisches Outlook für Windows:** Datei → **Öffnen und exportieren** → **Importieren/Exportieren** → *Aus anderen Programmen oder Dateien importieren* → *Kommagetrennte Werte* → Datei und Umgang mit Duplikaten wählen → Ordner **Kontakte** wählen → **Fertig stellen**.'
  - 'Prüfen Sie ein paar Kontakte. Fehlen Felder, wiederholen Sie den Import und nutzen Sie im letzten Schritt des Assistenten **Benutzerdefinierte Felder zuordnen** (Map Custom Fields).'
faq:
  - q: 'Warum nicht die .vcf in Outlook importieren?'
    a: 'Neues Outlook und Outlook.com importieren keine vCard-Dateien. Das klassische Outlook öffnet eine .vcf mit mehreren Kontakten Kontakt für Kontakt – Sie bestätigen jede Karte, und Nutzer berichten oft, dass nur der erste Kontakt ankommt. Microsoft selbst empfiehlt für viele Kontakte den Weg über CSV.'
  - q: 'Mein Outlook ist auf Deutsch. Funktionieren die englischen CSV-Spaltennamen?'
    a: 'Laut Microsoft sollte die Sprache der Spaltenüberschriften der Sprache von Outlook entsprechen. Bleiben Felder nach dem Import leer, nutzen Sie im Import-Assistenten **Benutzerdefinierte Felder zuordnen** und ziehen Sie jede Spalte auf ihr Outlook-Feld – Mobile Phone → Mobiltelefon, Business Phone → Telefon geschäftlich und so weiter.'
  - q: 'Namen erscheinen nach dem Import als `Ã¶` oder `???`.'
    a: 'Das klassische Outlook liest UTF-8-CSV-Dateien manchmal falsch. Testen Sie zur Kontrolle den .vcf-Weg mit ein paar Kontakten, oder öffnen Sie die CSV in Excel, speichern Sie sie als „CSV (Trennzeichen-getrennt)“ – das schreibt in der Windows-Codepage Ihres Systems – und importieren Sie diese Datei.'
  - q: 'Wie importiere ich in Outlook für Mac?'
    a: 'Ziehen Sie die .vcf auf „Personen“ oder wählen Sie Datei → Importieren. Laut Microsoft wird im Fenster nur der erste Kontakt angezeigt, gespeichert wird aber jeder Kontakt der vCard.'
related: [outlook-csv-to-vcf, import-google-contacts, import-iphone, home, garbled-contacts, what-is-vcf]
updated: 2026-11-04
---

## Welche Datei für welches Outlook

| Outlook | Beste Datei | Weg |
| --- | --- | --- |
| Neues Outlook für Windows, Outlook.com, Outlook im Web | Outlook-CSV | Personen → Kontakte verwalten → Kontakte importieren |
| Klassisches Outlook für Windows (2016–2024, Microsoft 365) | Outlook-CSV | Datei → Öffnen und exportieren → Importieren/Exportieren |
| Outlook für Mac | .vcf (vCard 3.0) | Auf „Personen“ ziehen oder Datei → Importieren |
| Ein einzelner Kontakt in jedes Outlook | .vcf | Datei öffnen → Speichern & schließen |

## Klassisches Outlook: der Import/Export-Assistent

1. **Datei** → **Öffnen und exportieren** → **Importieren/Exportieren**.
2. Wählen Sie **Aus anderen Programmen oder Dateien importieren** → **Weiter**.
3. Wählen Sie **Kommagetrennte Werte** → **Weiter**.
4. Wählen Sie über **Durchsuchen** die CSV. Legen Sie fest, wie Duplikate behandelt werden: *Duplikate durch importierte Elemente ersetzen*, *Erstellen von Duplikaten zulassen* oder *Keine Duplikate importieren* → **Weiter**.
5. Wählen Sie den Ordner **Kontakte** des richtigen Kontos → **Weiter**.
6. Setzen Sie den Haken bei der Aktion für die Datei. Ist Outlook nicht auf Englisch eingestellt, klicken Sie auf **Benutzerdefinierte Felder zuordnen**, prüfen Sie, ob jede Spalte im richtigen Feld landet, dann **OK** → **Fertig stellen**.

## Was die Outlook-CSV dieses Konverters enthält

Die Spalten tragen die englischen Namen von Outlook: `First Name`, `Last Name`, `Mobile Phone`, `Business Phone`, `E-mail Address`, `Company`, `Job Title`, `Business Street`, `Birthday` und so weiter. Ein deutsches Outlook verwendet dafür `Vorname`, `Nachname`, `Mobiltelefon`, `Telefon geschäftlich`, `E-Mail-Adresse`, `Firma`, `Position`, `Geburtstag` – prüfen Sie deshalb unter **Benutzerdefinierte Felder zuordnen**, ob die Zuordnung stimmt.

Telefonnummern kommen je nach Typ in die passende Spalte. Weitere Nummern gehen in *Other Phone*, *Car Phone* und *Callback*. Was nicht passt (eine vierte E-Mail, eine vierte Adresse), wird an *Notes* angehängt statt verworfen. Geburtstage werden als `M/D/YYYY` geschrieben, so wie ein englisches Outlook selbst exportiert; prüfen Sie in einem deutschen Outlook nach dem Import einige Geburtstage.

## Wenn Sie nur wenige Kontakte brauchen

Öffnen Sie jede .vcf einzeln (im Konverter „ZIP, eine .vcf pro Kontakt“ wählen). Outlook zeigt das Kontaktfenster; klicken Sie auf **Speichern & schließen**. Für zehn Kontakte ist das in Ordnung, für tausend mühsam.
