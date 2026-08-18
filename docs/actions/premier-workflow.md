# Mon premier workflow

::: info 🎯 Séance 7 (2/2) · ~1 h 20
À la fin de cette séance, vous savez :

- écrire et déclencher son premier workflow ;
- lire les journaux d'exécution étape par étape ;
- combiner plusieurs événements déclencheurs, dont le déclenchement manuel.

**Prérequis :** [GitHub Actions](/actions/)

**Livrable attendu :** un workflow `hello.yml` exécuté avec succès, avec une exécution manuelle visible
:::

Objectif : créer un workflow qui s'exécute à chaque push et affiche un message.

## 1. Créer le fichier

Depuis github.com : **Add file → Create new file**, puis nommez-le exactement :

```
.github/workflows/hello.yml
```

Le chemin compte : GitHub ne détecte les workflows que dans `.github/workflows/`.

## 2. Écrire le workflow

```yaml
name: Hello DevOps

on: [push]

jobs:
  bonjour:
    runs-on: ubuntu-latest
    steps:
      - name: Dire bonjour
        run: echo "👋 Bonjour depuis GitHub Actions !"

      - name: Afficher la date
        run: date

      - name: Informations sur le dépôt
        run: |
          echo "Dépôt : $GITHUB_REPOSITORY"
          echo "Branche : $GITHUB_REF_NAME"
          echo "Auteur du push : $GITHUB_ACTOR"
```

## 3. Commiter et observer

1. Commitez le fichier.
2. Le push déclenche le workflow.
3. Onglet **Actions** → cliquez sur l'exécution en cours.
4. Dépliez le job **bonjour** puis chaque étape pour voir la sortie.

```
Actions
└── Hello DevOps  #1  ✅
    └── bonjour
        ├── Set up job
        ├── Dire bonjour        → 👋 Bonjour depuis GitHub Actions !
        ├── Afficher la date    → Tue Aug 18 ...
        ├── Informations ...    → Dépôt : ggaillard/...
        └── Complete job
```

## Comprendre chaque bloc

- **`name`** — le nom affiché dans l'onglet Actions.
- **`on: [push]`** — l'événement déclencheur.
- **`jobs`** — la liste des jobs (ici un seul : `bonjour`).
- **`runs-on: ubuntu-latest`** — la machine, une VM Ubuntu jetable fournie par GitHub.
- **`steps`** — les étapes exécutées dans l'ordre.
- **`run`** — une commande shell. Le `|` permet plusieurs lignes.

## Les variables d'environnement utiles

GitHub fournit automatiquement des variables `$GITHUB_*` :

| Variable | Contenu |
| --- | --- |
| `GITHUB_REPOSITORY` | `proprietaire/depot` |
| `GITHUB_REF_NAME` | la branche ou le tag |
| `GITHUB_ACTOR` | qui a déclenché le workflow |
| `GITHUB_SHA` | l'identifiant du commit |

## Déclencher sur plusieurs événements

```yaml
on:
  push:
    branches: [main]
  pull_request:
  workflow_dispatch:      # bouton « Run workflow » manuel
  schedule:
    - cron: '0 8 * * 1'   # tous les lundis à 8h UTC
```

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Comment ajouter un bouton « Run workflow » dans l'onglet Actions ?
En déclarant l'événement `workflow_dispatch:`. Très utile pour rejouer un déploiement sans avoir à produire un commit artificiel.
:::

::: details 2. Que contient `$GITHUB_REF_NAME` et à quoi cela sert-il ?
Le nom de la branche ou du tag ayant déclenché l'exécution. On s'en sert pour adapter le comportement — par exemple ne déployer en production que si l'on est sur `main`.
:::

::: details 3. Le workflow ne se déclenche pas après le commit. Quelles pistes vérifier en premier ?
Le chemin exact du fichier (`.github/workflows/`), l'extension (`.yml`), la validité du YAML (l'indentation en particulier), et l'adéquation entre l'événement déclaré et l'action réalisée.
:::

**Critères de réussite de la séance**

- ☐ l'exécution est verte dans l'onglet Actions
- ☐ je sais retrouver la sortie d'une étape précise dans les journaux

Vous avez un workflow fonctionnel. Rendons-le utile : [Intégration continue (CI)](/actions/integration-continue).
