# Analyse statique & quality gate

::: info 🎯 Séance 22 · 2 h
À la fin de cette séance, vous savez :

- configurer un linter et un formateur, et les faire appliquer par la CI ;
- distinguer style, défaut potentiel, complexité et dette technique ;
- brancher un service d'analyse continue et lire ses indicateurs ;
- définir une *quality gate* qui bloque une Pull Request non conforme.

**Prérequis :** [Couverture de code](/qualite/couverture)

**Livrable attendu :** un pipeline qui refuse une PR mal formatée, trop complexe ou sous le seuil de couverture
:::

Les tests vérifient ce que le code **fait**. L'analyse statique examine ce qu'il **est** : lisibilité, complexité, motifs douteux, duplication. Elle s'exécute sans lancer le programme — comme [CodeQL](/securite/codeql-secrets), mais tournée vers la maintenabilité plutôt que la sécurité.

## Quatre familles d'outils

| Famille | Question posée | Exemples |
| --- | --- | --- |
| **Formateur** | Le code est-il présenté uniformément ? | Prettier, `google-java-format` |
| **Linter** | Y a-t-il des motifs douteux ? | ESLint, Checkstyle, SpotBugs |
| **Analyse de complexité** | Ce code sera-t-il maintenable ? | SonarCloud, `eslint-plugin-complexity` |
| **Sécurité** | Y a-t-il une faille exploitable ? | [CodeQL](/securite/codeql-secrets), Dependabot |

Les deux premières se recouvrent souvent, mais la distinction compte : un **formateur** réécrit le code sans se demander s'il est juste ; un **linter** ne réécrit rien mais signale ce qui est suspect.

## Le formateur : arrêter de débattre

```bash
npm i -D prettier
```

`.prettierrc` :

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100
}
```

```bash
npx prettier --write .    # corrige
npx prettier --check .    # vérifie, échoue si non conforme
```

::: tip L'intérêt n'est pas le style choisi
Peu importe qu'on écrive les points-virgules ou non. Ce qui compte, c'est que **plus personne n'en discute** et que les diffs ne contiennent plus de reformatages parasites. Une PR de trois lignes doit afficher trois lignes, pas quarante à cause d'un éditeur configuré différemment.
:::

## Le linter : attraper les défauts avant l'exécution

```bash
npm i -D eslint
npx eslint --init
```

`eslint.config.js` :

```js
export default [
  {
    files: ['src/**/*.js'],
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
      'eqeqeq': 'error',              // impose === au lieu de ==
      'complexity': ['error', 10],    // refuse les fonctions trop ramifiées
      'max-depth': ['error', 3],
    },
  },
]
```

La règle `complexity` mérite un mot. Elle mesure la **complexité cyclomatique** : le nombre de chemins d'exécution indépendants dans une fonction, soit approximativement le nombre de `if`, `for`, `case` et `&&` plus un.

| Complexité | Lecture |
| --- | --- |
| 1–5 | Simple, facile à tester |
| 6–10 | Acceptable |
| 11–20 | À découper |
| > 20 | Difficilement testable, source de bugs |

Le lien avec la séance précédente est direct : une fonction de complexité 15 demande **15 tests** pour couvrir toutes ses branches. Réduire la complexité n'est pas de la coquetterie, c'est ce qui rend la couverture atteignable.

## Dans la CI

```yaml
name: Qualité

on:
  pull_request:
  push:
    branches: [main]

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
        run: npx prettier --check .

      - name: Lint
        run: npx eslint .

      - name: Tests et couverture
        run: npx vitest run --coverage
