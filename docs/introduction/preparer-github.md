# Préparer son compte GitHub

Avant de commencer, mettez votre compte en place. Cinq minutes suffisent.

## 1. Créer un compte

Rendez-vous sur [github.com](https://github.com) et créez un compte gratuit. Choisissez un **nom d'utilisateur professionnel** : il apparaîtra dans les URL de vos projets et pourra servir de vitrine.

## 2. Activer l'authentification à deux facteurs (2FA)

La 2FA est **obligatoire** sur GitHub. Dans **Settings → Password and authentication**, activez-la avec une application d'authentification (Authenticator, etc.). C'est un premier réflexe DevSecOps.

## 3. Demander le Student Developer Pack (optionnel mais recommandé)

Si vous êtes étudiant, demandez le [GitHub Student Developer Pack](https://education.github.com/pack). Il débloque davantage de minutes Actions, d'heures Codespaces et de nombreux services partenaires gratuits.

## 4. Comprendre les quotas gratuits

Sur un compte gratuit, gardez en tête ces ordres de grandeur (ils évoluent, vérifiez la [documentation officielle](https://docs.github.com)) :

| Ressource | Quota gratuit indicatif |
| --- | --- |
| Dépôts publics et privés | Illimités |
| Minutes GitHub Actions (dépôts privés) | ~2 000 min/mois |
| Actions sur dépôts **publics** | Gratuit et illimité |
| Cœurs-heures Codespaces | ~quelques dizaines d'heures/mois |
| GitHub Pages | Gratuit (sites publics) |

::: tip Astuce
Travaillez en **dépôt public** pour ce cours : les minutes d'Actions y sont gratuites et illimitées.
:::

## 5. Aucune installation locale

Vous n'avez **rien** à installer :

- Pas de Git local → l'édition se fait sur github.com ou dans Codespaces.
- Pas de Node/Python local → tout tourne dans Actions ou Codespaces.
- Pas de Docker local → les images se construisent dans Actions.

## 6. Créer votre dépôt de travail

1. Cliquez sur **New repository**.
2. Nommez-le, par exemple, `mon-projet-devops`.
3. Cochez **Public** et **Add a README file**.
4. Créez le dépôt.

Vous êtes prêt. Direction [Git & GitHub](/git-github/).
