---
url: convertir-csv-google-contacts-en-vcf
title: 'Convertir un CSV Google Contacts en VCF (CSV Google en vCard)'
h1: 'Convertir un CSV Google Contacts en VCF'
description: 'Convertissez un export CSV de Google Contacts (format actuel ou ancien) en fichier VCF pour iPhone ou Outlook. Libellés, numéros multiples et anniversaires conservés.'
lead: 'Convertit un export de contacts au format « CSV Google » en fichier vCard. Les libellés des téléphones et des e-mails, les valeurs multiples dans une cellule (` ::: `), les groupes et les dates de naissance sans année sont repris.'
nav: 'CSV Google Contacts en VCF'
summary: 'Export CSV de Google Contacts (nouveau et ancien format) en vCard.'
steps:
  - 'Déposez le CSV exporté depuis Google Contacts (Exporter → CSV Google). Le format actuel (`First Name`, `Phone 1 - Label`) et l’ancien (`Given Name`, `Group Membership`) sont tous deux reconnus.'
  - 'Les colonnes sont associées automatiquement et marquées **certain** ; en général, il n’y a rien à changer.'
  - 'Choisissez le pays des numéros enregistrés sans indicatif et décidez si les doublons doivent être fusionnés.'
  - 'Téléchargez le .vcf et importez-le sur l’[iPhone](/fr/importer-vcf-sur-iphone/) ou dans [Outlook](/fr/importer-contacts-dans-outlook/).'
features:
  - feature: 'Formats'
    value: 'CSV Google actuel (`First Name`, `Labels`, `E-mail 1 - Label`…) et ancien (`Name`, `Given Name`, `Group Membership`, `E-mail 1 - Type`…).'
  - feature: 'Valeurs multiples'
    value: 'Plusieurs numéros ou e-mails dans une cellule, séparés par ` ::: `, deviennent des lignes `TEL` / `EMAIL` distinctes, avec leurs libellés.'
  - feature: 'Libellés'
    value: 'Mobile, Work, Home, Main, Work Fax, Home Fax, Pager deviennent des types vCard ; les libellés personnalisés (par exemple « WhatsApp ») sont conservés en `X-ABLabel`.'
  - feature: 'Groupes'
    value: '`Labels` / `Group Membership` deviennent `CATEGORIES` ; les libellés système `* myContacts` et `* starred` sont supprimés.'
  - feature: 'Dates'
    value: 'Dates de naissance avec ou sans année (`--05-17`) ; l’anniversaire de mariage indiqué dans `Event 1` est conservé.'
  - feature: 'Non repris'
    value: 'Les photos (le CSV ne contient qu’un lien). « File As » et les champs personnalisés sont écrits dans la note.'
faq:
  - q: 'Google Contacts sait exporter en vCard. Pourquoi convertir le CSV ?'
    a: 'Si vous avez encore accès au compte Google, Exporter → vCard est le plus simple. Utilisez cette page quand vous n’avez que le CSV (envoyé par quelqu’un, exporté il y a des années ou modifié dans Excel), ou quand vous voulez d’abord nettoyer les numéros et fusionner les doublons.'
  - q: 'Que signifie ` ::: ` dans mon CSV ?'
    a: 'Google regroupe plusieurs valeurs du même type dans une cellule et les sépare par ` ::: `. Par exemple, deux numéros de portable : `+33 6 12 34 56 78 ::: +33 7 98 76 54 32`. Ils deviennent deux lignes de téléphone distinctes sur la fiche.'
  - q: 'Les groupes (libellés) sont-ils conservés ?'
    a: 'Oui, sous forme de `CATEGORIES`. L’iPhone n’affiche pas les catégories, mais Google Contacts, Outlook et la plupart des applications Android le font.'
  - q: 'Pourquoi certains numéros sont-ils signalés comme non valides ?'
    a: 'Google exporte les numéros tels qu’ils ont été saisis. Un numéro local sans indicatif est vérifié par rapport au pays choisi ; s’il ne correspond pas au plan de numérotation de ce pays, il est écrit tel quel et signalé.'
related: [outlook-csv-to-vcf, home, import-iphone, import-outlook, google-sheets-to-vcf, what-is-vcf]
updated: 2026-11-04
---

Le **CSV Google** est le format de tableau que Google Contacts utilise pour l’export et l’import. Il diffère d’une simple liste. Chaque téléphone, e-mail, adresse et site web occupe une paire de colonnes (`Phone 1 - Label` et `Phone 1 - Value`), et une même cellule peut contenir plusieurs valeurs séparées par ` ::: `. Les convertisseurs génériques passent souvent à côté : ils mettent `+33 6 12 34 56 78 ::: +33 7 98 76 54 32` dans un seul champ, ou perdent les libellés.

**Des libellés aux types vCard.** Le libellé détermine le type de chaque ligne :

| Libellé Google | vCard 3.0 |
| --- | --- |
| Mobile | `TEL;TYPE=CELL` |
| Work / Home | `TEL;TYPE=WORK,VOICE` / `TEL;TYPE=HOME,VOICE` |
| Work Fax / Home Fax | `TEL;TYPE=WORK,FAX` / `TEL;TYPE=HOME,FAX` |
| Main | `TEL;TYPE=MAIN` |
| personnalisé, par exemple « WhatsApp » | `item1.TEL` + `item1.X-ABLabel:WhatsApp` |

Dans les anciens exports, une étoile devant un libellé (`* Work`) marque la valeur principale ; elle est supprimée.

**Deux formats.** Google a changé le nom des colonnes de son export CSV. Les fichiers actuels commencent par `First Name, Middle Name, Last Name` ; les anciens par `Name, Given Name, Additional Name, Family Name`, et utilisent `Type` au lieu de `Label`. Les deux sont détectés automatiquement : le panneau du fichier indique lequel a été trouvé.

**Dates de naissance sans année.** Google les enregistre sous la forme `--05-17`. Elles sont écrites telles quelles dans la vCard : l’année reste vide au lieu de devenir 1604 ou 1900.
