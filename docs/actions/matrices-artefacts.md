# Matrices & artefacts

Deux techniques qui rendent vos pipelines plus puissants : les **matrices** (tester plusieurs configurations) et les **artefacts** (conserver ce que produit un job).

## Les matrices : tester plusieurs versions

Une **matrice** exécute le même job pour chaque combinaison de paramètres. Utile pour vérifier qu'un projet fonctionne sur plusieurs versions d'un langage.

```yaml
name: CI multi-versions

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: ['18', '20', '22']
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: npm ci
      - run: npm test
```

Ce workflow lance **trois exécutions en parallèle**, une par version de Node :

```
test (18)  ✅
test (20)  ✅
test (22)  ✅
```

### Matrice à plusieurs dimensions

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node: ['20', '22']
```

Cela produit **4 combinaisons** (2 OS × 2 versions). Idéal pour garantir la portabilité.

## Les artefacts : conserver un résultat

Par défaut, la machine du job est **détruite** à la fin. Pour garder un fichier produit (rapport de test, site construit, binaire), on le publie comme **artefact**.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build      # produit un dossier dist/
      - name: Conserver le build
        uses: actions/upload-artifact@v4
        with:
          name: site
          path: dist/
```

L'artefact `site` est téléchargeable depuis la page de l'exécution (section **Artifacts**), et **réutilisable** par un autre job :

```yaml
  deploy:
    needs: build              # attend la fin du job « build »
    runs-on: ubuntu-latest
    steps:
      - name: Récupérer le build
        uses: actions/download-artifact@v4
        with:
          name: site
          path: dist/
      - run: echo "Déploiement du contenu de dist/"
```

## Enchaîner les jobs avec `needs`

`needs:` crée des dépendances entre jobs et donc un ordre d'exécution :

```
   build ──► test ──► deploy
```

```yaml
jobs:
  build:   { runs-on: ubuntu-latest, steps: [ ... ] }
  test:    { runs-on: ubuntu-latest, needs: build, steps: [ ... ] }
  deploy:  { runs-on: ubuntu-latest, needs: test,  steps: [ ... ] }
```

Si `build` échoue, `test` et `deploy` ne s'exécutent pas : on ne déploie jamais du code qui ne se construit pas.

## Récapitulatif de la section

Vous savez désormais :

- ✅ déclencher des workflows sur événements ;
- ✅ construire une CI qui teste automatiquement ;
- ✅ gérer secrets et permissions ;
- ✅ tester plusieurs configurations (matrices) et conserver des artefacts.

Mettons la CI/CD en pratique pour publier : [GitHub Pages](/pages/).
