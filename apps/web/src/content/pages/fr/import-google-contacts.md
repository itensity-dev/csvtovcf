---
url: importer-vcf-dans-google-contacts
title: 'Importer un fichier VCF ou CSV dans Google Contacts'
h1: 'Importer des contacts dans Google Contacts'
description: 'Importez un .vcf (ou un CSV Google) dans Google Contacts sur le web : Importer → Sélectionner un fichier. Limites (3 000 par fichier, 25 000 par compte) et doublons.'
lead: 'Google Contacts sur le web importe un .vcf ou un CSV Google en quelques étapes. Les contacts se synchronisent ensuite avec chaque téléphone Android, avec Gmail et avec un iPhone sur lequel le compte Google est ajouté.'
nav: 'Importer dans Google Contacts'
summary: 'Importer un .vcf ou un CSV sur contacts.google.com, avec les limites.'
steps:
  - 'Convertissez votre tableau avec le [convertisseur](/fr/) : .vcf (vCard 3.0) ou « CSV Google Contacts » dans *Format de sortie*.'
  - 'Ouvrez [contacts.google.com](https://contacts.google.com/) et connectez-vous avec le compte qui doit recevoir les contacts.'
  - 'Cliquez sur **Importer** dans le menu de gauche, puis sur **Sélectionner un fichier**, choisissez le fichier et cliquez sur **Importer**.'
  - 'Les contacts importés reçoivent un libellé portant la date, du type « Importé le 04/11/2026 » (Imported on…). Ouvrez **Fusionner et corriger** (Merge & fix) pour regrouper les doublons avec les contacts que vous aviez déjà.'
faq:
  - q: 'VCF ou CSV Google : lequel convient le mieux à Google ?'
    a: 'Les deux s’importent entièrement. La vCard conserve les types de téléphone et d’e-mail et fonctionne aussi avec d’autres applications ; le CSV Google est pratique si vous voulez consulter ou modifier la liste dans un tableur avant l’import.'
  - q: 'Combien de contacts peut-on importer ?'
    a: 'Google demande de découper les fichiers de plus de 3 000 contacts, et un compte contient au maximum 25 000 contacts (environ 20 Mo sans les photos). Découpez les listes plus longues en plusieurs fichiers.'
  - q: 'Comment annuler un import ?'
    a: 'Cliquez sur le libellé « Importé le … » dans le menu de gauche, sélectionnez tous ses contacts (case à cocher en haut) et supprimez-les. Ils restent 30 jours dans la corbeille.'
  - q: 'Les contacts importés n’apparaissent pas sur mon téléphone.'
    a: 'Vérifiez que le téléphone synchronise ce compte Google : sur Android, Paramètres → Mots de passe et comptes → Google → Synchronisation du compte → Contacts ; sur iPhone, Réglages → Apps → Contacts → Comptes → Gmail → activez Contacts.'
related: [import-android, import-iphone, google-contacts-csv-to-vcf, google-sheets-to-vcf, home, bulk-add-contacts]
updated: 2026-11-04
---

## Importer pas à pas

1. Allez sur [contacts.google.com](https://contacts.google.com/) depuis un ordinateur.
2. Dans le menu de gauche, cliquez sur **Importer**.
3. Cliquez sur **Sélectionner un fichier** et choisissez le .vcf ou le .csv.
4. Cliquez sur **Importer**.

Google ajoute chaque contact importé à un nouveau libellé portant la date de l’import. Il est ainsi facile de vérifier le résultat, ou de supprimer tout le lot si quelque chose s’est mal passé.

## Les limites à connaître

| Limite | Valeur |
| --- | --- |
| Contacts par fichier importé | environ 3 000 ; découpez les fichiers plus gros |
| Contacts par compte | 25 000 |
| Espace pour les contacts | 20 Mo (photos non comptées) |
| Un contact | jusqu’à 128 Ko, 500 champs |

Le convertisseur écrit un seul fichier, quel que soit le nombre de contacts. Au-delà de 3 000 lignes, filtrez le tableau en plusieurs parties et convertissez chacune, ou importez le même .vcf sur un téléphone Android, qui n’a pas de limite par fichier.

## Doublons

Google ne fusionne rien à l’import. Si vous importez deux fois la même personne, vous obtenez deux fiches. Deux façons de l’éviter :

- **avant** l’import : ouvrez l’onglet *Doublons* du convertisseur et cochez « Fusionner » ; les personnes ayant le même numéro ou le même e-mail deviennent une seule fiche ;
- **après** l’import : Google Contacts → **Fusionner et corriger** propose les doublons de tout votre compte.

## Numéros de téléphone

Google enregistre les numéros comme du texte, tels qu’ils ont été importés. Les numéros au format international (`+33 6 12 34 56 78`) s’affichent correctement dans tous les pays, et les messageries peuvent les reconnaître. Les numéros sans indicatif sont interprétés selon la région du téléphone et peuvent être faux à l’étranger. C’est pourquoi le convertisseur écrit par défaut des numéros commençant par `+`.
