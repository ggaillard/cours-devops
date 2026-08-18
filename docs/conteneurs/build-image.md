# Construire une image dans Actions

::: info 🎯 Séance 14 (2/2) · ~1 h 30
À la fin de cette séance, vous savez :

- écrire un Dockerfile pour une application et en justifier chaque instruction ;
- ordonner les couches pour tirer parti du cache de construction ;
- construire l'image dans un workflow, sans la publier.

**Prérequis :** [Conteneurs & GHCR](/conteneurs/)

**Livrable attendu :** un `Dockerfile`, un `.dockerignore` et un workflow de construction vert
:::

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

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Pourquoi copier `package*.json` avant le reste du code ?
Parce que Docker met en cache chaque couche. Tant que les manifestes ne changent pas, l'installation des dépendances est réutilisée telle quelle. En copiant tout d'un bloc, la moindre modification de code relancerait un `npm ci` complet.
:::

::: details 2. Quelle différence entre `RUN` et `CMD` ?
`RUN` s'exécute **pendant la construction** et son résultat est figé dans l'image. `CMD` définit la commande lancée **au démarrage** du conteneur. Confondre les deux produit une image qui ne démarre pas.
:::

::: details 3. À quoi sert `.dockerignore` au-delà du gain de taille ?
À éviter de faire entrer dans l'image des fichiers sensibles (`.env`, `.git` et son historique). Une image publiée est publique : tout ce qu'elle contient l'est aussi.
:::

**Critères de réussite de la séance**

- ☐ le workflow échoue si le Dockerfile contient une erreur
- ☐ `.dockerignore` exclut au minimum `node_modules`, `.git` et `.env`

Prochaine étape : [Publier sur GHCR](/conteneurs/publier-ghcr).
