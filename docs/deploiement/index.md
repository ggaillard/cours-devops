# Déploiement continu vers un service en ligne

::: info 🎯 Séance 19 · 2 h
À la fin de cette séance, vous savez :

- comparer un déploiement piloté par la plateforme et un déploiement piloté par Actions ;
- choisir une stratégie de mise en production adaptée au risque ;
- protéger la production par un environnement à validation manuelle.

**Prérequis :** [Conteneurs & GHCR](/conteneurs/) et [DevSecOps](/securite/)

**Livrable attendu :** un workflow de déploiement avec environnement `production` et approbation requise
:::

On a déjà déployé un site sur [GitHub Pages](/pages/) et publié une image sur [GHCR](/conteneurs/). Reste le cas d'une **application dynamique** livrée automatiquement vers un **hébergeur en ligne (PaaS)** connecté à GitHub.

## Le principe du déploiement continu (CD)

```
   Merge sur main
        │
        ▼
   CI verte (tests OK)
        │
        ▼
   Déploiement automatique vers l'hébergeur en ligne
        │
        ▼
   Application à jour, sans intervention manuelle
```

L'idée maîtresse : **aucune action manuelle** entre le code validé et sa mise en production.

## Deux approches, toutes deux en ligne

### 1. Le PaaS connecté à GitHub

De nombreuses plateformes d'hébergement se **branchent directement** sur un dépôt GitHub. À chaque push sur `main`, elles récupèrent le code, le construisent et le déploient. La configuration se fait **dans le navigateur**, côté plateforme :

1. Autoriser l'accès à votre dépôt GitHub.
2. Choisir la branche à surveiller (`main`).
3. Indiquer la commande de build et de démarrage.
4. Chaque push déclenche un déploiement.

Ici, c'est **la plateforme** qui joue le rôle du pipeline de déploiement.

### 2. Le déploiement piloté par GitHub Actions

Vous gardez la main dans le workflow : après la CI, une étape appelle l'API de l'hébergeur (souvent via une action officielle) pour déclencher le déploiement.

```yaml
name: Déploiement continu

on:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production        # peut exiger une approbation
    steps:
      - uses: actions/checkout@v4
      # ... build / tests ...
      - name: Déclencher le déploiement
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
        run: |
          curl -X POST \
            -H "Authorization: Bearer $DEPLOY_TOKEN" \
            https://api.hebergeur.exemple/deploy
```

Le token de déploiement est un [secret](/actions/secrets-variables), jamais écrit en clair.

## Les stratégies de mise en production

Un professionnel connaît ces approches pour limiter les risques :

| Stratégie | Idée |
| --- | --- |
| **Recreate** | On arrête l'ancienne version, on démarre la nouvelle (simple, courte coupure). |
| **Rolling** | On remplace les instances progressivement (pas de coupure). |
| **Blue-Green** | Deux environnements ; on bascule le trafic d'un coup, retour arrière instantané. |
| **Canary** | On expose la nouvelle version à une petite fraction des utilisateurs d'abord. |

## Le rôle des environnements et des approbations

Pour la production, on protège le déploiement avec un [**environnement**](/actions/secrets-variables) GitHub exigeant une **validation manuelle** : un humain confirme avant la mise en ligne. On combine ainsi automatisation **et** contrôle.

## Observer après déploiement

Le DevOps ne s'arrête pas au déploiement : on **observe**.

- Les **logs et statuts** des workflows dans l'onglet Actions.
- L'historique des **déploiements** (**Environments** du dépôt).
- Les métriques fournies par l'hébergeur.

Si un problème survient, on **corrige** et le pipeline redéploie — la boucle DevOps est bouclée.

## Conclusion du cours

Vous avez parcouru une chaîne DevOps **entièrement en ligne** :

```
 Git & GitHub → Codespaces → Actions (CI) → Pages / GHCR → DevSecOps → Déploiement (CD)
```

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Blue-Green ou Canary : lequel choisir pour une fonctionnalité au comportement incertain ?
**Canary** : la nouvelle version n'est exposée qu'à une petite fraction des utilisateurs, ce qui limite l'ampleur d'un problème et permet de mesurer avant de généraliser. Blue-Green bascule tout le trafic d'un coup — son atout est le retour arrière instantané, pas la prudence progressive.
:::

::: details 2. L'automatisation totale du déploiement est-elle toujours souhaitable ?
Pas nécessairement. Pour la production, on combine souvent automatisation et contrôle : un **environnement** GitHub peut exiger une validation humaine. Le pipeline reste automatisé, mais le déclenchement final est assumé par quelqu'un.
:::

::: details 3. Pourquoi le DevOps ne s'arrête-t-il pas au déploiement ?
Parce que l'étape suivante est l'observation. Sans logs, métriques ni historique des déploiements, on ne sait pas si la mise en ligne a amélioré ou dégradé la situation — et la boucle de rétroaction reste ouverte.
:::

**Critères de réussite de la séance**

- ☐ le déploiement en production requiert une approbation
- ☐ aucun jeton de déploiement n'apparaît en clair dans le dépôt

Chaque maillon repose sur GitHub, sans installation locale. Reste à rendre ce pipeline **exigeant** : [Qualité & tests](/qualite/).
