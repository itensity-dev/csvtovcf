---
url: ajouter-plusieurs-contacts-telephone
title: 'Ajouter plusieurs contacts d’un coup sur un téléphone (depuis Excel)'
h1: 'Ajouter de nombreux contacts d’un coup sur un téléphone'
description: 'Ajoutez des centaines de contacts sur un iPhone ou un Android depuis une liste Excel ou CSV : un seul fichier VCF, puis un seul import. Aussi pour WhatsApp et Telegram.'
lead: 'Inutile de saisir les contacts un par un. Transformez la liste en un seul fichier .vcf et importez-le : le téléphone ajoute tous les contacts en une fois, et les messageries les récupèrent depuis le répertoire.'
nav: 'Ajouter des contacts en masse'
summary: 'D’un tableau à des centaines de contacts sur le téléphone, en un seul import.'
steps:
  - 'Mettez les contacts dans un tableau : une ligne par personne, une ligne d’en-têtes avec « Nom » et « Téléphone » (d’autres colonnes sont les bienvenues).'
  - 'Déposez le fichier dans le [convertisseur](/fr/) et choisissez le pays des numéros ; ils sont écrits avec l’indicatif international (+…).'
  - 'Téléchargez un seul .vcf contenant tous les contacts.'
  - 'Importez-le : sur [Android](/fr/importer-vcf-sur-android/) via Contacts → Organiser → Importer depuis un fichier ; sur [iPhone](/fr/importer-vcf-sur-iphone/) en ouvrant le fichier et en touchant « Ajouter tous les contacts ».'
faq:
  - q: 'Combien de contacts un téléphone peut-il importer d’un coup ?'
    a: 'Des milliers. Un seul .vcf de plusieurs milliers de fiches s’importe sur iPhone comme sur Android. Google Contacts sur le web demande des fichiers de 3 000 contacts au maximum et accepte 25 000 contacts par compte.'
  - q: 'Les contacts apparaîtront-ils dans WhatsApp ou Telegram ?'
    a: 'Oui, dès que les numéros sont au format international et que l’application a actualisé ses contacts. Les numéros sans indicatif ne sont souvent associés à aucun compte.'
  - q: 'Faut-il une application ou un logiciel payant ?'
    a: 'Non. L’app Contacts du téléphone importe les fichiers .vcf, et le convertisseur de ce site est gratuit et fonctionne dans le navigateur.'
  - q: 'Peut-on supprimer les contacts importés plus tard ?'
    a: 'Dans Google Contacts, supprimez le libellé « Importé le … » avec ses contacts. Sur iPhone, supprimez-les sur iCloud.com, où l’on peut en sélectionner plusieurs à la fois. Testez d’abord avec un petit fichier.'
related: [import-android, import-iphone, home, excel-to-vcf, google-sheets-to-vcf, excel-phone-e11]
updated: 2026-11-04
---

## La méthode la plus rapide

Les téléphones n’importent pas de tableaux, mais ils importent des fichiers **vCard (.vcf)**, et un seul fichier peut contenir autant de contacts que nécessaire. Le travail se résume donc à : tableau → un seul .vcf → import.

**Préparez le tableau.** Une ligne par personne. Le minimum : une colonne de noms et une colonne de numéros ; les colonnes e-mail, société et date de naissance sont reconnues aussi. Le nom peut tenir dans une colonne (« Nom complet ») ou dans deux (« Prénom », « Nom »).

**Convertissez.** Le [convertisseur](/fr/) reconnaît les colonnes, écrit les numéros au format international et signale ceux qui ne semblent pas valides, avant qu’ils n’arrivent dans votre téléphone. Les personnes présentes deux fois peuvent être fusionnées.

**Importez.** Un fichier, une seule manipulation sur le téléphone. Détails pour [Android](/fr/importer-vcf-sur-android/) et [iPhone](/fr/importer-vcf-sur-iphone/).

## Pour WhatsApp, Telegram et Signal

Les messageries lisent le répertoire du téléphone et recherchent chaque numéro sous sa forme internationale. Deux choses déterminent si un contact apparaît :

- **L’indicatif du pays.** `+33 6 12 34 56 78` est reconnu ; `06 12 34 56 78` ne l’est que si le pays du téléphone est la France. Le convertisseur ajoute l’indicatif du pays choisi.
- **Une actualisation.** Après l’import, ouvrez l’écran de nouvelle discussion de l’application. Dans WhatsApp sur Android : ⋮ → Actualiser.

Ajouter des contacts en masse uniquement pour écrire à des inconnus, c’est du spam, et cela fait bloquer les comptes. Réservez cette méthode aux personnes qui s’attendent à avoir de vos nouvelles : votre équipe, vos adhérents, des clients qui vous ont donné leur numéro.

## Les listes longues

- **Découpez pour Google Contacts.** L’import web accepte environ 3 000 contacts par fichier. Filtrez votre tableau en plusieurs parties et convertissez chacune.
- **Choisissez le compte.** Les contacts enregistrés dans le compte Google ou iCloud sont sauvegardés et apparaissent sur tous vos appareils. Un enregistrement « sur le téléphone uniquement » reste sur cet appareil.
- **Vérifiez avant d’importer.** Le rapport du convertisseur liste les lignes ignorées, les numéros non valides et les doublons, avec des numéros de ligne que vous retrouvez dans Excel.
