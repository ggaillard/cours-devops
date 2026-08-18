# Déployer un site statique

::: info 🎯 Séance 12 (2/2) · ~1 h 30
À la fin de cette séance, vous savez :

- activer Pages avec la source *GitHub Actions* ;
- écrire un workflow de déploiement en deux jobs (build puis deploy) ;
- diagnostiquer un site publié sans styles.

**Prérequis :** [GitHub Pages](/pages/)

**Livrable attendu :** un site en ligne, republié automatiquement à chaque push sur `main`
:::

On met en place un déploiement **continu** : à chaque push sur `main`, GitHub Actions construit le site et le publie sur GitHub Pages.

## 1. Activer Pages

1. Dépôt → **Settings → Pages**.
2. **Build and deployment → Source** : choisissez **GitHub Actions**.

C'est tout côté réglages : le workflow s'occupe du reste.

## 2. Le workflow de déploiement

Créez `.github/workflows/pages.yml`. Voici le workflow **exact** utilisé par ce cours (VitePress) :

```yaml
name: Déployer le site sur Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

# Permissions minimales pour publier sur Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Un seul déploiement à la fois
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - name: Construire le site
        run: npm run docs:build
      - name: Préparer l'artefact Pages
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Déployer sur GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 3. Comprendre le pipeline

```
   push sur main
        │
        ▼
   ┌────────┐   construit le site   ┌──────────┐
   │ build  │──────────────────────►│  deploy  │
   │        │   → artefact Pages    │ → en ligne│
   └────────┘                       └──────────┘
```

- Le job **build** construit le site et publie le résultat comme **artefact Pages**.
- Le job **deploy** prend cet artefact et le met **en ligne**.
- Les **permissions** (`pages: write`, `id-token: write`) sont le strict nécessaire.

## 4. La base URL

Pour un site « projet » (`ggaillard.github.io/cours-devops/`), le générateur doit connaître le sous-chemin. Avec VitePress, dans `docs/.vitepress/config.mjs` :

```js
export default defineConfig({
  base: '/cours-devops/',
  // ...
})
```

::: warning Erreur fréquente
Si vous oubliez la `base`, le site s'affiche **sans CSS** (styles introuvables) car les chemins pointent vers la racine du domaine au lieu du sous-dossier.
:::

## 5. Suivre le déploiement

1. Onglet **Actions** : suivez l'exécution `Déployer le site sur Pages`.
2. Une fois vert, l'URL du site apparaît dans le job **deploy** et dans **Settings → Pages**.
3. Ouvrez `https://VOTRE-COMPTE.github.io/VOTRE-DEPOT/`.

## Le même principe pour d'autres outils

Le workflow change à peine selon le générateur :

| Générateur | Commande de build | Dossier de sortie |
| --- | --- | --- |
| VitePress | `npm run docs:build` | `docs/.vitepress/dist` |
| Vite (React/Vue) | `npm run build` | `dist` |
| Hugo | `hugo` | `public` |
| MkDocs | `mkdocs build` | `site` |

Pour un site **déjà en HTML pur**, on saute l'étape de build et on publie directement le dossier.

## Récapitulatif de la section

- ✅ activer Pages avec la source *GitHub Actions* ;
- ✅ construire **et** déployer automatiquement à chaque push ;
- ✅ configurer la base URL pour un site projet.

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Le site s'affiche sans aucun style. Quelle est la cause la plus probable ?
Une **base URL** absente ou fausse. Les chemins pointent alors vers la racine du domaine au lieu du sous-dossier du dépôt, et les fichiers CSS renvoient une erreur 404.
:::

::: details 2. À quoi sert le bloc `concurrency: group: pages` ?
À éviter que deux déploiements se chevauchent. Sans lui, deux push rapprochés peuvent aboutir à la mise en ligne de la version la plus ancienne des deux.
:::

::: details 3. Pourquoi séparer `build` et `deploy` en deux jobs ?
Pour cloisonner les droits : le job de construction n'a besoin que de lire, seul le job de déploiement reçoit `pages: write` et `id-token: write`. C'est le moindre privilège appliqué à un pipeline.
:::

**Critères de réussite de la séance**

- ☐ le site est accessible à son URL publique
- ☐ une modification de contenu se retrouve en ligne sans action manuelle

Passons aux conteneurs : [Conteneurs (GHCR)](/conteneurs/).
