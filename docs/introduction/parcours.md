# Le parcours recommandé

Le cours est découpé en **24 séances de 2 heures**, soit environ 48 h — le volume d'un module annuel à raison d'une séance hebdomadaire. Chaque séance a des objectifs explicites, un livrable vérifiable et une auto-évaluation en fin de page.

::: tip Lire une page de cours
Chaque page s'ouvre sur un bandeau 🎯 (séance, durée, objectifs, prérequis, livrable) et se termine par une auto-évaluation avec correction dépliable et critères de réussite. Une page = une portion de séance.
:::

## La progression en un coup d'œil

```
 Bloc 1        Bloc 2        Bloc 3         Bloc 4        Bloc 5       Bloc 6
 Fondations    Collaborer    Environnement  Automatiser   Publier      Sécuriser
 S1–S2         S3–S4         S5–S6          S7–S11        S12–S16      S17–S19
   │             │             │              │             │            │
   └─────────────┴─────────────┴──────────────┴─────────────┴────────────┘
                                     │
                                     ▼
                        Bloc 7 — Projet fil rouge  S20–S24
```

## Bloc 1 — Fondations (S1–S2)

| Séance | Contenu | Livrable |
| --- | --- | --- |
| **S1** | [Introduction au DevOps](/introduction/) · [Pourquoi le tout-en-ligne ?](/introduction/tout-en-ligne) · [Préparer son compte GitHub](/introduction/preparer-github) | Compte sécurisé en 2FA + dépôt public de travail |
| **S2** | [Git & GitHub](/git-github/) · [Les bases de Git](/git-github/bases-git) | 3 commits conventionnels, `.gitignore`, README |

## Bloc 2 — Collaborer (S3–S4)

| Séance | Contenu | Livrable |
| --- | --- | --- |
| **S3** | [Branches & Pull Requests](/git-github/branches-pr) | Une PR relue, fusionnée ; `main` protégée |
| **S4** | [Issues & Projects](/git-github/issues-projects) | 5 Issues étiquetées, un Project, une PR fermant une Issue |

::: tip Travail en binôme dès S3
La revue de code n'a de sens qu'à plusieurs. Constituez les binômes en S3 et conservez-les : chacun devient relecteur du dépôt de l'autre pour le reste de l'année.
:::

## Bloc 3 — Environnement de développement (S5–S6)

| Séance | Contenu | Livrable |
| --- | --- | --- |
| **S5** | [GitHub Codespaces](/codespaces/) · [Mon premier Codespace](/codespaces/premier-codespace) | Un commit poussé depuis un Codespace |
| **S6** | [Dev Containers](/codespaces/dev-containers) | Un `devcontainer.json` reproductible en équipe |

## Bloc 4 — Automatiser (S7–S11)

C'est le cœur du module. Le TP 1 est placé **au milieu** du bloc, pas à la fin : il consolide les bases avant d'aborder les notions avancées.

| Séance | Contenu | Livrable |
| --- | --- | --- |
| **S7** | [GitHub Actions](/actions/) · [Mon premier workflow](/actions/premier-workflow) | Un workflow exécuté, dont un lancement manuel |
| **S8** | [Intégration continue (CI)](/actions/integration-continue) | Un `ci.yml` sur un projet applicatif + badge |
| **S9** | 🧪 [**TP 1 — Pipeline CI de A à Z**](/tp/tp1-pipeline-ci) | Dépôt public, PR rouge puis verte, `main` protégée |
| **S10** | [Secrets & variables](/actions/secrets-variables) | Un workflow à secrets et permissions minimales |
| **S11** | [Matrices & artefacts](/actions/matrices-artefacts) | Pipeline `build → test → deploy` avec artefact |

## Bloc 5 — Publier (S12–S16)

| Séance | Contenu | Livrable |
| --- | --- | --- |
| **S12** | [GitHub Pages](/pages/) · [Déployer un site statique](/pages/deployer-site) | Un site en ligne, republié à chaque push |
| **S13** | 🧪 [**TP 2 — Publier un site sur Pages**](/tp/tp2-site-pages) | URL publique + 2 déploiements verts |
| **S14** | [Conteneurs & GHCR](/conteneurs/) · [Construire une image](/conteneurs/build-image) | `Dockerfile` + `.dockerignore` + build vert |
| **S15** | [Publier sur GHCR](/conteneurs/publier-ghcr) | Image publiée sous deux tags |
| **S16** | 🧪 [**TP 3 — Image conteneur sur GHCR**](/tp/tp3-image-ghcr) | Image publique, `latest` + `1.0.0` |

