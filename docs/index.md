---
layout: home

hero:
  name: Cours DevOps
  text: 100 % en ligne, centré GitHub
  tagline: "Apprendre le DevOps sans installer quoi que ce soit sur sa machine — tout se passe dans le navigateur et sur GitHub."
  actions:
    - theme: brand
      text: Commencer
      link: /introduction/
    - theme: alt
      text: Le parcours
      link: /introduction/parcours
    - theme: alt
      text: Code sur GitHub
      link: https://github.com/ggaillard/cours-devops

features:
  - icon: 🌿
    title: Git & GitHub
    details: Versionner, collaborer avec les branches, les Pull Requests, les Issues et les Projects — directement dans le navigateur.
    link: /git-github/
  - icon: ☁️
    title: Codespaces
    details: "Un environnement de développement complet dans le cloud. Fini la VM locale : on code depuis n'importe quel navigateur."
    link: /codespaces/
  - icon: ⚙️
    title: GitHub Actions
    details: Construire des pipelines d'intégration et de déploiement continus (CI/CD) hébergés par GitHub, sans serveur à gérer.
    link: /actions/
  - icon: 🚀
    title: GitHub Pages
    details: Publier un site statique automatiquement à chaque commit. Ce site en est lui-même un exemple vivant.
    link: /pages/
  - icon: 📦
    title: Conteneurs & GHCR
    details: Construire et publier des images de conteneurs dans le GitHub Container Registry, sans Docker installé localement.
    link: /conteneurs/
  - icon: 🔒
    title: DevSecOps
    details: "Sécuriser la chaîne : Dependabot, CodeQL, détection de secrets — la sécurité intégrée au dépôt."
    link: /securite/
---

## Pourquoi ce cours ?

Ce cours prend le parti du **tout-en-ligne**. Chaque outil utilisé est accessible depuis un simple navigateur et repose sur l'écosystème **GitHub** : dépôts, Actions, Pages, Codespaces, Container Registry, fonctions de sécurité.

Aucune machine virtuelle à provisionner, aucun serveur à administrer, aucun logiciel à installer. L'objectif est d'apprendre la **culture** et les **pratiques** DevOps (automatisation, intégration continue, déploiement continu, sécurité intégrée) avec des outils gratuits pour l'éducation et disponibles partout.

## Parcours en un coup d'œil

```
① Git & GitHub  ──►  ② Codespaces  ──►  ③ GitHub Actions  ──►  ④ Pages / GHCR  ──►  ⑤ DevSecOps
   (versionner,        (coder dans        (CI/CD sans          (publier un site,     (sécuriser
    collaborer)         le cloud)          serveur)             une image)            la chaîne)
```

| Séances | Section | Ce que vous apprenez | Niveau |
| --- | --- | --- | --- |
| S2–S4 | [Git & GitHub](/git-github/) | Versionner, brancher, ouvrir des Pull Requests, gérer un projet | 🟢 Débutant |
| S5–S6 | [Codespaces](/codespaces/) | Coder dans un environnement cloud reproductible | 🟢 Débutant |
| S7–S11 | [GitHub Actions](/actions/) | Automatiser tests et déploiements avec des workflows YAML | 🟡 Intermédiaire |
| S12–S13 | [GitHub Pages](/pages/) | Publier un site statique en continu | 🟡 Intermédiaire |
| S14–S16 | [Conteneurs (GHCR)](/conteneurs/) | Construire et publier une image de conteneur | 🔴 Avancé |
| S17–S19 | [DevSecOps](/securite/) | Intégrer la sécurité dans le dépôt et les pipelines | 🔴 Avancé |

> **Première visite ?** Commencez par l'[introduction au DevOps](/introduction/), puis suivez les sections dans l'ordre.
> Le cours est organisé en **24 séances de 2 h** : chaque page annonce ses objectifs et se termine par une auto-évaluation.
> Voir [la progression complète](/introduction/parcours).
