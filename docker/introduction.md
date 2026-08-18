---
layout: default
title: Introduction à Docker
parent: Docker
nav_order: 1
---

# Introduction à Docker
{: .no_toc }

**Niveau :** 🟢 Débutant  
**Durée :** 3h  
**Objectif :** Comprendre les concepts fondamentaux de Docker et manipuler images et conteneurs.
{: .fs-5 }

---

## Table des matières
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Installation de Docker

```bash
# Sur Debian/Ubuntu — méthode officielle
curl -fsSL https://get.docker.com | sudo sh

# Ajouter votre utilisateur au groupe docker (évite sudo à chaque commande)
sudo usermod -aG docker $USER
newgrp docker    # ou déconnexion/reconnexion

# Vérifier l'installation
docker --version
docker info
```

---

## Première image : Hello World

```bash
docker run hello-world
```

Docker :
1. Cherche l'image `hello-world` en local → pas trouvée
2. La télécharge depuis Docker Hub
3. Crée un conteneur et l'exécute
4. Affiche le message

---

## Gérer les images

```bash
# Lister les images locales
docker images
docker image ls

# Télécharger une image
docker pull ubuntu:22.04
docker pull nginx:alpine

# Supprimer une image
docker image rm hello-world
docker rmi ubuntu:22.04

# Chercher une image sur Docker Hub
docker search nginx
```

### Comprendre les tags

```
nginx:alpine
│     └── tag (version/variante) : alpine = image légère basée sur Alpine Linux
└──────── nom de l'image (dépôt officiel sur Docker Hub)

ubuntu:22.04
moncompte/monapp:1.0.3    ← image personnalisée avec version
registry.gitlab.com/g/projet:latest  ← registry privé
```

---

## Gérer les conteneurs

```bash
# Lancer un conteneur (en arrière-plan = detached)
docker run -d --name mon-nginx -p 8080:80 nginx

# -d          → arrière-plan (detached)
# --name      → nom du conteneur
# -p 8080:80  → mapper le port 8080 de l'hôte → port 80 du conteneur

# Vérifier les conteneurs actifs
docker ps

# Voir TOUS les conteneurs (y compris stoppés)
docker ps -a

# Arrêter / Démarrer / Relancer
docker stop mon-nginx
docker start mon-nginx
docker restart mon-nginx

# Supprimer un conteneur (doit être stoppé)
docker rm mon-nginx

# Supprimer un conteneur en cours d'exécution (force)
docker rm -f mon-nginx
```

---

## Interagir avec un conteneur

```bash
# Entrer dans un conteneur en cours d'exécution
docker exec -it mon-nginx bash
# -i : interactif
# -t : pseudo-terminal

# Lancer un conteneur interactif (supprimé à la sortie)
docker run -it --rm ubuntu:22.04 bash

# Voir les logs d'un conteneur
docker logs mon-nginx
docker logs -f mon-nginx    # -f = suivre en temps réel (comme tail -f)
docker logs --tail 50 mon-nginx

# Inspecter un conteneur (infos détaillées JSON)
docker inspect mon-nginx

# Statistiques en temps réel
docker stats
```

---

## Volumes — Persister les données

Par défaut, les données dans un conteneur **disparaissent** quand il est supprimé.

```bash
# Monter un dossier local dans le conteneur
docker run -d \
  --name mon-nginx \
  -p 8080:80 \
  -v /home/etudiant/monsite:/usr/share/nginx/html:ro \
  nginx

# -v /chemin/local:/chemin/conteneur[:ro]
# ro = read-only (lecture seule, optionnel)

# Volume nommé Docker (géré par Docker)
docker volume create mes-donnees
docker run -d -v mes-donnees:/data ubuntu
docker volume ls
docker volume inspect mes-donnees
docker volume rm mes-donnees
```

---

## Variables d'environnement

```bash
# Passer des variables d'environnement
docker run -d \
  --name ma-bdd \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=mabase \
  -p 3306:3306 \
  mysql:8.0

# Vérifier les variables d'un conteneur
docker inspect --format='{{range .Config.Env}}{{println .}}{{end}}' ma-bdd
```

---

## Réseau Docker

```bash
# Lister les réseaux
docker network ls

# Créer un réseau personnalisé
docker network create mon-reseau

# Lancer des conteneurs dans le même réseau
docker run -d --name db --network mon-reseau mysql:8.0
docker run -d --name app --network mon-reseau mon-app

# Dans le réseau, les conteneurs se trouvent par leur NOM
# L'app peut se connecter à "db" au lieu d'utiliser une IP

# Connecter un conteneur existant à un réseau
docker network connect mon-reseau mon-nginx
```

---

## Nettoyage

```bash
# Supprimer tous les conteneurs arrêtés
docker container prune

# Supprimer les images non utilisées
docker image prune

# Supprimer les volumes non utilisés
docker volume prune

# Tout nettoyer (conteneurs, images, volumes, réseaux)
docker system prune -a --volumes
```

---

## Exercice pratique

1. Lancez un conteneur **Nginx** accessible sur le port **8090** de votre machine
2. Créez un dossier `~/monsite` avec un fichier `index.html` contenant `<h1>Mon site Docker</h1>`
3. Montez ce dossier dans le conteneur Nginx
4. Vérifiez que `http://localhost:8090` affiche votre page
5. Modifiez le fichier HTML (sans redémarrer le conteneur) et rechargez la page
6. *(Bonus)* Lancez un conteneur **MariaDB** avec un mot de passe root et une base nommée `btssio`, puis connectez-vous via un second conteneur `mysql` client

---

## Ressources

- [Documentation officielle Docker](https://docs.docker.com/get-started/)
- [Docker Hub](https://hub.docker.com) — bibliothèque d'images officielles
- [Play With Docker](https://labs.play-with-docker.com/) — environnement en ligne pour pratiquer
