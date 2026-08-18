# Branches & Pull Requests

La **branche** permet de travailler sur une modification sans toucher à la version stable (`main`). La **Pull Request** permet de la faire relire puis fusionner.

## Créer une branche (dans le navigateur)

1. En haut à gauche de la liste des fichiers, cliquez sur le sélecteur de branche (il affiche `main`).
2. Tapez un nom de branche, par exemple `ajout-page-contact`.
3. Cliquez sur **Create branch: ajout-page-contact from main**.

Vous travaillez maintenant sur une copie isolée. Vos commits n'affectent pas `main`.

::: tip Nommer ses branches
Utilisez des noms descriptifs : `feat/formulaire-contact`, `fix/erreur-404`, `docs/guide-installation`.
:::

## Ouvrir une Pull Request

Après avoir commité sur votre branche :

1. GitHub affiche un bandeau **Compare & pull request** → cliquez dessus.
2. Vérifiez la cible : `base: main` ← `compare: votre-branche`.
3. Donnez un **titre** et une **description** : qu'avez-vous changé et pourquoi ?
4. Cliquez sur **Create pull request**.

## À quoi sert la revue ?

Une PR est un espace de discussion :

- **Commentaires ligne par ligne** sur le code.
- **Suggestions** de modification que l'auteur peut appliquer en un clic.
- **Vérifications automatiques** (CI) qui s'affichent en bas : tests, qualité, sécurité.
- **Approbation** d'un relecteur avant fusion.

```
   Branche  ─►  Pull Request  ─►  Revue humaine + CI  ─►  Merge  ─►  main à jour
```

## Fusionner (merge)

Quand la PR est approuvée et que les vérifications sont vertes :

1. Cliquez sur **Merge pull request**.
2. Confirmez.
3. Supprimez la branche (**Delete branch**) : elle a rempli son rôle.

Trois stratégies de fusion existent :

| Stratégie | Effet |
| --- | --- |
| **Merge commit** | Conserve tout l'historique de la branche. |
| **Squash and merge** | Regroupe tous les commits en un seul (historique propre). |
| **Rebase and merge** | Rejoue les commits sans commit de fusion. |

Pour débuter, **Squash and merge** donne un historique `main` lisible.

## Protéger `main`

Sur un vrai projet, on **protège** la branche `main` (**Settings → Branches → Add rule**) pour :

- interdire les pushs directs,
- exiger une PR et au moins une approbation,
- exiger que la CI passe au vert avant fusion.

C'est une pratique DevOps fondamentale : **rien n'atteint `main` sans avoir été vérifié**.

Passons à l'organisation du travail : [Issues & Projects](/git-github/issues-projects).
