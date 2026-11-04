---
url: xlsx-in-vcf-umwandeln
title: 'XLSX in VCF umwandeln: Kontakte aus Excel-Arbeitsmappe als vCard'
h1: 'XLSX in VCF umwandeln'
description: '.xlsx-Kontaktliste in eine VCF-Datei (vCard) umwandeln: Tabellenblatt wählen, Nummern und Datumsangaben vollständig behalten, eine .vcf für iPhone, Android oder Google.'
lead: 'Wählen Sie ein Tabellenblatt Ihrer .xlsx-Arbeitsmappe und erhalten Sie eine .vcf mit einer Karte pro Zeile. Telefonnummern werden vollständig gelesen, Datumszellen werden zu Geburtstagen.'
nav: 'XLSX in VCF'
summary: 'Aktuelle Excel-Arbeitsmappen (.xlsx) als vCard, mit Blattauswahl.'
steps:
  - 'Legen Sie die .xlsx oben ab. Geöffnet wird das erste sichtbare Blatt mit Daten; ein anderes Blatt wählen Sie in der Liste „Tabellenblatt“.'
  - 'Sehen Sie sich die Vorschau der ersten Zeilen an: Spaltenbuchstaben und Zeilennummern sind dieselben wie in Excel.'
  - 'Prüfen Sie die Zuordnung der Spalten, wählen Sie das Land für die Nummern und die vCard-Version (3.0 passt für alle aktuellen Telefone).'
  - 'Laden Sie die .vcf herunter – oder ein ZIP mit einer Datei pro Kontakt, wenn Sie Karten einzeln anhängen müssen.'
features:
  - feature: 'Arbeitsmappen'
    value: '.xlsx, .xlsm und .xlsb; jedes Tabellenblatt ist wählbar, ausgeblendete sind markiert.'
  - feature: 'Formeln'
    value: 'Verwendet wird der zuletzt berechnete Wert, z. B. ein mit `=B2&" "&C2` zusammengesetzter Name.'
  - feature: 'Verbundene und leere Zellen'
    value: 'Eine verbundene Zelle wird einmal gelesen, in ihrer linken oberen Zelle. Leere Spalten werden in der Zuordnung ausgeblendet.'
  - feature: 'Lange Zahlen'
    value: 'Bis zu 15 Stellen werden exakt gelesen – die Genauigkeitsgrenze von Excel selbst. Längere Ziffernfolgen müssen in Excel als Text gespeichert sein.'
  - feature: 'Ausgabe'
    value: 'vCard 3.0, 4.0 oder 2.1; Einzeldatei oder ZIP; Google- oder Outlook-CSV.'
faq:
  - q: 'Warum nicht das Blatt als CSV exportieren und das umwandeln?'
    a: 'Weil Excel beim CSV-Export schreibt, was die Zelle anzeigt. Eine als `4,91701E+11` angezeigte Telefonnummer wird mit abgeschnittenen Ziffern exportiert. Die .xlsx enthält noch die ganze Zahl – wandeln Sie also die Arbeitsmappe selbst um.'
  - q: 'Meine Kontakte sind auf mehrere Blätter verteilt. Kann ich sie zusammenführen?'
    a: 'Wandeln Sie jedes Blatt um und importieren Sie die Dateien nacheinander, oder kopieren Sie die Zeilen vorher in ein Blatt. Mehrere Dateien zu kombinieren wird unterstützt: Legen Sie sie zusammen ab.'
  - q: 'Wie werden in Excel gespeicherte Geburtstage gelesen?'
    a: 'Als Datum formatierte Zellen werden unabhängig vom Anzeigeformat als Datum gelesen. Textdaten werden ebenfalls gelesen: `17.05.1990`, `05/17/1990`, `1990-05-17`, `17. Mai 1990` in 13 Sprachen.'
  - q: 'Werden Formeln oder Makros ausgeführt?'
    a: 'Nein. Makros laufen nie. Formelzellen werden mit den Werten gelesen, die Excel in der Datei gespeichert hat.'
related: [excel-to-vcf, xls-to-vcf, google-sheets-to-vcf, home, import-iphone, excel-phone-e11]
updated: 2026-11-04
---

Eine **.xlsx**-Datei ist ein ZIP-Archiv aus XML-Teilen: einer pro Tabellenblatt, dazu die gemeinsam genutzten Texte und die Zellformatvorlagen. Der Konverter entpackt sie in Ihrem Browser mit [SheetJS](https://sheetjs.com/) und liest die Zellen des gewählten Blatts. Nichts wird irgendwohin gesendet.

**Zahlen und Text.** Excel speichert eine Telefonnummer entweder als Zahl oder als Text. Zahlen verlieren die führende `0` und das `+`. Der Konverter ergänzt beides anhand des gewählten Landes und prüft jedes Ergebnis gegen den Nummernplan dieses Landes. Nummern, die die Prüfung nicht bestehen, werden unverändert geschrieben und markiert – es verschwindet also nichts stillschweigend. Sind mehr als ein paar Nummern einer Spalte betroffen, steht unter dem Dateinamen ein Hinweis mit der Anzahl.

**Datumsangaben.** Excel speichert ein Datum als Anzahl der Tage seit 1900 (oder 1904 in alten Mac-Arbeitsmappen). Der Konverter liest den Zelltyp und macht aus echten Datumszellen `BDAY`-Werte. Ein Geburtstag ohne Jahr (`--05-17`) bleibt ohne Jahr.

**Zuordnung.** Das Steckfeld zeigt jede nicht leere Spalte mit Buchstabe, Überschrift und Beispielwerten. Jede Zuordnung ändern Sie über ihre Liste; eine zweite Liste legt den Typ fest, sodass Sie eine Spalte als mobil, geschäftlich oder privat kennzeichnen können. Ihre Änderungen erscheinen sofort in der Kartenvorschau.

Für den allgemeinen Fall und CSV-Dateien siehe den [CSV-in-VCF-Konverter](/de/).
