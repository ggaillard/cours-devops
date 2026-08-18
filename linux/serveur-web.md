---
layout: default
title: Serveur Web
parent: Serveurs Linux
nav_order: 2
---

# Serveur Web — Apache & Nginx
{: .no_toc }

**Niveau :** 🟡 Intermédiaire  
**Durée :** 4h  
**Objectif :** Déployer un serveur web fonctionnel avec hôtes virtuels et HTTPS.
{: .fs-5 }

---

## Table des matières
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Apache vs Nginx — Quelle différence ?

| Critère | Apache | Nginx |
|---------|--------|-------|
| Architecture | Multi-processus / Multi-thread | Événementiel asynchrone |
| Fichiers `.htaccess` | ✅ Oui | ❌ Non |
| Performances statiques | Correct | Excellent |
| Reverse proxy | Possible | Natif |
| Cas d'usage typique | PHP, WordPress, LAMP | Proxy, microservices, performances |

En BTS SIO, on utilise souvent **Apache** pour les applications PHP et **Nginx** comme reverse proxy.

---

## Installer Apache

```bash
sudo apt update
sudo apt install -y apache2

# Vérifier le statut
systemctl status apache2

# Ouvrir le pare-feu
sudo ufw allow 'Apache Full'

# Accéder au site par défaut
# → http://ADRESSE_IP dans un navigateur
```

### Structure des fichiers Apache

```
/etc/apache2/
├── apache2.conf          # Configuration principale
├── ports.conf            # Ports d'écoute
├── sites-available/      # Configurations disponibles
│   ├── 000-default.conf  # VirtualHost par défaut
│   └── monsite.conf      # Votre site
├── sites-enabled/        # Liens symboliques vers sites actifs
└── mods-enabled/         # Modules activés
```

### Commandes utiles Apache

```bash
# Activer/désactiver un site
a2ensite monsite.conf
a2dissite 000-default.conf

# Activer/désactiver un module
a2enmod rewrite
a2enmod ssl

# Recharger la configuration
systemctl reload apache2

# Tester la configuration
apache2ctl configtest
```

---

## Configurer un Hôte Virtuel (VirtualHost)

Un hôte virtuel permet de servir **plusieurs sites** depuis le même serveur.

### Créer un site

```bash
# Créer le dossier racine du site
sudo mkdir -p /var/www/monsite.local/html

# Créer une page de test
echo "<h1>Bienvenue sur monsite.local !</h1>" | sudo tee /var/www/monsite.local/html/index.html

# Donner les droits corrects
sudo chown -R www-data:www-data /var/www/monsite.local
sudo chmod -R 755 /var/www/monsite.local
```

### Fichier de configuration du VirtualHost

Créez `/etc/apache2/sites-available/monsite.local.conf` :

```apache
<VirtualHost *:80>
    ServerName monsite.local
    ServerAlias www.monsite.local
    DocumentRoot /var/www/monsite.local/html
    
    ErrorLog ${APACHE_LOG_DIR}/monsite-error.log
    CustomLog ${APACHE_LOG_DIR}/monsite-access.log combined

    <Directory /var/www/monsite.local/html>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

```bash
# Activer le site
sudo a2ensite monsite.local.conf
sudo systemctl reload apache2
```

### Configurer le fichier hosts (côté client)

Sur votre machine cliente, ajoutez dans `/etc/hosts` (Linux/Mac) ou `C:\Windows\System32\drivers\etc\hosts` (Windows) :

```
192.168.1.10    monsite.local www.monsite.local
```

---

## Activer HTTPS avec Let's Encrypt (Certbot)

En production, le HTTPS est **obligatoire**.

```bash
# Installer Certbot
sudo apt install -y certbot python3-certbot-apache

# Obtenir un certificat (remplacez le domaine)
sudo certbot --apache -d mondomaine.fr -d www.mondomaine.fr

# Renouvellement automatique (vérification)
sudo certbot renew --dry-run
```

{: .callout .callout-tip }
> En TP (réseau local sans domaine public), utilisez un **certificat auto-signé** ou **mkcert** pour simuler HTTPS.

### Certificat auto-signé pour les TP

```bash
# Activer le module SSL
sudo a2enmod ssl

# Générer un certificat auto-signé
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/monsite.key \
  -out /etc/ssl/certs/monsite.crt

# Configurer le VirtualHost SSL dans sites-available/monsite-ssl.conf
```

---

## Installer Nginx

```bash
sudo apt install -y nginx
systemctl status nginx
sudo ufw allow 'Nginx Full'
```

### Configuration Nginx de base

```nginx
# /etc/nginx/sites-available/monsite.conf

server {
    listen 80;
    server_name monsite.local;
    root /var/www/monsite.local/html;
    index index.html index.php;

    location / {
        try_files $uri $uri/ =404;
    }

    # Logs
    access_log /var/log/nginx/monsite-access.log;
    error_log  /var/log/nginx/monsite-error.log;
}
```

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/monsite.conf /etc/nginx/sites-enabled/
sudo nginx -t          # Tester la configuration
sudo systemctl reload nginx
```

---

## Nginx comme Reverse Proxy

Nginx excelle en tant que **reverse proxy** : il reçoit les requêtes et les transmet à une application (Node.js, Flask, etc.).

```nginx
server {
    listen 80;
    server_name app.local;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## Exercice de synthèse

1. Installer Apache sur votre VM Debian
2. Créer deux hôtes virtuels : `site1.local` et `site2.local`, chacun avec une page différente
3. Configurer votre fichier hosts pour accéder aux deux sites depuis votre machine
4. Activer le module `rewrite` et créer un `.htaccess` qui redirige `/ancien` vers `/nouveau`
5. *(Bonus)* Installer Nginx et le configurer en reverse proxy vers une petite application Python : `python3 -m http.server 8080`

---

## Ressources

- [Documentation Apache](https://httpd.apache.org/docs/)
- [Documentation Nginx](https://nginx.org/en/docs/)
- [Let's Encrypt / Certbot](https://certbot.eff.org/)
