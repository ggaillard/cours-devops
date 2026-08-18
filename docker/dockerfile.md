---
layout: default
title: Dockerfile
parent: Docker
nav_order: 2
---

# Créer ses images avec un Dockerfile
{: .no_toc }

**Niveau :** 🟡 Intermédiaire  
**Durée :** 3h  
**Objectif :** Écrire des Dockerfiles pour empaqueter ses propres applications.
{: .fs-5 }

---

## Table des matières
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Qu'est-ce qu'un Dockerfile ?

Un Dockerfile est un **fichier texte** contenant les instructions pour construire une image Docker. Il décrit :

- L'image de base (OS, runtime)
- Les paquets à installer
- Les fichiers à copier
- Les commandes à exécuter
- Le port à exposer
- La commande de démarrage

---

## Instructions essentielles

```dockerfile
# Image de base
FROM ubuntu:22.04

# Métadonnées
LABEL maintainer="prenom.nom@exemple.fr"

# Variables d'environnement
ENV NODE_ENV=production \
    PORT=3000

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copier des fichiers (source hôte → destination conteneur)
COPY package.json ./
COPY src/ ./src/

# Exécuter des commandes pendant le build
RUN apt-get update && apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

# Exposer un port (documentation uniquement, pas de vrai mapping)
EXPOSE 3000

# Monter un volume (point de montage par défaut)
VOLUME ["/data"]

# Commande par défaut au démarrage du conteneur
CMD ["node", "src/index.js"]

# (Alternative) Point d'entrée non surchargeable
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```

### `CMD` vs `ENTRYPOINT`

| | `CMD` | `ENTRYPOINT` |
|-|-------|--------------|
| Comportement | Commande par défaut, **surchargeable** | Commande fixe, non surchargeable |
| Utilisation | `docker run image autre-commande` remplace CMD | Arguments passés s'ajoutent à ENTRYPOINT |
| Cas d'usage | Commande flexible | Exécutable principal de l'image |

---

## Exemple 1 — Application Node.js

```
mon-app/
├── Dockerfile
├── package.json
├── package-lock.json
└── src/
    └── index.js
```

**`package.json`**
```json
{
  "name": "mon-app",
  "version": "1.0.0",
  "scripts": { "start": "node src/index.js" },
  "dependencies": { "express": "^4.18.0" }
}
```

**`src/index.js`**
```javascript
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello BTS SIO !'));
app.listen(3000, () => console.log('Serveur démarré sur le port 3000'));
```

**`Dockerfile`**
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copier les fichiers de dépendances en premier (optimisation cache)
COPY package*.json ./
RUN npm ci --only=production

# Copier le code source
COPY src/ ./src/

EXPOSE 3000

# Utilisateur non-root (bonne pratique sécurité)
USER node

CMD ["node", "src/index.js"]
```

```bash
# Construire l'image
docker build -t mon-app:1.0 .

# Lancer
docker run -d -p 3000:3000 --name mon-app mon-app:1.0

# Tester
curl http://localhost:3000
```

---

## Exemple 2 — Application PHP/Apache

```dockerfile
FROM php:8.2-apache

# Installer les extensions PHP nécessaires
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Activer le module Apache rewrite
RUN a2enmod rewrite

# Copier le code source
COPY src/ /var/www/html/

# Permissions
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
```

---

## Exemple 3 — Multi-stage build

Les **multi-stage builds** permettent de produire une image finale légère en séparant les étapes de build et d'exécution.

```dockerfile
# ── Étape 1 : Build ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build    # génère le dossier dist/

# ── Étape 2 : Image finale légère ────────────────────────────────
FROM nginx:alpine AS production

# On copie UNIQUEMENT le résultat du build, pas les node_modules
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

L'image finale ne contient que Nginx et les fichiers statiques — pas Node.js, pas les 200 Mo de node_modules.

---

## `.dockerignore` — Exclure des fichiers

Comme `.gitignore`, ce fichier évite de copier des fichiers inutiles dans l'image.

```
# .dockerignore
node_modules/
npm-debug.log
.git/
.env
*.md
tests/
docs/
```

---

## Bonnes pratiques

1. **Choisir l'image de base la plus petite** : préférer `alpine` ou `slim` quand c'est possible
2. **Minimiser les layers** : combiner les `RUN` avec `&&`
3. **Optimiser le cache** : copier `package.json` avant le code source
4. **Utiliser un utilisateur non-root** : ajouter `USER node` ou `USER www-data`
5. **Ne jamais stocker de secrets** dans le Dockerfile (tokens, mots de passe)
6. **Utiliser `.dockerignore`** pour alléger le contexte de build
7. **Taguer les versions** : `mon-app:1.2.3` plutôt que `mon-app:latest` en production

---

## Exercice

1. Créez une application web simple de votre choix (PHP, Python Flask, Node.js)
2. Écrivez un Dockerfile pour la conteneuriser
3. Construisez l'image et lancez un conteneur
4. Accédez à l'application depuis votre navigateur
5. *(Bonus)* Refactorisez avec un multi-stage build et comparez la taille des deux images

```bash
# Comparer la taille des images
docker images | grep mon-app
```

---

## Ressources

- [Référence Dockerfile](https://docs.docker.com/engine/reference/builder/)
- [Best practices Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Dive — analyser les layers d'une image](https://github.com/wagoodman/dive)
