---
layout: default
title: Docker Compose
parent: Docker
nav_order: 3
---

# Docker Compose — Applications multi-conteneurs
{: .no_toc }

**Niveau :** 🟡 Intermédiaire  
**Durée :** 3h  
**Objectif :** Orchestrer plusieurs services Docker avec un fichier `compose.yml`.
{: .fs-5 }

---

## Table des matières
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Pourquoi Docker Compose ?

Une application moderne est rarement composée d'un seul service. Exemple typique : un site PHP + une base de données + un cache Redis + un reverse proxy.

Sans Compose, lancer tout ça manuellement est fastidieux. Avec Compose, un seul fichier décrit toute l'application.

```bash
docker compose up -d    # Démarrer toute l'application
docker compose down     # Tout arrêter et nettoyer
```

---

## Structure d'un fichier `compose.yml`

```yaml
services:          # Définition des services (conteneurs)
  nom-service:
    image: ...
    build: ...
    ports: ...
    volumes: ...
    environment: ...
    depends_on: ...
    networks: ...

volumes:           # Volumes nommés (optionnel)
  nom-volume:

networks:          # Réseaux personnalisés (optionnel)
  nom-reseau:
```

---

## Exemple 1 — WordPress + MariaDB

```yaml
# compose.yml
services:

  db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: motdepasse_root
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wp_user
      MYSQL_PASSWORD: wp_password
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - wp_network

  wordpress:
    image: wordpress:6-apache
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_NAME: wordpress
      WORDPRESS_DB_USER: wp_user
      WORDPRESS_DB_PASSWORD: wp_password
    volumes:
      - wp_content:/var/www/html/wp-content
    depends_on:
      - db
    networks:
      - wp_network

volumes:
  db_data:
  wp_content:

networks:
  wp_network:
```

```bash
# Démarrer
docker compose up -d

# Voir les services en cours
docker compose ps

# Voir les logs
docker compose logs -f

# Accéder : http://localhost:8080
```

---

## Exemple 2 — Application Node.js + MongoDB + Nginx

```yaml
services:

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - app

  app:
    build: .           # Utilise le Dockerfile dans le répertoire courant
    restart: unless-stopped
    environment:
      NODE_ENV: production
      MONGO_URL: mongodb://mongo:27017/mabase
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    restart: unless-stopped
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

**`nginx.conf`**
```nginx
server {
    listen 80;
    location / {
        proxy_pass http://app:3000;
        proxy_set_header Host $host;
    }
}
```

---

## Commandes Compose essentielles

```bash
# Démarrer (en arrière-plan)
docker compose up -d

# Démarrer en (re)construisant les images
docker compose up -d --build

# Arrêter les services (conteneurs arrêtés, volumes conservés)
docker compose stop

# Arrêter ET supprimer les conteneurs + réseaux
docker compose down

# Arrêter ET supprimer TOUT (y compris les volumes)
docker compose down -v

# Voir l'état des services
docker compose ps

# Logs d'un service spécifique
docker compose logs -f app

# Exécuter une commande dans un service
docker compose exec app bash
docker compose exec db mysql -u root -p

# Redémarrer un service
docker compose restart app

# Scaler un service (plusieurs instances)
docker compose up -d --scale app=3
```

---

## Fichier `.env` — Variables d'environnement

```bash
# .env (ne pas committer dans Git !)
MYSQL_ROOT_PASSWORD=motdepasse_super_secret
MYSQL_DATABASE=mabase
APP_PORT=8080
```

```yaml
# compose.yml — utilisation des variables .env
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
  app:
    ports:
      - "${APP_PORT}:3000"
```

{: .callout .callout-warning }
> **Ne jamais committer `.env`** dans votre dépôt Git. Ajoutez-le à `.gitignore`. Fournissez un `.env.example` avec des valeurs fictives à la place.

---

## Healthchecks

Les healthchecks permettent à Compose de savoir si un service est **vraiment prêt** (pas juste démarré).

```yaml
services:
  db:
    image: mariadb:11
    healthcheck:
      test: ["CMD", "healthcheck.sh", "--connect", "--innodb_initialized"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 30s

  app:
    depends_on:
      db:
        condition: service_healthy   # Attend que db soit healthy
```

---

## Exercice de synthèse

1. Créez un dossier `tp-compose/`
2. Écrivez un `compose.yml` qui démarre :
   - Une base de données **MariaDB** (avec volume persistant)
   - Une interface web **phpMyAdmin** pour gérer la base
3. Ajoutez un fichier `.env` pour les mots de passe
4. Démarrez l'ensemble et accédez à phpMyAdmin via le navigateur
5. *(Bonus)* Ajoutez un service **Redis** et un service **MailHog** (serveur de mail de développement)

---

## Ressources

- [Documentation Docker Compose](https://docs.docker.com/compose/)
- [Référence compose.yml](https://docs.docker.com/compose/compose-file/)
- [Awesome Compose](https://github.com/docker/awesome-compose) — exemples officiels
