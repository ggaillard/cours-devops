# Git & GitHub

::: info 🎯 Séance 2 (1/2) · ~30 min
À la fin de cette séance, vous savez :

- employer sans hésitation le vocabulaire Git : dépôt, commit, branche, PR, merge, fork ;
- décrire le GitHub Flow et dire à quel moment la CI intervient ;
- expliquer en quoi le versionnement rend l'automatisation possible.

**Prérequis :** [Préparer son compte GitHub](/introduction/preparer-github)

**Livrable attendu :** le schéma du GitHub Flow reproduit et annoté
:::

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

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Quelle est la différence entre Git et GitHub ?
**Git** est le logiciel de gestion de versions, qui fonctionne hors ligne et hors de toute plateforme. **GitHub** est un hébergeur de dépôts Git qui ajoute la collaboration : Pull Requests, Issues, Actions. On peut faire du Git sans GitHub.
:::

::: details 2. Qu'est-ce qu'un commit, exactement ?
Un instantané de l'état du projet, accompagné d'un message, d'un auteur et d'une date. Ce n'est pas « la sauvegarde d'un fichier » mais un point de l'historique auquel on peut revenir.
:::

::: details 3. À quel moment du GitHub Flow la CI s'exécute-t-elle ?
À l'ouverture de la Pull Request et à chaque nouveau commit poussé dessus — donc **avant** la fusion. C'est ce qui permet de bloquer une fusion tant que les tests sont rouges.
:::

**Critères de réussite de la séance**

- ☐ je sais définir les sept termes du tableau sans les relire
