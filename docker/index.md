---
layout: default
title: Docker
nav_order: 3
has_children: true
---

# 🐳 Docker
{: .no_toc }

Conteneurisation des applications : du concept à la mise en production avec Docker et Docker Compose.
{: .fs-6 .fw-300 }

---

## Pourquoi Docker ?

Docker résout le problème classique **"ça marche sur ma machine"** en empaquetant l'application et toutes ses dépendances dans un **conteneur** reproductible et portable.

```
┌─────────────────────────────────────────┐
│           Machine physique              │
│  ┌──────────────────────────────────┐   │
│  │         Docker Engine            │   │
│  │  ┌────────┐  ┌────────┐         │   │
│  │  │  App A  │  │  App B  │        │   │
│  │  │ Python  │  │  Node   │        │   │
│  │  │  3.11   │  │  20     │        │   │
│  │  └────────┘  └────────┘         │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

Chaque conteneur est **isolé** et possède ses propres dépendances, mais partage le noyau Linux du système hôte.

---

## Contenu de la section

| Sujet | Description | Niveau |
|-------|-------------|--------|
| [Introduction à Docker](introduction) | Concepts, images, conteneurs, commandes de base | 🟢 Débutant |
| [Dockerfile](dockerfile) | Créer ses propres images | 🟡 Intermédiaire |
| [Docker Compose](compose) | Orchestrer plusieurs conteneurs | 🟡 Intermédiaire |
| [Réseau & Volumes](reseau-volumes) | Persistance et communication entre conteneurs | 🔴 Avancé |
| [Registry](registry) | Publier ses images sur Docker Hub ou GitLab | 🔴 Avancé |

---

## Concepts clés

| Terme | Définition |
|-------|-----------|
| **Image** | Modèle immuable d'un conteneur (comme un ISO ou un template) |
| **Conteneur** | Instance en cours d'exécution d'une image |
| **Dockerfile** | Fichier de recette pour construire une image |
| **Registry** | Dépôt d'images (Docker Hub, GitLab Registry, etc.) |
| **Volume** | Stockage persistant monté dans un conteneur |
| **Réseau** | Communication entre conteneurs |
| **Compose** | Outil pour définir des applications multi-conteneurs |

---

{: .callout .callout-prerequis }
> **Prérequis :** Avoir suivi la section [Serveurs Linux](../linux/) et être à l'aise avec la ligne de commande Bash.
