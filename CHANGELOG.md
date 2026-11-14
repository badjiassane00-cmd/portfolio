# Journal des versions

Les changements suivent [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) et les versions [Semantic Versioning](https://semver.org/lang/fr/).

## [1.2.1] - 2026-11-14

### Modifié
- Vidéo de présentation remontée dans la section d’accueil, avec aperçu portrait et lecteur modal à chargement différé.
- Compétences affichées alignées sur les technologies effectivement listées dans le CV fourni.
- Contact simplifié autour d’un lien e-mail direct et d’une action de copie; formulaire conservé comme option secondaire.
- Positionnement Développeur Web & Mobile rendu explicite dès l’accueil et équilibré dans la présentation des domaines.
- Animation d’apparition retirée des éléments principaux de l’accueil afin que le contenu reste lisible au premier affichage.

### Ajouté
- Icônes dédiées à Node.js, Sequelize, Prisma et Postman.

## [1.2.0] - 2026-11-14

### Ajouté
- Retour de la vidéo de présentation, conservée dans le dépôt original et copiée dans les assets servis par Render. Son lecteur natif ne charge le média qu’à la lecture.
- Mode immersif WebGL original, avec scènes Web, Mobile, vidéo, projets, identité et contact, pilotage au scroll, touches, curseur et gestes tactiles.
- Accès direct au parcours classique, sortie immédiate du mode immersif et solution visuelle de repli si WebGL est indisponible.
- Présentation distincte des domaines Web et Mobile, sans attribuer de framework mobile non confirmé.

## [1.1.0] - 2026-11-14

### Modifié
- Refonte éditoriale responsive de l’accueil, des sections À propos, Expertise, Projets et Contact, avec une identité AB cohérente.
- Projets réorganisés en cartes et fiches détaillées, à partir des dépôts, captures et descriptions disponibles.
- Compétences classées en catégories Front-end, Back-end, Données et Outils.

### Ajouté
- Navigation mobile accessible, commandes de thème, filtres, fiches avec navigation précédente/suivante et bouton de retour en haut.
- Formulaire validé qui prépare un e-mail via le client de messagerie, sans dépendance à un service externe.
- Métadonnées Open Graph et Twitter, données structurées, favicon, robots.txt et sitemap.xml.
- Réglages responsive et prise en compte de prefers-reduced-motion.

## [1.0.4] - 2026-10-11

### Ajouté
- Configuration Render Blueprint pour déployer le portfolio en site statique depuis `main`.
- Version Node fixée à 24.21.0 pour correspondre aux prérequis de Vite 8.

### Corrigé
- Assets déplacés dans `public/assets` afin que Vite les copie dans le build de production.
- Typage sécurisé des mots animés pour que la vérification TypeScript passe.

## [1.0.3] - 2026-10-11

### Modifié
- Photo de contact affichée en couleurs et avec une meilleure visibilité, y compris sur mobile.
- Vignettes des projets remplacées par des captures optimisées des déploiements TERRA, Patrimoine et PrestaLink.
- Carte du projet PrestaLink renommée pour correspondre à la marque affichée sur son site.

## [1.0.2] - 2026-10-11

### Modifié
- Allègement de l’accueil : retrait des libellés de marque, de l’accroche stack, du titre descriptif et de la signature datée. Le contrôle vidéo reste disponible sous forme d’icône accessible.

## [1.0.1] - 2026-10-11

### Corrigé
- Le prénom du titre d’accueil a été remplacé par « Badji ».

## [1.0.0] - 2026-10-11

### Ajouté
- Architecture TypeScript organisée en modèle, vue et contrôleur.
- Catalogue de technologies généré depuis des données typées, avec icônes individuelles.
- Projets générés depuis le modèle, liens de démo et dépôts associés.
- Configuration Vite, compilation TypeScript stricte et scripts npm.
- Conservation des interactions immersives : vidéo, parallaxe, révélations au scroll, thèmes et cartes dynamiques.
