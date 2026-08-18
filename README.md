# Cours DevOps — 100 % en ligne, centré GitHub

![Deploy](https://github.com/ggaillard/cours-devops/actions/workflows/deploy.yml/badge.svg)

Cours DevOps **sans installation locale** : tout se fait dans le navigateur et sur GitHub.
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
| TP | 3 travaux pratiques transversaux |

## Technologie

Site généré avec [VitePress](https://vitepress.dev), déployé par **GitHub Actions** sur **GitHub Pages**.
Le site est donc lui-même une démonstration du cours.

## Développement local (optionnel)

Le cours n'exige aucune installation. Pour prévisualiser le site en local malgré tout :

```bash
npm install
npm run docs:dev      # serveur de développement
npm run docs:build    # construction de production
npm run docs:preview  # prévisualiser la build
```

## Déploiement

Chaque push sur `main` déclenche le workflow `.github/workflows/deploy.yml` qui construit
et publie le site. Activez **Settings → Pages → Source → GitHub Actions**.

## Licence

Contenu pédagogique — réutilisable dans un cadre éducatif.
