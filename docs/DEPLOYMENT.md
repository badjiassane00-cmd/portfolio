# Déployer sur Render

Le dépôt contient un Blueprint Render (`render.yaml`) pour publier le portfolio comme site statique.

1. Dans Render, créer un **Blueprint** et connecter le dépôt GitHub `badjiassane00-cmd/portfolio`.
2. Choisir la branche `main`, puis appliquer le Blueprint du dépôt.
3. Render exécute `npm ci && npm run build` et publie `dist/`.
4. Une fois le premier déploiement terminé, associer un domaine personnalisé depuis les paramètres du site si souhaité.

Les prochains commits poussés sur `main` déclenchent le déploiement automatiquement. Le fichier `.node-version` fixe la version de Node utilisée au build. Les fichiers statiques référencés par chemin sont dans `public/assets`, que Vite recopie dans `dist/assets`.

Le site ne nécessite aucune variable d’environnement ni processus serveur : il est servi comme un frontend statique derrière le CDN Render.
