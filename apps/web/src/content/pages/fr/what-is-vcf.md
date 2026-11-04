---
url: qu-est-ce-qu-un-fichier-vcf
title: 'Fichier VCF : qu’est-ce que c’est ? Versions vCard 2.1, 3.0 et 4.0'
h1: 'Qu’est-ce qu’un fichier VCF (vCard) ?'
description: 'Un fichier VCF est une vCard : une fiche de contact en texte brut que tout téléphone ou logiciel de messagerie importe. Contenu, versions 2.1, 3.0 et 4.0, ouverture.'
lead: 'Un fichier VCF est une vCard : du texte brut qui décrit une ou plusieurs fiches de contact (nom, numéros de téléphone, e-mails, adresse, date de naissance) selon une norme que comprennent tous les téléphones et logiciels de messagerie.'
nav: 'Qu’est-ce qu’un fichier VCF'
summary: 'Ce que contient une vCard et ce qui distingue les versions 2.1, 3.0 et 4.0.'
faq:
  - q: 'Comment ouvrir un fichier VCF ?'
    a: 'Sur un téléphone, touchez-le : l’iPhone et Android proposent d’ajouter les contacts. Sur un ordinateur, un double-clic ouvre le carnet d’adresses (Contacts sur Mac, Outlook ou l’app Contacts sous Windows). N’importe quel éditeur de texte affiche le texte brut.'
  - q: 'Un fichier VCF peut-il contenir plusieurs contacts ?'
    a: 'Oui. Un fichier est simplement une suite de blocs `BEGIN:VCARD … END:VCARD`. L’iPhone, Android et Google Contacts les importent tous d’un coup ; Outlook classique les prend un par un.'
  - q: 'Quelle version utiliser ?'
    a: 'vCard 3.0 pour les téléphones, Google et Outlook. La 4.0 seulement quand une application la demande ; la 2.1 pour les anciens téléphones à touches.'
  - q: 'Un fichier VCF est-il sûr à ouvrir ?'
    a: 'Une vCard est du texte brut, sans macro ni code. Le risque habituel est le même que pour toute pièce jointe d’un expéditeur inconnu : les coordonnées elles-mêmes peuvent être trompeuses.'
  - q: 'Quelle différence entre .vcf et .vcard ?'
    a: 'Aucune : les deux extensions désignent le même format. Le type MIME est `text/vcard` (les anciens logiciels utilisent `text/x-vcard`).'
related: [home, garbled-contacts, import-iphone, import-android, excel-to-vcf, bulk-add-contacts]
updated: 2026-11-04
---

## Ce que contient une vCard

Une vCard est du texte. Chaque fiche commence par `BEGIN:VCARD` et se termine par `END:VCARD` ; chaque ligne entre les deux est une propriété :

```text
BEGIN:VCARD
VERSION:3.0
N:Martin;François;;;
FN:François Martin
TEL;TYPE=CELL:+33612345678
EMAIL;TYPE=INTERNET,WORK:francois@example.fr
ORG:Martin SARL
ADR;TYPE=WORK:;;12 rue de la Paix;Paris;;75002;France
BDAY:1990-05-17
NOTE:Rencontré au salon professionnel
END:VCARD
```

Les propriétés les plus courantes :

| Propriété | Signification |
| --- | --- |
| `N` | Éléments du nom : nom de famille ; prénom ; deuxième prénom ; préfixe ; suffixe |
| `FN` | Nom affiché |
| `TEL` | Numéro de téléphone, avec des types comme `CELL`, `WORK`, `HOME`, `FAX` |
| `EMAIL` | Adresse e-mail |
| `ADR` | Adresse : boîte postale ; complément ; rue ; ville ; région ; code postal ; pays |
| `ORG`, `TITLE` | Société (et service), fonction |
| `BDAY`, `ANNIVERSARY` | Dates |
| `NOTE`, `URL`, `CATEGORIES` | Note, site web, groupes |

## Les trois versions

| | vCard 2.1 | vCard 3.0 | vCard 4.0 |
| --- | --- | --- | --- |
| Publication | 1996, Versit Consortium | 1998, [RFC 2426](https://www.rfc-editor.org/rfc/rfc2426) | 2011, [RFC 6350](https://www.rfc-editor.org/rfc/rfc6350) |
| Accents et texte non latin | `CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE` | UTF-8 par défaut | UTF-8 uniquement |
| Paramètres de type | `TEL;CELL;VOICE` | `TEL;TYPE=CELL` | `TEL;TYPE=cell`, numéros en URI `tel:` |
| Champs obligatoires | `N` | `N`, `FN` | `FN` |
| Usage typique | anciens téléphones, certains exports Android | iPhone, Android, Google, Outlook | serveurs CardDAV, applications récentes |

**vCard 3.0** est le choix sûr : c’est la version qu’exportent iOS et Google Contacts, et tous les outils d’import la lisent. **La 4.0** met de l’ordre dans le format (par exemple les dates de naissance sans année en `--0517`, les numéros en `tel:+33612345678`), mais les outils d’import la gèrent de façon moins homogène. **La 2.1** compte pour les téléphones des années 2000, qui ne comprennent l’UTF-8 que si chaque valeur non ASCII (lettres accentuées comprises) est encodée en Quoted-Printable.

## Les détails qui font échouer un import

- **Les fins de ligne** doivent être en CRLF.
- **Les lignes longues** sont repliées à 75 octets : la ligne est coupée et la suivante commence par une espace. Un mauvais convertisseur coupe une lettre multi-octet en deux, et un `�` apparaît au milieu d’un nom.
- **Les virgules et les points-virgules** à l’intérieur des valeurs doivent être échappés (`\,` `\;`), sinon une adresse comme « Bât. B, 2e étage » se disloque.
- **L’encodage** : un fichier vCard 3.0 écrit en Windows-1252 ou en Windows-1251 au lieu d’UTF-8 affiche les accents ou le cyrillique en symboles sur tous les téléphones.

Le [convertisseur de ce site](/fr/) écrit tout cela correctement dans chaque version, et vous pouvez lire le texte exact de la première fiche dans son onglet *Texte vCard* avant de télécharger.
