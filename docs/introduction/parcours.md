# Le parcours recommandé

Le cours est découpé en **33 séances de 2 heures**, soit environ 66 h — le volume d'un module annuel à raison d'une séance hebdomadaire. Chaque séance a des objectifs explicites, un livrable vérifiable et une auto-évaluation en fin de page.

::: tip Lire une page de cours
Chaque page s'ouvre sur un bandeau 🎯 (séance, durée, objectifs, prérequis, livrable) et se termine par une auto-évaluation avec correction dépliable et critères de réussite. Une page = une portion de séance.
:::

## Les deux moitiés du cours

```
   ┌─────────────────────────────────────────────┐
   │  PARTIE 1 — La chaîne DevOps      S1 – S23  │
   │  Git, CI/CD, conteneurs, sécurité, qualité  │
   └───────────────────────┬─────────────────────┘
                           ▼
   ┌─────────────────────────────────────────────┐
   │  PARTIE 2 — Concevoir et livrer   S24 – S33 │
   │  UML, POO en Java, API REST livrée par la   │
   │  chaîne montée en partie 1                  │
   └─────────────────────────────────────────────┘
```

La première partie construit l'outillage sur de petits projets. La seconde l'applique à une **vraie application** : une API REST de gestion d'interventions, d'abord **modélisée en UML**, puis écrite en Java, qui traverse tout le pipeline jusqu'à l'image publiée.

## Partie 1 — La chaîne DevOps

### Bloc 1 — Fondations (S1–S2)

| Séance | Contenu | Livrable |
| --- | --- | --- |
| **S1** | [Introduction au DevOps](/introduction/) · [Pourquoi le tout-en-ligne ?](/introduction/tout-en-ligne) · [Préparer son compte GitHub](/introduction/preparer-github) | Compte sécurisé en 2FA + dépôt public de travail |
| **S2** | [Git & GitHub](/git-github/) · [Les bases de Git](/git-github/bases-git) | 3 commits conventionnels, `.gitignore`, README |

### Bloc 2 — Collaborer (S3–S4)

| Séance | Contenu | Livrable |
| --- | --- | --- |
| **S3** | [Branches & Pull Requests](/git-github/branches-pr) | Une PR relue, fusionnée ; `main` protégée |
| **S4** | [Issues & Projects](/git-github/issues-projects) | 5 Issues étiquetées, un Project, une PR fermant une Issue |

::: tip Travail en binôme dès S3
La revue de code n'a de sens qu'à plusieurs. Constituez les binômes en S3 et conservez-les : chacun devient relecteur du dépôt de l'autre pour le reste de l'année, jusqu'au projet d'API.
:::

### Bloc 3 — Environnement de développement (S5–S6)

| Séance | Contenu | Livrable |
| --- | --- | --- |
| **S5** | [GitHub Codespaces](/codespaces/) · [Mon premier Codespace](/codespaces/premier-codespace) | Un commit poussé depuis un Codespace |
| **S6** | [Dev Containers](/codespaces/dev-containers) | Un `devcontainer.json` reproductible en équipe |

### Bloc 4 — Automatiser (S7–S11)

Le cœur du module. Le TP 1 est placé **au milieu** du bloc : il consolide les bases avant les notions avancées.

| Séance | Contenu | Livrable |
| --- | --- | --- |
| **S7** | [GitHub Actions](/actions/) · [Mon premier workflow](/actions/premier-workflow) | Un workflow exécuté, dont un lancement manuel |
| **S8** | [Intégration continue (CI)](/actions/integration-continue) | Un `ci.yml` sur un projet applicatif + badge |
| **S9** | 🧪 [**TP 1 — Pipeline CI de A à Z**](/tp/tp1-pipeline-ci) | Dépôt public, PR rouge puis verte, `main` protégée |
| **S10** | [Secrets & variables](/actions/secrets-variables) | Un workflow à secrets et permissions minimales |
| **S11** | [Matrices & artefacts](/actions/matrices-artefacts) | Pipeline `build → test → deploy` avec artefact |

### Bloc 5 — Publier (S12–S16)

