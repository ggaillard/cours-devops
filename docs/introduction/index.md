# Introduction au DevOps

::: info 🎯 Séance 1 (1/3) · ~40 min
À la fin de cette séance, vous savez :

- expliquer ce que recouvre le DevOps et pourquoi il raccourcit le délai entre une idée et sa mise en production ;
- nommer les étapes de la chaîne DevOps et l'outil GitHub qui les porte ;
- distinguer l'intégration continue du déploiement continu.

**Prérequis :** aucun

**Livrable attendu :** une définition personnelle du DevOps en trois phrases
:::

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

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Le DevOps est-il un outil, un métier ou autre chose ?
Ni l'un ni l'autre : c'est une **culture** et un ensemble de **pratiques** qui rapprochent développement et exploitation. Les outils (GitHub Actions, conteneurs…) ne font que la servir — on peut posséder tous les outils sans faire de DevOps.
:::

::: details 2. Quelle est la différence entre CI et CD ?
La **CI** vérifie automatiquement chaque modification (construction, tests, qualité) dès qu'elle est poussée. Le **CD** livre automatiquement ce qui a été validé. La CI protège, le CD délivre — et le CD n'a de sens que si la CI est fiable.
:::

::: details 3. Pourquoi parle-t-on de « boucle » et non de « chaîne » ?
Parce que l'observation en production (logs, métriques) alimente la planification suivante. Sans cette rétroaction, on automatise une ligne de production sans jamais apprendre de ce qui arrive aux utilisateurs.
:::

**Critères de réussite de la séance**

- ☐ je peux citer les 8 étapes de la boucle DevOps dans l'ordre
- ☐ je sais dire, pour chaque étape, quel service GitHub l'assure

> Passez à la page suivante : [Pourquoi le tout-en-ligne ?](/introduction/tout-en-ligne)
