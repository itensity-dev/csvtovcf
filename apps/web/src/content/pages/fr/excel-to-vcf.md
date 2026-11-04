---
url: convertir-excel-en-vcf
title: 'Convertir Excel en VCF : vos contacts Excel en vCard, sans envoi'
h1: 'Convertir Excel en VCF (vCard)'
description: 'Convertissez une liste de contacts Excel (.xlsx ou .xls) en fichier VCF pour iPhone, Android et Google. Le classeur est lu directement : aucun numéro tronqué. Sans envoi.'
lead: 'Ouvre directement votre classeur Excel, sans passer par « Enregistrer sous… CSV », et transforme chaque ligne en fiche de contact dans un seul fichier .vcf. Les numéros stockés comme nombres retrouvent leur indicatif ; le fichier ne quitte pas cet appareil.'
nav: 'Excel en VCF'
summary: 'Classeur XLSX ou XLS directement en vCard, avec choix de la feuille.'
steps:
  - 'Déposez le fichier Excel (.xlsx, .xls ou .ods) ci-dessus. Si le classeur contient plusieurs feuilles, choisissez celle des contacts ; les feuilles masquées sont signalées.'
  - 'Vérifiez que la ligne d’en-têtes a été trouvée et que les colonnes sont associées aux bons champs : « Nom », « Portable », « E-mail », « Société » sont reconnus dans de nombreuses langues.'
  - 'Indiquez le pays de vos numéros. Excel supprime le 0 initial et le « + » des numéros stockés comme nombres ; le pays sert à les rétablir.'
  - 'Téléchargez le .vcf et importez-le sur le téléphone : [iPhone](/fr/importer-vcf-sur-iphone/), [Android](/fr/importer-vcf-sur-android/).'
features:
  - feature: 'Fichiers Excel'
    value: '.xlsx et .xlsm (Excel 2007 et suivants), .xls (Excel 97–2003 et plus anciens, y compris les pages de code d’Excel 95), .ods. N’importe quelle feuille ; les feuilles masquées sont listées.'
  - feature: 'Valeurs des cellules'
    value: 'Les nombres sont lus en entier (`33612345678`, jamais `3,36123E+10`). Les cellules de date deviennent des dates de naissance. Les formules sont lues avec leur dernière valeur calculée.'
  - feature: 'Ligne d’en-têtes'
    value: 'Trouvée automatiquement, même sous des lignes de titre. Décochez « La première ligne contient les en-têtes » si votre feuille commence directement par les données.'
  - feature: 'Nettoyage des numéros'
    value: 'Les numéros sans « + » ni 0 initial sont complétés avec le pays choisi et écrits au format international, du type `+33 6 12 34 56 78`. Les numéros non valides sont signalés, pas supprimés.'
  - feature: 'Sortie'
    value: 'Un .vcf (vCard 3.0, 4.0 ou 2.1), un ZIP avec une fiche par contact, ou un CSV Google / Outlook.'
  - feature: 'Non pris en charge'
    value: 'Classeurs protégés par mot de passe (retirez d’abord le mot de passe dans Excel), fichiers Apple Numbers, photos de contacts insérées dans les cellules.'
faq:
  - q: 'Faut-il d’abord enregistrer le fichier Excel en CSV ?'
    a: 'Non, et mieux vaut l’éviter. Quand Excel enregistre un CSV, il écrit les nombres tels qu’ils sont affichés : un numéro affiché `3,36123E+10` est enregistré sans ses derniers chiffres. En lisant directement le .xlsx, tous les chiffres sont conservés.'
  - q: 'Mes numéros n’ont ni 0 initial ni « + ». Fonctionneront-ils ?'
    a: 'Oui. Choisissez le pays sous « Format des numéros » ; avec la France sélectionnée, un numéro comme `612345678` devient `+33612345678`. Les numéros qui commencent par l’indicatif sans « + » (`33612345678`) sont reconnus aussi.'
  - q: 'Les premières lignes de ma feuille sont un titre et une ligne vide. Est-ce un problème ?'
    a: 'Non. Les lignes situées au-dessus de la vraie ligne d’en-têtes sont ignorées, et les numéros de ligne du rapport correspondent à ceux qu’Excel affiche à gauche.'
  - q: 'Peut-on convertir plusieurs feuilles ou classeurs à la fois ?'
    a: 'Déposez plusieurs fichiers ensemble : ils sont réunis en un seul résultat. Dans un même classeur, convertissez une feuille, puis changez de feuille et téléchargez de nouveau.'
  - q: 'Cela fonctionne-t-il avec Excel sur Mac ou avec LibreOffice ?'
    a: 'Oui. Le convertisseur lit le fichier, pas le programme : les .xlsx d’Excel pour Mac, d’Excel en ligne ou téléchargés depuis Google Sheets, et les .ods de LibreOffice fonctionnent tous.'
related: [xlsx-to-vcf, xls-to-vcf, google-sheets-to-vcf, home, excel-phone-e11, import-android]
updated: 2026-11-04
---

Un fichier Excel n’est pas un format de contacts : les téléphones ne savent pas l’importer. Un fichier **VCF** (vCard), lui, s’importe partout, avec une fiche par personne. Le convertisseur lit les cellules de la feuille, associe les colonnes aux champs vCard et écrit une fiche par ligne.

**Pourquoi lire le classeur plutôt qu’un CSV.** Dans un .xlsx, un numéro de téléphone est stocké comme un nombre complet (jusqu’à 15 chiffres), même si la cellule affiche `3,36123E+10`. C’est seulement quand Excel *enregistre un CSV* qu’il écrit le texte affiché, et les chiffres masqués sont alors perdus. C’est pourquoi cette page ouvre directement les .xlsx et .xls. Pour en savoir plus : [pourquoi Excel affiche les numéros de téléphone en E+10 ou E+11](/fr/excel-numeros-telephone-e11/).

**Ce qu’Excel fait aux numéros de téléphone.** Un numéro saisi dans une cellule au format Standard perd son zéro initial (`0612345678` → `612345678`) et son signe plus (`+32470123456` → `32470123456`). Le convertisseur ne devine pas à l’aveugle. Il analyse chaque numéro avec les règles de numérotation du pays choisi et vérifie que le résultat est bien un numéro de ce pays. Si un numéro commence par l’indicatif de ce pays, il est traité comme international. Le rapport indique combien de numéros ont été complétés ainsi, et les fiches montrent le résultat avant le téléchargement.

**Dates.** Les cellules de date de naissance sont lues comme des dates, quel que soit leur format d’affichage. Les dates saisies en texte, comme `17/05/1990` (JJ/MM/AAAA) ou `05/17/1990`, sont lues aussi ; le convertisseur examine toute la colonne pour savoir si le jour ou le mois vient en premier.

**Les colonnes qui ne sont pas des champs de contact** (« Remarques », « N° client », « Dernière commande ») peuvent être envoyées dans la note ou ignorées. Rien de ce que vous réglez sur *ignorer* n’est exporté.