| Séance | Contenu | Livrable |
| --- | --- | --- |
| **S12** | [GitHub Pages](/pages/) · [Déployer un site statique](/pages/deployer-site) | Un site en ligne, republié à chaque push |
| **S13** | 🧪 [**TP 2 — Publier un site sur Pages**](/tp/tp2-site-pages) | URL publique + 2 déploiements verts |
| **S14** | [Conteneurs & GHCR](/conteneurs/) · [Construire une image](/conteneurs/build-image) | `Dockerfile` + `.dockerignore` + build vert |
| **S15** | [Publier sur GHCR](/conteneurs/publier-ghcr) | Image publiée sous deux tags |
| **S16** | 🧪 [**TP 3 — Image conteneur sur GHCR**](/tp/tp3-image-ghcr) | Image publique, `latest` + `1.0.0` |

### Bloc 6 — Sécuriser et livrer (S17–S19)

| Séance | Contenu | Livrable |
| --- | --- | --- |
| **S17** | [DevSecOps](/securite/) · [Dependabot](/securite/dependabot) | `dependabot.yml` actif, une PR traitée |
| **S18** | [CodeQL & scan de secrets](/securite/codeql-secrets) | CodeQL vert, push protection active |
| **S19** | [Déploiement continu](/deploiement/) | Workflow avec environnement `production` à approbation |

### Bloc 7 — Qualité & tests (S20–S23)

Jusqu'ici la CI exécutait « les tests » sans qu'on ait interrogé leur nature. Ce bloc rend le pipeline **exigeant** : il ne se contente plus de signaler, il refuse.

| Séance | Contenu | Livrable |
| --- | --- | --- |
| **S20** | [La pyramide des tests](/qualite/) | Une suite à trois niveaux exécutée par la CI |
| **S21** | [Couverture de code](/qualite/couverture) | Rapport publié + seuil bloquant |
| **S22** | [Analyse statique & quality gate](/qualite/analyse-statique) | Format, lint et complexité imposés par la CI |
| **S23** | 🧪 [**TP 4 — Durcir la chaîne CI**](/tp/tp4-qualite-ci) | Une PR bloquée par la couverture, puis débloquée |

## Partie 2 — Concevoir puis livrer

### Bloc 8 — Modélisation UML (S24–S26)

Les diagrammes sont **écrits en texte, versionnés et relus en Pull Request** — pas dessinés dans un logiciel puis exportés en image. Le modèle devient un artefact de développement comme un autre.

| Séance | Contenu | Diagrammes |
| --- | --- | --- |
| **S24** | [Modéliser avec UML](/uml/) | Pourquoi modéliser, UML comme code, cas d'utilisation |
| **S25** | [Le diagramme de classes](/uml/classes) | Visibilité, multiplicités, héritage, composition / agrégation |
| **S26** | [Les diagrammes dynamiques](/uml/dynamique) | Séquence, états, activité, déploiement |

::: tip UML ne précède pas seulement la POO, il la sert
Le diagramme de classes de S25 **est** le domaine que vous coderez en S28–S29 ; le diagramme de séquence de S26 **est** la liste des tests de S31. Les deux blocs se répondent page par page.
:::

### Bloc 9 — POO, API REST et livraison (S27–S32)

Une seule application, construite de séance en séance. Les concepts objet sont travaillés **sans framework** en S28–S29, avant que Spring n'entre en scène.

