---
layout: home
title: Accueil
nav_order: 1
---

# Serveurs / DevOps — BTS SIO
{: .fs-9 }

Ressources pédagogiques pour la spécialité **Serveurs et Services** (option SISR) du BTS SIO.  
Cours, guides et travaux pratiques du tronc commun et de la majeure DevOps.
{: .fs-6 .fw-300 }

[Commencer par les bases Linux →](linux/){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Voir les TP Docker →](docker/){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## 🗺️ Parcours recommandé

```
① Serveurs Linux  ──►  ② Docker  ──►  ③ CI/CD  ──►  ④ Outils 2026
   (bases, SSH,           (conteneurs,      (pipelines,       (K8s, IaC,
    services web)          Compose)          déploiement)      observabilité)
```

## 📊 Ce que vous trouverez ici

| Section | Contenu | Niveau |
|---------|---------|--------|
| [Serveurs Linux](linux/) | Installation Debian, Apache/Nginx, SSH, sécurité, Ansible | 🟢 Débutant → Intermédiaire |
| [Docker](docker/) | Images, conteneurs, Compose, réseau, registry | 🟡 Intermédiaire |
| [CI/CD](cicd/) | GitLab CI, pipelines, déploiement automatisé, SonarQube | 🔴 Avancé |
| [Outils 2026](outils-2026) | GitHub Actions, Kubernetes, IaC, observabilité | 🔴 Avancé |

## 🎓 Public visé

Ces ressources s'adressent aux étudiants **BTS SIO 1ère et 2ème année**, option SISR.  
Elles complètent le cours magistral et servent de support pour les séances de TP.

{: .callout .callout-tip }
> **Première visite ?** Commencez par [Installer Debian](linux/tp-debian) puis enchaînez les TP dans l'ordre de chaque section.

## 🔗 Liens utiles

- [GitHub du cours](https://github.com/ggaillard/cours-devops) — pour signaler une erreur ou proposer une amélioration
- [Documentation officielle Docker](https://docs.docker.com)
- [Documentation GitLab CI/CD](https://docs.gitlab.com/ee/ci/)
- [Just the Docs theme](https://just-the-docs.com) — thème de ce site
