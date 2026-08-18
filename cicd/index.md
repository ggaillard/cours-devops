---
layout: default
title: CI/CD
nav_order: 4
has_children: true
---

# ⚙️ CI/CD — Intégration et Déploiement Continus
{: .no_toc }

Automatiser les tests, la construction et le déploiement de vos applications avec GitLab CI/CD.
{: .fs-6 .fw-300 }

---

## Qu'est-ce que la CI/CD ?

**CI** (Continuous Integration) = chaque modification de code déclenche automatiquement des vérifications (tests, qualité, compilation).

**CD** (Continuous Delivery / Deployment) = le code validé est automatiquement livré ou déployé en production.

```
Développeur                     GitLab CI/CD Runner
     │                               │
     ├─ git push ──────────────────► │
     │                               ├─ 🔨 Build
     │                               ├─ 🧪 Tests
     │                               ├─ 🔍 Analyse qualité
     │                               ├─ 📦 Package (Docker)
     │                               └─ 🚀 Deploy
     │                               │
     ◄─────────── ✅ OK ou ❌ Erreur ─┘
```

---

## Contenu de la section

| Sujet | Description | Niveau |
|-------|-------------|--------|
| [GitLab Pages](gitlab-pages) | Publier un site statique avec GitLab CI | 🟢 Débutant |
| [Pipeline CI basique](pipeline) | Build, test, deploy automatisés | 🟡 Intermédiaire |
| [Docker dans le pipeline](docker-ci) | Construire et publier une image Docker | 🟡 Intermédiaire |
| [SonarQube](sonarqube) | Analyse de qualité du code | 🔴 Avancé |
| [Déploiement Laravel](laravel) | Pipeline complet PHP/Laravel | 🔴 Avancé |

---

## Le fichier `.gitlab-ci.yml`

Tout pipeline GitLab est défini dans un fichier `.gitlab-ci.yml` à la racine du projet.

```yaml
# Exemple minimal
stages:
  - test
  - deploy

test-job:
  stage: test
  image: node:20-alpine
  script:
    - npm ci
    - npm test

deploy-job:
  stage: deploy
  script:
    - echo "Déploiement en production..."
  only:
    - main
```

---

{: .callout .callout-prerequis }
> **Prérequis :** Avoir suivi la section [Docker](../docker/) et posséder un compte sur [gitlab.com](https://gitlab.com) ou accès à une instance GitLab de l'établissement.
