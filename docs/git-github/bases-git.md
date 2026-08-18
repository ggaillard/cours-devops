# Les bases de Git

On va créer des commits **entièrement dans le navigateur**, sans installer Git.

## Créer un commit depuis l'interface web

1. Ouvrez votre dépôt sur github.com.
2. Cliquez sur **Add file → Create new file**.
3. Nommez le fichier `bonjour.md` et écrivez quelques lignes.
4. En bas, la zone **Commit changes** : donnez un message clair, par exemple `Ajoute un fichier de bienvenue`.
5. Validez avec **Commit changes**.

Vous venez de créer votre premier commit. Chaque commit est un **point de sauvegarde** dans l'historique.

## Anatomie d'un bon message de commit

Un message de commit se lit comme une instruction. Convention courante :

```
<type>: <résumé à l'impératif>

Corps optionnel expliquant le pourquoi.
```

Exemples de types : `feat` (fonctionnalité), `fix` (correction), `docs` (documentation), `refactor`, `test`, `ci`.

```
feat: ajoute la page de connexion
fix: corrige le calcul de la TVA
docs: complète le README d'installation
```

::: tip Pourquoi c'est important
Un historique lisible permet de comprendre l'évolution du projet et de retrouver rapidement l'origine d'un bug.
:::

## Consulter l'historique

- Onglet **Commits** (sous le bouton principal du dépôt) : la liste chronologique.
- Cliquez sur un commit pour voir exactement les lignes ajoutées (en vert) et supprimées (en rouge) — c'est le **diff**.

## Le fichier `.gitignore`

Certains fichiers ne doivent **jamais** être versionnés : secrets, dépendances installées, fichiers temporaires. On les liste dans un fichier `.gitignore` à la racine :

```text
node_modules/
.env
*.log
dist/
```

::: warning Ne jamais commiter de secret
Un mot de passe, une clé d'API ou un token poussé sur GitHub est à considérer comme **compromis**, même après suppression : il reste dans l'historique. On verra comment GitHub aide à détecter ces fuites dans la section [DevSecOps](/securite/).
:::

## Le README

Le fichier `README.md`, à la racine, est la **vitrine** du projet : il s'affiche automatiquement sur la page d'accueil du dépôt. Il devrait décrire :

- ce que fait le projet,
- comment le lancer,
- comment contribuer.

Il s'écrit en **Markdown**, une syntaxe simple :

```markdown
# Titre
## Sous-titre
- élément de liste
**gras**, *italique*, `code`
[un lien](https://example.com)
```

Vous maîtrisez les bases. Passons à la collaboration : [Branches & Pull Requests](/git-github/branches-pr).
