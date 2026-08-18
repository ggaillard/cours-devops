# TP 2 — Publier un site sur Pages

**Objectif** : publier un site statique et le mettre à jour **automatiquement** à chaque commit, via GitHub Actions et GitHub Pages.

**Prérequis** : [GitHub Actions](/actions/) et [GitHub Pages](/pages/).

## Étape 1 — Créer le dépôt

Créez un dépôt **public** `mon-portfolio` avec un `README`.

## Étape 2 — Un site minimal

Créez `index.html` à la racine :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mon portfolio DevOps</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 720px;
           margin: 3rem auto; padding: 0 1rem; line-height: 1.6; }
    h1 { color: #3e80af; }
    .badge { background:#3e80af; color:#fff; padding:.2rem .6rem; border-radius:6px; }
  </style>
</head>
<body>
  <h1>Bonjour 👋</h1>
  <p>Ce site est <span class="badge">déployé en continu</span> depuis GitHub.</p>
  <p>Chaque commit sur <code>main</code> le republie automatiquement.</p>
</body>
</html>
```

## Étape 3 — Activer Pages

**Settings → Pages → Source → GitHub Actions**.

## Étape 4 — Le workflow de déploiement

Comme le site est du HTML pur, on publie le dossier tel quel. Créez `.github/workflows/pages.yml` :

```yaml
name: Déployer sur Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - name: Préparer l'artefact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .              # le dossier racine (contient index.html)
      - name: Déployer
        id: deployment
        uses: actions/deploy-pages@v4
```

## Étape 5 — Vérifier la mise en ligne

1. Onglet **Actions** : le workflow doit passer au vert.
2. **Settings → Pages** : l'URL apparaît.
3. Ouvrez `https://VOTRE-COMPTE.github.io/mon-portfolio/`.

## Étape 6 — Le déploiement continu en action

1. Modifiez le titre du `index.html`.
2. Commitez sur `main`.
3. Le workflow se relance **tout seul** et le site se met à jour en une minute.

C'est le **déploiement continu** : le code validé arrive en ligne sans action manuelle.

## Ce qu'il faut rendre

- L'URL publique du site.
- Une capture de l'onglet Actions montrant deux déploiements réussis.

## Pour aller plus loin

- Remplacez le HTML pur par un générateur (VitePress, Hugo) : ajoutez une étape `npm run build` et publiez le dossier de sortie (voir [Déployer un site statique](/pages/deployer-site)).
- Ajoutez un **domaine personnalisé** (fichier `CNAME`).

Passez au [TP 3 — Image conteneur sur GHCR](/tp/tp3-image-ghcr).
