# Cours DevOps

[![Deploy](https://github.com/ggaillard/cours-devops/actions/workflows/deploy.yml/badge.svg)](https://github.com/ggaillard/cours-devops/actions/workflows/deploy.yml)
[![CI](https://github.com/ggaillard/cours-devops/actions/workflows/ci.yml/badge.svg)](https://github.com/ggaillard/cours-devops/actions/workflows/ci.yml)
[![CodeQL](https://github.com/ggaillard/cours-devops/actions/workflows/codeql.yml/badge.svg)](https://github.com/ggaillard/cours-devops/actions/workflows/codeql.yml)
[![Licence: CC BY-NC-SA 4.0](https://img.shields.io/badge/licence-CC%20BY--NC--SA%204.0-lightgrey.svg)](LICENSE)

De la première ligne de code à la mise en production automatisée : **32 séances de 2 h**, sans installation locale.
Site en ligne : **https://ggaillard.github.io/cours-devops/**

## Contenu

| Section | Sujet |
| --- | --- |
| Introduction | Culture DevOps, choix du tout-en-ligne |
| Git & GitHub | Commits, branches, Pull Requests, Issues, Projects |
| Codespaces | Environnement de développement dans le cloud |
| GitHub Actions | CI/CD : workflows, secrets, matrices, artefacts |
| GitHub Pages | Déploiement continu d'un site statique |
| Conteneurs (GHCR) | Construire et publier une image sans Docker local |
| DevSecOps | Dependabot, CodeQL, secret scanning |
| Déploiement | CD vers un service en ligne + stratégies |
| Qualité & tests | Pyramide des tests, couverture de code, quality gate |
| Modélisation UML | Cas d'utilisation, activité, déploiement — diagrammes versionnés en Mermaid |
| Conception objet & API | POO en Java, chaque notion avec son diagramme UML, API REST, JUnit/Mockito/JaCoCo |
| TP | 5 travaux pratiques transversaux |

## Organisation

Le cours se lit en deux parties, décrites dans [le parcours](https://ggaillard.github.io/cours-devops/introduction/parcours.html) :

- **S1 – S23 — la chaîne DevOps** : Git, CI/CD, conteneurs, sécurité, puis qualité logicielle.
- **S24 – S32 — concevoir puis livrer** : modélisation UML du système, puis conception orientée
  objet en Java où chaque notion (encapsulation, associations, héritage) arrive avec le
  diagramme qui l'exprime, jusqu'à l'API livrée par le pipeline de la première partie.

Chaque page annonce ses objectifs et se termine par une auto-évaluation.

## Le dépôt est lui-même le support du cours

Chaque notion enseignée est appliquée ici, et l'étudiant peut lire le fichier correspondant :

| Notion enseignée | Où la voir en vrai |
| --- | --- |
| Dev Container | [`.devcontainer/devcontainer.json`](.devcontainer/devcontainer.json) |
| Intégration continue | [`.github/workflows/ci.yml`](.github/workflows/ci.yml) |
| Déploiement continu | [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) |
| Image conteneur + GHCR | [`Dockerfile`](Dockerfile) · [`.github/workflows/ghcr.yml`](.github/workflows/ghcr.yml) |
| Analyse CodeQL | [`.github/workflows/codeql.yml`](.github/workflows/codeql.yml) |
| Dependabot | [`.github/dependabot.yml`](.github/dependabot.yml) |
| Diagrammes UML versionnés | [`docs/uml/`](docs/uml) — écrits en Mermaid, rendus par GitHub |
| Gabarits Issues / PR | [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE) · [`.github/pull_request_template.md`](.github/pull_request_template.md) |

## Technologie

Site généré avec [VitePress](https://vitepress.dev), déployé par **GitHub Actions** sur **GitHub Pages**.

## Contribuer

1. Créez une branche (`docs/…`, `fix/…`, `feat/…`) — jamais de commit direct sur `main`.
2. Vérifiez que le site se construit : `npm run docs:build` (un **lien mort fait échouer la CI**).
3. Ouvrez une Pull Request : la CI se déclenche automatiquement.

Toute nouvelle page doit être référencée dans la `sidebar` de `docs/.vitepress/config.mjs`.

## Développement local (optionnel)

Le cours n'exige aucune installation. Le plus simple est d'ouvrir un **Codespace** :
le Dev Container installe tout et lance `npm ci` automatiquement.

Pour prévisualiser le site sur sa propre machine :

```bash
npm ci
npm run docs:dev      # serveur de développement (http://localhost:5173)
npm run docs:build    # construction de production + vérification des liens
npm run docs:preview  # prévisualiser la build
```

## Exécuter le site en conteneur

```bash
docker run --rm -p 8080:80 ghcr.io/ggaillard/cours-devops:main
```

Dans l'image, le site est servi à la racine (`DOCS_BASE=/`) ; sur Pages il est servi
sous `/cours-devops/`. C'est la variable `DOCS_BASE` qui fait la différence.

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/deploy.yml`, qui construit et publie le site.

Prérequis côté dépôt (à faire une fois) :

- **Settings → Pages → Source → GitHub Actions**
- **Settings → Code security** → Dependabot alerts, Dependabot security updates,
  CodeQL, Secret scanning + **Push protection**
- **Settings → Branches** → règle de protection sur `main` (PR obligatoire, CI verte)

## Historique

L'ancienne version Jekyll de ce cours (Linux, Docker, GitLab CI — orientée SISR) reste
consultable sur la branche `archive/jekyll-sisr` et le tag `v0-jekyll-sisr`.

## Licence

Contenu pédagogique sous [CC BY-NC-SA 4.0](LICENSE).
Les exemples de code, workflows et configurations sont sous licence MIT, pour être
librement réutilisables par les étudiants.
