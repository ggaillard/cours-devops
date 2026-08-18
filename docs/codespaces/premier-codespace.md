# Mon premier Codespace

## Lancer un Codespace

1. Ouvrez votre dépôt sur github.com.
2. Cliquez sur le bouton vert **Code**.
3. Onglet **Codespaces → Create codespace on main**.
4. Patientez : un environnement démarre dans le navigateur (VS Code en ligne).

Vous disposez maintenant d'un **éditeur**, d'un **explorateur de fichiers** et d'un **terminal**.

## Découvrir le terminal

Ouvrez le terminal (menu **Terminal → New Terminal**) et essayez :

```bash
# Où suis-je ?
pwd

# Quels fichiers ?
ls -la

# Quelle version de Git ?
git --version
```

Le terminal est un vrai shell Linux, dans le cloud. Vous pouvez y lancer des commandes, installer des paquets, exécuter du code.

## Créer et exécuter un programme

Créez un fichier `hello.py` :

```python
print("Bonjour depuis le cloud !")
```

Puis dans le terminal :

```bash
python hello.py
```

## Prévisualiser une application web

Codespaces sait exposer un port. Lancez un petit serveur :

```bash
python -m http.server 8000
```

Un bandeau propose d'**ouvrir le port 8000** dans le navigateur : vous voyez votre site servi depuis le cloud, accessible via une URL temporaire.

## Committer depuis le Codespace

Le Codespace **est** connecté à votre dépôt. Après une modification :

1. Icône **Source Control** (à gauche).
2. Saisissez un message de commit.
3. **Commit**, puis **Sync/Push**.

Vos changements remontent directement sur GitHub.

## Arrêter et reprendre

- **Arrêter** : le Codespace se met en pause (état conservé), pour économiser le quota.
- **Reprendre** : rouvrez-le, tout est là où vous l'aviez laissé.
- **Supprimer** : repartez d'un environnement neuf.

Gérez vos Codespaces depuis [github.com/codespaces](https://github.com/codespaces).

## Bonnes pratiques

- Arrêtez un Codespace dès que vous ne l'utilisez plus.
- Ne stockez **jamais** de secret en clair dans le code ; utilisez les **Codespaces secrets** (Settings du compte).
- Commitez souvent : un Codespace est jetable, mais le dépôt est votre mémoire.

Pour rendre l'environnement reproductible, décrivons-le : [Dev Containers](/codespaces/dev-containers).
