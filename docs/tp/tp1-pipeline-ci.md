# TP 1 — Pipeline CI de A à Z

::: info 🎯 Séance 9 · 2 h
À la fin de cette séance, vous savez :

- mettre en place une CI complète sur un projet applicatif de bout en bout ;
- constater qu'une CI rouge bloque effectivement une Pull Request ;
- publier un badge d'état et protéger `main`.

**Prérequis :** [Intégration continue](/actions/integration-continue)

**Livrable attendu :** dépôt public, une PR échouée puis corrigée, badge vert, `main` protégée
:::

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

## Barème — 20 points

| Ligne | Points | Ce qui est observé sur ce TP |
| --- | --- | --- |
| **Le livrable fonctionne** | 8 | le workflow s'exécute sur une Pull Request et passe au vert |
| **Méthode Git** | 4 | branche dédiée, PR fusionnée, aucun commit direct sur `main` |
| **Exigence de la chaîne** | 4 | un test volontairement cassé fait bien échouer la CI, capture à l'appui |
| **Traçabilité du rendu** | 3 | badge de la CI dans le `README` et lien de l'exécution |
| **Compréhension** | 1 | sait dire, sur son propre fichier, ce que déclenche `on:` et ce qu'attend `needs:` |

Le barème commun aux cinq TP et sa justification sont détaillés sur la [vue d'ensemble des TP](/tp/).

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. À l'étape 4, la CI passe au rouge. Est-ce un échec du TP ?
Au contraire : c'est le résultat attendu. L'objectif est d'observer que le pipeline détecte la régression **avant** la fusion. Une CI qui ne casse jamais n'a jamais rien prouvé.
:::

::: details 2. Le TP utilise `npm install`. Que faudrait-il écrire sur un vrai projet ?
`npm ci`, qui installe strictement les versions du `package-lock.json` et échoue si le lock est incohérent. `npm install` reste tolérable ici parce que le lock n'existe pas encore au premier commit.
:::

::: details 3. Après avoir protégé `main`, que se passe-t-il si l'on tente de commiter directement dessus ?
Le push est refusé : il faut passer par une branche et une Pull Request. C'est exactement l'effet recherché — plus rien n'atteint `main` sans être vérifié.
:::

**Critères de réussite de la séance**

- ☐ l'historique montre une exécution rouge **puis** une verte sur la même PR
- ☐ le badge du README affiche l'état réel du dépôt
- ☐ la règle de protection de `main` est active

Passez au [TP 2 — Publier un site sur Pages](/tp/tp2-site-pages).
