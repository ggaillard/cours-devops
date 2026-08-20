# Issues & Projects

::: info 🎯 Séance 4 · 2 h
À la fin de cette séance, vous savez :

- rédiger une Issue exploitable par quelqu'un d'autre que soi ;
- relier une Issue à la Pull Request qui la résout ;
- organiser un lot de travail dans un tableau de suivi.

**Socle :** les sections marquées 🚀 sont **hors socle** — voir [socle et approfondissement](/introduction/parcours).

**Prérequis :** [Branches & Pull Requests](/git-github/branches-pr)

**Livrable attendu :** cinq Issues étiquetées, un Project alimenté, et une PR fermant une Issue par `Closes #n`
:::

Le DevOps commence par la **planification**. GitHub intègre deux outils pour cela : les **Issues** (tickets) et les **Projects** (tableaux de suivi).

## Les Issues

Une Issue est un ticket : une tâche, un bug, une idée. Onglet **Issues → New issue**.

Une bonne Issue contient :

- un **titre** clair et actionnable,
- une **description** : contexte, comportement attendu, étapes pour reproduire (si bug),
- des **labels** (`bug`, `enhancement`, `documentation`…),
- un **assigné** responsable.

```markdown
**Titre :** Le bouton « Envoyer » ne réagit pas sur mobile

**Description :**
- Sur écran < 480px, le clic sur « Envoyer » ne déclenche rien.
- Attendu : le formulaire est soumis.
- Étapes : ouvrir le formulaire sur mobile → remplir → cliquer.
```

### Lier une Issue à une Pull Request

Dans un commit ou une PR, écrire `Closes #12` ferme **automatiquement** l'Issue n°12 lors de la fusion. On relie ainsi le travail à sa demande d'origine — une traçabilité précieuse.

## Les Projects

Un **Project** est un tableau (type Kanban) qui regroupe et priorise les Issues. Onglet **Projects → New project → Board**.

Colonnes typiques :

```
┌──────────┐  ┌───────────────┐  ┌──────────────┐  ┌──────────┐
│  À faire │  │  En cours     │  │  En revue    │  │  Terminé │
├──────────┤  ├───────────────┤  ├──────────────┤  ├──────────┤
│ #14 Login│  │ #12 Bouton    │  │ #9 API stats │  │ #7 README│
│ #15 Docs │  │               │  │              │  │          │
└──────────┘  └───────────────┘  └──────────────┘  └──────────┘
```

On déplace les cartes au fil de l'avancement. Le Project peut se mettre à jour **automatiquement** (une Issue fermée passe en « Terminé »).

::: tip Exemple en ligne
Un tableau réel accompagne cette séance : **[Séance 4 — Issues & Projects (démo)](https://github.com/users/ggaillard/projects/7)**.

On y retrouve le livrable attendu : cinq Issues étiquetées et assignées, réparties sur les colonnes `Todo`, `In progress`, `In review` et `Done`, deux champs personnalisés (`Priorité`, `Estimation`) et les trois automatisations décrites plus bas. Les tickets correspondants sont dans l'[onglet Issues du dépôt](https://github.com/ggaillard/cours-devops/issues).

Regardez-le avant de construire le vôtre : c'est le même dépôt que celui du cours.
:::

## Le lien avec le DevOps

Cette planification n'est pas décorative :

- Elle rend le travail **visible** pour toute l'équipe.
- Elle relie **demande → code → vérification → livraison** dans un même endroit.
- Elle nourrit la **boucle de rétroaction** : on voit ce qui avance, ce qui bloque.

## Récapitulatif de la section

Vous savez désormais :

- ✅ versionner avec des commits ;
- ✅ collaborer avec branches et Pull Requests ;
- ✅ organiser le travail avec Issues et Projects.

## 🚀 Approfondissement — Automatiser le tableau

*Hors socle : cette section n'est pas exigible de tous. Elle se traite en autonomie, ou avec les étudiants qui avancent vite.*

Un tableau que l'on met à jour à la main finit toujours par mentir : quelqu'un oublie de déplacer une carte, et le tableau ne reflète plus la réalité. L'automatisation existe pour ça.

**Relier une Pull Request à son issue.** Écrivez dans la description de la PR :

```text
Closes #42
```

À la fusion, GitHub ferme l'issue 42 automatiquement. Les mots reconnus sont `Closes`, `Fixes`, `Resolves`, suivis du numéro. Le lien apparaît dans les deux sens : depuis l'issue, on voit la PR qui la traite.

**Faire bouger les cartes toutes seules.** Dans un Project, `⋯ → Workflows` propose des règles prêtes à activer :

| Quand | La carte passe à |
| --- | --- |
| Une issue est ouverte | `Todo` |
| Une Pull Request est ouverte | `In progress` |
| Une issue ou une PR est fermée | `Done` |

Activez les trois. Le tableau devient alors une **conséquence** du travail réel, plus une déclaration d'intention.

**Ajouter les champs qui manquent.** Un Project accepte des champs personnalisés : `Priorité` (liste de choix), `Estimation` (nombre), `Échéance` (date). Deux ou trois suffisent — un tableau à douze colonnes n'est plus rempli au bout d'une semaine.

**Regarder le même travail autrement.** Un même Project accepte plusieurs vues : *Board* pour le suivi quotidien, *Table* pour trier et filtrer, *Roadmap* pour situer dans le temps. Ce sont trois affichages des mêmes cartes, pas trois tableaux à tenir.

::: tip Le lien avec ce que vous apprendrez ensuite
C'est le même raisonnement que l'intégration continue : ce qui dépend d'un geste humain finit par ne pas être fait. Automatiser l'état du tableau, c'est automatiser la vérité sur l'avancement.
:::

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Qu'est-ce qui distingue une Issue utile d'une Issue inutile ?
Une Issue utile permet à un tiers d'agir sans poser de question : contexte, comportement attendu, comportement observé et — pour un bug — les étapes de reproduction. « Le site bugue » n'est pas une Issue.
:::

::: details 2. Que se passe-t-il si une PR contient la mention `Closes #12` ?
L'Issue n°12 se ferme automatiquement à la fusion de la PR, et un lien bidirectionnel apparaît entre les deux. On obtient sans effort la traçabilité demande → code → livraison.
:::

::: details 3. En quoi la planification relève-t-elle du DevOps, et pas seulement de la gestion de projet ?
Parce qu'elle ferme la boucle : *Plan* est la première étape du cycle, et c'est là que remontent les retours issus de la production. Sans elle, l'automatisation aval fonctionne à vide.
:::

**Critères de réussite de la séance**

- ☐ chaque Issue porte un titre actionnable, un label et un assigné
- ☐ au moins une Issue est fermée automatiquement par une PR

Prochaine étape : coder dans le cloud avec [GitHub Codespaces](/codespaces/).
