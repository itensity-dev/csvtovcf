---
url: convertir-xlsx-en-vcf
title: 'Convertir XLSX en VCF : contacts d’un classeur Excel en vCard'
h1: 'Convertir un fichier XLSX en VCF'
description: 'Convertissez une feuille de contacts .xlsx en fichier VCF (vCard) : choix de la feuille, numéros et dates lus en entier, un seul .vcf pour iPhone, Android ou Google.'
lead: 'Choisissez une feuille de votre classeur .xlsx et obtenez un .vcf avec une fiche par ligne. Les numéros de téléphone sont lus en entier et les cellules de date deviennent des dates de naissance.'
nav: 'XLSX en VCF'
summary: 'Classeurs Excel récents (.xlsx) en vCard, avec choix de la feuille.'
steps:
  - 'Déposez le .xlsx ci-dessus. La première feuille visible qui contient des données s’ouvre ; changez de feuille dans la liste « Feuille ».'
  - 'Regardez l’aperçu des premières lignes : les lettres de colonne et les numéros de ligne sont les mêmes que dans Excel.'
  - 'Vérifiez l’association des colonnes, réglez le pays des numéros et la version vCard (la 3.0 convient à tous les téléphones actuels).'
  - 'Téléchargez le .vcf, ou un ZIP avec un fichier par contact si vous devez joindre les fiches une par une.'
features:
  - feature: 'Classeurs'
    value: '.xlsx, .xlsm et .xlsb ; chaque feuille peut être choisie, les feuilles masquées sont signalées.'
  - feature: 'Formules'
    value: 'C’est la dernière valeur calculée qui est utilisée, par exemple pour un nom construit avec `=B2&" "&C2`.'
  - feature: 'Cellules fusionnées et vides'
    value: 'Une cellule fusionnée est lue une seule fois, dans sa cellule en haut à gauche. Les colonnes vides sont masquées dans le panneau d’association.'
  - feature: 'Nombres longs'
    value: 'Jusqu’à 15 chiffres sont lus exactement : c’est la limite de précision d’Excel. Les suites de chiffres plus longues doivent être stockées en texte dans Excel.'
  - feature: 'Sortie'
    value: 'vCard 3.0, 4.0 ou 2.1 ; un seul fichier ou un ZIP ; CSV Google ou Outlook.'
faq:
  - q: 'Pourquoi ne pas exporter la feuille en CSV et convertir ce CSV ?'
    a: 'Parce que l’export CSV d’Excel écrit ce que la cellule affiche. Un numéro affiché `3,36123E+10` est exporté avec des chiffres en moins. Le .xlsx contient encore le nombre complet : convertissez donc le classeur lui-même.'
  - q: 'Mes contacts sont répartis sur plusieurs feuilles. Peut-on les réunir ?'
    a: 'Convertissez chaque feuille et importez les fichiers l’un après l’autre, ou copiez d’abord les lignes dans une seule feuille. La combinaison de plusieurs fichiers est prise en charge : déposez-les ensemble.'
  - q: 'Comment sont lues les dates de naissance saisies dans Excel ?'
    a: 'Les cellules au format date sont lues comme des dates, quel que soit leur format d’affichage. Les dates en texte sont lues aussi : `17/05/1990`, `17.05.1990`, `05/17/1990`, `1990-05-17`, `17 mai 1990`, en 13 langues.'
  - q: 'Les formules ou les macros sont-elles exécutées ?'
    a: 'Non. Les macros ne s’exécutent jamais. Les cellules contenant une formule sont lues avec la valeur qu’Excel a enregistrée dans le fichier.'
related: [excel-to-vcf, xls-to-vcf, google-sheets-to-vcf, home, import-iphone, excel-phone-e11]
updated: 2026-11-04
---

Un fichier **.xlsx** est une archive ZIP de fichiers XML : un par feuille, plus le texte partagé et les styles des cellules. Le convertisseur la décompresse dans votre navigateur avec [SheetJS](https://sheetjs.com/) et lit les cellules de la feuille choisie. Rien n’est envoyé nulle part.

**Nombres et texte.** Excel conserve un numéro de téléphone soit comme nombre, soit comme texte. Les nombres perdent le `0` initial et le `+`. Le convertisseur les rétablit à partir du pays choisi et vérifie chaque résultat avec le plan de numérotation de ce pays. Les numéros qui ne passent pas la vérification sont écrits tels quels et signalés : rien ne disparaît en silence. Si plus de quelques numéros d’une colonne sont concernés, une note sous le nom du fichier indique combien.

**Dates.** Excel stocke une date sous forme de nombre de jours depuis 1900 (ou 1904 dans les anciens classeurs Mac). Le convertisseur lit le type de la cellule et transforme les vraies cellules de date en valeurs `BDAY`. Une date de naissance sans année (`--05-17`) reste sans année.

**Association.** Le panneau d’association affiche chaque colonne non vide avec sa lettre, son en-tête et des exemples de valeurs. Modifiez une association avec sa liste ; une seconde liste règle le type, pour indiquer par exemple qu’une colonne contient des numéros mobiles, professionnels ou personnels. Vos modifications s’appliquent immédiatement à l’aperçu des fiches.

Pour le cas général et les fichiers CSV, voir le [convertisseur CSV en VCF](/fr/).
