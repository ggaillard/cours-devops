# Les travaux pratiques

Trois TP progressifs pour mettre en œuvre la chaîne complète, **100 % en ligne**. Chacun se réalise sur un dépôt GitHub, sans rien installer.

## Vue d'ensemble

| TP | Objectif | Compétences | Durée |
| --- | --- | --- | --- |
| [TP 1](/tp/tp1-pipeline-ci) | Un pipeline CI de A à Z | Actions, tests, badge | ~1 h |
| [TP 2](/tp/tp2-site-pages) | Publier un site sur Pages | Build, déploiement continu | ~1 h |
| [TP 3](/tp/tp3-image-ghcr) | Publier une image sur GHCR | Dockerfile, GHCR, permissions | ~1 h 30 |

## Méthode de rendu conseillée

Pour chaque TP :

1. Créez (ou forkez) un dépôt **public** dédié.
2. Travaillez par **branches** et **Pull Requests**.
3. Vérifiez que les **workflows passent au vert**.
4. Le lien du dépôt + une capture de l'onglet Actions constituent le rendu.

## Critères d'évaluation communs

- ✅ Le dépôt est **public** et contient un `README` clair.
- ✅ Les workflows se trouvent bien dans `.github/workflows/`.
- ✅ Les exécutions d'Actions sont **vertes**.
- ✅ Aucun **secret** n'est écrit en clair dans le code.
- ✅ Le travail passe par au moins une **Pull Request** fusionnée.

::: tip Rappel quota
Sur un dépôt **public**, les minutes d'Actions sont gratuites : privilégiez ce mode pour les TP.
:::

Commencez par le [TP 1 — Pipeline CI de A à Z](/tp/tp1-pipeline-ci).
