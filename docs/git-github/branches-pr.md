# Branches & Pull Requests

::: info 🎯 Séance 3 · 2 h
À la fin de cette séance, vous savez :

- isoler une modification dans une branche nommée selon une convention ;
- ouvrir une Pull Request lisible et mener une revue de code ;
- choisir une stratégie de fusion et protéger la branche `main`.

**Socle :** les sections marquées 🚀 sont **hors socle** — voir [socle et approfondissement](/introduction/parcours).

**Prérequis :** [Les bases de Git](/git-github/bases-git)

**Livrable attendu :** une Pull Request commentée par un camarade, puis fusionnée, et une règle de protection active sur `main`
:::

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

## 🚀 Approfondissement — Résoudre un conflit de fusion

*Hors socle : cette section n'est pas exigible de tous. Elle se traite en autonomie, ou avec les étudiants qui avancent vite.*

Un conflit n'est pas une panne : c'est Git qui refuse de choisir à votre place. Il survient quand deux branches modifient **les mêmes lignes** du même fichier. Provoquez-en un volontairement, c'est le seul moyen de ne pas le découvrir un jour de rendu.

**Le provoquer, en trois minutes, depuis le navigateur :**

1. Sur `main`, modifiez la première ligne du `README` : écrivez `Version A`.
2. Créez une branche `essai/conflit` **à partir de ce commit**, et sur cette branche remplacez la même ligne par `Version B`.
3. Retournez sur `main` et remplacez encore la même ligne, par `Version C`.
4. Ouvrez une Pull Request de `essai/conflit` vers `main`.

GitHub affiche alors : **This branch has conflicts that must be resolved**.

**Le lire.** Le fichier en conflit contient des marqueurs :

```text
<<<<<<< essai/conflit
Version B
=======
Version C
>>>>>>> main
```

Entre `<<<<<<<` et `=======` : ce que propose **votre** branche. Entre `=======` et `>>>>>>>` : ce qui se trouve déjà sur la branche cible. Les marqueurs eux-mêmes ne sont pas du contenu — ils doivent disparaître.

**Le résoudre.** Écrivez la version finale — qui peut être l'une des deux, ou une troisième qui les combine — supprimez les trois lignes de marqueurs, puis validez. La Pull Request redevient fusionnable.

::: danger Les deux erreurs classiques
Laisser un marqueur `=======` dans le fichier — il part en production et casse tout ce qui lit le fichier. Et « résoudre » en écrasant systématiquement le travail de l'autre : un conflit se règle en comprenant les deux intentions, pas en choisissant la sienne par défaut.
:::

::: tip Ce qui évite la plupart des conflits
Des branches **courtes**. Une branche qui vit trois jours diverge peu ; une branche qui vit trois semaines rencontre nécessairement le travail des autres. C'est un argument organisationnel, pas technique — et c'est le principal.
:::

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Pourquoi ne pas commiter directement sur `main` ?
Parce que `main` doit rester déployable à tout instant. Une branche permet de travailler sans risque, de faire relire, et surtout de laisser la CI se prononcer **avant** que le code n'atteigne la version de référence.
:::

::: details 2. Quand préférer *Squash and merge* à *Merge commit* ?
Quand la branche contient des commits intermédiaires bruyants (« wip », « fix typo »). Le squash produit un `main` lisible où un commit = une fonctionnalité. On garde *Merge commit* si l'historique détaillé de la branche a une valeur.
:::

::: details 3. Que fait concrètement la règle *Require status checks to pass before merging* ?
Elle grise le bouton de fusion tant que les vérifications sélectionnées ne sont pas vertes. C'est le mécanisme qui transforme la CI d'un simple indicateur en un véritable garde-fou.
:::

**Critères de réussite de la séance**

- ☐ la branche porte un nom explicite du type `feat/…`, `fix/…` ou `docs/…`
- ☐ la PR décrit ce qui change **et pourquoi**
- ☐ au moins un commentaire de revue a été déposé et traité

Passons à l'organisation du travail : [Issues & Projects](/git-github/issues-projects).
