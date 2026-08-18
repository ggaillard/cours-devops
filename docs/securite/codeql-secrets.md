# CodeQL & scan de secrets

::: info 🎯 Séance 18 · 2 h
À la fin de cette séance, vous savez :

- activer l'analyse statique CodeQL et interpréter ses résultats ;
- mettre en place le secret scanning et la protection par push ;
- appliquer la procédure correcte en cas de fuite avérée.

**Prérequis :** [Dependabot](/securite/dependabot)

**Livrable attendu :** CodeQL actif avec une exécution verte, push protection activée
:::

Deux protections complémentaires : **CodeQL** analyse **votre** code à la recherche de failles ; le **secret scanning** traque les secrets qui auraient fui dans le dépôt.

## CodeQL : l'analyse statique de sécurité

**CodeQL** examine le code source (sans l'exécuter) pour repérer des schémas dangereux : injection SQL, XSS, chemins non validés, etc. C'est de l'**analyse statique** intégrée à la CI.

### Activer CodeQL

Le plus simple : **Security → Code scanning → Set up → Default**. GitHub crée et gère le workflow pour vous.

Pour un contrôle manuel, `.github/workflows/codeql.yml` :

```yaml
name: Analyse CodeQL

on:
  push:
    branches: [main]
  pull_request:
  schedule:
    - cron: '0 6 * * 1'      # analyse hebdomadaire

permissions:
  security-events: write
  contents: read

jobs:
  analyze:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        language: ['javascript-typescript']
    steps:
      - uses: actions/checkout@v4
      - name: Initialiser CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: ${{ matrix.language }}
      - name: Analyser
        uses: github/codeql-action/analyze@v3
```

### Lire les résultats

Les failles trouvées apparaissent dans **Security → Code scanning**, avec :

- la **gravité**,
- l'**emplacement** exact (fichier + ligne),
- une **explication** et des pistes de correction.

Sur une Pull Request, CodeQL peut **commenter directement** la ligne fautive : la faille est vue **avant** la fusion.

```
   PR ouverte
      │
      ▼
   CodeQL analyse le diff
      │
      ▼
   ⚠️ « Entrée utilisateur non filtrée ligne 42 »
      │
      ▼
   On corrige avant de fusionner
```

## Le secret scanning

Le **secret scanning** détecte les secrets connus (tokens, clés d'API…) présents dans le code ou l'historique.

### Activation

**Settings → Code security → Secret scanning**. Sur les dépôts **publics**, GitHub scanne automatiquement et peut même prévenir le fournisseur du secret.

### La protection par push (*push protection*)

Activez **Push protection** : GitHub **bloque le push** s'il détecte un secret, **avant** qu'il n'atteigne le dépôt. La fuite est évitée à la source.

```
   git push
      │
      ▼
   🔍 secret détecté (ex. un token GitHub)
      │
      ▼
   ⛔ push bloqué → vous retirez le secret puis repoussez
```

### Que faire en cas de fuite avérée ?

::: danger Un secret exposé doit être révoqué
Retirer le secret d'un commit **ne suffit pas** : il demeure dans l'historique. La seule réponse sûre :
1. **Révoquer** immédiatement la clé/le token auprès du fournisseur.
2. **En régénérer** un nouveau.
3. Le stocker correctement (secret d'Actions, jamais dans le code).
:::

## Récapitulatif de la section

- ✅ Dependabot maintient les dépendances saines ;
- ✅ CodeQL détecte les failles de votre code ;
- ✅ le secret scanning empêche les fuites de secrets.

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. CodeQL exécute-t-il le code qu'il analyse ?
Non : c'est de l'analyse **statique**. Il interroge une représentation du code source à la recherche de schémas dangereux. C'est pourquoi il peut tourner sur chaque Pull Request sans environnement d'exécution.
:::

::: details 2. Que fait la *push protection* et en quoi diffère-t-elle du secret scanning ?
Le secret scanning détecte les secrets **déjà présents** dans le dépôt. La push protection **bloque le push** avant que le secret n'arrive sur le serveur. L'une répare, l'autre empêche.
:::

::: details 3. Un token a fui puis a été retiré par un nouveau commit. Que faire ?
**Le révoquer immédiatement** auprès du fournisseur et en générer un nouveau. Le retrait du code ne change rien : le token reste dans l'historique, et il figure déjà dans tous les clones existants.
:::

**Critères de réussite de la séance**

- ☐ une exécution CodeQL est visible dans l'onglet Security
- ☐ je sais énoncer la procédure de révocation dans le bon ordre

La sécurité tourne désormais **en continu**. Terminons par le [déploiement continu](/deploiement/).
