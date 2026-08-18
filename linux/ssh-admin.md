---
layout: default
title: Administration SSH
parent: Serveurs Linux
nav_order: 3
---

# Administration SSH
{: .no_toc }

**Niveau :** 🟢 Débutant → Intermédiaire  
**Durée :** 2h  
**Objectif :** Maîtriser SSH pour administrer des serveurs à distance de façon sécurisée.
{: .fs-5 }

---

## Table des matières
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## SSH — Principe et utilisation de base

SSH (Secure Shell) est le protocole standard pour administrer des serveurs Linux à distance. Il chiffre toutes les communications.

```bash
# Se connecter à un serveur
ssh utilisateur@adresse-ip

# Exemples
ssh etudiant@192.168.1.10
ssh root@mon-serveur.fr -p 2222   # port personnalisé
```

---

## Authentification par clé (sans mot de passe)

L'authentification par **clé cryptographique** est plus sécurisée et plus pratique que le mot de passe.

### Générer une paire de clés

```bash
# Sur votre machine CLIENTE
ssh-keygen -t ed25519 -C "etudiant@bts-sio"

# Fichiers créés dans ~/.ssh/
# ~/.ssh/id_ed25519       ← clé PRIVÉE (ne jamais partager)
# ~/.ssh/id_ed25519.pub   ← clé PUBLIQUE (à déposer sur le serveur)
```

### Copier la clé publique sur le serveur

```bash
# Méthode 1 — automatique (recommandée)
ssh-copy-id etudiant@192.168.1.10

# Méthode 2 — manuelle
cat ~/.ssh/id_ed25519.pub | ssh etudiant@192.168.1.10 \
  "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### Tester la connexion sans mot de passe

```bash
ssh etudiant@192.168.1.10
# → connexion directe sans demande de mot de passe
```

---

## Configurer le fichier `~/.ssh/config`

Le fichier `~/.ssh/config` permet de créer des **alias** pour vos connexions.

```bash
# ~/.ssh/config

Host srv-debian
    HostName 192.168.1.10
    User etudiant
    Port 22
    IdentityFile ~/.ssh/id_ed25519

Host srv-prod
    HostName mon-serveur.fr
    User deploy
    Port 2222
    IdentityFile ~/.ssh/id_prod
```

```bash
# Utilisation des alias
ssh srv-debian        # au lieu de ssh etudiant@192.168.1.10
scp fichier srv-prod:/home/deploy/
```

---

## Sécuriser le serveur SSH

Éditez `/etc/ssh/sshd_config` :

```bash
# Désactiver la connexion root
PermitRootLogin no

# Désactiver l'authentification par mot de passe (après avoir configuré les clés)
PasswordAuthentication no

# Changer le port (légère sécurité par obscurité)
Port 2222

# Limiter les utilisateurs autorisés
AllowUsers etudiant deployer

# Appliquer les changements
sudo systemctl restart ssh
```

{: .callout .callout-warning }
> **Avant de désactiver `PasswordAuthentication`**, vérifiez que votre connexion par clé fonctionne dans une autre fenêtre. Sinon, vous pourriez vous retrouver bloqué dehors !

---

## Transfert de fichiers avec SCP et RSYNC

### SCP — Copie simple

```bash
# Envoyer un fichier vers le serveur
scp fichier.txt etudiant@192.168.1.10:/home/etudiant/

# Récupérer un fichier depuis le serveur
scp etudiant@192.168.1.10:/var/log/syslog ./syslog-local.txt

# Copier un dossier entier
scp -r dossier/ etudiant@192.168.1.10:/home/etudiant/
```

### RSYNC — Synchronisation efficace

```bash
# Synchroniser un dossier local → serveur
rsync -avz --progress ./site/ etudiant@192.168.1.10:/var/www/html/

# Synchroniser serveur → local (sauvegarde)
rsync -avz etudiant@192.168.1.10:/var/www/html/ ./backup-site/

# Options utiles
# -a : mode archive (préserve permissions, dates, liens)
# -v : verbeux
# -z : compression pendant le transfert
# --delete : supprimer les fichiers absents de la source
# --exclude : exclure des fichiers/dossiers
rsync -avz --exclude='node_modules/' --exclude='.git/' ./projet/ srv-debian:/var/www/
```

---

## Tunnels SSH

Les tunnels SSH permettent de **faire passer du trafic** réseau à travers une connexion SSH chiffrée.

### Forward de port local (accéder à un service distant)

```bash
# Accéder à une base de données MySQL distante (port 3306)
# comme si elle était en local sur le port 3307
ssh -L 3307:localhost:3306 etudiant@192.168.1.10

# Connexion MySQL ensuite : mysql -h 127.0.0.1 -P 3307 -u root
```

### Forward de port distant (exposer un service local)

```bash
# Rendre votre serveur local (port 8080) accessible via le serveur distant (port 9090)
ssh -R 9090:localhost:8080 etudiant@serveur-distant.fr
```

### SOCKS Proxy (navigation via le serveur)

```bash
ssh -D 1080 etudiant@serveur-distant.fr
# Configurer le navigateur pour utiliser le proxy SOCKS5 sur 127.0.0.1:1080
```

---

## Session persistante avec tmux

Pour que vos commandes continuent à s'exécuter même après déconnexion SSH.

```bash
# Installer tmux
sudo apt install -y tmux

# Créer une session nommée
tmux new -s ma-session

# Se détacher (laisser tourner en arrière-plan)
Ctrl+B, D

# Lister les sessions actives
tmux ls

# Se rattacher à une session
tmux attach -t ma-session

# Quelques raccourcis utiles dans tmux
Ctrl+B, "   → diviser horizontalement
Ctrl+B, %   → diviser verticalement
Ctrl+B, [   → mode défilement (q pour quitter)
Ctrl+B, d   → se détacher
```

---

## Exercice de synthèse

1. Sur votre VM serveur, assurez-vous que SSH est installé et actif
2. Depuis votre machine hôte, générez une paire de clés ed25519
3. Copiez votre clé publique sur le serveur
4. Créez un alias dans `~/.ssh/config` pour le serveur
5. Désactivez l'authentification par mot de passe sur le serveur
6. Synchronisez un dossier de projet depuis votre machine vers `/var/www/html` avec rsync
7. *(Bonus)* Créez un tunnel SSH pour accéder à l'interface web du serveur (port 80) via le port 8080 local

---

## Ressources

- [OpenSSH Manual](https://www.openssh.com/manual.html)
- [SSH Essentials (DigitalOcean)](https://www.digitalocean.com/community/tutorials/ssh-essentials-working-with-ssh-servers-clients-and-keys)
- [tmux Cheat Sheet](https://tmuxcheatsheet.com/)
