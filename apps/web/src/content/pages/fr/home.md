---
url: ''
title: 'Convertir CSV en VCF (vCard) gratuitement, sans envoi de fichier'
h1: 'Convertir un fichier CSV en VCF (vCard)'
description: 'Convertissez une liste de contacts CSV ou Excel en fichier VCF (vCard 3.0, 4.0 ou 2.1) pour iPhone, Android, Google Contacts et Outlook. Dans le navigateur, sans envoi.'
lead: 'Transforme un tableau de contacts en un seul fichier .vcf que l’iPhone, Android, Google Contacts et Outlook savent importer : colonnes associées, numéros nettoyés, doublons repérés. Le fichier est lu sur cet appareil et n’est jamais envoyé.'
nav: 'CSV en VCF'
summary: 'N’importe quel tableau de contacts en fichier .vcf, avec association des colonnes et nettoyage des numéros.'
steps:
  - 'Déposez votre fichier CSV, Excel ou ODS dans le cadre ci-dessus, ou collez des cellules depuis Google Sheets. L’encodage et le séparateur sont détectés ; si l’aperçu affiche des symboles comme `Ã©` au lieu des lettres accentuées, choisissez un autre encodage.'
  - 'Vérifiez l’association des colonnes. Chaque colonne est reliée à un champ vCard ; celles marquées **incertain** méritent un coup d’œil. Les colonnes réglées sur « ignorer » ne sont pas exportées.'
  - 'Choisissez le pays des numéros écrits sans indicatif. Les numéros sont enregistrés sous la forme `+33612345678` : ils fonctionnent depuis n’importe quel pays et les messageries les reconnaissent.'
  - 'Téléchargez le .vcf (vCard 3.0, sauf si un appareil demande autre chose) puis importez-le : [iPhone](/fr/importer-vcf-sur-iphone/), [Android](/fr/importer-vcf-sur-android/), [Google Contacts](/fr/importer-vcf-dans-google-contacts/), [Outlook](/fr/importer-contacts-dans-outlook/).'
features:
  - feature: 'Entrée'
    value: 'CSV, TSV et TXT avec n’importe quel séparateur (virgule, point-virgule, tabulation, barre verticale, ligne `sep=` d’Excel) ; XLSX, XLS, ODS avec choix de la feuille ; cellules collées depuis Google Sheets ou Excel. Plusieurs fichiers à la fois.'
  - feature: 'Encodages'
    value: 'UTF-8 avec ou sans BOM, UTF-16, Windows-1250 à 1258, KOI8-R, ISO-8859, Mac Roman, Shift_JIS, GB18030, Big5, EUC-KR. Détection automatique ; changement possible avec aperçu immédiat.'
  - feature: 'Exports reconnus'
    value: 'CSV de Google Contacts (format actuel et ancien), CSV d’Outlook avec en-têtes en anglais, allemand, français, russe, espagnol, portugais ou turc, Connections.csv de LinkedIn, simples listes « nom + téléphone » avec ou sans ligne d’en-têtes.'
  - feature: 'Numéros de téléphone'
    value: 'Mis au format international selon les règles de libphonenumber ; les numéros mobiles sont typés « mobile ». Les numéros non valides sont conservés et signalés. Les `3,36123E+10` d’Excel et les numéros enregistrés sans « + » sont détectés.'
  - feature: 'Noms'
    value: 'Un nom complet saisi dans une seule cellule est séparé en prénom, deuxième prénom et nom, y compris « Nom, Prénom », les patronymes russes, les doubles noms espagnols et les particules comme *de*, *du* ou *van*.'
  - feature: 'Doublons'
    value: 'Repérés par numéro de téléphone et par e-mail. La fusion est facultative ; vous voyez les groupes avant de télécharger.'
  - feature: 'Sortie'
    value: 'vCard 3.0 (par défaut), 4.0 ou 2.1 ; un seul .vcf ou un ZIP avec un fichier par contact ; CSV Google Contacts ; CSV Outlook.'
  - feature: 'Volume'
    value: 'Testé avec 100 000 lignes : quelques secondes sur un ordinateur portable. Aucune limite de lignes ; la seule limite est la mémoire de votre appareil.'
  - feature: 'Confidentialité'
    value: 'Aucun envoi, aucun compte, aucun suivi du contenu des fichiers. Fonctionne hors ligne après la première visite.'
  - feature: 'Non pris en charge'
    value: 'Photos des contacts (un tableau n’en contient pas), fichiers Apple Numbers (exportez-les d’abord en CSV), fichiers Excel protégés par mot de passe.'
