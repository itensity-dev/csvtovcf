---
url: excel-in-vcf-umwandeln
title: 'Excel in VCF umwandeln: Excel-Kontakte in vCard konvertieren'
h1: 'Excel in VCF umwandeln'
description: 'Excel-Kontaktliste (.xlsx oder .xls) in eine VCF-Datei für iPhone, Android und Google umwandeln. Liest die Arbeitsmappe direkt, lange Nummern bleiben ganz. Kein Upload.'
lead: 'Öffnet Ihre Excel-Arbeitsmappe direkt – ohne den Umweg „Speichern unter → CSV“ – und macht aus jeder Zeile eine Kontaktkarte in einer einzigen .vcf-Datei. Als Zahl gespeicherte Telefonnummern bekommen ihre Ländervorwahl zurück; die Datei verlässt dieses Gerät nicht.'
nav: 'Excel in VCF'
summary: 'XLSX- oder XLS-Arbeitsmappe direkt als vCard, mit Auswahl des Tabellenblatts.'
steps:
  - 'Legen Sie die Excel-Datei (.xlsx, .xls oder .ods) oben ab. Hat die Arbeitsmappe mehrere Tabellenblätter, wählen Sie das mit den Kontakten; ausgeblendete Blätter sind markiert.'
  - 'Prüfen Sie, ob die Kopfzeile gefunden wurde und die Spalten den richtigen Feldern zugeordnet sind – „Name“, „Mobil“, „E-Mail“, „Firma“ werden in vielen Sprachen erkannt.'
  - 'Wählen Sie das Land, zu dem Ihre Nummern gehören. Bei als Zahl gespeicherten Nummern entfernt Excel die führende 0 und das „+“; mit dem Land werden sie wiederhergestellt.'
  - 'Laden Sie die .vcf herunter und importieren Sie sie auf dem Telefon: [iPhone](/de/vcf-auf-iphone-importieren/), [Android](/de/vcf-auf-android-importieren/).'
features:
  - feature: 'Excel-Dateien'
    value: '.xlsx und .xlsm (Excel 2007 und neuer), .xls (Excel 97–2003 und älter, einschließlich der Codepages von Excel 95), .ods. Jedes Tabellenblatt; ausgeblendete Blätter werden aufgeführt.'
  - feature: 'Zellwerte'
    value: 'Zahlen werden vollständig gelesen (`491701234567`, nie `4,91701E+11`). Datumszellen werden zu Geburtstagen. Formeln werden mit ihrem zuletzt berechneten Wert gelesen.'
  - feature: 'Kopfzeile'
    value: 'Wird automatisch gefunden, auch wenn Titelzeilen darüber stehen. Entfernen Sie den Haken bei „Erste Zeile ist Kopfzeile“, wenn Ihr Blatt direkt mit Daten beginnt.'
  - feature: 'Nummern bereinigen'
    value: 'Nummern ohne „+“ oder führende 0 werden mit dem gewählten Land ergänzt und als internationale Nummern im Stil `+49 170 1234567` geschrieben. Ungültige Nummern werden markiert, nicht entfernt.'
  - feature: 'Ausgabe'
    value: 'Eine .vcf (vCard 3.0, 4.0 oder 2.1), ein ZIP mit einer Karte pro Kontakt oder eine CSV für Google oder Outlook.'
  - feature: 'Nicht unterstützt'
    value: 'Passwortgeschützte Arbeitsmappen (Passwort vorher in Excel entfernen), Apple-Numbers-Dateien, in Zellen eingebettete Kontaktfotos.'
