---
url: confidentialite
title: 'Confidentialité — csvtovcf'
h1: 'Confidentialité'
description: 'Vos contacts sont traités sur votre appareil et jamais envoyés. Ce que csvtovcf conserve, quels journaux existent, quels services tiers sont utilisés et pourquoi.'
lead: 'En bref : vos fichiers ne quittent jamais votre appareil. Le site n’a pas de comptes, ne dépose aucun cookie de suivi et ne voit ni les noms, ni les numéros, ni les en-têtes de colonnes que vous convertissez.'
nav: 'Confidentialité'
summary: 'Ce qui est traité où, ce qui est journalisé, quels services sont utilisés.'
updated: 2026-11-04
---

## Vos fichiers

- Les fichiers que vous déposez, choisissez ou collez sont lus par votre navigateur et traités dans un **Web Worker sur votre appareil**. Ils ne sont ni envoyés, ni stockés sur un serveur, ni partagés avec qui que ce soit.
- Vous pouvez le vérifier : ouvrez les outils de développement de votre navigateur, onglet Réseau, et convertissez un fichier. Pendant la conversion, le convertisseur ne charge que son propre code depuis csvtovcf.com (le lecteur de tableurs est téléchargé la première fois que vous ouvrez un fichier Excel). Aucune requête ne contient vos données.
- La Content-Security-Policy du site limite les connexions réseau à csvtovcf.com lui-même. Si la mesure d’audience est activée, elle autorise aussi le compteur anonyme décrit plus bas. Les scripts de mesure d’audience ne reçoivent jamais de données du convertisseur.
- Quand vous fermez ou rechargez l’onglet, les données disparaissent. Rien n’est écrit dans le stockage de votre navigateur.

## Ce que voit le serveur

Le serveur fournit les pages et tient un journal d’accès standard : adresse IP, heure, page demandée, type de navigateur et page de provenance. Ce journal sert à assurer le fonctionnement du service et à empêcher les abus. Il est conservé 14 jours au maximum et n’est croisé avec aucune autre donnée. Il ne contient jamais vos fichiers, puisqu’ils ne sont jamais envoyés.

## Stockage dans votre navigateur

- `localStorage` : votre choix de thème de couleurs (clair, sombre ou automatique), si vous l’avez modifié.
- `sessionStorage` : le fait que vous avez fermé l’avis « cette page existe dans votre langue ».
- Un service worker met en cache les fichiers du site pour que le convertisseur fonctionne hors ligne. Il ne met jamais en cache vos fichiers ni vos résultats.

csvtovcf ne dépose lui-même aucun cookie.

## Mesure d’audience

Par défaut, le site fonctionne **sans mesure d’audience**. Si elle est activée, nous utilisons Plausible Analytics : pas de cookies, pas de données personnelles, et les adresses IP ne sont pas conservées. Seuls les pages vues et un événement anonyme par conversion sont comptés. Cet événement enregistre la version vCard, le format de sortie, le type de source détecté (par exemple « CSV Google ») et le nombre de contacts sous forme de tranche (par exemple « 11–100 »). Les noms, numéros, adresses, noms de fichiers et en-têtes de colonnes ne sont jamais envoyés.

## Publicité

La publicité est actuellement **désactivée**. Si elle est activée, les annonces n’apparaîtront qu’en dehors du convertisseur. Dans l’Espace économique européen, au Royaume-Uni et en Suisse, la fenêtre de consentement certifiée de Google vous demandera votre choix avant l’utilisation de tout cookie publicitaire. Les scripts publicitaires ne peuvent pas lire vos données de contact, car elles se trouvent dans le Web Worker et non dans la page. Cette page indiquera le fournisseur publicitaire avant la mise en ligne des annonces.

## Liens vers d’autres sites

Les guides renvoient vers les pages d’aide d’Apple, de Google et de Microsoft, et le pied de page renvoie vers d’autres outils du même auteur. Ces sites ont leur propre politique de confidentialité.

## Vos droits et contact

Comme nous ne collectons aucune donnée personnelle par le convertisseur, il n’y a rien à consulter, exporter ou supprimer. Pour toute question sur les journaux du serveur ou sur cette page, écrivez à **hello@csvtovcf.com**. Vous avez aussi le droit d’introduire une réclamation auprès de votre autorité de protection des données.
