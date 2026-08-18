# Issues & Projects

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

Prochaine étape : coder dans le cloud avec [GitHub Codespaces](/codespaces/).
