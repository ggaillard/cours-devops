# Publier sur GHCR

::: info 🎯 Séance 15 · 2 h
À la fin de cette séance, vous savez :

- publier une image sur GHCR depuis un workflow, sans token personnel ;
- générer automatiquement tags et labels avec `metadata-action` ;
- lier une version de code à une version d'image via un tag Git.

**Prérequis :** [Construire une image dans Actions](/conteneurs/build-image)

**Livrable attendu :** une image publiée sous au moins deux tags, visible dans l'onglet Packages
:::

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

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Quelle permission faut-il pour pousser sur GHCR, et pourquoi la déclarer ?
`packages: write`. On la déclare explicitement pour appliquer le moindre privilège : le `GITHUB_TOKEN` ne reçoit alors que le droit de publier un paquet, et rien d'autre sur le dépôt.
:::

::: details 2. Que produit `git push origin v1.0.0` avec le workflow de publication ?
Le déclenchement du workflow sur le tag, puis la publication d'une image étiquetée `1.0.0`. Version du code et version de l'image deviennent alignées, ce qui permet de savoir exactement quel commit tourne en production.
:::

::: details 3. Une image fraîchement publiée est-elle accessible à tous ?
Non, elle est privée par défaut. Il faut passer par **Package settings → Change visibility** pour la rendre publique.
:::

**Critères de réussite de la séance**

- ☐ l'image apparaît dans la section Packages du dépôt
- ☐ les tags `latest` et une version sémantique coexistent

Sécurisons maintenant la chaîne : [DevSecOps](/securite/).
