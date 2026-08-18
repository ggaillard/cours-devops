---
layout: default
title: Serveurs Linux
nav_order: 2
has_children: true
---

# 🖥️ Serveurs Linux
{: .no_toc }

Administration système sous Debian/Ubuntu : de l'installation à la mise en production d'un serveur web sécurisé.
{: .fs-6 .fw-300 }

---

## Objectifs pédagogiques

À l'issue de cette section, vous serez capable de :

- Installer et configurer un système Debian/Ubuntu en environnement serveur
- Déployer et sécuriser un serveur web (Apache / Nginx)
- Administrer un serveur à distance via SSH
- Gérer les utilisateurs, les droits et les services systemd
- Automatiser des tâches avec des scripts Bash et Ansible

---

## Contenu de la section

| TP | Sujet | Durée estimée |
|----|-------|---------------|
| [TP Debian — Installation](tp-debian) | Installer Debian en VM, premiers pas | 3h |
| [Serveur Web](serveur-web) | Apache/Nginx, hôtes virtuels, HTTPS | 4h |
| [Administration SSH](ssh-admin) | Clés, tunnels, transfert de fichiers | 2h |
| [Sécurité serveur](securite) | Fail2ban, pare-feu UFW, mises à jour | 2h |
| [Ansible](ansible) | Automatisation de la configuration | 3h |

---

{: .callout .callout-prerequis }
> Avant de démarrer : avoir accès à un logiciel de virtualisation (VirtualBox, VMware ou Proxmox) et une image ISO Debian 12.
