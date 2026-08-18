# TP 1 — Pipeline CI de A à Z

**Objectif** : créer un petit projet, écrire des tests, et mettre en place une **intégration continue** qui les exécute à chaque push et sur chaque Pull Request.

**Prérequis** : avoir suivi [Git & GitHub](/git-github/) et [GitHub Actions](/actions/).

## Étape 1 — Créer le dépôt

1. Créez un dépôt **public** `tp-ci-devops` avec un `README`.
2. Ouvrez-le dans un [Codespace](/codespaces/) (ou éditez sur github.com).

## Étape 2 — Le code à tester

Créez `src/calcul.js` :

```js
function additionner(a, b) {
  return a + b;
}
function estPair(n) {
  return n % 2 === 0;
}
module.exports = { additionner, estPair };
```

Créez `src/calcul.test.js` :

```js
const { additionner, estPair } = require('./calcul');

test('additionne deux nombres', () => {
  expect(additionner(2, 3)).toBe(5);
});

test('détecte un nombre pair', () => {
  expect(estPair(4)).toBe(true);
  expect(estPair(7)).toBe(false);
});
```

Créez `package.json` :

```json
{
  "name": "tp-ci-devops",
  "version": "1.0.0",
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  }
}
```

## Étape 3 — Le workflow de CI

Créez `.github/workflows/ci.yml` :

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm install
      - run: npm test
```

Commitez. Onglet **Actions** : le workflow **CI** doit apparaître et passer au **vert**.

## Étape 4 — Provoquer un échec (et le comprendre)

1. Créez une branche `casse-un-test`.
2. Modifiez `additionner` pour renvoyer `a - b`.
3. Ouvrez une **Pull Request**.
4. Observez : la CI passe au **rouge** ❌ et la PR signale l'échec.
5. Corrigez, repoussez : la CI repasse au **vert** ✅.

Vous venez de vérifier que **la CI protège `main`** contre le code cassé.

## Étape 5 — Le badge

Ajoutez dans le `README.md` :

```markdown
![CI](https://github.com/VOTRE-COMPTE/tp-ci-devops/actions/workflows/ci.yml/badge.svg)
```

## Étape 6 — Protéger `main` (bonus)

**Settings → Branches → Add rule** :

- *Require a pull request before merging*
- *Require status checks to pass* → sélectionnez le job `test`

Désormais, impossible de fusionner si la CI échoue.

## Ce qu'il faut rendre

- Lien du dépôt public.
- Une PR ayant échoué puis corrigée (historique visible).
- Le badge vert dans le README.

## Pour aller plus loin

- Ajoutez une **matrice** de versions Node (`18`, `20`, `22`) — voir [Matrices](/actions/matrices-artefacts).
- Ajoutez une étape de **lint**.

Passez au [TP 2 — Publier un site sur Pages](/tp/tp2-site-pages).
