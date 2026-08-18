# GitHub Pages

::: info 🎯 Séance 12 (1/2) · ~30 min
À la fin de cette séance, vous savez :

- identifier ce qu'est un site statique et ce qu'il ne peut pas faire ;
- distinguer les deux modèles de publication sur Pages ;
- prévoir l'URL et la base d'un site « projet ».

**Prérequis :** [GitHub Actions](/actions/)

**Livrable attendu :** l'URL prévisionnelle de son propre site, justifiée
:::

**GitHub Pages** héberge gratuitement des **sites statiques** directement depuis un dépôt. Couplé à [GitHub Actions](/actions/), il permet un **déploiement continu** : chaque commit sur `main` republie le site automatiquement.

::: tip Ce site en est la preuve
Le site que vous lisez est construit avec VitePress et **déployé par GitHub Actions sur GitHub Pages**. Le cours démontre lui-même la pratique qu'il enseigne.
:::

## Site statique : de quoi parle-t-on ?

Un site statique est composé de fichiers HTML, CSS et JavaScript **déjà construits** : pas de serveur applicatif ni de base de données. GitHub se contente de servir ces fichiers. C'est parfait pour :

- une documentation,
- un portfolio,
- une vitrine de projet,
- un blog généré par un outil (VitePress, Jekyll, Hugo, MkDocs…).

## Deux modèles de déploiement

```
   ┌─────────────────────────────┐
   │ 1. Servir un dossier tel quel│  → fichiers HTML déjà prêts
   └─────────────────────────────┘

   ┌─────────────────────────────┐
   │ 2. Construire puis publier  │  → GitHub Actions build le site,
   │    (recommandé)             │    puis le déploie sur Pages
   └─────────────────────────────┘
```

Le modèle **construire puis publier** est le plus courant en DevOps : le code source (Markdown, composants) vit dans le dépôt, et le site final est **généré automatiquement**.

## L'URL de votre site

Pour un dépôt nommé `cours-devops` appartenant à `ggaillard`, l'URL sera :

```
https://ggaillard.github.io/cours-devops/
```

Le nom du dépôt apparaît dans le chemin : c'est pourquoi il faut configurer une **base URL** dans le générateur (ici `/cours-devops/`).

## Dans cette section

- [Déployer un site statique](/pages/deployer-site) — le workflow complet, pas à pas.

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Peut-on héberger une API avec base de données sur GitHub Pages ?
Non. Pages ne sert que des fichiers déjà construits — HTML, CSS, JavaScript. Aucun code serveur ne s'y exécute. Pour une application dynamique, on passe par un hébergeur applicatif (voir la section Déploiement).
:::

::: details 2. Quelle sera l'URL d'un site publié depuis le dépôt `portfolio` du compte `dupont` ?
`https://dupont.github.io/portfolio/`. Le nom du dépôt devient un sous-chemin, ce qui impose de configurer une base URL dans le générateur.
:::

::: details 3. Pourquoi préférer « construire puis publier » à « servir un dossier tel quel » ?
Parce que le dépôt contient alors la source (Markdown, composants) et non le résultat. Le site est régénéré automatiquement, il n'y a pas de fichiers construits à commiter à la main, donc pas de risque de décalage entre source et publication.
:::

**Critères de réussite de la séance**

- ☐ je sais dire quel sous-chemin devra recevoir ma configuration `base`
