---
url: convertir-google-sheets-en-vcf
title: 'Google Sheets en VCF : collez vos contacts, obtenez un fichier vCard'
h1: 'Convertir Google Sheets en VCF'
description: 'Collez des contacts copiés dans Google Sheets et téléchargez un fichier VCF pour iPhone, Android ou Google Contacts. Sans module complémentaire ni accès à votre compte.'
lead: 'Sélectionnez les lignes de contacts dans Google Sheets, copiez-les, collez-les ici, puis téléchargez un .vcf. Pas de module complémentaire ni d’accès à votre compte Google : les cellules passent seulement de votre presse-papiers à cette page.'
nav: 'Google Sheets en VCF'
summary: 'Collez des cellules de Google Sheets et téléchargez un .vcf.'
steps:
  - 'Dans Google Sheets, sélectionnez les lignes de contacts avec la ligne d’en-têtes (cliquez sur le numéro de la première ligne, puis Maj+clic sur la dernière) et copiez-les avec Ctrl+C (⌘C sur Mac).'
  - 'Cliquez sur **Coller des cellules** ci-dessus, collez avec Ctrl+V puis cliquez sur **Utiliser ces cellules**. Les cellules collées arrivent séparées par des tabulations : les virgules dans les noms ou les adresses ne posent pas de problème.'
  - 'Vérifiez l’association des colonnes et choisissez le pays des numéros sans indicatif.'
  - 'Téléchargez le .vcf et importez-le : sur [Android](/fr/importer-vcf-sur-android/), sur [iPhone](/fr/importer-vcf-sur-iphone/) ou dans [Google Contacts](/fr/importer-vcf-dans-google-contacts/).'
features:
  - feature: 'Entrée'
    value: 'Cellules collées depuis Google Sheets, Excel, LibreOffice ou Numbers (séparées par des tabulations) ; ou fichier téléchargé via Fichier → Télécharger → .xlsx ou .csv.'
  - feature: 'Accès au compte'
    value: 'Aucun. Pas de module complémentaire, pas de connexion, pas d’API Google : le convertisseur ne voit que ce que vous collez.'
  - feature: 'Numéros de téléphone'
    value: 'Sheets garde souvent les numéros comme des nombres (sans « + », sans 0 initial). Ils sont complétés avec le pays choisi et écrits au format international.'
  - feature: 'Sortie'
    value: 'vCard 3.0, 4.0 ou 2.1 ; un seul fichier ou un ZIP ; CSV Google Contacts si vous préférez importer la liste dans Google Contacts sous forme de tableau.'
  - feature: 'Limites'
    value: 'Aucune dans le convertisseur. Les très gros collages (plus de 100 000 lignes) passent mieux sous forme de fichier .xlsx téléchargé.'
faq:
  - q: 'Existe-t-il un module complémentaire Google Sheets pour cela ?'
    a: 'Cette page est l’alternative à un module complémentaire : un module demande l’autorisation de lire vos feuilles de calcul, alors qu’un copier-coller ne donne à cette page que les cellules sélectionnées.'
  - q: 'Faut-il télécharger la feuille en CSV ou en Excel ?'
    a: 'Les deux fonctionnent. Fichier → Télécharger → Microsoft Excel (.xlsx) conserve les nombres et les dates comme valeurs typées ; le CSV convient aussi, car Google Sheets écrit ses CSV en UTF-8.'
  - q: 'Les numéros collés ont perdu leur zéro initial. Peut-on les réparer ?'
    a: 'Oui, si vous choisissez le bon pays : le numéro national est complété avec l’indicatif du pays. Pour qu’ils restent tels que saisis à l’avenir, mettez la colonne au format Texte brut dans Sheets (Format → Nombre → Texte brut).'
  - q: 'Peut-on envoyer les contacts directement dans Google Contacts ?'
    a: 'Importez le .vcf téléchargé sur contacts.google.com → Importer. Google accepte jusqu’à 3 000 contacts par fichier. [Guide](/fr/importer-vcf-dans-google-contacts/).'
related: [google-contacts-csv-to-vcf, excel-to-vcf, home, import-google-contacts, bulk-add-contacts, import-android]
updated: 2026-11-04
---

Google Sheets est l’endroit où l’on tient et partage beaucoup de listes de contacts : inscriptions à un événement, listes d’équipe, exports de clients. Pour mettre ces personnes dans un téléphone, la feuille doit devenir un fichier **VCF** (vCard).

**Pourquoi coller plutôt qu’installer un module.** Les modules complémentaires qui créent des vCards à partir d’une feuille demandent l’autorisation de voir vos feuilles de calcul. Copier des cellules donne à cette page exactement ce que vous avez sélectionné, rien de plus. Quand vous copiez depuis Sheets, le presse-papiers contient les cellules sous forme de texte séparé par des tabulations. Le convertisseur lit ce format à l’identique, y compris les retours à la ligne dans les cellules et les guillemets.

**En-têtes.** Copiez aussi la ligne d’en-têtes : « Nom », « Téléphone », « E-mail » sont alors reconnus et associés automatiquement. Sans en-têtes, les colonnes sont reconnues d’après leur contenu. Une colonne d’e-mails, une colonne de numéros et une colonne de valeurs en deux mots sont quand même trouvées, mais vérifiez l’association.

**Les numéros dans Sheets.** Comme Excel, Google Sheets traite `0612345678` comme un nombre, sauf si la colonne est au format Texte brut, et supprime le zéro initial. Le convertisseur connaît le plan de numérotation de chaque pays. Avec la France sélectionnée, `612345678` devient `+33612345678` et est vérifié comme numéro mobile valide.

**Doublons.** Dans une feuille partagée, la même personne figure souvent deux fois. Ouvrez l’onglet *Doublons* après le collage : les personnes ayant le même numéro ou le même e-mail sont regroupées, et vous pouvez les fusionner avant de télécharger.
