# Publier sur GHCR

Objectif : construire l'image **puis la publier** sur le GitHub Container Registry, automatiquement, sans jamais utiliser Docker en local.

## Le workflow complet

`.github/workflows/docker-publish.yml` :

```yaml
name: Publier l'image sur GHCR

on:
  push:
    branches: [main]
    tags: ['v*']          # publie aussi sur les tags de version

permissions:
  contents: read
  packages: write         # nécessaire pour pousser sur GHCR

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Se connecter à GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Déduire les tags et labels
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }}

      - name: Construire et pousser
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
```

## Ce qui se passe, étape par étape

```
   push sur main / tag v*
          │
          ▼
   login sur ghcr.io  (avec le GITHUB_TOKEN — aucun token perso)
          │
          ▼
   metadata-action calcule les tags (latest, v1.2.0, sha…)
          │
          ▼
   build-push-action construit ET pousse l'image
          │
          ▼
   ghcr.io/ggaillard/cours-devops:latest  ✅
```

## Le point fort : aucun secret à gérer

La connexion utilise **`secrets.GITHUB_TOKEN`**, fourni automatiquement à chaque workflow. Vous n'avez **aucun** token personnel à créer, stocker ou faire tourner. La permission `packages: write` suffit.

::: tip DevSecOps
C'est l'illustration du **moindre privilège** : le workflow reçoit juste le droit de publier un paquet, rien de plus, et le jeton expire à la fin de l'exécution.
:::

## Retrouver et rendre publique son image

1. Page du dépôt → à droite, section **Packages** → votre image.
2. Vous y voyez les tags, la taille, les instructions de récupération.
3. **Package settings** → **Change visibility** pour la rendre publique.

Récupération d'une image publique (sur n'importe quelle machine disposant d'un moteur de conteneurs) :

```bash
docker pull ghcr.io/ggaillard/cours-devops:latest
```

## Versionner ses images avec des tags Git

En poussant un tag Git `v1.0.0`, le workflow publie une image `:1.0.0`. On associe ainsi une **version de code** à une **version d'image** — traçabilité de bout en bout.

```
   git tag v1.0.0  →  push  →  image ghcr.io/.../cours-devops:1.0.0
```

## Récapitulatif de la section

- ✅ écrire un Dockerfile propre ;
- ✅ construire l'image dans la CI ;
- ✅ la publier sur GHCR avec le `GITHUB_TOKEN`, sans Docker local ni token perso.

Sécurisons maintenant la chaîne : [DevSecOps](/securite/).
