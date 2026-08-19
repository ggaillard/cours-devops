# Les travaux pratiques

Cinq TP progressifs pour mettre en œuvre la chaîne complète. Chacun se réalise sur un dépôt GitHub, dans le navigateur ou dans un Codespace.

::: info 🎯 Où se placent les TP dans l'année
Les TP ne sont pas un bloc de fin de parcours : chacun occupe **une séance entière de 2 h**, placée juste après les notions qu'il consolide. Voir [le parcours recommandé](/introduction/parcours).
:::

## Vue d'ensemble

| Séance | TP | Objectif | Notions consolidées |
| --- | --- | --- | --- |
| *hors progression* | [TP 0](/tp/tp0-contribuer) | Contribuer au dépôt du cours | Issues, fork, branche, PR, revue, CI |
| **S9** | [TP 1](/tp/tp1-pipeline-ci) | Un pipeline CI de A à Z | Actions, tests, badge, protection de branche |
| **S13** | [TP 2](/tp/tp2-site-pages) | Publier un site sur Pages | Build, artefact Pages, déploiement continu |
| **S16** | [TP 3](/tp/tp3-image-ghcr) | Publier une image sur GHCR | Dockerfile, GHCR, permissions, tags |
| **S23** | [TP 4](/tp/tp4-qualite-ci) | Durcir la chaîne CI | Couverture, seuils bloquants, quality gate |
| **S31** | [TP 5](/tp/tp5-api-livree) | Livrer l'API par le pipeline | POO, JaCoCo, image multi-étapes, publication conditionnée |

Chaque TP suppose acquise la séance de cours qui le précède : il n'introduit aucune notion nouvelle, il met en situation.

Le **TP 0** est à part : il ne consomme pas de séance de la progression et se glisse dans la séance 4, en séance de battement, ou en travail à la maison. Il se déroule sur le dépôt réel de ce cours, pas sur un dépôt d'exercice.

La progression d'ensemble est nette : le TP 1 fait **passer** la CI au vert, le TP 4 la fait **refuser** le code insuffisant, le TP 5 conditionne la **livraison** à cette exigence.

## Méthode de rendu conseillée

Pour chaque TP :

1. Créez (ou forkez) un dépôt **public** dédié.
2. Travaillez par **branches** et **Pull Requests**.
3. Vérifiez que les **workflows passent au vert**.
4. Le lien du dépôt + une capture de l'onglet Actions constituent le rendu.

## Critères d'évaluation communs

Ces critères s'ajoutent aux critères de réussite propres à chaque TP :

- ✅ Le dépôt est **public** et contient un `README` clair.
- ✅ Les workflows se trouvent bien dans `.github/workflows/`.
- ✅ Les exécutions d'Actions sont **vertes**.
- ✅ Aucun **secret** n'est écrit en clair dans le code.
- ✅ Le travail passe par au moins une **Pull Request** fusionnée.

À partir du TP 4 s'ajoutent :

- ✅ La CI **échoue** effectivement quand la qualité n'est pas au rendez-vous.
- ✅ Le rendu montre une exécution **rouge puis verte** sur la même branche.

## Le barème — 20 points, même structure pour les cinq TP

Chaque TP est noté selon les mêmes cinq lignes. Seule la troisième change d'un TP à l'autre : c'est l'exigence propre à la notion travaillée. Le barème détaillé figure en fin de chaque énoncé, et il est **donné aux étudiants avant le TP**.

| Ligne | Points | Ce qu'elle mesure |
| --- | --- | --- |
| **Le livrable fonctionne** | 8 | La chose demandée existe et marche : pipeline vert, site en ligne, image exécutable |
| **Méthode Git** | 4 | Branche, Pull Request fusionnée, aucun commit direct sur `main`, messages lisibles |
| **Exigence de la chaîne** | 4 | Propre à chaque TP : ce que le pipeline refuse, ce qu'il conditionne, ce qu'il prouve |
| **Traçabilité du rendu** | 3 | `README`, captures, artefacts : un tiers peut vérifier sans vous demander quoi que ce soit |
| **Compréhension** | 1 | Sait expliquer une ligne de son propre fichier, désignée au hasard |

::: tip Pourquoi 8 points seulement pour « ça marche »
Parce qu'un résultat obtenu sans méthode ne vaut pas grand-chose en équipe, et qu'il ne se reproduira pas. Un binôme dont le pipeline est vert mais qui a tout poussé directement sur `main`, sans PR ni preuve, plafonne à 12 — c'est délibéré, et à annoncer avant le TP.
:::

::: warning Le point de compréhension n'est pas décoratif
Il se joue en une question de trente secondes pendant la séance : « cette ligne, là, à quoi sert-elle ? ». C'est le seul garde-fou contre un fichier recopié. Posez la question à chaque binôme, pas seulement à ceux qui ont fini.
:::

**Traitement des retards et des rendus partiels.** Un TP rendu sans PR fusionnée perd les 4 points de méthode, pas les 8 du livrable : les lignes sont indépendantes. Un pipeline qui ne passe pas au vert mais dont l'échec est diagnostiqué correctement dans le `README` conserve la moitié des points de la première ligne — l'objectif est de récompenser le diagnostic, qui est la compétence réelle.

## Conduire un TP en 2 h

| Temps | Phase | Rôle de l'enseignant |
| --- | --- | --- |
| 0–15 min | Rappel de la séance précédente, énoncé, constitution des binômes | cadrer l'objectif et le rendu attendu |
| 15–90 min | Réalisation en autonomie | circuler, débloquer, refuser de donner le YAML tout fait |
| 90–110 min | Mise en commun des échecs rencontrés | faire verbaliser les messages d'erreur |
| 110–120 min | Vérification des critères de réussite | valider le livrable, noter les rendus incomplets |

::: tip Les erreurs sont la matière du TP
Un workflow qui ne se déclenche pas, une indentation YAML fautive, une permission manquante, un seuil de couverture qui refuse de passer : ce sont les moments les plus formateurs. Prévoyez d'en garder trace collectivement plutôt que de les corriger individuellement.
:::

::: tip Rappel quota
Sur un dépôt **public**, les minutes d'Actions sont gratuites : privilégiez ce mode pour les TP.
:::

Commencez par le [TP 1 — Pipeline CI de A à Z](/tp/tp1-pipeline-ci).
