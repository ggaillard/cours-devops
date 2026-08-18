# Les travaux pratiques

Trois TP progressifs pour mettre en œuvre la chaîne complète, **100 % en ligne**. Chacun se réalise sur un dépôt GitHub, sans rien installer.

::: info 🎯 Où se placent les TP dans l'année
Les TP ne sont pas un bloc de fin de parcours : chacun occupe **une séance entière de 2 h**, placée juste après les notions qu'elle consolide. Voir [le parcours recommandé](/introduction/parcours).
:::

## Vue d'ensemble

| Séance | TP | Objectif | Notions consolidées |
| --- | --- | --- | --- |
| **S9** | [TP 1](/tp/tp1-pipeline-ci) | Un pipeline CI de A à Z | Actions, tests, badge, protection de branche |
| **S13** | [TP 2](/tp/tp2-site-pages) | Publier un site sur Pages | Build, artefact Pages, déploiement continu |
| **S16** | [TP 3](/tp/tp3-image-ghcr) | Publier une image sur GHCR | Dockerfile, GHCR, permissions, tags |

Chaque TP suppose acquise la séance de cours qui le précède immédiatement : le TP n'introduit aucune notion nouvelle, il met en situation.

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

## Conduire un TP en 2 h

| Temps | Phase | Rôle de l'enseignant |
| --- | --- | --- |
| 0–15 min | Rappel de la séance précédente, énoncé, constitution des binômes | cadrer l'objectif et le rendu attendu |
| 15–90 min | Réalisation en autonomie | circuler, débloquer, refuser de donner le YAML tout fait |
| 90–110 min | Mise en commun des échecs rencontrés | faire verbaliser les messages d'erreur |
| 110–120 min | Vérification des critères de réussite | valider le livrable, noter les rendus incomplets |

::: tip Les erreurs sont la matière du TP
Un workflow qui ne se déclenche pas, une indentation YAML fautive, une permission manquante : ce sont les moments les plus formateurs. Prévoyez d'en garder trace collectivement plutôt que de les corriger individuellement.
:::

::: tip Rappel quota
Sur un dépôt **public**, les minutes d'Actions sont gratuites : privilégiez ce mode pour les TP.
:::

Commencez par le [TP 1 — Pipeline CI de A à Z](/tp/tp1-pipeline-ci).
