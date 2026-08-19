# Dev Containers

::: info 🎯 Séance 6 · 2 h
À la fin de cette séance, vous savez :

- lire et écrire un fichier `devcontainer.json` ;
- ajouter des outils et des extensions à un environnement d'équipe ;
- reconstruire un conteneur après modification de sa définition.

**Socle :** les sections marquées 🚀 sont **hors socle** — voir [socle et approfondissement](/introduction/parcours).

**Prérequis :** [Mon premier Codespace](/codespaces/premier-codespace)

**Livrable attendu :** un `.devcontainer/devcontainer.json` commité, avec `postCreateCommand` et au moins deux extensions
:::

Un **Dev Container** décrit, dans un fichier versionné, l'environnement de développement : l'image de base, les outils, les extensions. Ainsi, **tout le monde code dans le même contexte**.

## Le fichier `devcontainer.json`

Il se place dans un dossier `.devcontainer/` à la racine du dépôt :

```json
{
  "name": "Projet DevOps",
  "image": "mcr.microsoft.com/devcontainers/universal:2",
  "features": {
    "ghcr.io/devcontainers/features/node:1": {},
    "ghcr.io/devcontainers/features/python:1": {}
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "esbenp.prettier-vscode",
        "dbaeumer.vscode-eslint"
      ]
    }
  },
  "postCreateCommand": "npm install",
  "forwardPorts": [3000, 8000]
}
```

## Décryptage

| Clé | Rôle |
| --- | --- |
| `image` | L'image de base du conteneur (le système + outils de départ). |
| `features` | Des briques prêtes à l'emploi (Node, Python, Docker-in-Docker…). |
| `customizations.vscode.extensions` | Les extensions VS Code installées automatiquement. |
| `postCreateCommand` | Commande exécutée après création (installer les dépendances). |
| `forwardPorts` | Les ports web exposés automatiquement. |

## L'intérêt DevOps

- **Onboarding immédiat** : un nouvel arrivant ouvre un Codespace et tout est prêt, sans notice d'installation de trois pages.
- **Environnement = code** : la config est versionnée, relue en Pull Request, et évolue avec le projet.
- **Fin des divergences** : plus de « chez moi j'ai Node 18, chez toi Node 22 ». La version est fixée dans le fichier.

## Appliquer le changement

1. Créez `.devcontainer/devcontainer.json` (via l'interface web ou dans un Codespace).
2. Commitez.
3. **Rebuild** : dans un Codespace, palette de commandes → **Codespaces: Rebuild Container**. Le conteneur est reconstruit selon la nouvelle définition.

## Récapitulatif de la section

- ✅ lancer un environnement de dev dans le cloud ;
- ✅ coder, exécuter et prévisualiser sans rien installer ;
- ✅ rendre l'environnement **reproductible** avec un Dev Container.

## 🚀 Approfondissement — Enrichir le Dev Container

*Hors socle : cette section n'est pas exigible de tous. Elle se traite en autonomie, ou avec les étudiants qui avancent vite.*

Le fichier minimal suffit pour démarrer. Trois mécanismes le rendent réellement utile en projet.

**Les *features* : ajouter un outil sans écrire de `Dockerfile`.** Ce sont des briques installables déclarées dans le fichier :

```json
{
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/devcontainers/features/java:1": { "version": "21" },
    "ghcr.io/devcontainers/features/docker-in-docker:2": {}
  }
}
```

Chaque *feature* est versionnée et documentée. C'est ce qui permet de préparer l'environnement Java de la [séance 25](/api-java/) sans que personne n'installe quoi que ce soit sur son poste.

**`postCreateCommand` : ce qui s'exécute une fois le conteneur prêt.**

```json
{
  "postCreateCommand": "npm ci"
}
```

La commande tourne **après** la construction, à la création du Codespace. C'est l'endroit où l'on installe les dépendances du projet — pas dans l'image, qui serait à reconstruire à chaque changement de `package.json`.

**Les extensions VS Code, décidées par le projet :**

```json
{
  "customizations": {
    "vscode": {
      "extensions": ["redhat.vscode-yaml", "vscjava.vscode-java-pack"]
    }
  }
}
```

Toute personne qui ouvre le projet obtient les mêmes extensions. Plus de « chez moi, le YAML n'est pas surligné ».

::: warning Quand la reconstruction échoue
Le message utile se trouve dans le **journal de création** : palette de commandes → *Codespaces: View Creation Log*. Les causes les plus fréquentes sont une virgule en trop dans le JSON — qui n'est pas du JSONC malgré les commentaires tolérés — et une version de *feature* qui n'existe pas.
:::

::: tip Le lien avec la suite du cours
Ce fichier est au poste de travail ce que le `Dockerfile` sera à l'exécution ([séance 14](/conteneurs/build-image)) : une description versionnée d'un environnement, que n'importe qui peut reproduire à l'identique.
:::

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. À quoi sert `postCreateCommand` ?
À exécuter une commande juste après la création du conteneur — typiquement `npm ci` ou `pip install -r requirements.txt`. C'est ce qui rend l'environnement utilisable immédiatement, sans notice d'installation.
:::

::: details 2. Pourquoi dit-on que le Dev Container relève de l'« environnement comme code » ?
Parce que la configuration est un fichier versionné : elle se relit en Pull Request, se compare entre deux versions, et se restaure comme n'importe quel commit. C'est la même idée que l'infrastructure comme code, appliquée au poste de développement.
:::

::: details 3. Que faut-il faire après avoir modifié `devcontainer.json` dans un Codespace ouvert ?
Un **Rebuild Container** depuis la palette de commandes. Sans reconstruction, le conteneur en cours continue de tourner avec l'ancienne définition.
:::

**Critères de réussite de la séance**

- ☐ le fichier est valide (le conteneur se reconstruit sans erreur)
- ☐ un camarade obtient le même environnement en ouvrant le dépôt

Passons à l'automatisation : [GitHub Actions](/actions/).