| Séance | Contenu | Notions objet |
| --- | --- | --- |
| **S27** | [Une API objet en Java](/api-java/) | Choix du langage, projet Maven, CI dès le premier commit |
| **S28** | [Modéliser le domaine](/api-java/modeliser-poo) | Encapsulation, invariants, immuabilité, `equals`/`hashCode` |
| **S29** | [Abstraction & polymorphisme](/api-java/abstraction-polymorphisme) | Classe abstraite, interface, inversion de dépendance |
| **S30** | [Exposer une API REST](/api-java/api-rest) | Couches, DTO, validation, codes HTTP |
| **S31** | [Tester l'API](/api-java/tester-api) | JUnit 5, Mockito, MockMvc, JaCoCo |
| **S32** | 🧪 [**TP 5 — Livrer l'API**](/tp/tp5-api-livree) | Dockerfile multi-étapes, publication conditionnée |

### S33 — Soutenance

Démonstration en direct, sur le dépôt de l'équipe :

1. ouvrir une PR qui dégrade la couverture, montrer le blocage ;
2. corriger, faire passer la CI au vert, fusionner ;
3. montrer l'image publiée et l'exécuter ;
4. justifier **deux** choix de conception objet, **diagramme de classes à l'appui**.

::: tip Ce qui est évalué
La **chaîne** et la **conception**, pas la richesse fonctionnelle. Une API à trois routes avec un domaine bien modélisé et un pipeline exigeant vaut mieux qu'une application ambitieuse déployée à la main.
:::

## Caler les 33 séances sur l'année

Une année scolaire offre environ 30 semaines utilisables : **33 séances dépassent ce cadre de trois semaines**. Deux façons de retomber sur ses pieds — soit vous disposez de plus de 2 h hebdomadaires, soit vous traitez trois séances en autonomie guidée (S22 analyse statique, S26 diagrammes dynamiques et S30 API REST se prêtent bien à un travail préparé à la maison, repris en début de séance suivante).

Dans tous les cas, anticipez :

| Point de vigilance | Conduite à tenir |
| --- | --- |
| Bloc 4 (S7–S11) | Le plus dense : prévoyez une séance de battement |
| Périodes de stage | Le bloc 9 supporte mal la discontinuité — évitez de le couper |
| Reprise après vacances | Les réglages GitHub et les quotas s'oublient vite |
| Java en S27 | Faites reconstruire le Dev Container **avant** la séance |

### Trois moments d'évaluation

- **Après S9** — chaîne Git + CI. Le TP 1 sert de support noté.
- **Après S23** — qualité logicielle. Le TP 4 est évalué sur pièces (PR rouge puis verte, rapport).
- **En S33** — soutenance du projet d'API, diagrammes à l'appui.

### Si vous disposez de moins de temps

| Volume | Ce que l'on garde |
| --- | --- |
| **~60 h (30 séances)** | Tout sauf S22, S26 et S30, traitées en autonomie guidée |
| **~46 h (23 séances)** | Partie 1 complète, sans UML ni bloc API |
| **~40 h (20 séances)** | S1–S16, S25 puis le bloc 9 : la chaîne, le diagramme de classes et l'API |
| **~30 h (15 séances)** | S1–S13 et S20–S21 : Git, CI, publication, tests et couverture |
| **~12 h (6 séances)** | S1, S2, S3, S7, S8, S9 : le socle Git + intégration continue |

Les deux blocs à ne jamais sacrifier sont le **4** et le **7** : sans intégration continue ni tests sérieux, tout le reste n'est qu'un enchaînement d'outils.

## Dépendances entre séances

```
   S1 ─► S2 ─► S3 ─► S4
                │
                ├─► S5 ─► S6                (Codespaces : déplaçable)
                │
                └─► S7 ─► S8 ─► S9          (chaîne obligatoire)
                           │
                           ├─► S10 ─► S11
                           │
                           ├─► S12 ─► S13            ces deux branches
                           │                         sont interchangeables
                           └─► S14 ─► S15 ─► S16
                                       │
                                       └─► S17 ─► S18 ─► S19
                                                          │
                                                          ▼
                                            S20 ─► S21 ─► S22 ─► S23
                                                                  │
                                                                  ▼
                                     S24 ─► S25 ─► S26        (UML)
                                                     │
                                                     ▼
                              S27 ─► S28 ─► S29 ─► S30 ─► S31 ─► S32 ─► S33
```

- **S5–S6 (Codespaces)** peuvent être avancées ou reportées — sauf si vous comptez faire le bloc 8, qui suppose un Dev Container maîtrisé.
- **S12–S13 (Pages)** et **S14–S16 (conteneurs)** sont indépendantes l'une de l'autre. Si le temps manque, gardez les conteneurs : le TP 5 en dépend.
- **S20–S23 (qualité)** doivent précéder **S31**, qui applique couverture et seuils au code Java.
- **S24–S26 (UML)** peuvent être traitées plus tôt dans l'année ; elles ne dépendent que de la notion de Pull Request. Les placer juste avant le bloc Java a l'avantage d'enchaîner modèle et code.
- **S27 → S32** forment une chaîne stricte : chaque séance part du code de la précédente.

Prêt ? Commencez par [préparer votre compte GitHub](/introduction/preparer-github).
