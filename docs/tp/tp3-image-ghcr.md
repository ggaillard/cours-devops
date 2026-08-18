# TP 3 — Image conteneur sur GHCR

**Objectif** : construire une image de conteneur **dans GitHub Actions** et la publier sur le **GitHub Container Registry**, sans Docker installé localement.

**Prérequis** : [Conteneurs & GHCR](/conteneurs/).

## Étape 1 — Créer le dépôt et l'application

Créez un dépôt **public** `tp-image-ghcr`.

Créez `server.js` (petite appli Node sans dépendance) :

```js
const http = require('http');
const port = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Bonjour depuis un conteneur publié sur GHCR ! 🐳\n');
}).listen(port, () => console.log(`Serveur sur le port ${port}`));
```

Créez `package.json` :

```json
{
  "name": "tp-image-ghcr",
  "version": "1.0.0",
  "scripts": { "start": "node server.js" }
}
```

## Étape 2 — Le Dockerfile

Créez `Dockerfile` à la racine :

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Créez `.dockerignore` :

```text
node_modules
.git
*.log
```

## Étape 3 — Le workflow de publication

Créez `.github/workflows/docker-publish.yml` :

```yaml
name: Publier l'image sur GHCR

on:
  push:
    branches: [main]
    tags: ['v*']

permissions:
  contents: read
  packages: write

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Connexion à GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Tags & labels
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

## Étape 4 — Publier

1. Commitez le tout sur `main`.
2. Onglet **Actions** : suivez le workflow, il doit passer au **vert**.
3. Page du dépôt → section **Packages** : votre image `tp-image-ghcr` apparaît.

## Étape 5 — Versionner avec un tag

Depuis un Codespace ou l'interface (via une Release) :

```bash
git tag v1.0.0
git push origin v1.0.0
```

Le workflow republie l'image avec le tag `:1.0.0`. Vous avez lié **version de code** et **version d'image**.

## Étape 6 — Vérifier la publication

Rendez l'image publique (**Package settings → Change visibility**), puis notez la commande de récupération affichée :

```bash
docker pull ghcr.io/VOTRE-COMPTE/tp-image-ghcr:latest
```

(La récupération se fait sur toute machine disposant d'un moteur de conteneurs — le TP, lui, n'a nécessité **aucune** installation locale.)

## Ce qu'il faut rendre

- Lien du dépôt.
- Lien de l'image publiée dans **Packages**.
- Preuve d'au moins deux tags (`latest` + `1.0.0`).

## Pour aller plus loin

- Ajoutez un **job de test** avant la publication, relié par `needs` (voir [Matrices & artefacts](/actions/matrices-artefacts)).
- Ajoutez l'analyse **CodeQL** au dépôt (voir [DevSecOps](/securite/codeql-secrets)).

Félicitations : vous avez parcouru l'ensemble de la chaîne DevOps **100 % en ligne** ! 🎉
