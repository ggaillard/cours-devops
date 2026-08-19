# TP 4 — Durcir la chaîne CI

::: info 🎯 Séance 23 · 2 h
À la fin de cette séance, vous savez :

- transformer une CI qui « lance des tests » en une CI qui **refuse** le code non conforme ;
- publier couverture et rapports là où ils sont lus, c'est-à-dire sur la Pull Request ;
- constater qu'une seule condition non satisfaite bloque la fusion.

**Prérequis :** [Analyse statique & quality gate](/qualite/analyse-statique)

**Livrable attendu :** un dépôt dont la PR est bloquée par la couverture, puis débloquée par l'ajout d'un test
:::

**Objectif** : reprendre le dépôt du [TP 1](/tp/tp1-pipeline-ci) et le doter d'une véritable *quality gate*.

## Étape 1 — Partir du TP 1

Reprenez `tp-ci-devops`. Il contient `src/calcul.js`, ses tests, et un `ci.yml` qui les exécute. Créez une branche `feat/quality-gate`.

## Étape 2 — Du code volontairement incomplet

Remplacez `src/calcul.js` par une version comportant des branches non testées :

```js
function additionner(a, b) {
  return a + b;
}

function estPair(n) {
  return n % 2 === 0;
}

function classerNote(note) {
  if (typeof note !== 'number') throw new Error('note invalide');
  if (note < 0 || note > 20) throw new Error('note hors barème');
  if (note >= 16) return 'très bien';
  if (note >= 14) return 'bien';
  if (note >= 10) return 'admis';
  return 'ajourné';
}

module.exports = { additionner, estPair, classerNote };
```

Ne touchez pas encore aux tests : `classerNote` n'est donc couverte par rien.

## Étape 3 — Installer les outils

```bash
npm i -D vitest @vitest/coverage-v8 eslint prettier
```

`vitest.config.js` :

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**'],
      thresholds: { lines: 80, branches: 75, functions: 80 },
    },
  },
})
```

Dans `package.json` :

```json
{
  "scripts": {
    "test": "vitest run",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint src",
    "format:check": "prettier --check ."
  }
}
```

## Étape 4 — Constater l'échec

```bash
npm run test:coverage
```

La couverture de branches s'effondre : `classerNote` compte six décisions, aucune empruntée. La commande **retourne un code d'erreur**. Notez le pourcentage exact — vous le comparerez à la fin.

## Étape 5 — Le workflow de qualité

Remplacez `.github/workflows/ci.yml` :

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read

jobs:
  qualite:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci

      - name: Format
        run: npm run format:check

      - name: Lint
        run: npm run lint

      - name: Tests et couverture
        run: npm run test:coverage

      - name: Conserver le rapport de couverture
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: couverture
          path: coverage/
          retention-days: 7
```

## Étape 6 — Ouvrir la PR et observer le blocage

1. Commitez, poussez, ouvrez une **Pull Request** vers `main`.
2. La CI passe au **rouge** sur l'étape de couverture.
3. Ouvrez l'exécution, section **Artifacts** : téléchargez `couverture`, ouvrez `index.html`.
4. Repérez `classerNote` : ses lignes apparaissent **en rouge**.

C'est le cœur du TP. Le pipeline ne se contente plus de signaler, il **empêche**.

## Étape 7 — Corriger par des tests

Ajoutez dans `src/calcul.test.js` de quoi couvrir chaque branche :

```js
const { classerNote } = require('./calcul');

describe('classerNote', () => {
  it.each([
    [18, 'très bien'],
    [15, 'bien'],
    [12, 'admis'],
    [7, 'ajourné'],
  ])('classe %i en « %s »', (note, attendu) => {
    expect(classerNote(note)).toBe(attendu);
  });

  it('rejette une note hors barème', () => {
    expect(() => classerNote(25)).toThrow('hors barème');
    expect(() => classerNote(-1)).toThrow('hors barème');
  });

  it('rejette une valeur non numérique', () => {
    expect(() => classerNote('douze')).toThrow('note invalide');
  });
});
```

Poussez sur la même branche : la CI se relance seule et passe au **vert**. Comparez la couverture à celle notée à l'étape 4.

## Étape 8 — Verrouiller

**Settings → Branches → Add rule** sur `main` :

- *Require a pull request before merging*
- *Require status checks to pass* → sélectionnez le job **qualite**

Vérifiez : une nouvelle PR qui dégrade la couverture ne peut plus être fusionnée, quel que soit le bon vouloir de son auteur.

## Ce qu'il faut rendre

- Lien du dépôt public.
- La PR montrant une exécution **rouge** (couverture insuffisante) puis **verte** sur la même branche.
- Une capture du rapport HTML avec les lignes rouges de l'étape 6.
- Les deux pourcentages de couverture, avant et après.

## Pour aller plus loin

- Ajoutez une règle `complexity: ['error', 5]` : `classerNote` la dépasse. Découpez-la et observez l'effet sur le nombre de tests nécessaires.
- Publiez le résumé de couverture dans `$GITHUB_STEP_SUMMARY` (voir [Couverture](/qualite/couverture)).
- Branchez SonarCloud et activez la condition sur le **code neuf**.

## Barème — 20 points

| Ligne | Points | Ce qui est observé sur ce TP |
| --- | --- | --- |
| **Le livrable fonctionne** | 8 | la couverture est mesurée et le seuil est réellement bloquant |
| **Méthode Git** | 4 | branche dédiée, PR fusionnée, aucun commit direct sur `main` |
| **Exigence de la chaîne** | 4 | une exécution **rouge puis verte** est montrée sur la même branche |
| **Traçabilité du rendu** | 3 | rapport de couverture en artefact, seuil justifié par écrit |
| **Compréhension** | 1 | sait dire ce que le seuil de couverture **ne garantit pas** |

Le barème commun aux cinq TP et sa justification sont détaillés sur la [vue d'ensemble des TP](/tp/).

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. À l'étape 6, la CI est rouge alors que tous les tests passent. Contradiction ?
Non. Les tests existants réussissent, mais la **couverture** est sous le seuil : une partie du code n'est vérifiée par aucun test. C'est exactement ce qu'on cherche à détecter — du code livré sans filet. Le pipeline distingue « les tests écrits passent » de « le code est testé ».
:::

::: details 2. Pourquoi ajouter les tests plutôt que baisser le seuil à 40 % ?
Baisser le seuil supprime l'alerte sans supprimer le risque : `classerNote` reste non vérifiée et le prochain qui la modifiera n'aura aucun retour. Le seuil n'a de valeur que s'il résiste à la première contrariété — un seuil qu'on ajuste dès qu'il gêne ne sert à rien.
:::

::: details 3. En quoi l'étape 8 change-t-elle la nature du dispositif ?
Sans protection de branche, la CI est un **avis** : rien n'empêche de fusionner en rouge. Avec la règle *Require status checks*, elle devient une **contrainte** : le bouton de fusion est inactif. C'est le passage de l'indicateur au garde-fou.
:::

**Critères de réussite de la séance**

- ☐ l'historique de la PR montre une exécution rouge puis verte
- ☐ le rapport de couverture est téléchargeable même quand la CI échoue
- ☐ la couverture de branches finale dépasse 75 %
- ☐ la fusion est impossible tant que le job `qualite` n'est pas vert

Le socle qualité est en place. Avant de coder un vrai projet, apprenons à le concevoir : [Modéliser avec UML](/uml/).
