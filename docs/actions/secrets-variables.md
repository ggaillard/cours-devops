# Secrets & variables

::: info 🎯 Séance 10 · 2 h
À la fin de cette séance, vous savez :

- stocker une donnée sensible dans un secret de dépôt et l'utiliser dans un workflow ;
- distinguer secret, variable et `GITHUB_TOKEN` ;
- appliquer le principe du moindre privilège via le bloc `permissions`.

**Prérequis :** [Intégration continue](/actions/integration-continue)

**Livrable attendu :** un workflow consommant un secret, avec des permissions explicitement restreintes
:::

Un pipeline a souvent besoin d'informations sensibles (clés d'API, tokens, mots de passe). On ne les écrit **jamais** en clair dans le code : on utilise les **secrets** GitHub.

## Rappel de sécurité

::: danger Un secret dans le code est un secret compromis
Toute clé écrite dans un fichier versionné (même supprimée ensuite) reste dans l'historique Git et doit être considérée comme **divulguée**. En cas de fuite : **révoquez-la immédiatement** et régénérez-en une nouvelle.
:::

## Créer un secret

1. Dépôt → **Settings → Secrets and variables → Actions**.
2. Onglet **Secrets → New repository secret**.
3. Nom (par convention en majuscules) : `API_TOKEN`.
4. Valeur : collez la donnée sensible.
5. **Add secret**.

La valeur est **chiffrée** et n'est plus jamais affichée, même à vous.

## Utiliser un secret dans un workflow

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Appeler une API protégée
        env:
          TOKEN: ${{ secrets.API_TOKEN }}
        run: |
          curl -H "Authorization: Bearer $TOKEN" https://api.exemple.com/deploy
```

GitHub **masque automatiquement** la valeur d'un secret dans les logs : elle apparaît sous la forme `***`.

## Secrets vs variables

| | Secret | Variable |
| --- | --- | --- |
| Contenu | Sensible (clé, mot de passe) | Non sensible (nom d'environnement, URL) |
| Affichage dans les logs | Masqué (`***`) | Visible |
| Syntaxe | <code v-pre>${{ secrets.NOM }}</code> | <code v-pre>${{ vars.NOM }}</code> |

Exemple de variable :

```yaml
env:
  ENVIRONNEMENT: ${{ vars.ENVIRONNEMENT }}   # ex. "production"
```

## Le `GITHUB_TOKEN` automatique

Chaque workflow reçoit **automatiquement** un jeton temporaire, <code v-pre>${{ secrets.GITHUB_TOKEN }}</code>, qui permet d'agir sur le dépôt (publier une image, déployer sur Pages, commenter une PR…) **sans créer de token personnel**.

```yaml
permissions:
  contents: read
  packages: write        # autorise la publication d'un paquet/image
```

::: tip Principe du moindre privilège
Déclarez explicitement les `permissions` minimales dont le workflow a besoin. C'est une bonne pratique DevSecOps : on n'accorde que le strict nécessaire.
:::

## Les environnements

Pour un déploiement, on peut définir des **environnements** (**Settings → Environments**) : `staging`, `production`… Chacun peut avoir ses propres secrets et exiger une **approbation manuelle** avant déploiement.

```yaml
jobs:
  deploy-prod:
    runs-on: ubuntu-latest
    environment: production      # peut nécessiter une validation humaine
    steps:
      - run: echo "Déploiement en production"
```

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Un secret peut-il apparaître dans les journaux d'exécution ?
GitHub masque automatiquement les valeurs de secrets sous la forme `***`. Le masquage reste toutefois contournable — par exemple si l'on encode la valeur avant de l'afficher. On ne journalise jamais un secret volontairement.
:::

::: details 2. Quand utiliser une variable plutôt qu'un secret ?
Pour tout ce qui n'est pas sensible : nom d'environnement, URL publique, indicateur de configuration. Les variables sont lisibles dans les journaux, ce qui aide au débogage — un secret inutile complique le diagnostic sans rien protéger.
:::

::: details 3. Pourquoi le `GITHUB_TOKEN` est-il préférable à un token personnel ?
Il est créé automatiquement à chaque exécution, limité au dépôt, restreint par le bloc `permissions`, et il expire à la fin du job. Un token personnel, lui, doit être créé, stocké, renouvelé — et il porte souvent bien plus de droits que nécessaire.
:::

**Critères de réussite de la séance**

- ☐ aucune valeur sensible n'apparaît dans un fichier versionné
- ☐ le bloc `permissions` ne contient que ce dont le workflow a besoin

Continuons avec les techniques avancées : [Matrices & artefacts](/actions/matrices-artefacts).
