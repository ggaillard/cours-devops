---
layout: default
title: TP Debian — Installation
parent: Serveurs Linux
nav_order: 1
---

# TP Debian — Installation et premiers pas
{: .no_toc }

**Niveau :** 🟢 Débutant  
**Durée :** 3h  
**Objectif :** Installer Debian 12 en machine virtuelle et réaliser la configuration initiale d'un serveur.
{: .fs-5 }

---

## Table des matières
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## TP 1 — Installer Debian 12

### Ce que vous allez faire

- Télécharger l'image ISO Debian 12 (netinstall)
- Créer une machine virtuelle dans VirtualBox
- Installer Debian en mode **serveur** (sans interface graphique)
- Réaliser les paramétrages de base

### Étapes

**1. Création de la VM dans VirtualBox**

| Paramètre | Valeur recommandée |
|-----------|-------------------|
| RAM | 2 Go minimum |
| Stockage | 20 Go (disque dynamique) |
| Réseau | Accès par pont (Bridge) ou NAT |
| OS | Debian 64 bits |

**2. Installation Debian**

Au démarrage sur l'ISO, choisissez **Install** (mode texte, plus stable en VM).

Options importantes :
- Nom de la machine : `srv-debian`
- Partition : utiliser le disque entier, schéma séparé `/home`
- Sélection des logiciels : **décocher tout** sauf `Utilitaires standard du système` et `Serveur SSH`

**3. Premier démarrage**

```bash
# Se connecter en root
login: root
password: (celui saisi pendant l'installation)

# Vérifier la connexion réseau
ip a
ping -c 3 8.8.8.8
```

{: .callout .callout-tip }
> Si la VM n'a pas d'adresse IP, vérifiez la configuration réseau dans VirtualBox (Accès par pont recommandé pour les TP en réseau local).

---

## TP 2 — Configuration initiale du serveur

### Objectifs
- Mettre à jour le système
- Créer un compte utilisateur administrateur
- Configurer sudo

### Étapes

**Mise à jour du système**

```bash
apt update && apt upgrade -y
```

**Création d'un utilisateur**

```bash
# Créer l'utilisateur (remplacez "etudiant" par votre prénom)
adduser etudiant

# Ajouter au groupe sudo
usermod -aG sudo etudiant

# Vérification
groups etudiant
```

**Configuration de sudo**

```bash
# Tester sudo depuis le nouvel utilisateur
su - etudiant
sudo apt update
```

---

## TP 3 — Gérer les paquets avec APT

### Commandes essentielles

```bash
# Rechercher un paquet
apt search nom-paquet

# Installer un paquet
sudo apt install nom-paquet

# Supprimer un paquet
sudo apt remove nom-paquet

# Supprimer avec ses fichiers de configuration
sudo apt purge nom-paquet

# Nettoyer les paquets inutiles
sudo apt autoremove
```

### Exercice

Installez les outils suivants et vérifiez qu'ils fonctionnent :

```bash
sudo apt install -y curl wget htop net-tools tree
```

---

## TP 4 — Gestion des services avec systemd

### Commandes systemd

```bash
# État d'un service
systemctl status ssh

# Démarrer / Arrêter / Redémarrer
systemctl start ssh
systemctl stop ssh
systemctl restart ssh

# Activer au démarrage
systemctl enable ssh

# Désactiver au démarrage
systemctl disable ssh

# Voir tous les services actifs
systemctl list-units --type=service --state=active
```

### Exercice

1. Vérifiez que le service SSH est actif et activé au démarrage
2. Installez `nginx` et vérifiez son état
3. Désactivez nginx (on l'utilisera dans le TP suivant)

---

## TP 5 — Gestion des utilisateurs et des droits

### Utilisateurs et groupes

```bash
# Lister les utilisateurs
cat /etc/passwd

# Lister les groupes
cat /etc/group

# Créer un groupe
groupadd webmasters

# Ajouter un utilisateur à un groupe
usermod -aG webmasters etudiant

# Changer le propriétaire d'un fichier
chown etudiant:webmasters /var/www/html

# Droits classiques : rwxr-xr-x = 755
chmod 755 /var/www/html
```

### Les droits en détail

| Notation | Valeur | Signification |
|----------|--------|---------------|
| `r` | 4 | Lecture |
| `w` | 2 | Écriture |
| `x` | 1 | Exécution |

Exemple : `chmod 750 fichier` → propriétaire=rwx, groupe=r-x, autres=---

---

## TP 6 — Scripts Bash basiques

### Structure d'un script

```bash
#!/bin/bash
# Commentaire : ce script fait X

# Variables
NOM="Debian"
VERSION=$(lsb_release -rs)

# Affichage
echo "Système : $NOM $VERSION"

# Condition
if [ "$VERSION" = "12" ]; then
    echo "Version Bookworm détectée ✓"
else
    echo "Version différente : $VERSION"
fi

# Boucle
for SERVICE in ssh nginx; do
    STATUS=$(systemctl is-active $SERVICE)
    echo "$SERVICE : $STATUS"
done
```

### Exercice

Créez un script `rapport-systeme.sh` qui affiche :
- Le nom de la machine
- L'adresse IP
- La version du noyau
- L'espace disque disponible
- La liste des services actifs

---

## TP 7 — Surveillance et journaux

### Outils de surveillance

```bash
# Processus en temps réel
htop

# Espace disque
df -h

# Espace occupé par les dossiers
du -sh /var/log/*

# Charge du système
uptime

# Mémoire
free -h
```

### Journaux système (logs)

```bash
# Journaux systemd (temps réel)
journalctl -f

# Journaux d'un service spécifique
journalctl -u ssh -n 50

# Journaux depuis le dernier démarrage
journalctl -b

# Fichiers de log classiques
tail -f /var/log/syslog
tail -f /var/log/auth.log
```

### Exercice de synthèse

Créez un script `surveillance.sh` qui :
1. Vérifie si le service SSH est actif
2. Affiche les 10 dernières lignes du journal d'authentification
3. Affiche l'espace disque restant et alerte si < 20 %

---

## Ressources complémentaires

- [Documentation Debian](https://www.debian.org/doc/manuals/debian-handbook/)
- [Debian Reference](https://www.debian.org/doc/manuals/debian-reference/)
- [Linux Command Reference](https://linuxcommand.org/)
