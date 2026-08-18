# DevSecOps

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
