# Versionner le portfolio

Le dépôt suit une stratégie légère inspirée de Conventional Commits et Semantic Versioning.

- `feat:` pour une nouvelle fonctionnalité ; `fix:` pour une correction ; `refactor:` pour une réorganisation sans changement fonctionnel ; `docs:` pour la documentation.
- Incrément majeur pour une rupture, mineur pour une fonctionnalité compatible, correctif pour une réparation.
- Les tags de release sont annotés et préfixés par `v` (ex. `v1.0.0`). Chaque release est décrite dans `CHANGELOG.md`.

Exemple de release :

```sh
git add src index.html package.json package-lock.json tsconfig.json
git commit -m "feat: structurer le portfolio en MVC TypeScript"
git tag -a v1.0.0 -m "Portfolio immersif 1.0.0"
```

Développement local : `npm install`, puis `npm run dev`. Vérification de production : `npm run build`; aperçu du résultat : `npm run preview`.
