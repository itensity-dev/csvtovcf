---
url: convertir-csv-outlook-en-vcf
title: 'Convertir un CSV Outlook en VCF : contacts Outlook en vCard'
h1: 'Convertir un CSV Outlook en VCF'
description: 'Convertissez les contacts exportés d’Outlook (CSV, toutes langues) en un seul fichier VCF pour iPhone, Android ou Gmail. En-têtes français et encodages Windows reconnus.'
lead: 'Transforme un export de contacts Outlook en un seul .vcf. Fonctionne avec des en-têtes en français, en anglais, en allemand, en russe et dans d’autres langues d’Outlook, ainsi qu’avec les encodages Windows qu’Outlook utilise.'
nav: 'CSV Outlook en VCF'
summary: 'Export de contacts Outlook (CSV, toutes langues) en un seul fichier vCard.'
steps:
  - 'Exportez depuis Outlook. Outlook classique : Fichier → Ouvrir et exporter → Importer/Exporter → Exporter des données vers un fichier → Valeurs séparées par une virgule → Contacts. Nouvel Outlook et Outlook.com : Contacts (People) → Gérer les contacts (Manage contacts) → Exporter des contacts (Export contacts).'
  - 'Déposez le .csv ci-dessus. Le convertisseur détecte l’encodage (Outlook écrit souvent en Windows-1252 ou 1251, pas en UTF-8) et le séparateur (le point-virgule `;`, fréquent avec un Windows ou un Excel en français).'
  - 'Vérifiez l’association : dans Outlook, la colonne `Titre` (`Title` en anglais) contient la civilité (M., Mme, Dr) et `Fonction` (`Job Title`) le poste occupé. Les colonnes vides (Outlook en exporte environ 90) sont masquées.'
  - 'Téléchargez le .vcf et importez-le sur l’[iPhone](/fr/importer-vcf-sur-iphone/) ou sur [Android](/fr/importer-vcf-sur-android/).'
features:
  - feature: 'Versions d’Outlook'
    value: 'Exports CSV d’Outlook classique pour Windows (2010–2024, Microsoft 365), du nouvel Outlook, d’Outlook.com et d’Outlook pour Mac.'
  - feature: 'Langues des en-têtes'
    value: 'Français (`Prénom`, `Tél. mobile`, `Téléphone (bureau)`), anglais, allemand (`Vorname`, `Telefon geschäftlich`), russe (`Имя`, `Рабочий телефон`), espagnol, portugais, italien, néerlandais, polonais, turc.'
  - feature: 'Téléphones'
    value: 'Les colonnes bureau, domicile, mobile, principal, société, fax et radiomessagerie gardent leur type ; voiture, rappel, RNIS et radio deviennent « autre ».'
  - feature: 'Adresses'
    value: 'Rue, ville, région, code postal et pays des adresses bureau, domicile et autre deviennent trois entrées `ADR` typées ; les lignes de rue 2 et 3 sont regroupées.'
  - feature: 'Valeurs vides'
    value: 'Outlook écrit les dates vides sous la forme `0/0/00` : elles sont ignorées, et non transformées en an 2000.'
  - feature: 'Non repris'
    value: 'Photos, indicateurs, « Internet Free Busy », champs utilisateur 1 à 4 (associez-les à la note si besoin).'
