# Qualité & tests

::: info 🎯 Séance 20 · 2 h
À la fin de cette séance, vous savez :

- distinguer test unitaire, test d'intégration et test de bout en bout ;
- répartir vos tests selon la pyramide et justifier cette répartition ;
- écrire des tests lisibles suivant le schéma *Arrange – Act – Assert* ;
- faire tourner une suite de tests dans la CI et lire son rapport.

**Prérequis :** [Intégration continue](/actions/integration-continue)

**Livrable attendu :** une suite de tests à trois niveaux sur un projet, exécutée par la CI
:::

Jusqu'ici, la CI exécutait « les tests » sans qu'on ait interrogé leur nature. C'est le maillon faible de tout ce qui précède : **un pipeline ne vaut que ce que valent ses vérifications**. Un dépôt peut afficher un badge vert permanent et n'avoir jamais rien prouvé.

Cette section répond à trois questions : quels tests écrire, comment mesurer ce qu'ils couvrent, et comment empêcher le code de se dégrader avec le temps.

## Les trois niveaux de test

| Niveau | Ce qu'il vérifie | Ce qu'il remplace par un faux |
| --- | --- | --- |
| **Unitaire** | Une fonction ou une classe, isolée | Toutes ses dépendances |
| **Intégration** | Plusieurs composants qui collaborent | L'extérieur du système (réseau, API tierce) |
| **Bout en bout (E2E)** | Le parcours complet, comme un utilisateur | Rien |

Plus on descend, plus le test est **rapide, stable et précis** : quand un test unitaire échoue, vous savez exactement quelle fonction est en cause. Plus on monte, plus le test est **réaliste mais lent et fragile** : un test E2E rouge signale qu'« un truc ne marche plus », sans dire où.

## La pyramide

```
                    ╱╲
                   ╱  ╲        E2E  —  quelques-uns
                  ╱ E2E╲       lents (secondes à minutes), fragiles
                 ╱──────╲      mais seuls à prouver que ça marche vraiment
                ╱        ╲
               ╱Intégration╲   Intégration  —  quelques dizaines
              ╱────────────╲  moyennement rapides
             ╱              ╲
            ╱   Unitaires    ╲ Unitaires  —  des centaines
           ╱──────────────────╲ millisecondes, très stables
```

La règle : **beaucoup de tests en bas, peu en haut**. Ce n'est pas une préférence esthétique, c'est une question de coût. Une suite majoritairement composée de tests E2E met dix minutes à s'exécuter, échoue au hasard une fois sur cinq, et finit par être désactivée — c'est ce qu'on appelle le *cornet de glace* (la pyramide à l'envers), l'anti-modèle le plus répandu.

::: warning Un test instable est pire que pas de test
Un test qui échoue une fois sur trois sans raison apprend aux équipes à **ignorer le rouge**. Le jour où le rouge est réel, personne ne le voit. Un test instable se répare ou se supprime — il ne se tolère pas.
:::

## Anatomie d'un test lisible

Un bon test se lit en trois temps, souvent notés **AAA** :

```js
import { describe, it, expect } from 'vitest'
import { calculerTTC } from '../src/facture.js'

describe('calculerTTC', () => {
  it('applique le taux de TVA à 20 %', () => {
    // Arrange — on prépare les données
    const montantHT = 100
    const taux = 0.2

    // Act — on exécute UNE seule action
    const resultat = calculerTTC(montantHT, taux)

    // Assert — on vérifie UN seul comportement
    expect(resultat).toBe(120)
  })

  it('rejette un montant négatif', () => {
    expect(() => calculerTTC(-10, 0.2)).toThrow('montant invalide')
  })
})
```

Trois principes à retenir :

- **Un test = un comportement.** Si vous devez écrire « et » dans le nom du test, coupez-le en deux.
- **Le nom décrit le comportement attendu**, pas la fonction appelée. `rejette un montant négatif` est utile ; `test2` ne l'est pas.
- **Testez aussi les cas d'erreur.** Le chemin nominal est le plus facile à écrire et le moins souvent cassé.

## Tester ce qui compte

Écrire des tests coûte du temps. Tout ne mérite pas d'être testé au même niveau :

| À tester en priorité | À ne pas sur-tester |
| --- | --- |
| Règles de calcul et de gestion | Accesseurs triviaux |
| Cas limites (zéro, négatif, vide, `null`) | Code généré |
| Bugs corrigés (test de non-régression) | Bibliothèques tierces |
| Frontières entre composants | Détails d'implémentation privés |

::: tip Le test de non-régression
À chaque bug corrigé, écrivez d'abord **un test qui échoue** en reproduisant le bug, puis corrigez jusqu'à ce qu'il passe. Vous obtenez la garantie que ce bug précis ne reviendra jamais — et votre suite de tests grandit là où le code s'est réellement montré fragile.
:::

## Faire tourner tout cela dans la CI

Le pipeline distingue les niveaux, pour donner un retour rapide sans sacrifier le réalisme :

```yaml
name: Tests

on:
  pull_request:
  push:
    branches: [main]

jobs:
  unitaires:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - name: Tests unitaires (rapides)
        run: npm run test:unit

  integration:
    needs: unitaires          # inutile de lancer si les unitaires échouent
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - name: Tests d'intégration
        run: npm run test:integration
```

L'enchaînement par `needs` applique la logique de la pyramide au pipeline lui-même : **on échoue le plus tôt et le moins cher possible**. Inutile de mobiliser trois minutes de tests d'intégration si une fonction de base est déjà cassée.

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Pourquoi ne pas écrire uniquement des tests de bout en bout, puisqu'ils sont les plus réalistes ?
Parce qu'ils sont lents, instables et imprécis. Une suite de 200 tests E2E met des dizaines de minutes, échoue régulièrement pour des raisons de timing, et quand elle est rouge elle ne dit pas où est le problème. Le coût de diagnostic dépasse vite le bénéfice : l'équipe finit par les ignorer.
:::

::: details 2. Que signifie « Arrange – Act – Assert » et pourquoi s'y tenir ?
Préparer les données, exécuter **une** action, vérifier **un** comportement. Cette discipline rend le test lisible en dix secondes et garantit qu'un échec désigne une cause unique. Un test qui enchaîne cinq actions et huit assertions ne vous dit rien d'exploitable quand il casse.
:::

::: details 3. Un collègue propose de supprimer un test qui échoue « une fois sur trois, mais c'est aléatoire ». A-t-il raison ?
Sur le constat, oui : un test instable doit disparaître de la suite, car il détruit la confiance dans le rouge. Mais le supprimer sans enquêter revient souvent à masquer un vrai défaut — condition de concurrence, dépendance à l'horloge ou au réseau. La bonne démarche est de le réparer ; à défaut, de le sortir de la CI **et** d'ouvrir une Issue.
:::

**Critères de réussite de la séance**

- ☐ la suite comporte les trois niveaux, avec une majorité d'unitaires
- ☐ chaque test porte un nom qui décrit un comportement
- ☐ au moins un test couvre un cas d'erreur
- ☐ le pipeline lance les unitaires avant les tests d'intégration

Mesurons maintenant ce que ces tests atteignent réellement : [Couverture de code](/qualite/couverture).
