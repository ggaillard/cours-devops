# GitHub Codespaces

::: info 🎯 Séance 5 (1/2) · ~30 min
À la fin de cette séance, vous savez :

- expliquer ce qu'est un Codespace et ce qu'il remplace ;
- justifier les notions d'environnement reproductible et jetable ;
- anticiper la consommation de quota.

**Prérequis :** [Git & GitHub](/git-github/)

**Livrable attendu :** le tableau « avant / avec Codespaces » commenté
:::

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

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Qu'est-ce qui rend un Codespace *reproductible* ?
Le fichier `devcontainer.json`, versionné dans le dépôt : il décrit l'image de base, les outils et les extensions. Chacun obtient donc le même environnement, et ce fichier évolue en Pull Request comme le reste du code.
:::

::: details 2. Que signifie qu'un environnement est *jetable* ?
Qu'on peut le détruire et le recréer sans perte, parce que rien d'important n'y vit en propre : le code est dans le dépôt, la configuration dans le `devcontainer.json`. Un environnement cassé se règle en trente secondes au lieu d'une demi-journée.
:::

::: details 3. Comment éviter d'épuiser son quota de cœurs-heures ?
En arrêtant le Codespace dès la fin de la séance. Il s'arrête aussi seul après inactivité, mais un Codespace oublié un week-end consomme pour rien.
:::

**Critères de réussite de la séance**

- ☐ je sais où retrouver et arrêter mes Codespaces actifs
