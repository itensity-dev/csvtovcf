---
url: importer-vcf-sur-iphone
title: 'Importer un fichier VCF sur iPhone (tous les contacts d’un coup)'
h1: 'Importer un fichier VCF sur iPhone'
description: 'Ajoutez d’un coup tous les contacts d’un .vcf à votre iPhone : AirDrop, Mail ou Fichiers sur le téléphone, ou iCloud.com sur ordinateur. Étapes iOS 26 et solutions.'
lead: 'Deux méthodes importent un .vcf complet de plusieurs contacts : ouvrir le fichier sur l’iPhone et toucher « Ajouter tous les contacts », ou l’importer sur iCloud.com et laisser la synchronisation faire le reste.'
nav: 'Importer sur iPhone'
summary: 'Tous les contacts d’un .vcf sur un iPhone : sur le téléphone ou via iCloud.com.'
steps:
  - 'Créez le .vcf avec le [convertisseur](/fr/) : vCard 3.0, format de numéro E.164 (`+33612345678`).'
  - 'Envoyez-le sur l’iPhone : par AirDrop depuis un Mac, par e-mail à vous-même, ou enregistrez-le dans iCloud Drive et ouvrez-le dans l’app Fichiers.'
  - 'Touchez le fichier. iOS affiche les contacts qu’il contient ; touchez **Ajouter tous les contacts** (Add All Contacts) : selon la version, le bouton indique le nombre de contacts, par exemple 248. Si Fichiers n’affiche qu’un aperçu, touchez Partager → **Contacts**.'
  - 'Vérifiez que les contacts arrivent dans le bon compte : Réglages → Apps → Contacts → **Compte par défaut** détermine s’ils vont dans iCloud, Gmail ou « Sur mon iPhone ».'
faq:
  - q: 'L’iPhone n’affiche que le premier contact. Où sont les autres ?'
    a: 'Si le fichier s’est ouvert dans un aperçu (Coup d’œil), une seule fiche s’affiche. Utilisez Partager → Contacts, ou ouvrez le fichier depuis Mail, Messages ou Fichiers, qui affichent la liste complète avec « Ajouter tous les contacts ». Vous pouvez aussi l’importer sur iCloud.com : chaque fiche y devient un contact distinct.'
  - q: 'Faut-il iCloud pour importer des contacts ?'
    a: 'Non. L’ouverture du .vcf sur le téléphone fonctionne sans iCloud ; les contacts sont enregistrés dans le compte par défaut. iCloud.com est pratique quand le fichier se trouve sur un ordinateur.'
  - q: 'Certains contacts n’ont pas été ajoutés. Pourquoi ?'
    a: 'Lors d’un import depuis Messages, iOS n’ajoute que les fiches qui ne figurent pas déjà dans vos contacts. Consultez les doublons et la liste des lignes ignorées dans le rapport du convertisseur.'
  - q: 'Les noms affichent des caractères étranges après l’import.'
    a: 'La vCard était probablement en version 2.1, ou pas en UTF-8. Convertissez de nouveau en vCard 3.0 : le convertisseur écrit toujours en UTF-8. [Pourquoi les noms deviennent illisibles](/fr/corriger-noms-contacts-illisibles/).'
  - q: 'Les dates de naissance sans année affichent 1604.'
    a: 'iOS utilise 1604 en interne pour signifier « sans année ». Les contacts convertis ici gardent les dates de naissance sans année sous la forme `--05-17` ; si votre version d’iOS affiche une année, modifiez la fiche une fois et supprimez-la.'
related: [import-android, import-google-contacts, home, bulk-add-contacts, excel-to-vcf, what-is-vcf]
updated: 2026-11-04
---

## Méthode 1 : sur l’iPhone

C’est la méthode la plus rapide quand le fichier est déjà sur le téléphone ou dans votre boîte de réception.

1. **Mettez le fichier sur l’iPhone.** Envoyez-le par AirDrop depuis un Mac, par e-mail à vous-même ou dans Messages, ou placez-le dans iCloud Drive.
2. **Ouvrez-le.** Dans Mail ou Messages, touchez la pièce jointe. Dans Fichiers, touchez le fichier ; si vous ne voyez que l’aperçu d’une seule fiche, touchez le bouton Partager et choisissez **Contacts**.
3. **Ajoutez-les tous.** La liste affiche toutes les fiches du fichier. Touchez **Ajouter tous les contacts** ; le libellé exact dépend de la version d’iOS et peut inclure le nombre de contacts.
4. **C’est fait.** Les contacts apparaissent dans l’app Contacts et dans l’app Téléphone. WhatsApp, Telegram et les autres applications les voient après leur prochaine synchronisation des contacts.

## Méthode 2 : iCloud.com sur un ordinateur

Apple documente cette méthode. Elle gère aussi les fichiers de nombreux contacts, et elle est pratique quand le .vcf est sur votre ordinateur.

1. Connectez-vous sur [icloud.com](https://www.icloud.com/) et ouvrez **Contacts**.
2. Cliquez sur le bouton **+** et choisissez **Importer un contact** (Import Contact). Certaines versions de la page affichent à la place une roue dentée avec **Importer une vCard** (Import vCard).
3. Choisissez le fichier .vcf. Chaque personne du fichier devient un contact distinct dans *Tous les contacts*.
4. Sur l’iPhone, les contacts iCloud doivent être activés : Réglages → votre nom → iCloud → Contacts. Les nouveaux contacts arrivent en une minute environ.

## Avant d’importer

- **Utilisez vCard 3.0.** C’est le format qu’exportent les iPhone eux-mêmes. vCard 2.1 ne sert qu’aux anciens téléphones.
- **Écrivez les numéros au format international.** `+33612345678` fonctionne à l’étranger et dans les messageries ; les numéros sans indicatif risquent de ne pas être associés aux comptes WhatsApp.
- **Supprimez d’abord les doublons.** L’onglet *Doublons* du convertisseur montre les personnes présentes deux fois dans votre tableau ; cochez « Fusionner » pour les regrouper.
- **Faites une sauvegarde.** Un import se refait facilement mais se défait péniblement : exportez vos contacts actuels depuis iCloud.com avant d’en importer des centaines.

## Annuler un import

iOS ne propose pas d’« annuler l’import ». Sur iCloud.com, vous pouvez sélectionner plusieurs contacts avec Maj-clic ou Cmd-clic et les supprimer ensemble. Testez donc le fichier avec quelques lignes avant d’en importer des milliers.
