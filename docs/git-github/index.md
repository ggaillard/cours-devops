# Git & GitHub

**Git** est un système de gestion de versions : il enregistre l'historique des modifications d'un projet. **GitHub** est une plateforme en ligne qui héberge des dépôts Git et ajoute la collaboration : Pull Requests, Issues, revues de code, automatisation.

Dans ce cours, on utilise Git **sans l'installer** : tout passe par l'interface web de GitHub et par [Codespaces](/codespaces/).

## Le vocabulaire essentiel

| Terme | Définition |
| --- | --- |
| **Dépôt (*repository*)** | Le projet versionné, avec tout son historique. |
| **Commit** | Un instantané des modifications, avec un message. |
| **Branche** | Une ligne de développement parallèle. |
| **Pull Request (PR)** | Une demande de fusion d'une branche vers une autre, avec revue. |
| **Merge** | La fusion d'une branche dans une autre. |
| **Issue** | Un ticket : tâche, bug, idée. |
| **Fork** | Une copie personnelle d'un dépôt d'autrui. |

## Pourquoi versionner ?

- **Revenir en arrière** en cas d'erreur.
- **Travailler à plusieurs** sans s'écraser les modifications.
- **Tracer** qui a changé quoi, quand et pourquoi.
- **Automatiser** : chaque commit peut déclencher des tests et des déploiements.

## Le flux GitHub simplifié

```
   Créer une branche
          │
          ▼
   Faire des commits
          │
          ▼
   Ouvrir une Pull Request  ──►  Revue + tests automatiques (CI)
          │
          ▼
   Fusionner (merge)  ──►  déclenche le déploiement (CD)
```

Ce flux, appelé **GitHub Flow**, est au cœur du DevOps : petites modifications, vérifiées automatiquement, fusionnées souvent.

## Dans cette section

- [Les bases de Git](/git-github/bases-git) — commits, historique, tout en ligne.
- [Branches & Pull Requests](/git-github/branches-pr) — collaborer proprement.
- [Issues & Projects](/git-github/issues-projects) — organiser le travail.
