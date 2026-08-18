# GitHub Codespaces

Un **Codespace** est un environnement de développement complet qui tourne **dans le cloud** et s'ouvre dans le navigateur (ou dans VS Code). C'est notre remplaçant de la machine virtuelle locale.

## Le principe

```
   Votre dépôt GitHub
          │
          ▼
   [ Créer un Codespace ]
          │
          ▼
   Un conteneur Linux démarre dans le cloud
   ├─ le code du dépôt
   ├─ VS Code dans le navigateur
   ├─ un terminal
   └─ les outils pré-installés
```

Vous obtenez un vrai poste de développement — éditeur, terminal, ports web — **sans rien installer** sur votre machine.

## Pourquoi c'est un outil DevOps

- **Reproductible** : l'environnement est décrit par un fichier versionné (`devcontainer.json`). Chaque membre de l'équipe obtient exactement la même configuration.
- **Jetable** : on peut supprimer et recréer un Codespace à volonté. Un environnement « cassé » se règle en le recréant.
- **Intégré** : le Codespace connaît déjà votre dépôt et votre identité GitHub.

## Ce que remplace Codespaces

| Avant (local) | Avec Codespaces |
| --- | --- |
| Installer un OS Linux dans une VM | Le conteneur est déjà là |
| Installer Git, Node, Python… | Décrits dans `devcontainer.json` |
| « Ça marche sur ma machine » | Le même environnement pour tous |
| Configuration manuelle et fragile | Configuration versionnée et reproductible |

## Dans cette section

- [Mon premier Codespace](/codespaces/premier-codespace) — le lancer et coder.
- [Dev Containers](/codespaces/dev-containers) — décrire son environnement.

::: tip Quotas
Les Codespaces consomment des « cœurs-heures » sur votre quota gratuit. Pensez à **arrêter** un Codespace inutilisé (il s'arrête aussi automatiquement après inactivité).
:::
