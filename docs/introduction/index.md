# Introduction au DevOps

Le **DevOps** n'est pas un outil ni un poste : c'est une **culture** et un **ensemble de pratiques** qui rapprochent le développement (*Dev*) et l'exploitation (*Ops*) pour livrer des logiciels **plus vite, plus souvent et plus sûrement**.

## Les grands principes

Le DevOps repose sur quelques idées clés que vous retrouverez tout au long de ce cours :

- **Automatiser tout ce qui est répétitif** — tests, construction, déploiement. Ce qui est manuel est source d'erreurs.
- **Intégration continue (CI)** — chaque modification est vérifiée automatiquement (tests, qualité) dès qu'elle est poussée.
- **Déploiement continu (CD)** — le code validé est livré automatiquement, sans intervention manuelle risquée.
- **Infrastructure décrite par du code** — la configuration est versionnée au même titre que le code applicatif.
- **Sécurité intégrée (DevSecOps)** — la sécurité est vérifiée en continu, pas ajoutée à la fin.
- **Boucle de rétroaction courte** — on mesure, on observe, on corrige rapidement.

## La chaîne DevOps

On représente souvent le DevOps par une boucle infinie :

```
   Plan ─► Code ─► Build ─► Test ─► Release ─► Deploy ─► Operate ─► Monitor
     ▲                                                                  │
     └──────────────────────── rétroaction ◄───────────────────────────┘
```

Dans ce cours, **chaque étape est réalisée en ligne** :

| Étape | Outil utilisé (en ligne) |
| --- | --- |
| Plan | GitHub Issues & Projects |
| Code | GitHub Codespaces |
| Build / Test | GitHub Actions |
| Release | GitHub Releases & Packages |
| Deploy | GitHub Pages / GHCR / PaaS connecté |
| Monitor | Statuts et logs des workflows |

## Ce que vous saurez faire à la fin

À l'issue du cours, vous serez capable de :

1. Versionner un projet et collaborer via des Pull Requests.
2. Développer dans un environnement cloud reproductible (Codespaces).
3. Écrire un pipeline CI/CD qui teste et déploie automatiquement.
4. Publier un site ou une image de conteneur sans serveur à administrer.
5. Mettre en place des garde-fous de sécurité automatisés.

## Prérequis

- Un **compte GitHub** (gratuit). Voir [Préparer son compte GitHub](/introduction/preparer-github).
- Un navigateur récent.
- Aucune installation locale n'est nécessaire.

> Passez à la page suivante : [Pourquoi le tout-en-ligne ?](/introduction/tout-en-ligne)
