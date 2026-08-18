<!--
  Merci pour votre contribution au cours DevOps.
  Ce gabarit est volontairement court : il sert aussi de démonstration
  pédagogique de ce qu'est un « pull request template ».
-->

## Objet de la Pull Request

<!-- Décrivez en une ou deux phrases ce que cette PR change et pourquoi. -->

## Type de changement

- [ ] Correction de contenu (faute, lien mort, imprécision)
- [ ] Nouveau contenu pédagogique (page, section, TP)
- [ ] Amélioration technique (workflow, configuration, build)
- [ ] Autre : <!-- précisez -->

## Section concernée

<!-- Ex. : Git & GitHub, GitHub Actions, TP 2… -->

## Liste de vérification

- [ ] La branche part de `main` et porte un nom explicite (`docs/…`, `fix/…`, `feat/…`)
- [ ] Le site se construit sans erreur (`npm run docs:build`)
- [ ] Les liens internes ajoutés pointent vers des pages existantes
- [ ] Toute nouvelle page est référencée dans la `sidebar` de `docs/.vitepress/config.mjs`
- [ ] Aucun secret ni donnée personnelle dans le diff

## Issue liée

<!-- Ex. : Closes #12 -->
