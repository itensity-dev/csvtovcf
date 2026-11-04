---
url: excel-numeros-telephone-e11
title: 'Numéros de téléphone en E+10 ou E+11 dans Excel : cause et solution'
h1: 'Pourquoi Excel affiche les numéros de téléphone en E+10 ou E+11'
description: 'Excel affiche les longs nombres en notation scientifique et les enregistre ainsi en CSV : des chiffres sont perdus. Récupérer les numéros complets et éviter le problème.'
lead: 'Excel affiche en notation scientifique les nombres de 12 chiffres ou plus, et les plus courts dès que la colonne est trop étroite : `33612345678` (un portable français sans son « + ») devient `3,36123E+10`. Ce n’est qu’un format d’affichage, jusqu’à ce que vous enregistriez un CSV : Excel écrit alors le texte raccourci, et les chiffres manquants disparaissent du fichier.'
nav: 'Numéros en E+10 dans Excel'
summary: 'Notation scientifique, chiffres perdus, zéros disparus : causes et solutions.'
faq:
  - q: 'Peut-on récupérer les numéros d’origine d’un CSV en 3,36123E+10 ?'
    a: 'Non. Le CSV ne contient que les chiffres affichés, par exemple `3,36123E+10` ; le reste n’est pas dans le fichier. Revenez au classeur Excel (où le nombre complet est encore stocké) ou à la source d’origine.'
  - q: 'Pourquoi le zéro initial a-t-il disparu ?'
    a: 'Excel traite `0612345678` saisi dans une cellule au format Standard comme le nombre 612345678, et un nombre n’a pas de zéro initial. Il en va de même pour le `+` des numéros internationaux. Mettez la colonne au format Texte avant de saisir ou de coller les numéros.'
  - q: 'Le convertisseur corrige-t-il ces numéros ?'
    a: 'Quand c’est possible. Les numéros auxquels il manque le 0 initial ou le `+` sont complétés avec le pays choisi et vérifiés avec son plan de numérotation. Une notation scientifique où tous les chiffres ont survécu (`3,3612345678E+10`) est restaurée. Un `3,36123E+10` aux chiffres perdus est signalé dans le rapport, jamais deviné.'
  - q: 'Existe-t-il un réglage Excel pour l’empêcher ?'
    a: 'Dans Microsoft 365 pour Windows : Fichier → Options → Données → Conversion automatique des données (Automatic data conversion). Décochez l’option qui conserve les 15 premiers chiffres des nombres longs et les affiche en notation scientifique (Keep first 15 digits of long numbers…) et celle qui supprime les zéros non significatifs (Remove leading zeros). Le réglage s’applique aux nouvelles données que vous saisissez ou ouvrez.'
related: [excel-to-vcf, xlsx-to-vcf, home, garbled-contacts, bulk-add-contacts, google-sheets-to-vcf]
updated: 2026-11-04
---

## Ce qui se passe, étape par étape

1. **Saisie ou collage.** Un numéro de téléphone saisi dans une cellule au format par défaut, *Standard*, est stocké comme un nombre. Le `0` initial et le `+` disparaissent aussitôt : `+33612345678` → 33612345678.
2. **Affichage.** Au format Standard, Excel affiche en notation scientifique les nombres de 12 chiffres ou plus, et les plus courts si la colonne est trop étroite : `3,36123E+10`. Dans la cellule, le nombre complet est toujours stocké (Excel conserve jusqu’à 15 chiffres significatifs).
3. **Enregistrement en CSV.** Un CSV est du texte brut, et Excel écrit chaque cellule telle qu’elle est *affichée*. Le fichier contient désormais `3,36123E+10`, et les derniers chiffres `45678` ont disparu. Microsoft documente ce comportement depuis Excel 97.

C’est l’étape 3 qui détruit les données. Avant elle, le numéro peut encore être sauvé.

## Comment sauver les numéros

- **Utilisez le classeur, pas le CSV.** Déposez le .xlsx ou le .xls dans le [convertisseur Excel en VCF](/fr/convertir-excel-en-vcf/) : il lit les nombres stockés, pas leur affichage.
- **Ou élargissez la colonne et changez son format.** Sélectionnez la colonne → Format de cellule → **Nombre** avec 0 décimale (ou un format personnalisé `0`). Tous les chiffres réapparaissent ; enregistrez de nouveau en CSV.
- **Si vous n’avez que le CSV,** les chiffres perdus sont irrécupérables. Retrouvez la liste d’origine.

## Comment l’éviter

- **Mettez la colonne des téléphones au format Texte avant de saisir les numéros** (Accueil → Format de nombre → Texte). `+33 6 12 34 56 78` reste alors exactement tel que saisi, avec le plus et les espaces.
- **Importez les CSV comme du texte** au lieu de les ouvrir par double-clic : Données → À partir d’un fichier texte/CSV → *Transformer les données* → réglez la colonne des téléphones sur *Texte*.
- **Microsoft 365 :** Fichier → Options → Données → *Conversion automatique des données* : désactivez la suppression des zéros non significatifs et la conservation de 15 chiffres seulement en notation scientifique.
- **Gardez les numéros au format international** (`+…`) dans la source. Ils se conservent mieux stockés en texte.

## Ce que fait le convertisseur des numéros abîmés

| Dans le fichier | Résultat | Signalé comme |
| --- | --- | --- |
| `612345678` + pays France | `+33612345678` | valide |
| `33612345678` (sans `+`) | `+33612345678` | « + manquant ajouté » |
| `3,3612345678E+10` | `+33612345678` | « restauré depuis la notation Excel » |
| `3,36123E+10` | écrit tel quel | « détruit par Excel », en rouge |

Les numéros abîmés ne sont jamais « complétés » avec des chiffres inventés. Ils sont signalés sur la fiche et listés dans l’onglet *Avertissements* avec leur numéro de ligne, pour que vous puissiez les corriger dans la source.