faq:
  - q: 'Ma liste de contacts est-elle envoyée quelque part ?'
    a: 'Non. Votre navigateur lit le fichier, et un Web Worker sur votre appareil le convertit. Pour le vérifier, ouvrez les outils de développement (F12), onglet Réseau, puis convertissez un fichier : aucune requête ne contient vos données. Après la première visite, le convertisseur fonctionne aussi sans connexion internet.'
  - q: 'Quelle version de vCard choisir ?'
    a: 'vCard 3.0. L’iPhone, Android, Google Contacts et Outlook l’importent tous. Ne prenez la 4.0 que si une application la demande, et la 2.1 pour les anciens téléphones (téléphones à touches, vieux Nokia ou Sony Ericsson) qui affichent des caractères illisibles avec la 3.0.'
  - q: 'Pourquoi mes numéros s’affichent-ils en 3,36123E+10 ?'
    a: 'Excel a affiché le long nombre en notation scientifique et le CSV a été enregistré ainsi : les chiffres d’origine ne sont plus dans le fichier. Mettez la colonne des téléphones au format Texte dans Excel et exportez de nouveau, ou déposez directement le fichier .xlsx, qui contient encore le numéro complet. [Pourquoi cela arrive](/fr/excel-numeros-telephone-e11/).'
  - q: 'Les noms avec accents, lettres cyrilliques ou arabes sont-ils conservés ?'
    a: 'Oui, si l’encodage est bien lu. Le convertisseur le détecte et affiche les premières lignes ; si vous voyez `Ã©`, `Ð¸` ou des points d’interrogation, choisissez un autre encodage dans la liste. Le .vcf est toujours écrit en UTF-8, que tous les téléphones actuels savent lire.'
  - q: 'Peut-on ajouter tous les contacts d’un coup sur un iPhone ?'
    a: 'Oui. Envoyez le .vcf à l’iPhone par AirDrop, Mail ou Fichiers, ouvrez-le et touchez « Ajouter tous les contacts ». [Guide pas à pas](/fr/importer-vcf-sur-iphone/).'
  - q: 'Combien de contacts peut-on convertir ?'
    a: 'Le convertisseur n’a pas de limite. Google Contacts accepte jusqu’à 3 000 contacts par fichier importé et 25 000 par compte ; découpez les listes plus longues en plusieurs fichiers.'
  - q: 'Est-ce vraiment gratuit ?'
    a: 'Oui : pas de compte, pas de filigrane, pas de limite de lignes. Le moteur de conversion est open source, sous licence MIT.'
related: [excel-to-vcf, google-contacts-csv-to-vcf, outlook-csv-to-vcf, import-iphone, import-android, garbled-contacts]
updated: 2026-11-04
---

**VCF** (vCard) est le format standard des fiches de contact : tous les téléphones et logiciels de messagerie savent l’importer. Un CSV n’est qu’un tableau, et les téléphones n’importent pas de tableaux. Le convertisseur transforme chaque ligne en une fiche :

```text
BEGIN:VCARD
VERSION:3.0
N:Martin;François;;;
FN:François Martin
TEL;TYPE=CELL:+33612345678
EMAIL;TYPE=INTERNET:francois@example.fr
ORG:Martin SARL
BDAY:1990-05-17
END:VCARD
```

**Pourquoi vCard 3.0 par défaut.** La version 3.0 ([RFC 2426](https://www.rfc-editor.org/rfc/rfc2426)) est celle qu’exportent eux-mêmes l’iPhone, Android et Google Contacts : elle s’importe donc proprement partout. La version 4.0 ([RFC 6350](https://www.rfc-editor.org/rfc/rfc6350)) est plus récente, mais n’apporte rien dont un carnet d’adresses ait besoin. La version 2.1 existe pour les anciens téléphones : le texte accentué ou non latin y est écrit en Quoted-Printable avec `CHARSET=UTF-8`, la seule forme que ces téléphones comprennent.

**Contenu du fichier.** Chaque fiche contient les deux champs obligatoires : `N` (éléments du nom) et `FN` (nom affiché). Si une ligne n’a pas de nom, la société est utilisée, puis l’e-mail, puis le numéro. Le texte est échappé, et les lignes longues sont repliées à 75 octets sans couper une lettre en deux : accents, cyrillique, arabe, chinois et emoji arrivent intacts. Les fins de ligne sont en CRLF, comme l’exige la norme.

**Types de téléphone.** Une colonne intitulée « Portable », « Mobile », « GSM », « Handy » ou « Cep Telefonu » devient `TYPE=CELL`. Pour une colonne générique « Téléphone », c’est le plan de numérotation qui décide : les numéros mobiles deviennent mobiles, les fixes restent « téléphone ».

**Ce que deviennent les autres colonnes.** Les colonnes inutiles peuvent être réglées sur *ignorer*. Les dates que le convertisseur ne sait pas lire ne sont pas perdues : elles vont dans la note. Chaque ligne ignorée est listée avec son numéro de ligne (tel qu’Excel l’affiche) et la raison.

Pour aller plus loin : [ce qu’est un fichier VCF et ce qui distingue les versions](/fr/qu-est-ce-qu-un-fichier-vcf/), [pourquoi les noms importés se transforment en symboles](/fr/corriger-noms-contacts-illisibles/).
