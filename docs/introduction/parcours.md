# Le parcours recommandé

Suivez les sections dans cet ordre : chaque brique s'appuie sur la précédente.

## Étape par étape

1. **[Git & GitHub](/git-github/)** — la fondation. On apprend à versionner et à collaborer.
2. **[Codespaces](/codespaces/)** — un environnement de développement dans le cloud.
3. **[GitHub Actions](/actions/)** — l'automatisation : tests et déploiements en continu.
4. **[GitHub Pages](/pages/)** — publier un site statique automatiquement.
5. **[Conteneurs (GHCR)](/conteneurs/)** — construire et publier une image.
6. **[DevSecOps](/securite/)** — sécuriser la chaîne.
7. **[Déploiement continu](/deploiement/)** — livrer vers un service en ligne.

## Vue synthétique

```
┌───────────────┐   ┌─────────────┐   ┌────────────────┐
│ ① Git & GitHub│──►│ ② Codespaces│──►│ ③ GitHub Actions│
└───────────────┘   └─────────────┘   └────────────────┘
                                              │
        ┌─────────────────────────────────────┤
        ▼                     ▼                ▼
┌───────────────┐   ┌──────────────────┐   ┌────────────┐
│ ④ GitHub Pages│   │ ⑤ Conteneurs GHCR│   │ ⑥ DevSecOps│
└───────────────┘   └──────────────────┘   └────────────┘
        │                     │                │
        └──────────► ⑦ Déploiement continu ◄───┘
```

## Rythme conseillé

| Semaine | Section | Livrable |
| --- | --- | --- |
| 1 | Git & GitHub | Un dépôt avec une PR fusionnée |
| 2 | Codespaces | Un projet lancé dans un Codespace |
| 3–4 | GitHub Actions | Un pipeline CI qui passe au vert |
| 5 | GitHub Pages | Un site publié en ligne |
| 6 | Conteneurs GHCR | Une image publiée |
| 7 | DevSecOps | Dependabot + CodeQL activés |
| 8 | Projet final | La chaîne complète sur un projet |

## Les travaux pratiques

Trois TP transversaux consolident l'ensemble :

- [TP 1 — Pipeline CI de A à Z](/tp/tp1-pipeline-ci)
- [TP 2 — Publier un site sur Pages](/tp/tp2-site-pages)
- [TP 3 — Image conteneur sur GHCR](/tp/tp3-image-ghcr)

> Prêt ? Commencez par [préparer votre compte GitHub](/introduction/preparer-github).
