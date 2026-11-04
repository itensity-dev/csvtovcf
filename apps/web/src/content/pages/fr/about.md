---
url: a-propos
title: 'À propos de csvtovcf : qui le fait et comment il fonctionne'
h1: 'À propos de csvtovcf'
description: 'csvtovcf, convertisseur gratuit et open source de contacts en vCard, fonctionne entièrement dans le navigateur. Qui le développe, son financement, comment nous joindre.'
lead: 'csvtovcf convertit des tableaux de contacts en fichiers vCard sans les envoyer nulle part. C’est un petit projet indépendant, avec un moteur open source.'
nav: 'À propos'
summary: 'Qui fait csvtovcf, comment il fonctionne et comment nous joindre.'
updated: 2026-11-04
---

## Ce que c’est

csvtovcf.com transforme des listes de contacts issues d’Excel, de Google Sheets, de Google Contacts, d’Outlook, de LinkedIn ou de n’importe quel CRM en fichiers **vCard (.vcf)** que les téléphones et les logiciels de messagerie importent. L’outil est né d’un constat : les solutions existantes étaient soit des logiciels payants dont la version d’essai se limite à dix contacts, soit des sites qui envoient votre carnet d’adresses sur un serveur et devinent les colonnes.

**En bref :**

- Lancement : novembre 2026. Cette page a été mise à jour pour la dernière fois à la date indiquée ci-dessous.
- Langues : anglais, espagnol, portugais (Brésil), indonésien, turc, allemand, français, russe.
- Formats : CSV, TSV, XLSX, XLS, ODS en entrée ; vCard 2.1, 3.0, 4.0, CSV Google et CSV Outlook en sortie.
- Prix : gratuit, sans compte, sans limite de lignes.

## Comment il fonctionne

La page se charge une fois. Ensuite, chaque étape (lecture du fichier, détection de l’encodage, association des colonnes, nettoyage des numéros, écriture de la vCard) s’exécute dans un Web Worker de votre navigateur. Rien n’est envoyé, et après la première visite le convertisseur fonctionne hors ligne. La page [Confidentialité](/fr/confidentialite/) détaille ce qui passe ou non par le réseau.

Le moteur de conversion est open source, sous licence MIT : [github.com/itensity-dev/csvtovcf](https://github.com/itensity-dev/csvtovcf), et disponible sur npm sous le nom [`csvtovcf`](https://www.npmjs.com/package/csvtovcf). Les numéros de téléphone sont vérifiés avec [libphonenumber-js](https://gitlab.com/catamphetamine/libphonenumber-js) ; les tableurs sont lus avec [SheetJS](https://sheetjs.com/). Toutes les bibliothèques et polices sont listées sur la page [Licences](/fr/licences/).

## Qui le fait

csvtovcf est l’œuvre d’un développeur indépendant qui gère aussi quelques autres outils à usage unique : [ibangenerator.io](https://ibangenerator.io/), [metasnitch.com](https://metasnitch.com/), [woff2tottf.com](https://woff2tottf.com/), [vtttosrt.com](https://vtttosrt.com/) et d’autres, listés en bas de chaque page. Chacun fait une seule chose et ne demande pas de compte.

## Contact

Bogue, colonne mal associée, téléphone qui refuse d’importer un fichier : écrivez à **hello@csvtovcf.com** ou ouvrez un ticket sur [GitHub](https://github.com/itensity-dev/csvtovcf/issues). Si un fichier est mal converti, décrivez ses colonnes et donnez une ligne d’exemple inventée ; merci de ne pas envoyer de vraies données de contact.

csvtovcf n’est affilié ni à Apple, ni à Google, ni à Microsoft, ni à Samsung, ni à LinkedIn ; leurs noms de produits ne servent qu’à décrire la compatibilité.
