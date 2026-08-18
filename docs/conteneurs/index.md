# Conteneurs & GHCR

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
