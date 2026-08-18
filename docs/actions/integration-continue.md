# Intégration continue (CI)

::: info 🎯 Séance 8 · 2 h
À la fin de cette séance, vous savez :

- construire un pipeline de CI qui installe, vérifie le style et teste une application ;
- épingler les versions d'actions pour obtenir un pipeline reproductible ;
- conditionner la fusion d'une Pull Request à une CI verte.

**Prérequis :** [Mon premier workflow](/actions/premier-workflow)

**Livrable attendu :** un `ci.yml` opérationnel sur un projet applicatif, avec badge dans le README
:::

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

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Pourquoi écrire `@v4` et non `@main` sur une action ?
Parce qu'un pipeline doit être reproductible. Avec `@main`, le comportement peut changer du jour au lendemain sans aucune modification de votre code — et le pipeline devient rouge sans raison apparente.
:::

::: details 2. Quelle différence entre `npm ci` et `npm install` dans une CI ?
`npm ci` installe exactement les versions figées par `package-lock.json` et échoue si le fichier n'est pas cohérent. `npm install` peut mettre à jour le lock et introduire des versions différentes de celles testées localement. En CI, on veut `npm ci`.
:::

::: details 3. La CI est verte mais le code est bogué. Où est le problème ?
Dans les tests, pas dans la CI. Un pipeline ne vaut que ce que valent ses vérifications : sans test sur le comportement fautif, il ne peut rien détecter. La CI automatise le contrôle, elle ne l'invente pas.
:::

**Critères de réussite de la séance**

- ☐ le pipeline échoue effectivement lorsqu'un test échoue
- ☐ le badge affiché dans le README reflète la dernière exécution

Prochaine étape : gérer les informations sensibles avec [Secrets & variables](/actions/secrets-variables).
