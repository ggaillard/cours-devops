---
layout: default
title: Pipeline CI basique
parent: CI/CD
nav_order: 2
---

# Pipeline CI — Build, Test, Deploy
{: .no_toc }

**Niveau :** 🟡 Intermédiaire  
**Durée :** 3h  
**Objectif :** Construire un pipeline GitLab CI complet : intégration, tests automatiques et déploiement.
{: .fs-5 }

---

## Table des matières
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Anatomie d'un pipeline GitLab CI

```yaml
# .gitlab-ci.yml

# Variables globales
variables:
  NODE_VERSION: "20"

# Stages (exécutés dans l'ordre)
stages:
  - install
  - test
  - build
  - deploy

# Job réutilisable (template)
.node-base: &node-base
  image: node:${NODE_VERSION}-alpine
  before_script:
    - npm ci --cache .npm --prefer-offline
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - .npm/

# ── Stage : install ────────────────────────────────────────────────
install-deps:
  <<: *node-base
  stage: install
  script:
    - echo "Dépendances installées via cache"
  artifacts:
    paths:
      - node_modules/
    expire_in: 1 hour

# ── Stage : test ───────────────────────────────────────────────────
unit-tests:
  <<: *node-base
  stage: test
  script:
    - npm run test:unit -- --coverage
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
    paths:
      - coverage/
  coverage: '/Lines\s*:\s*(\d+\.?\d*)%/'

lint:
  <<: *node-base
  stage: test
  script:
    - npm run lint

# ── Stage : build ──────────────────────────────────────────────────
build-app:
  <<: *node-base
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  only:
    - main
    - tags

# ── Stage : deploy ─────────────────────────────────────────────────
deploy-staging:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache rsync openssh-client
    - eval $(ssh-agent -s)
    - echo "$STAGING_SSH_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - ssh-keyscan -H $STAGING_HOST >> ~/.ssh/known_hosts
  script:
    - rsync -avz --delete dist/ deploy@${STAGING_HOST}:/var/www/staging/
  environment:
    name: staging
    url: https://staging.exemple.fr
  only:
    - main

deploy-production:
  stage: deploy
  image: alpine:latest
  script:
    - echo "Déploiement en production..."
  environment:
    name: production
    url: https://exemple.fr
  when: manual    # Nécessite une validation humaine
  only:
    - tags       # Uniquement sur les tags (releases)
```

---

## Runners GitLab

Le **runner** est l'agent qui exécute les jobs du pipeline.

### Types de runners

| Type | Description |
|------|-------------|
| **Shared runners** | Fournis par GitLab.com, utilisables par tous |
| **Group runners** | Partagés entre projets d'un groupe |
| **Project runners** | Dédiés à un seul projet |
| **Self-hosted runner** | Runner installé sur votre propre serveur |

### Installer un runner sur votre serveur

```bash
# Sur un serveur Debian/Ubuntu
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash
sudo apt install gitlab-runner

# Enregistrer le runner (token dans Settings → CI/CD → Runners)
sudo gitlab-runner register \
  --url https://gitlab.com \
  --registration-token VOTRE_TOKEN \
  --executor docker \
  --docker-image alpine:latest \
  --description "Runner BTS SIO" \
  --tag-list "docker,linux"

# Vérifier
sudo gitlab-runner status
sudo gitlab-runner list
```

---

## Variables CI/CD et secrets

### Niveaux de variables

```
Instance GitLab  >  Groupe  >  Projet  >  .gitlab-ci.yml
(priorité croissante)
```

### Variables prédéfinies utiles

```yaml
script:
  - echo "Branche : $CI_COMMIT_BRANCH"
  - echo "Tag : $CI_COMMIT_TAG"
  - echo "SHA du commit : $CI_COMMIT_SHORT_SHA"
  - echo "Nom du projet : $CI_PROJECT_NAME"
  - echo "URL du projet : $CI_PROJECT_URL"
  - echo "ID du pipeline : $CI_PIPELINE_ID"
  - echo "Numéro du job : $CI_JOB_ID"
```

### Passer des variables entre jobs

```yaml
build:
  stage: build
  script:
    - VERSION=$(git describe --tags --always)
    - echo "VERSION=$VERSION" >> build.env
  artifacts:
    reports:
      dotenv: build.env

deploy:
  stage: deploy
  script:
    - echo "Déploiement de la version $VERSION"
  needs:
    - build
```

---

## Règles et conditions

```yaml
# Remplace "only/except" (recommandé)
job-conditionnel:
  script:
    - echo "Exécution conditionnelle"
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      when: always
    - if: $CI_MERGE_REQUEST_ID       # Sur les Merge Requests
      when: always
    - if: $CI_COMMIT_TAG             # Sur les tags
      variables:
        ENVIRONMENT: production
    - when: never                    # Sinon : jamais

# Déclenchement manuel avec paramètres
release:
  stage: deploy
  script:
    - echo "Création de la release $RELEASE_VERSION"
  when: manual
  variables:
    RELEASE_VERSION:
      description: "Numéro de version (ex: 1.2.3)"
```

---

## Artifacts et cache

```yaml
# Cache — persisté entre pipelines, par branche
cache:
  key: "$CI_COMMIT_REF_SLUG"
  paths:
    - node_modules/
    - .npm/
  policy: pull-push    # pull au début, push à la fin

# Artifacts — résultats transmis entre stages et téléchargeables
build:
  script:
    - npm run build
  artifacts:
    name: "$CI_PROJECT_NAME-$CI_COMMIT_SHORT_SHA"
    paths:
      - dist/
    exclude:
      - dist/**/*.map
    expire_in: 30 days
    reports:
      junit: test-results.xml
```

---

## Exercice

1. Créez un projet GitLab avec une application Node.js simple (ou PHP)
2. Écrivez un pipeline en 3 stages : `test`, `build`, `deploy`
3. Le stage `test` doit exécuter au moins un test automatique
4. Le stage `deploy` doit copier les fichiers sur un serveur via SSH (ou simuler avec `echo`)
5. Ajoutez une règle pour que le déploiement en production soit **manuel**
6. *(Bonus)* Installez un runner self-hosted sur votre VM Debian

---

## Ressources

- [Documentation GitLab CI/CD](https://docs.gitlab.com/ee/ci/)
- [Référence .gitlab-ci.yml](https://docs.gitlab.com/ee/ci/yaml/)
- [Variables CI/CD prédéfinies](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)
- [GitLab CI/CD Playground](https://gitlab.com/-/ci/lint) — validateur de syntaxe
