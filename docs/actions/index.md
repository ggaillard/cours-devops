# GitHub Actions (CI/CD)

::: info 🎯 Séance 7 (1/2) · ~40 min
À la fin de cette séance, vous savez :

- employer le vocabulaire d'Actions : workflow, événement, job, step, runner, action ;
- situer les workflows dans l'arborescence du dépôt ;
- lire un fichier YAML de workflow et en reconstituer le déroulement.

**Prérequis :** [Git & GitHub](/git-github/)

**Livrable attendu :** l'anatomie d'un workflow annotée dans ses propres mots
:::

**GitHub Actions** exécute automatiquement des tâches quand un événement survient dans votre dépôt : un push, une Pull Request, une programmation horaire… C'est le moteur d'**intégration** et de **déploiement continus**, hébergé par GitHub, **sans serveur à administrer**.

## Le vocabulaire

| Terme | Définition |
| --- | --- |
| **Workflow** | Un fichier YAML décrivant un processus automatisé. |
| **Événement (*trigger*)** | Ce qui déclenche le workflow (`push`, `pull_request`…). |
| **Job** | Un ensemble d'étapes exécutées sur une machine (*runner*). |
| **Step** | Une étape : lancer une commande ou une *action* réutilisable. |
| **Runner** | La machine virtuelle fournie par GitHub qui exécute le job. |
| **Action** | Une brique réutilisable (ex. `actions/checkout`). |

## Où vivent les workflows ?

Dans le dossier `.github/workflows/`. Chaque fichier `.yml` y définit un workflow.

```
.github/
└── workflows/
    ├── ci.yml        ← tests à chaque push
    ├── pages.yml     ← déploiement du site
    └── docker.yml    ← construction d'image
```

## Anatomie d'un workflow

```yaml
name: Intégration continue      # nom affiché dans l'onglet Actions

on:                             # quand se déclencher ?
  push:
    branches: [main]
  pull_request:

jobs:
  test:                         # un job nommé « test »
    runs-on: ubuntu-latest      # sur quelle machine
    steps:
      - uses: actions/checkout@v4   # récupère le code
      - run: echo "Bonjour Actions" # exécute une commande
```

## Le lien CI ↔ CD

```
   push / PR
      │
      ▼
 ┌──────────┐   tests OK ?   ┌────────────┐
 │    CI    │───────────────►│     CD     │
 │ (vérifie)│                │ (déploie)  │
 └──────────┘                └────────────┘
```

- **CI (Intégration continue)** : à chaque modification, on **construit et teste** automatiquement.
- **CD (Déploiement continu)** : si tout est vert, on **livre** automatiquement (Pages, GHCR, PaaS…).

## Dans cette section

- [Mon premier workflow](/actions/premier-workflow)
- [Intégration continue (CI)](/actions/integration-continue)
- [Secrets & variables](/actions/secrets-variables)
- [Matrices & artefacts](/actions/matrices-artefacts)

::: tip Gratuit sur dépôt public
Sur un dépôt **public**, les minutes d'Actions sont **gratuites et illimitées**. Idéal pour apprendre.
:::

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Quelle est la différence entre un *job* et un *step* ?
Un **job** s'exécute sur une machine (un runner) et regroupe des **steps**, qui s'y déroulent séquentiellement. Deux jobs tournent par défaut en parallèle et sur des machines distinctes : ils ne partagent donc pas leur système de fichiers.
:::

::: details 2. Où GitHub cherche-t-il les workflows, et que se passe-t-il ailleurs ?
Exclusivement dans `.github/workflows/`. Un fichier YAML placé ailleurs est ignoré silencieusement — c'est une source d'erreur classique, d'autant qu'aucun message ne le signale.
:::

::: details 3. Que fait `uses: actions/checkout@v4` et pourquoi est-ce presque toujours la première étape ?
Elle copie le code du dépôt sur le runner. Le runner démarre vide : sans checkout, il n'y a tout simplement aucun fichier à construire ou à tester.
:::

**Critères de réussite de la séance**

- ☐ je peux dessiner l'enchaînement événement → job → steps