## Bloc 6 — Sécuriser et livrer (S17–S19)

| Séance | Contenu | Livrable |
| --- | --- | --- |
| **S17** | [DevSecOps](/securite/) · [Dependabot](/securite/dependabot) | `dependabot.yml` actif, une PR traitée |
| **S18** | [CodeQL & scan de secrets](/securite/codeql-secrets) | CodeQL vert, push protection active |
| **S19** | [Déploiement continu](/deploiement/) | Workflow avec environnement `production` à approbation |

## Bloc 7 — Projet fil rouge (S20–S24)

Les cinq dernières séances remontent la chaîne complète sur **un seul projet**, mené en binôme. Rien de nouveau n'est enseigné : tout a déjà été vu isolément, il s'agit de l'assembler.

| Séance | Étape | Attendu |
| --- | --- | --- |
| **S20** | Cadrage | Dépôt public, Issues, Project alimenté, `devcontainer.json` |
| **S21** | Développement | Application minimale + tests, travail en branches et PR |
| **S22** | Chaîne CI | CI verte, matrice, `main` protégée, badge |
| **S23** | Livraison | Image sur GHCR **ou** site sur Pages, déploiement automatique |
| **S24** | Sécurité et soutenance | Dependabot + CodeQL actifs, démonstration du pipeline |

::: tip Sujet libre, contrainte fixe
Laissez le sujet applicatif au choix — l'évaluation porte sur la **chaîne**, pas sur la richesse fonctionnelle. Une application de cinquante lignes dotée d'un pipeline exemplaire vaut mieux qu'une application ambitieuse déployée à la main.
:::

## Caler les 24 séances sur l'année

Une année scolaire offre environ 30 semaines utilisables. Les six séances d'écart sont une **marge nécessaire**, pas du temps perdu :

| Usage de la marge | Pourquoi |
| --- | --- |
| Reprise après vacances | Les réglages GitHub et les quotas s'oublient vite |
| Rattrapage du bloc 4 | C'est le bloc le plus dense ; prévoyez une séance de battement |
| Périodes de stage | Les séances de projet (S20–S24) supportent mal la discontinuité |
| Évaluations | Deux bilans intermédiaires, plus la soutenance |

### Trois moments d'évaluation

- **Après S9** — bilan sur la chaîne Git + CI. Le TP 1 sert de support noté.
- **Après S16** — bilan sur la publication. Les TP 2 et 3 sont évalués sur pièces (URL, image).
- **En S24** — soutenance du projet fil rouge, sur démonstration du pipeline en direct.

### Si vous disposez de moins de temps

| Volume disponible | Ce que l'on garde |
| --- | --- |
| **~30 h (15 séances)** | Blocs 1 à 5, TP 1 et TP 2, sans projet fil rouge |
| **~20 h (10 séances)** | S1 à S9 puis S12–S13 : Git, CI et publication d'un site |
| **~12 h (6 séances)** | S1, S2, S3, S7, S8, S9 : le socle Git + intégration continue |

Le bloc à ne jamais sacrifier est le **bloc 4** : sans intégration continue, tout le reste n'est plus qu'un enchaînement d'outils.

## Dépendances entre séances

Certaines séances se déplacent librement, d'autres non :

```
   S1 ─► S2 ─► S3 ─► S4
                │
                ├─► S5 ─► S6              (Codespaces : déplaçable)
                │
                └─► S7 ─► S8 ─► S9        (chaîne obligatoire)
                           │
                           ├─► S10 ─► S11
                           │
                           ├─► S12 ─► S13          ces deux branches
                           │                       sont interchangeables
                           └─► S14 ─► S15 ─► S16
                                       │
                                       └─► S17 ─► S18 ─► S19 ─► S20…S24
```

- **S5–S6 (Codespaces)** peuvent être avancées ou reportées : rien n'en dépend strictement.
- **S12–S13 (Pages)** et **S14–S16 (conteneurs)** sont indépendantes l'une de l'autre — traitez celle qui sert le mieux vos projets, ou les deux dans l'ordre qui vous convient.
- **S7 → S8 → S9** est en revanche une chaîne : chaque séance suppose la précédente acquise.

Prêt ? Commencez par [préparer votre compte GitHub](/introduction/preparer-github).
