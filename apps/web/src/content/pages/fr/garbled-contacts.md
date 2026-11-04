---
url: corriger-noms-contacts-illisibles
title: 'Noms de contacts illisibles après import (Ã©, Ð¸, ???) : solution'
h1: 'Noms de contacts illisibles après un import : pourquoi et comment corriger'
description: 'Des noms comme « HÃ©lÃ¨ne », « Ð˜Ð²Ð°Ð½ » ou « ???? » après un import viennent d’un mauvais encodage. Reconnaître la cause et convertir le fichier correctement.'
lead: 'Des noms illisibles (`HÃ©lÃ¨ne`, `Ð˜Ð²Ð°Ð½`, `Èâàí`, `????`) signifient que le fichier a été lu dans un autre encodage que celui dans lequel il a été écrit. La solution : relire la source avec le bon encodage et écrire la vCard en UTF-8.'
nav: 'Noms de contacts illisibles'
summary: 'Reconnaître la confusion d’encodage derrière Ã©, Ð¸ ou ??? et la corriger.'
faq:
  - q: 'Peut-on réparer des noms déjà illisibles sur le téléphone ?'
    a: 'Le plus simple est généralement de supprimer le lot importé et d’importer un fichier correct. Une réparation sur place ne fonctionne que si l’erreur est réversible (UTF-8 lu comme Latin-1) ; des points d’interrogation signifient que les lettres sont perdues.'
  - q: 'Pourquoi Excel enregistre-t-il mon CSV avec des points d’interrogation ?'
    a: 'Le format « CSV (séparateur: point-virgule) » enregistre dans la page de code Windows de votre système. Les lettres qui n’y figurent pas (cyrillique sur un PC français, ğ turc sur un PC allemand) deviennent `?`. Enregistrez plutôt au format « CSV UTF-8 (délimité par des virgules) », ou convertissez directement le .xlsx.'
  - q: 'Quel encodage doit avoir une vCard ?'
    a: 'UTF-8. vCard 3.0 et 4.0 le supposent ; en vCard 2.1, chaque valeur non ASCII doit porter `CHARSET=UTF-8` et l’encodage Quoted-Printable. Le convertisseur de ce site le fait toujours.'
related: [home, outlook-csv-to-vcf, what-is-vcf, import-android, import-iphone, excel-to-vcf]
updated: 2026-11-04
---

## Reconnaître le symptôme

Chaque type d’erreur d’encodage a un aspect typique, et cet aspect indique ce qui s’est mal passé :

| Ce que vous voyez | Texte attendu | Cause |
| --- | --- | --- |
| `HÃ©lÃ¨ne`, `MÃ¼ller` | Hélène, Müller | fichier UTF-8 lu en Windows-1252 / Latin-1 |
| `Ð˜Ð²Ð°Ð½ ÐŸÐµÑ‚Ñ€Ð¾Ð²` | Иван Петров | UTF-8 cyrillique lu en Windows-1252 |
| `Èâàí Ïåòðîâ` | Иван Петров | fichier Windows-1251 lu en Windows-1252 |
| `Ayþe Yýlmaz` | Ayşe Yılmaz | Windows-1254 (turc) lu en Windows-1252 |
| `ÇáÇÓã` | الاسم | Windows-1256 (arabe) lu en Latin-1 |
| `Иван` → `????` | Иван | lettres perdues à l’enregistrement dans une page de code qui ne les contient pas |
| `Ã` ou `�` au milieu d’un nom | — | ligne longue coupée au milieu d’une lettre multi-octet |

Les six premiers cas se réparent à partir du fichier d’origine. Les points d’interrogation, non : les lettres ont été remplacées au moment de l’enregistrement du fichier.

## Comment corriger

1. **Revenez au fichier d’origine** : le CSV ou le classeur Excel, pas la vCard abîmée.
2. **Ouvrez-le dans le [convertisseur](/fr/).** Il détecte l’encodage (UTF-8, UTF-16, Windows-1250…1258, KOI8-R, Shift_JIS et d’autres) et affiche les premières lignes. Si les noms restent faux, choisissez un autre encodage dans la liste *Encodage*. L’aperçu change immédiatement : vous voyez lequel est le bon.
3. **Téléchargez en vCard 3.0.** Le fichier est écrit en UTF-8, que tous les téléphones actuels savent lire.
4. **Supprimez l’import raté et importez le nouveau fichier.** Dans Google Contacts, le libellé « Importé le … » permet de supprimer tout le lot.

## Pourquoi cela arrive

Un fichier texte n’indique pas son encodage. Le format « CSV » classique d’Excel, l’export CSV d’Outlook et de nombreux CRM écrivent dans la **page de code Windows** de l’ordinateur : Windows-1252 en Europe de l’Ouest et dans les Amériques, 1251 pour le cyrillique, 1254 pour le turc, 1256 pour l’arabe. Un téléphone ou un service web lit ensuite le fichier en UTF-8, et toutes les lettres absentes de l’anglais se transforment en symboles. L’inverse arrive aussi : un fichier UTF-8 ouvert par un ancien logiciel qui attend du Windows-1252 affiche `Ã©` au lieu de `é`.

Les anciens téléphones ajoutent un troisième problème. Ils attendent du vCard 2.1 et ne comprennent le texte non ASCII que s’il est marqué `CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE`. Sans ce marquage, un fichier UTF-8 parfaitement correct paraît abîmé sur ces appareils. Pour eux, choisissez **vCard 2.1** dans le convertisseur.

## Éviter le problème la prochaine fois

- Dans Excel, utilisez **Fichier → Enregistrer sous → CSV UTF-8 (délimité par des virgules)**, ou passez-vous du CSV et convertissez directement le .xlsx.
- Dans Outlook, exportez puis convertissez aussitôt ; ne réenregistrez pas le CSV dans Excel.
- Dans Google Sheets, les CSV téléchargés sont toujours en UTF-8.
