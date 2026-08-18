# Secrets & variables

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

Continuons avec les techniques avancées : [Matrices & artefacts](/actions/matrices-artefacts).
