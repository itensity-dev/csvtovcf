---
url: importer-vcf-sur-android
title: 'Importer un fichier VCF sur Android (Pixel, Samsung, Xiaomi)'
h1: 'Importer un fichier VCF sur Android'
description: 'Importez tous les contacts d’un .vcf sur Android : app Google Contacts (Pixel et la plupart des téléphones), Contacts Samsung et Xiaomi. Chemins de menus et solutions.'
lead: 'Android importe en une fois un .vcf de plusieurs contacts. Le chemin dans les menus dépend de l’app Contacts : Google Contacts sur les Pixel et beaucoup d’autres téléphones, l’app de Samsung sur les Galaxy.'
nav: 'Importer sur Android'
summary: 'Chemins de menus pour Google Contacts, Samsung et Xiaomi.'
steps:
  - 'Créez le .vcf avec le [convertisseur](/fr/) (vCard 3.0) et copiez-le sur le téléphone : téléchargez-le directement dessus, ou placez-le dans le dossier Téléchargements.'
  - '**App Google Contacts :** ouvrez Contacts → **Organiser** (Organize, onglet en bas) → **Importer depuis un fichier** (Import from file) → choisissez le .vcf → choisissez le compte Google.'
  - '**Contacts Samsung :** ouvrez Contacts → menu ☰ → **Gérer les contacts** (Manage contacts) → **Importer ou exporter des contacts** (Import or export contacts) → **Importer** → choisissez l’emplacement du fichier → cochez le .vcf → choisissez où enregistrer (compte Samsung, Google, téléphone) → **Importer**.'
  - 'Ouvrez l’app Contacts et vérifiez quelques fiches. Enregistrez les contacts dans le compte Google si vous voulez les retrouver sur vos autres appareils et dans Gmail.'
faq:
  - q: 'Je ne trouve pas « Importer » dans l’app Google Contacts.'
    a: 'Dans les versions actuelles, l’option se trouve dans l’onglet **Organiser** en bas de l’écran → Importer depuis un fichier. Dans les anciennes versions : menu (☰) → Paramètres → Importer, ou « Corriger et gérer » (Fix & manage) → Importer depuis un fichier. Les versions récentes l’ont déplacée dans l’onglet Organiser.'
  - q: 'Où enregistrer les contacts ?'
    a: 'Dans votre compte Google si vous voulez qu’ils soient sauvegardés et présents sur tous vos appareils (et dans Gmail). L’enregistrement sur « Téléphone » ou « Appareil » les garde sur ce seul téléphone : ils disparaissent avec lui.'
  - q: 'Les noms s’affichent en symboles sur mon Samsung.'
    a: 'Convertissez de nouveau en vCard 3.0, pas en 2.1. La version 2.1 écrit le texte accentué ou non latin en Quoted-Printable, et certains téléphones le décodent mal.'
  - q: 'WhatsApp n’affiche pas les nouveaux contacts.'
    a: 'WhatsApp associe les contacts par leur numéro international complet. Convertissez avec le format de numéro E.164 et le bon pays, puis actualisez les contacts dans WhatsApp (Nouvelle discussion → ⋮ → Actualiser).'
  - q: 'Peut-on importer un CSV directement sur Android ?'
    a: 'L’app Google Contacts n’importe pas de CSV sur le téléphone ; la version web, sur contacts.google.com, le fait. Convertir en .vcf permet d’importer directement sur le téléphone.'
related: [import-iphone, import-google-contacts, home, bulk-add-contacts, google-sheets-to-vcf, excel-to-vcf]
updated: 2026-11-04
---

## App Google Contacts (Pixel, Motorola, Nokia, OnePlus et autres)

L’app Google Contacts est installée sur les Pixel et sur beaucoup d’autres téléphones. Elle est aussi disponible sur Google Play pour tout téléphone Android.

1. Ouvrez **Contacts**.
2. Touchez **Organiser** (Organize) en bas de l’écran.
3. Touchez **Importer depuis un fichier** (Import from file).
4. Choisissez le .vcf dans le sélecteur de fichiers (en général dans *Téléchargements*).
5. Si vous avez plusieurs comptes, choisissez le compte Google où enregistrer. Toutes les fiches du fichier sont importées en une fois.

Google Contacts accepte jusqu’à 25 000 contacts par compte. Pour les très longues listes, importez par lots de quelques milliers.

## Samsung Galaxy (Contacts Samsung, One UI)

1. Ouvrez **Contacts**.
2. Touchez le menu **☰** (trois traits).
3. Touchez **Gérer les contacts** (Manage contacts).
4. Touchez **Importer ou exporter des contacts** (Import or export contacts ; dans les anciennes versions : *Importer/Exporter des contacts*).
5. Touchez **Importer**, choisissez le stockage qui contient le fichier (*Stockage interne*), cochez le .vcf et touchez **Terminé** (Done).
6. Choisissez où enregistrer (*Compte Samsung*, un compte *Google* ou *Téléphone*) et touchez **Importer**.

Les libellés peuvent varier légèrement d’une version de One UI à l’autre, mais le chemin par **Gérer les contacts** est stable depuis des années.

## Xiaomi, Redmi, POCO (MIUI / HyperOS)

Sur les téléphones équipés de l’app Contacts de Xiaomi : Contacts → **⋮** → **Paramètres** → **Importer et exporter** (Import and export) → **Importer depuis le stockage** (Import from storage), puis choisissez le fichier. Les téléphones qui utilisent l’app Google Contacts suivent les étapes Google ci-dessus.

## Sur n’importe quel téléphone : ouvrir le fichier

Toucher un .vcf dans un gestionnaire de fichiers ou dans une pièce jointe d’e-mail propose en général *Ouvrir avec → Contacts*. L’import est le même, mais vous choisissez le compte dans la boîte de dialogue suivante.

## Avant d’importer

- **vCard 3.0, UTF-8.** C’est ce que ce convertisseur écrit par défaut et ce qu’Android exporte lui-même.
- **Numéros internationaux.** `+33612345678` au lieu de `06 12 34 56 78` permet aux messageries de reconnaître le contact et fonctionne en itinérance.
- **Un seul fichier.** Un .vcf unique avec tous les contacts est plus simple que des centaines de petits fichiers ; n’utilisez l’option ZIP que si un système demande une fiche par fichier.
