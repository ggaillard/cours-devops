# Dependabot

::: info 🎯 Séance 17 (2/2) · ~1 h 30
À la fin de cette séance, vous savez :

- distinguer les alertes Dependabot des mises à jour automatiques ;
- configurer `dependabot.yml` pour npm et pour les actions GitHub ;
- traiter une Pull Request de mise à jour en s'appuyant sur la CI.

**Prérequis :** [DevSecOps](/securite/)

**Livrable attendu :** un `.github/dependabot.yml` actif et une PR de mise à jour analysée puis traitée
:::

Les projets modernes reposent sur des dizaines de **dépendances** (bibliothèques tierces). Certaines contiennent des failles ou vieillissent. **Dependabot** surveille ces dépendances et propose des mises à jour **automatiquement**.

## Deux fonctions à distinguer

| Fonction | Rôle |
| --- | --- |
| **Dependabot alerts** | Vous **alerte** quand une dépendance a une faille connue. |
| **Dependabot updates** | Ouvre des **Pull Requests** pour mettre à jour les dépendances. |

## Activer les alertes

Dépôt → **Settings → Code security** → activez **Dependabot alerts** (et **Dependabot security updates**).

Dès qu'une vulnérabilité est publiée pour une de vos dépendances, une alerte apparaît dans l'onglet **Security → Dependabot**.

## Activer les mises à jour automatiques

Créez `.github/dependabot.yml` :

```yaml
version: 2
updates:
  # Dépendances npm
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"

  # Actions GitHub utilisées dans les workflows
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

Chaque semaine, Dependabot vérifie et ouvre une **Pull Request** par mise à jour disponible :

```
   Nouvelle version détectée
          │
          ▼
   Dependabot ouvre une PR : « Bump express from 4.18 to 4.19 »
          │
          ▼
   La CI teste la PR automatiquement
          │
          ▼
   Vous fusionnez si tout est vert ✅
```

## Le cercle vertueux avec la CI

L'intérêt est décuplé combiné à l'[intégration continue](/actions/integration-continue) : chaque PR de Dependabot déclenche vos tests. Vous ne fusionnez que si **la mise à jour ne casse rien**. Mettre à jour ses dépendances devient sûr et routinier, au lieu d'être un chantier redouté.

## Bien configurer

- `interval: "weekly"` évite d'être noyé sous les PR quotidiennes.
- Surveillez l'écosystème `github-actions` : vos workflows utilisent des actions tierces qui doivent aussi rester à jour.
- Groupez les mises à jour mineures si le volume devient important (option `groups`).

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Alertes ou mises à jour : quelle différence ?
Les **alertes** signalent qu'une dépendance utilisée présente une faille connue. Les **mises à jour** ouvrent en plus des Pull Requests pour corriger. On peut recevoir des alertes sans jamais activer les PR automatiques.
:::

::: details 2. Pourquoi surveiller aussi l'écosystème `github-actions` ?
Parce que vos workflows dépendent d'actions tierces qui vieillissent et peuvent être compromises. Une action obsolète, c'est du code non maîtrisé qui s'exécute avec les droits de votre pipeline.
:::

::: details 3. Faut-il fusionner une PR de Dependabot les yeux fermés ?
Non — mais c'est justement là que la CI prend toute sa valeur : elle teste la mise à jour avant vous. On lit l'avis de sécurité, on vérifie que la CI est verte, on regarde s'il s'agit d'un changement majeur, puis on décide.
:::

**Critères de réussite de la séance**

- ☐ l'intervalle configuré évite la noyade sous les PR quotidiennes
- ☐ au moins une PR de Dependabot a été lue, testée et tranchée

Passons à l'analyse du code : [CodeQL & scan de secrets](/securite/codeql-secrets).
