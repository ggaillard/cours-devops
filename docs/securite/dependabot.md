# Dependabot

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

Passons à l'analyse du code : [CodeQL & scan de secrets](/securite/codeql-secrets).
