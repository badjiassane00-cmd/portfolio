# Journal des versions

Les changements suivent [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) et les versions [Semantic Versioning](https://semver.org/lang/fr/).

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
