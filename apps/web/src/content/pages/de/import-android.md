---
url: vcf-auf-android-importieren
title: 'VCF-Datei auf Android importieren (Pixel, Samsung, Xiaomi)'
h1: 'VCF-Datei auf Android importieren'
description: 'Alle Kontakte einer .vcf-Datei auf Android importieren: Google Kontakte (Pixel und viele andere), Samsung Kontakte und Xiaomi. Genaue Menüpfade und Hilfe bei Problemen.'
lead: 'Android importiert eine .vcf mit vielen Kontakten in einem Durchgang. Der Menüpfad hängt von der Kontakte-App ab: Google Kontakte auf Pixel und vielen anderen Telefonen, Samsungs eigene App auf Galaxy-Geräten.'
nav: 'Import auf Android'
summary: 'Menüpfade für Google Kontakte sowie Samsung- und Xiaomi-Telefone.'
steps:
  - 'Erstellen Sie die .vcf mit dem [Konverter](/de/) (vCard 3.0) und bringen Sie sie aufs Telefon: direkt dort herunterladen oder in den Ordner „Downloads“ kopieren.'
  - '**Google Kontakte:** Kontakte öffnen → **Organisieren** (Tab unten) → **Aus Datei importieren** → .vcf auswählen → Google-Konto wählen.'
  - '**Samsung Kontakte:** Kontakte öffnen → Menü ☰ → **Kontakte verwalten** → **Kontakte importieren oder exportieren** → **Importieren** → Speicherort der Datei wählen → .vcf ankreuzen → Speicherziel wählen (Samsung Account, Google, Telefon) → **Importieren**.'
  - 'Öffnen Sie die Kontakte-App und prüfen Sie ein paar Karten. Speichern Sie die Kontakte im Google-Konto, wenn Sie sie auch auf anderen Geräten und in Gmail haben möchten.'
faq:
  - q: 'Ich finde „Importieren“ in der App Google Kontakte nicht.'
    a: 'In aktuellen Versionen steht es unten im Tab **Organisieren** → Aus Datei importieren. In älteren Versionen: Menü (☰) → Einstellungen → Importieren oder „Korrigieren und verwalten“ (Fix & manage) → Aus Datei importieren. Neuere Versionen haben es in den Tab „Organisieren“ verschoben.'
  - q: 'Wo sollen die Kontakte gespeichert werden?'
    a: 'Im Google-Konto, wenn sie gesichert und auf jedem Gerät (und in Gmail) verfügbar sein sollen. Der Speicher „Telefon“ oder „Gerät“ hält sie nur auf diesem Telefon, und mit ihm gehen sie verloren.'
  - q: 'Namen erscheinen auf meinem Samsung-Telefon als Symbole.'
    a: 'Wandeln Sie erneut mit vCard 3.0 um, nicht mit 2.1. Version 2.1 schreibt Umlaute und andere Nicht-ASCII-Zeichen als Quoted-Printable, und manche Telefone dekodieren das falsch.'
  - q: 'WhatsApp zeigt die neuen Kontakte nicht an.'
    a: 'WhatsApp ordnet Kontakte über die vollständige internationale Nummer zu. Wandeln Sie mit dem Telefonformat „E.164“ und dem richtigen Land um und aktualisieren Sie dann die Kontakte in WhatsApp (Neuer Chat → ⋮ → Aktualisieren).'
  - q: 'Kann ich eine CSV direkt auf Android importieren?'
    a: 'Die App Google Kontakte importiert auf dem Telefon keine CSV; die Webversion unter contacts.google.com schon. Eine .vcf können Sie dagegen direkt auf dem Telefon importieren.'
related: [import-iphone, import-google-contacts, home, bulk-add-contacts, google-sheets-to-vcf, excel-to-vcf]
updated: 2026-11-04
---

## Google Kontakte (Pixel, Motorola, Nokia, OnePlus und andere)

Die App Google Kontakte ist auf Google-Pixel-Telefonen und vielen anderen vorinstalliert. Für jedes Android-Telefon gibt es sie außerdem bei Google Play.

1. Öffnen Sie **Kontakte**.
2. Tippen Sie unten auf **Organisieren**.
3. Tippen Sie auf **Aus Datei importieren**.
4. Wählen Sie die .vcf in der Dateiauswahl (meist unter *Downloads*).
5. Haben Sie mehrere Konten, wählen Sie das Google-Konto, in dem gespeichert werden soll. Alle Karten der Datei werden auf einmal importiert.

Google Kontakte nimmt bis zu 25.000 Kontakte pro Konto auf. Sehr große Listen importieren Sie am besten in Teilen von einigen Tausend.

## Samsung Galaxy (Samsung Kontakte, One UI)

1. Öffnen Sie **Kontakte**.
2. Tippen Sie auf das Menü **☰** (drei Striche).
3. Tippen Sie auf **Kontakte verwalten**.
4. Tippen Sie auf **Kontakte importieren oder exportieren** (Import or export contacts; ältere Versionen: *Kontakte importieren/exportieren*).
5. Tippen Sie auf **Importieren**, wählen Sie den Speicher mit der Datei (*Interner Speicher*), kreuzen Sie die .vcf an und tippen Sie auf **Fertig**.
6. Wählen Sie das Speicherziel – *Samsung Account*, ein *Google*-Konto oder *Telefon* – und tippen Sie auf **Importieren**.

Die Beschriftungen können sich zwischen One-UI-Versionen leicht unterscheiden, der Weg über **Kontakte verwalten** ist aber seit Jahren gleich.

## Xiaomi, Redmi, POCO (MIUI / HyperOS)

Auf Telefonen mit Xiaomis eigener Kontakte-App: Kontakte → **⋮** → **Einstellungen** → **Importieren und exportieren** (Import and export) → **Aus Speicher importieren** (Import from storage), dann die Datei wählen. Telefone, die die App Google Kontakte verwenden, folgen den Google-Schritten oben.

## Jedes Telefon: Datei öffnen

Tippen Sie in einem Dateimanager oder E-Mail-Anhang auf eine .vcf, wird meist *Öffnen mit → Kontakte* angeboten. Das startet denselben Import; das Konto wählen Sie im nächsten Dialog.

## Vor dem Import

- **vCard 3.0, UTF-8.** Das schreibt dieser Konverter standardmäßig, und so exportiert Android selbst.
- **Internationale Nummern.** `+4915123456789` statt `0151 23456789` lässt Messenger den Kontakt zuordnen und funktioniert auch im Ausland.
- **Eine Datei.** Eine einzige .vcf mit allen Kontakten ist einfacher als Hunderte kleiner Dateien; nutzen Sie die ZIP-Option nur, wenn ein System eine Karte pro Datei verlangt.
