---
url: convertir-xls-en-vcf
title: 'Convertir XLS en VCF : anciens fichiers de contacts Excel en vCard'
h1: 'Convertir un fichier XLS en VCF'
description: 'Convertissez des contacts .xls (Excel 97–2003, anciens CRM, logiciels de téléphone) en fichier VCF. Les anciennes pages de code sont décodées : les noms restent lisibles.'
lead: 'Lit l’ancien format binaire d’Excel (.xls), y compris les fichiers d’Excel 95, de logiciels de comptabilité ou de synchronisation de téléphone, et produit un .vcf que les téléphones actuels importent.'
nav: 'XLS en VCF'
summary: 'Anciens fichiers de contacts .xls (Excel 97–2003 et antérieurs) en vCard.'
steps:
  - 'Déposez le fichier .xls ci-dessus. Le format est reconnu d’après le contenu du fichier : un classeur avec une mauvaise extension s’ouvre quand même.'
  - 'Choisissez la feuille s’il y en a plusieurs et vérifiez l’aperçu : les noms accentués ou écrits en cyrillique, en grec, en turc ou en lettres d’Europe centrale doivent s’afficher correctement.'
  - 'Vérifiez l’association des colonnes et choisissez le pays des numéros sans indicatif.'
  - 'Téléchargez le .vcf. Ne choisissez vCard 2.1 que si le fichier retourne sur un ancien téléphone ; les téléphones actuels attendent la 3.0.'
features:
  - feature: 'Formats'
    value: 'BIFF8 (.xls d’Excel 97–2003), BIFF5 (Excel 95), BIFF2–4 et Excel 2003 XML, ainsi que .xlsx et .ods.'
  - feature: 'Anciennes pages de code'
    value: 'Le texte des .xls antérieurs à Unicode (Windows-1250/1251/1252/1253/1254, Shift_JIS, Big5…) est décodé avec la page de code enregistrée dans le fichier.'
  - feature: 'Nombres et dates'
    value: 'Les numéros de téléphone sont lus en entier ; les cellules de date, y compris celles du système de dates 1904 des anciens classeurs Mac, deviennent des dates de naissance.'
  - feature: 'Sortie'
    value: 'vCard 3.0 (par défaut), 4.0 ou 2.1, un seul fichier ou un par contact ; CSV Google ; CSV Outlook.'
  - feature: 'Non pris en charge'
    value: '.xls chiffrés (mot de passe à l’ouverture), fichiers Lotus 1-2-3 et Quattro.'
faq:
  - q: 'Quelle différence entre XLS et XLSX ?'
    a: '.xls est le format binaire utilisé par Excel jusqu’en 2003 ; .xlsx est le format XML compressé utilisé depuis Excel 2007. Les deux sont lus de la même façon ici. D’anciens programmes et certains outils de synchronisation de téléphone exportent encore en .xls.'
  - q: 'Les noms de mon ancien fichier s’affichent en `Ãëåá` ou en points d’interrogation. Que faire ?'
    a: 'Avec ce convertisseur, cela ne devrait pas arriver : les fichiers .xls indiquent leur page de code, et elle est appliquée à la lecture. Si les lettres restent fausses, le texte était sans doute déjà abîmé quand il a été saisi dans Excel. Ouvrez le fichier dans Excel et vérifiez les cellules.'
  - q: 'Peut-on convertir un .xls de plusieurs milliers de contacts ?'
    a: 'Oui. Il n’y a pas de limite de lignes ; 100 000 lignes se convertissent en quelques secondes. Pour Google Contacts, découpez le résultat en fichiers de 3 000 contacts au maximum.'
  - q: 'Quelle version de vCard pour un ancien téléphone ?'
    a: 'vCard 2.1. Elle écrit le texte accentué ou non latin en Quoted-Printable avec `CHARSET=UTF-8`, ce que comprennent les téléphones des années 2000. Les smartphones doivent recevoir la 3.0.'
related: [excel-to-vcf, xlsx-to-vcf, home, garbled-contacts, what-is-vcf, import-android]
updated: 2026-11-04
---

**XLS** est le format de fichier qu’Excel utilisait avant 2007. On le rencontre encore souvent dans les listes de contacts exportées par d’anciens CRM, des logiciels de comptabilité, des standards téléphoniques et des programmes de synchronisation de téléphone. Les téléphones ne savent pas le lire, et Google Contacts n’importe que du CSV ou du vCard. Le convertisseur lit lui-même le .xls : Excel n’a pas besoin d’être installé.

**Pages de code.** Excel 97–2003 stocke le texte en Unicode, mais les fichiers d’Excel 95 et de certains générateurs l’enregistrent dans la page de code de l’ordinateur qui les a écrits : Windows-1252 pour le français et les langues d’Europe de l’Ouest, 1251 pour le russe, 1250 pour le polonais ou le tchèque, 1254 pour le turc. Le convertisseur applique la page de code inscrite dans le fichier : `Hélène` reste `Hélène`, `Иванов` reste `Иванов`. Le .vcf est toujours écrit en UTF-8.

**Des lignes aux fiches.** La ligne d’en-têtes est trouvée automatiquement. Les colonnes sont reconnues par leur nom dans de nombreuses langues : « Téléphone », « Portable », « Teléfono », « Handy », « Телефон » et « Cep Telefonu » deviennent tous des numéros de téléphone. Chaque ligne devient une fiche avec les champs obligatoires `N` et `FN` ; les lignes sans nom, téléphone, e-mail, société ni adresse sont ignorées et listées avec leur numéro de ligne.

**Quelle version télécharger.** vCard 3.0 s’importe sur iPhone, Android, Google Contacts et Outlook. vCard 2.1 est là pour les téléphones d’où venaient souvent ces fichiers .xls : téléphones à touches et premiers Nokia ou Sony Ericsson. [Ce qui distingue les versions](/fr/qu-est-ce-qu-un-fichier-vcf/).
