# Conteneurs & GHCR

::: info 🎯 Séance 14 (1/2) · ~30 min
À la fin de cette séance, vous savez :

- distinguer image, conteneur, Dockerfile, registre et tag ;
- expliquer l'apport des conteneurs pour la portabilité et la reproductibilité ;
- situer GHCR dans l'écosystème GitHub.

**Prérequis :** [GitHub Actions](/actions/)

**Livrable attendu :** le schéma du flux Dockerfile → Actions → GHCR reproduit
:::

Un **conteneur** empaquette une application avec tout ce dont elle a besoin pour tourner (dépendances, configuration) dans une **image** portable. « Ça marche sur ma machine » devient « ça marche partout ».

Ici encore, **rien à installer** : on construit les images **dans GitHub Actions** et on les publie sur le **GitHub Container Registry (GHCR)**.

## Les notions clés

| Terme | Définition |
| --- | --- |
| **Image** | Un modèle figé : l'application + son environnement. |
| **Conteneur** | Une instance en cours d'exécution d'une image. |
| **Dockerfile** | La recette qui décrit comment construire l'image. |
| **Registry** | Un entrepôt d'images. Ici : **GHCR** (`ghcr.io`). |
| **Tag** | Une étiquette de version (`:v1`, `:latest`). |

## Pourquoi les conteneurs en DevOps ?

- **Portabilité** : la même image tourne en développement, en test et en production.
- **Reproductibilité** : l'image est immuable ; on sait exactement ce qui s'exécute.
- **Isolation** : chaque service dans son conteneur, sans interférence.
- **Intégration CI/CD** : construire une image devient une étape de pipeline comme une autre.

## Le flux « tout en ligne »

```
   Dockerfile (dans le dépôt)
          │
          ▼
   GitHub Actions construit l'image
          │
          ▼
   Publication sur ghcr.io/ggaillard/mon-app:latest
          │
          ▼
   L'image est prête à être déployée
```

Aucun Docker local : **le runner d'Actions construit et pousse l'image** pour vous.

## GHCR, le registre de GitHub

Le **GitHub Container Registry** héberge vos images, avec l'adresse :

```
ghcr.io/PROPRIETAIRE/NOM-IMAGE:TAG
```

Il est intégré au dépôt : mêmes droits d'accès, publication via le `GITHUB_TOKEN`, images visibles dans l'onglet **Packages**.

## Dans cette section

- [Construire une image dans Actions](/conteneurs/build-image)
- [Publier sur GHCR](/conteneurs/publier-ghcr)

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Quelle est la différence entre une image et un conteneur ?
L'**image** est un modèle figé et immuable ; le **conteneur** est une instance en cours d'exécution de cette image. Même relation qu'entre une classe et un objet : une image, plusieurs conteneurs.
:::

::: details 2. Comment construire une image sans Docker installé sur son poste ?
En laissant le runner d'Actions le faire : il dispose d'un moteur de conteneurs. Le dépôt ne contient que le `Dockerfile`, le pipeline s'occupe de la construction et de la publication.
:::

::: details 3. Que désigne exactement `ghcr.io/dupont/mon-app:1.2.0` ?
Le registre (`ghcr.io`), le propriétaire (`dupont`), le nom de l'image (`mon-app`) et le tag de version (`1.2.0`). Sans tag explicite, `latest` est sous-entendu — ce qui n'est jamais une bonne idée en production.
:::

**Critères de réussite de la séance**

- ☐ je sais nommer correctement une image destinée à GHCR
