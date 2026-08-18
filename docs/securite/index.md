# DevSecOps

::: info 🎯 Séance 17 (1/2) · ~30 min
À la fin de cette séance, vous savez :

- expliquer le principe du *shift left* en sécurité ;
- associer chaque outil GitHub au type de risque qu'il couvre ;
- citer trois réflexes de sécurité indépendants de tout outillage.

**Prérequis :** [GitHub Actions](/actions/)

**Livrable attendu :** le tableau des trois piliers complété par un exemple de faille pour chacun
:::

Le **DevSecOps** intègre la **sécurité** dans toute la chaîne, plutôt que de la traiter à la fin. La devise : *shift left* — déplacer la sécurité **le plus tôt possible**, dès le code.

GitHub propose plusieurs garde-fous **directement dans le dépôt**, sans outil externe à installer.

## Les trois piliers vus dans ce cours

| Outil | Ce qu'il détecte |
| --- | --- |
| **Dependabot** | Dépendances vulnérables ou obsolètes. |
| **CodeQL** | Failles dans votre propre code (injection, XSS…). |
| **Secret scanning** | Secrets accidentellement commités. |

## Où activer ces protections ?

Dépôt → **Settings → Code security** (parfois *Advanced Security*). Beaucoup de fonctions sont **gratuites sur les dépôts publics**.

## La sécurité comme boucle continue

```
   Code ─► Dependabot (dépendances)
        └► CodeQL (votre code)
        └► Secret scanning (fuites)
              │
              ▼
   Alertes dans l'onglet « Security »
              │
              ▼
   Correction ─► nouvelle vérification (CI)
```

La sécurité n'est plus un audit ponctuel : elle tourne **à chaque modification**, comme les tests.

## Un réflexe avant tout

Le meilleur outil ne remplace pas la vigilance humaine. Trois réflexes de base :

- Ne **jamais** commiter un secret (utiliser les [secrets d'Actions](/actions/secrets-variables) ou un `.env` ignoré).
- Activer la **2FA** sur son compte.
- Déclarer des **permissions minimales** dans les workflows.

## Dans cette section

- [Dependabot](/securite/dependabot) — garder ses dépendances saines.
- [CodeQL & scan de secrets](/securite/codeql-secrets) — analyser le code et traquer les fuites.

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Que signifie *shift left* et quel est l'intérêt économique ?
Déplacer la sécurité au plus tôt dans le cycle, dès l'écriture du code. Une faille corrigée en Pull Request coûte quelques minutes ; la même faille découverte en production coûte un incident, une correction en urgence et parfois une notification réglementaire.
:::

::: details 2. Dependabot, CodeQL, secret scanning : lequel couvre quel risque ?
**Dependabot** surveille les dépendances tierces vulnérables ou obsolètes. **CodeQL** analyse votre propre code (injection, XSS…). Le **secret scanning** traque les identifiants commités par erreur. Les trois sont complémentaires : aucun ne couvre le domaine des autres.
:::

::: details 3. Ces outils dispensent-ils de vigilance humaine ?
Non. Ils détectent des schémas connus. Une faille de logique métier — une autorisation oubliée, par exemple — n'est repérée par aucun des trois. La revue de code reste indispensable.
:::

**Critères de réussite de la séance**

- ☐ je sais où activer ces protections dans les réglages d'un dépôt
