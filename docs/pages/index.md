# GitHub Pages

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
