# Préparer son compte GitHub

::: info 🎯 Séance 1 (3/3) · ~50 min
À la fin de cette séance, vous savez :

- disposer d'un compte GitHub sécurisé par une double authentification ;
- évaluer les quotas gratuits et en tenir compte dans ses choix ;
- créer le dépôt public qui servira de support à toute l'année.

**Prérequis :** une adresse électronique valide

**Livrable attendu :** un dépôt public `mon-projet-devops` contenant un README, avec la 2FA active sur le compte
:::

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

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Pourquoi la 2FA est-elle un réflexe DevSecOps et pas une simple formalité ?
Un compte GitHub compromis donne accès au code, aux secrets de déploiement et aux workflows — donc à la production. La 2FA protège le maillon le plus attaqué de la chaîne : l'identité.
:::

::: details 2. Sur un compte gratuit, combien de minutes d'Actions consomme un dépôt public ?
Aucune : les Actions sont gratuites et illimitées sur les dépôts publics. Le quota (~2 000 min/mois) ne s'applique qu'aux dépôts privés.
:::

::: details 3. Que faut-il installer sur son poste pour suivre ce cours ?
Rien. Ni Git, ni Node, ni Docker : l'édition se fait sur github.com ou dans un Codespace, et les constructions tournent sur les runners d'Actions.
:::

**Critères de réussite de la séance**

- ☐ le dépôt est public et porte un README
- ☐ la double authentification est active sur le compte

Vous êtes prêt. Direction [Git & GitHub](/git-github/).