faq:
  - q: 'Outlook sait enregistrer un contact en vCard. Pourquoi convertir le CSV ?'
    a: 'Outlook enregistre une vCard par contact ; il n’existe pas d’export de tous les contacts dans un seul .vcf. L’export CSV contient tout le monde, et cette page le transforme en un seul fichier .vcf, ou en ZIP avec une fiche par contact.'
  - q: 'Mon export a des en-têtes en français (ou en allemand, en russe…). Est-ce que cela fonctionne ?'
    a: 'Oui. Outlook classique écrit les en-têtes dans la langue de son interface, et le convertisseur les connaît. Le panneau du fichier affiche « CSV Outlook, en-têtes localisés » et la langue détectée.'
  - q: 'Pourquoi « M. » apparaît-il dans le nom ?'
    a: 'La colonne `Titre` d’Outlook (`Title` en anglais) contient la civilité ; elle est donc écrite dans le préfixe du nom. Si vous n’en voulez pas sur le téléphone, réglez cette colonne sur *ignorer*.'
  - q: 'Les noms sortent en `HÃ©lÃ¨ne` ou avec des points d’interrogation.'
    a: 'L’encodage a été mal lu. Choisissez celui qu’Outlook a utilisé : Windows-1252 pour le français et les autres langues d’Europe de l’Ouest, Windows-1251 pour le cyrillique, Windows-1250 pour l’Europe centrale. L’aperçu se met à jour immédiatement. [Plus d’informations sur les noms illisibles](/fr/corriger-noms-contacts-illisibles/).'
related: [google-contacts-csv-to-vcf, import-outlook, home, garbled-contacts, import-iphone, excel-to-vcf]
updated: 2026-11-04
---

Outlook exporte les contacts dans un CSV de 90 colonnes environ : trois adresses, dix-neuf champs de téléphone, trois e-mails, des champs utilisateur et bien d’autres. Pour la plupart des contacts, la majorité de ces colonnes sont vides. Le convertisseur masque les colonnes vides, associe les autres aux champs vCard et écrit une fiche par contact.

**En-têtes localisés.** Outlook classique nomme les colonnes dans la langue de son interface. La documentation de Microsoft précise que, pour l’import, la langue des en-têtes doit correspondre à celle d’Outlook : un Outlook en français écrit donc `Prénom`, `Nom`, `Tél. mobile`. Le convertisseur reconnaît ces en-têtes à leurs mots, et non d’après une liste figée. C’est pourquoi `Téléphone (bureau)`, `Telefon geschäftlich` et `Рабочий телефон` deviennent tous un téléphone professionnel.

Extrait simplifié d’un export d’Outlook en français (un vrai export contient bien plus de colonnes, dans un autre ordre) :

```text
Prénom;Nom;Tél. mobile;Téléphone (bureau);Adresse de messagerie;Société;Fonction;Anniversaire
François;Martin;06 12 34 56 78;01 23 45 67 89;francois@example.fr;Martin SARL;Gérant;17/05/1990
```

**Les champs qui piègent les autres convertisseurs.**

- `Titre` (`Title`) est la civilité (M., Mme, Dr) ; `Fonction` (`Job Title`) est le poste.
- `Anniversaire` (`Birthday`) est la date de naissance.
- Les trois colonnes de rue de l’adresse professionnelle (`Business Street`, `Business Street 2`, `Business Street 3` dans un Outlook en anglais) forment une seule adresse.
- Le type d’e-mail (`SMTP`) et le nom d’affichage de l’e-mail ne sont pas des adresses : ils sont ignorés.
- Une date de naissance `0/0/00` signifie « pas de date de naissance ».

**Encodages.** Outlook classique écrit souvent le CSV dans la page de code Windows de votre système, pas en UTF-8, et un CSV réenregistré par un Excel en français utilise des points-virgules. Les deux sont détectés. Si les noms paraissent faux, changez l’encodage dans le panneau du fichier et regardez l’aperçu changer.

**Retour vers Outlook ?** Pour faire entrer des contacts *dans* Outlook, le CSV est la voie la plus sûre : Outlook classique importe un .vcf à plusieurs contacts une fiche à la fois. Choisissez « CSV Outlook » dans *Format de sortie*. Ce CSV utilise les en-têtes anglais d’Outlook ; avec un Outlook en français, vérifiez la correspondance avec **Mapper les champs personnalisés** (Map Custom Fields) dans l’assistant d’importation. [Guide d’importation dans Outlook](/fr/importer-contacts-dans-outlook/).
