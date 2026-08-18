---
layout: default
title: GitLab Pages
parent: CI/CD
nav_order: 1
---

# GitLab Pages — Publier un site statique
{: .no_toc }

**Niveau :** 🟢 Débutant  
**Durée :** 2h  
**Objectif :** Publier automatiquement un site statique sur GitLab Pages à chaque push.
{: .fs-5 }

---

## Table des matières
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Principe

GitLab Pages permet d'héberger gratuitement un site statique depuis un dépôt GitLab.  
À chaque `git push`, le pipeline CI/CD reconstruit et redéploie le site automatiquement.

L'URL sera de la forme : `https://votre-groupe.gitlab.io/nom-projet`

---

## TP 1 — Site HTML statique simple

### Structure du projet

```
mon-site/
├── .gitlab-ci.yml
├── index.html
├── style.css
└── script.js
```

### `.gitlab-ci.yml` minimal

```yaml
pages:
  stage: deploy
  script:
    - mkdir -p public
    - cp -r * public/ 2>/dev/null || true
  artifacts:
    paths:
      - public
  only:
    - main
```

{: .callout .callout-tip }
> La clé est le **nom du job** : il doit s'appeler exactement `pages`. GitLab détecte ce nom spécial et publie le dossier `public/` sur Pages.

### Étapes

1. Créez un nouveau projet sur GitLab
2. Ajoutez vos fichiers HTML/CSS/JS
3. Créez le fichier `.gitlab-ci.yml` ci-dessus
4. Faites un `git push`
5. Suivez l'avancement dans **Build → Pipelines**
6. Accédez à **Deploy → Pages** pour obtenir l'URL

---

## TP 2 — Site généré avec un générateur statique

### Avec Jekyll

```yaml
# .gitlab-ci.yml
image: ruby:3.2

pages:
  stage: deploy
  before_script:
    - gem install bundler
    - bundle install
  script:
    - bundle exec jekyll build -d public
  artifacts:
    paths:
      - public
  only:
    - main
```

### Avec VitePress (documentation Vue.js)

```yaml
image: node:20-alpine

pages:
  stage: deploy
  before_script:
    - npm ci
  script:
    - npm run docs:build
    - mv docs/.vitepress/dist public
  artifacts:
    paths:
      - public
  only:
    - main
```

### Avec MkDocs (documentation Markdown)

```yaml
image: python:3.11-slim

pages:
  stage: deploy
  before_script:
    - pip install mkdocs mkdocs-material
  script:
    - mkdocs build --site-dir public
  artifacts:
    paths:
      - public
  only:
    - main
```

---

## TP 3 — Pipeline complet avec tests

```yaml
stages:
  - test
  - build
  - deploy

# ── Tests ──────────────────────────────────────────────────────────
lint:
  stage: test
  image: node:20-alpine
  script:
    - npm ci
    - npm run lint

unit-tests:
  stage: test
  image: node:20-alpine
  script:
    - npm ci
    - npm test
  coverage: '/Statements.*?(\d+(?:\.\d+)?)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

# ── Build ──────────────────────────────────────────────────────────
build:
  stage: build
  image: node:20-alpine
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

# ── Deploy ─────────────────────────────────────────────────────────
pages:
  stage: deploy
  script:
    - mv dist public
  artifacts:
    paths:
      - public
  only:
    - main
  needs:
    - build
```

---

## Variables et secrets

Pour des informations sensibles (tokens, mots de passe), utilisez les **variables CI/CD** de GitLab :

**Settings → CI/CD → Variables**

```yaml
deploy:
  script:
    - echo "$DEPLOY_TOKEN" | docker login registry.gitlab.com -u deploy --password-stdin
    - rsync -avz dist/ user@server:/var/www/html/
  environment:
    name: production
    url: https://mon-site.fr
```

Les variables sont **masquées dans les logs** si vous cochez "Mask variable".

---

## Environnements GitLab

GitLab permet de suivre les déploiements dans **Operate → Environments** :

```yaml
deploy-staging:
  stage: deploy
  script:
    - echo "Déploiement sur staging..."
  environment:
    name: staging
    url: https://staging.mon-site.fr
  only:
    - develop

deploy-production:
  stage: deploy
  script:
    - echo "Déploiement en production..."
  environment:
    name: production
    url: https://mon-site.fr
  when: manual    # Déploiement manuel (bouton à cliquer)
  only:
    - main
```

---

## Exercice de synthèse

1. Créez un dépôt GitLab avec un mini-site (une page HTML, une CSS)
2. Configurez GitLab Pages pour le publier automatiquement
3. Ajoutez un stage de validation qui vérifie que `index.html` existe
4. Testez le pipeline en poussant une modification
5. *(Bonus)* Ajoutez un badge de pipeline dans le README : **Settings → CI/CD → General pipelines → Pipeline status badge**

---

## Ressources

- [Documentation GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/)
- [Exemples GitLab Pages](https://gitlab.com/pages)
- [Variables CI/CD](https://docs.gitlab.com/ee/ci/variables/)
