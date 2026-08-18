# Dev Containers

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

Passons à l'automatisation : [GitHub Actions](/actions/).