```

Chaque étape échoue de façon autonome, et le message d'erreur pointe la ligne fautive. L'étudiant reçoit un retour précis en une minute, sans intervention de l'enseignant.

::: warning Introduire un linter sur du code existant
Activer d'un coup toutes les règles sur un projet ancien produit deux mille erreurs et décourage tout le monde. La méthode qui fonctionne : commencer avec trois ou quatre règles, les faire passer, puis en ajouter à chaque itération.
:::

## La quality gate

Une **quality gate** est un ensemble de conditions qu'une modification doit satisfaire pour être fusionnable. Elle transforme des indicateurs en **décision**.

```
   Pull Request ouverte
          │
          ▼
   ┌──────────────────────────────┐
   │  Format conforme ?      ✅   │
   │  Lint sans erreur ?     ✅   │
   │  Tests verts ?          ✅   │
   │  Couverture ≥ 80 % ?    ❌   │  ← une seule condition suffit
   │  Complexité ≤ 10 ?      ✅   │
   └──────────────────────────────┘
          │
          ▼
   ⛔ Fusion bloquée
```

Deux façons de la mettre en place :

**1. Avec les seuls outils du dépôt** — chaque vérification est un job, et la protection de branche (voir [Branches & PR](/git-github/branches-pr)) exige que ces jobs soient verts. Aucun service externe, aucun compte à créer.

**2. Avec un service d'analyse continue** — SonarCloud est gratuit pour les dépôts publics et apporte l'historique, la notion de **code neuf** et la dette technique estimée :

```yaml
      - name: Analyse SonarCloud
        uses: SonarSource/sonarqube-scan-action@v5
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

Le `SONAR_TOKEN` est un [secret de dépôt](/actions/secrets-variables) : c'est une bonne occasion de réemployer la notion dans un cas réel.

::: tip La règle du « code neuf »
L'idée la plus utile de ces services : n'appliquer les exigences **qu'au code modifié par la PR**. Le code ancien reste en l'état, mais tout ajout doit être propre et testé. La dette se résorbe naturellement, sans chantier de reprise — c'est la seule stratégie qui tienne sur un projet réel.
:::

## Ce que l'analyse statique ne fait pas

Elle ne comprend pas votre métier. Aucun outil ne vous dira qu'un taux de TVA de 19,6 % est obsolète, ni qu'une autorisation manque. Elle détecte des **motifs**, pas des intentions.

Elle produit aussi des **faux positifs**. Un avertissement peut être légitime à ignorer — mais on l'ignore explicitement, avec un commentaire justifiant pourquoi, jamais en désactivant la règle globalement.

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Quelle différence entre un formateur et un linter ?
Le **formateur** (Prettier) réécrit la présentation du code — indentation, guillemets, retours à la ligne — sans jamais juger la logique. Le **linter** (ESLint) ne réécrit rien mais signale des motifs suspects : variable inutilisée, comparaison `==`, fonction trop complexe. On utilise les deux, ils ne répondent pas à la même question.
:::

::: details 2. En quoi la complexité cyclomatique est-elle liée à la couverture de tests ?
Elle donne le nombre minimal de tests nécessaires pour couvrir toutes les branches : une fonction de complexité 15 en demande 15. Découper cette fonction en trois fonctions de complexité 5 rend la couverture atteignable et les tests lisibles. Une complexité élevée n'est donc pas seulement inélégante — elle rend le code littéralement intestable.
:::

::: details 3. Pourquoi appliquer la quality gate au « code neuf » plutôt qu'à tout le dépôt ?
Parce qu'exiger 80 % de couverture sur un projet qui en compte 20 % rend toute PR impossible à fusionner, et l'équipe désactive la règle. En n'exigeant la conformité que sur les lignes modifiées, chaque contribution améliore la situation sans bloquer le travail. La dette se résorbe par le flux, pas par un chantier.
:::

**Critères de réussite de la séance**

- ☐ une PR mal formatée est refusée par la CI
- ☐ une fonction de complexité > 10 déclenche une erreur de lint
- ☐ la protection de branche exige les jobs de qualité
- ☐ je sais justifier une exception plutôt que désactiver une règle

Mettons tout cela en pratique : [TP 4 — Durcir la chaîne CI](/tp/tp4-qualite-ci).
