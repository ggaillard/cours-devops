# Construire une image dans Actions

## Le Dockerfile

Le `Dockerfile`, à la racine du dépôt, décrit l'image étape par étape. Exemple pour une petite application Node.js :

```dockerfile
# Image de base légère
FROM node:20-alpine

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier d'abord les manifestes (optimise le cache)
COPY package*.json ./
RUN npm ci --omit=dev

# Copier le reste du code
COPY . .

# Port exposé par l'application
EXPOSE 3000

# Commande de démarrage
CMD ["node", "server.js"]
```

## Décryptage des instructions

| Instruction | Rôle |
| --- | --- |
| `FROM` | L'image de départ. `alpine` = très légère. |
| `WORKDIR` | Le répertoire de travail. |
| `COPY` | Copie des fichiers de l'hôte vers l'image. |
| `RUN` | Exécute une commande **pendant la construction**. |
| `EXPOSE` | Documente le port utilisé. |
| `CMD` | La commande lancée **au démarrage** du conteneur. |

::: tip Ordre des couches
On copie `package*.json` **avant** le reste du code : tant que les dépendances ne changent pas, Docker réutilise le cache de `npm ci`. Les builds sont beaucoup plus rapides.
:::

## Construire l'image dans un workflow

`.github/workflows/docker-build.yml` :

```yaml
name: Construire l'image

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Configurer Buildx
        uses: docker/setup-buildx-action@v3

      - name: Construire l'image (sans publier)
        uses: docker/build-push-action@v6
        with:
          context: .
          push: false
          tags: mon-app:test
```

Ce workflow **construit** l'image à chaque push et échoue si le `Dockerfile` contient une erreur — c'est de la CI appliquée aux conteneurs.

## Ajouter un `.dockerignore`

Comme `.gitignore`, il évite de copier des fichiers inutiles (ou sensibles) dans l'image :

```text
node_modules
.git
.env
*.log
```

Une image plus petite se construit et se déploie plus vite, et expose moins de surface.

## Vérifier avant de publier

Bonne pratique : n'autoriser la **publication** que si l'image se construit **et** passe les tests. On enchaîne alors les jobs avec `needs` (voir [Matrices & artefacts](/actions/matrices-artefacts)).

Prochaine étape : [Publier sur GHCR](/conteneurs/publier-ghcr).
