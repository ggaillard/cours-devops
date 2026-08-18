# Les bases de Git

::: info 🎯 Séance 2 (2/2) · ~1 h 30
À la fin de cette séance, vous savez :

- créer des commits depuis le navigateur et lire un diff ;
- rédiger un message de commit conforme à une convention d'équipe ;
- protéger un dépôt des fichiers qui ne doivent jamais y entrer.

**Prérequis :** un dépôt public créé en séance 1

**Livrable attendu :** au moins trois commits aux messages conventionnels, un `.gitignore` et un README renseigné
:::

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

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Pourquoi écrire `feat: ajoute la page de connexion` plutôt que `modifs` ?
Parce que l'historique est lu bien plus souvent qu'il n'est écrit : pour retrouver l'origine d'un bug, préparer une note de version ou comprendre le projet six mois plus tard. Un préfixe normalisé permet en outre de générer automatiquement un journal des changements.
:::

::: details 2. Un mot de passe commité par erreur puis supprimé au commit suivant est-il en sécurité ?
Non. Il reste accessible dans l'historique, et tout clone en possède une copie. La seule réponse correcte est de **révoquer** le secret auprès de son fournisseur et d'en générer un nouveau — le retirer du code ne suffit jamais.
:::

::: details 3. Que met-on dans un `.gitignore` sur un projet applicatif ?
Ce qui est régénérable ou personnel : `node_modules/`, les dossiers de build (`dist/`), les journaux, et surtout les fichiers de configuration locale contenant des secrets (`.env`).
:::

**Critères de réussite de la séance**

- ☐ les messages de commit suivent la convention `type: résumé à l'impératif`
- ☐ le `.gitignore` couvre au minimum les dépendances, les builds et les secrets
- ☐ je sais lire un diff et distinguer une ligne ajoutée d'une ligne supprimée

Vous maîtrisez les bases. Passons à la collaboration : [Branches & Pull Requests](/git-github/branches-pr).
