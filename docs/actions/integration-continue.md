# Intégration continue (CI)

L'**intégration continue** consiste à vérifier automatiquement chaque modification : le code se construit-il ? Les tests passent-ils ? Le style est-il respecté ? Si quelque chose casse, on le sait **immédiatement**.

## Un pipeline CI type

```
   Récupérer le code (checkout)
          │
          ▼
   Installer les dépendances
          │
          ▼
   Vérifier le style (lint)
          │
          ▼
   Lancer les tests
          │
          ▼
   ✅ vert  /  ❌ rouge → la PR est bloquée
```

## Exemple : CI pour un projet Node.js

`.github/workflows/ci.yml` :

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - name: Récupérer le code
        uses: actions/checkout@v4

      - name: Installer Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Installer les dépendances
        run: npm ci

      - name: Vérifier le style (lint)
        run: npm run lint --if-present

      - name: Lancer les tests
        run: npm test --if-present
```

## Exemple : CI pour un projet Python

```yaml
name: CI Python

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: pip install -r requirements.txt
      - run: python -m pytest -v
```

## Les actions réutilisables

Une **action** (`uses:`) est une brique partagée par la communauté. Les plus courantes :

| Action | Rôle |
| --- | --- |
| `actions/checkout@v4` | Récupère le code du dépôt sur le runner. |
| `actions/setup-node@v4` | Installe une version de Node.js. |
| `actions/setup-python@v5` | Installe une version de Python. |
| `actions/upload-artifact@v4` | Conserve un fichier produit par le job. |

::: tip Épingler les versions
On écrit `@v4` (et non `@main`) pour figer la version d'une action : un pipeline reproductible ne doit pas changer de comportement du jour au lendemain.
:::

## Le badge de statut

Affichez l'état de la CI dans votre README :

```markdown
![CI](https://github.com/ggaillard/cours-devops/actions/workflows/ci.yml/badge.svg)
```

Le badge devient vert ✅ ou rouge ❌ selon la dernière exécution. C'est un signal de santé immédiat pour le projet.

## Exiger la CI avant fusion

Combinez la CI avec la **protection de branche** (voir [Branches & PR](/git-github/branches-pr)) : cochez *Require status checks to pass before merging*. Ainsi, **une PR ne peut être fusionnée que si la CI est verte**.

Prochaine étape : gérer les informations sensibles avec [Secrets & variables](/actions/secrets-variables).
