---
url: importer-contacts-dans-outlook
title: 'Importer des contacts dans Outlook (fichier VCF ou CSV)'
h1: 'Importer des contacts dans Outlook'
description: 'Importez beaucoup de contacts dans Outlook : CSV pour le nouvel Outlook, Outlook.com et Outlook classique (un .vcf multiple y passe fiche par fiche), et Outlook pour Mac.'
lead: 'Pour Outlook, le CSV est la voie de l’import en masse. Le nouvel Outlook et Outlook.com n’importent que du CSV, et Outlook classique demande de confirmer chaque fiche d’un .vcf à plusieurs contacts. Le convertisseur produit les deux formats.'
nav: 'Importer dans Outlook'
summary: 'CSV pour le nouvel Outlook et Outlook.com, CSV ou vCard pour Outlook classique et Mac.'
steps:
  - 'Dans le [convertisseur](/fr/), choisissez **CSV Outlook** dans *Format de sortie* et téléchargez le fichier.'
  - '**Nouvel Outlook / Outlook.com :** Contacts (People) → **Gérer les contacts** (Manage contacts) → **Importer des contacts** (Import contacts) → Parcourir → choisissez le CSV → **Importer**.'
  - '**Outlook classique pour Windows :** Fichier → **Ouvrir et exporter** → **Importer/Exporter** → *Importer à partir d’un autre programme ou fichier* → *Valeurs séparées par une virgule* → choisissez le fichier et le traitement des doublons → choisissez le dossier **Contacts** → **Terminer**.'
  - 'Vérifiez quelques contacts. Si des champs manquent, relancez l’import et utilisez **Mapper les champs personnalisés** (Map Custom Fields) à la dernière étape de l’assistant.'
faq:
  - q: 'Pourquoi ne pas importer le .vcf dans Outlook ?'
    a: 'Le nouvel Outlook et Outlook.com n’importent pas de fichiers vCard. Outlook classique ouvre un .vcf à plusieurs contacts une fiche à la fois : vous confirmez chaque fiche, et des utilisateurs signalent souvent que seul le premier contact arrive. Microsoft recommande lui-même de passer par le CSV pour de nombreux contacts.'
  - q: 'Mon Outlook est en français. Les en-têtes CSV en anglais vont-ils fonctionner ?'
    a: 'Microsoft indique que la langue des en-têtes du CSV doit correspondre à celle d’Outlook. Si des champs restent vides après l’import, utilisez **Mapper les champs personnalisés** dans l’assistant d’importation et faites glisser chaque colonne vers son champ Outlook : Mobile Phone → Tél. mobile, Business Phone → Téléphone (bureau), etc.'
  - q: 'Les noms s’affichent en `Ã©` ou en `???` après l’import.'
    a: 'Outlook classique lit parfois mal les CSV en UTF-8. Essayez la voie .vcf avec quelques contacts pour vérifier, ou ouvrez le CSV dans Excel, enregistrez-le au format « CSV (séparateur: point-virgule) » de votre Windows en français, puis importez ce fichier.'
  - q: 'Comment importer dans Outlook pour Mac ?'
    a: 'Faites glisser le .vcf sur Contacts, ou passez par Fichier → Importer. Microsoft précise que seul le premier contact s’affiche dans la fenêtre, mais que chaque contact de la vCard est enregistré.'
related: [outlook-csv-to-vcf, import-google-contacts, import-iphone, home, garbled-contacts, what-is-vcf]
updated: 2026-11-04
---

## Quel fichier pour quel Outlook

| Outlook | Fichier conseillé | Chemin |
| --- | --- | --- |
| Nouvel Outlook pour Windows, Outlook.com, Outlook sur le web | CSV Outlook | Contacts → Gérer les contacts → Importer des contacts |
| Outlook classique pour Windows (2016–2024, Microsoft 365) | CSV Outlook | Fichier → Ouvrir et exporter → Importer/Exporter |
| Outlook pour Mac | .vcf (vCard 3.0) | Glisser sur Contacts, ou Fichier → Importer |
| Un seul contact, dans n’importe quel Outlook | .vcf | Ouvrir le fichier → Enregistrer et fermer |

## Outlook classique : l’assistant d’importation

1. **Fichier** → **Ouvrir et exporter** → **Importer/Exporter**.
2. Choisissez **Importer à partir d’un autre programme ou fichier** → **Suivant**.
3. Choisissez **Valeurs séparées par une virgule** → **Suivant**.
4. Sélectionnez le CSV avec **Parcourir**. Choisissez le traitement des doublons : *Remplacer les doublons par les éléments importés*, *Autoriser la création de doublons* ou *Ne pas importer les éléments en double* → **Suivant**.
5. Sélectionnez le dossier **Contacts** du bon compte → **Suivant**.
6. Cochez l’action pour le fichier. Si Outlook n’est pas en anglais, cliquez sur **Mapper les champs personnalisés**, vérifiez que chaque colonne arrive dans le bon champ, puis **OK** → **Terminer**.

## Contenu du CSV Outlook produit par le convertisseur

Les colonnes portent les noms d’Outlook en anglais : `First Name`, `Last Name`, `Mobile Phone`, `Business Phone`, `E-mail Address`, `Company`, `Job Title`, `Business Street`, `Birthday`, etc. Dans un Outlook en français, les champs correspondants s’appellent `Prénom`, `Nom`, `Tél. mobile`, `Téléphone (bureau)`, `Adresse de messagerie`, `Société`, `Fonction` et `Anniversaire` (la date de naissance) : c’est cette correspondance qu’il faut vérifier dans **Mapper les champs personnalisés**.

Les téléphones vont dans l’emplacement qui correspond à leur type. Les numéros supplémentaires vont dans *Other Phone*, *Car Phone* et *Callback*. Ce qui ne trouve pas de place (un quatrième e-mail, une quatrième adresse) est ajouté aux *Notes* plutôt que perdu. Les dates de naissance sont écrites au format `M/J/AAAA` (le mois d’abord), celui des exports d’Outlook en anglais.

## Si vous n’avez que quelques contacts

Ouvrez chaque .vcf (choisissez « ZIP, un .vcf par contact » dans le convertisseur). Outlook affiche la fenêtre du contact ; cliquez sur **Enregistrer et fermer**. C’est acceptable pour dix contacts, fastidieux pour mille.