faq:
  - q: 'Muss ich die Excel-Datei zuerst als CSV speichern?'
    a: 'Nein – und besser nicht. Beim Speichern als CSV schreibt Excel Zahlen so, wie sie angezeigt werden: Eine als `4,91701E+11` angezeigte Telefonnummer wird ohne ihre letzten Ziffern gespeichert. Wenn Sie die .xlsx direkt lesen, bleibt jede Ziffer erhalten.'
  - q: 'Meine Nummern haben keine führende Null und kein Pluszeichen. Funktionieren sie trotzdem?'
    a: 'Ja. Wählen Sie das Land unter „Telefonformat“; eine Nummer wie `15123456789` wird mit Deutschland zu `+4915123456789`. Nummern, die mit der Ländervorwahl ohne „+“ beginnen (`4915123456789`), werden ebenfalls erkannt.'
  - q: 'Die ersten Zeilen meines Blatts sind ein Titel und eine Leerzeile. Ist das ein Problem?'
    a: 'Nein. Zeilen oberhalb der eigentlichen Kopfzeile werden übersprungen, und die Zeilennummern im Bericht entsprechen denen, die Excel links anzeigt.'
  - q: 'Kann ich mehrere Tabellenblätter oder Arbeitsmappen auf einmal umwandeln?'
    a: 'Legen Sie mehrere Dateien zusammen ab, dann werden sie zu einem Ergebnis kombiniert. Innerhalb einer Arbeitsmappe wandeln Sie ein Blatt um, wechseln dann das Blatt und laden erneut herunter.'
  - q: 'Funktioniert das mit Excel für Mac oder mit LibreOffice?'
    a: 'Ja. Der Konverter liest die Datei, nicht das Programm: .xlsx aus Excel für Mac, Excel im Web oder als Download aus Google Sheets sowie .ods aus LibreOffice funktionieren.'
related: [xlsx-to-vcf, xls-to-vcf, google-sheets-to-vcf, home, excel-phone-e11, import-android]
updated: 2026-11-04
---

Excel-Dateien sind kein Kontaktformat, deshalb können Telefone sie nicht importieren. Eine **VCF**-Datei (vCard) lässt sich dagegen überall importieren, mit einer Karte pro Person. Der Konverter liest die Zellen des Tabellenblatts, ordnet die Spalten vCard-Feldern zu und schreibt pro Zeile eine Karte.

**Warum die Arbeitsmappe besser ist als eine CSV.** In einer .xlsx ist eine Telefonnummer als vollständige Zahl gespeichert (bis zu 15 Stellen), auch wenn die Zelle `4,9E+11` anzeigt. Erst wenn Excel *eine CSV speichert*, schreibt es den angezeigten Text, und die verborgenen Ziffern gehen verloren. Deshalb öffnet diese Seite .xlsx und .xls direkt. Mehr dazu: [warum Excel Telefonnummern als 4,9E+11 anzeigt](/de/excel-telefonnummern-e11/).

**Was Excel mit Telefonnummern macht.** Eine Nummer, die ohne Leerzeichen in eine Zelle mit dem Zahlenformat „Standard“ eingegeben wird, verliert ihre führende Null (`015123456789` → `15123456789`) und das Pluszeichen (`+4915123456789` → `4915123456789`). Der Konverter rät nicht blind. Er zerlegt jede Nummer nach den Regeln des gewählten Landes und prüft, ob das Ergebnis eine echte Nummer dieses Landes ist. Beginnt eine Nummer mit der Ländervorwahl dieses Landes, wird sie als international behandelt. Der Bericht zählt, wie viele Nummern so ergänzt wurden, und die Karten zeigen das Ergebnis vor dem Download.

**Datumsangaben.** Als Datum formatierte Geburtstagszellen werden als Datum gelesen, egal welches Anzeigeformat das Blatt verwendet. Textdaten wie `17.05.1990` oder `05/17/1990` werden ebenfalls gelesen; ob der Tag oder der Monat vorne steht, entscheidet der Konverter anhand der ganzen Spalte.

**Spalten, die keine Kontaktfelder sind** – „Notizen“, „Kundennummer“, „Letzte Bestellung“ – können der Notiz zugeordnet oder übersprungen werden. Was Sie auf *überspringen* setzen, wird nicht exportiert.
