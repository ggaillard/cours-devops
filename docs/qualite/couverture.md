# Couverture de code

::: info 🎯 Séance 21 · 2 h
À la fin de cette séance, vous savez :

- mesurer la couverture d'une suite de tests et lire un rapport ;
- distinguer couverture de lignes, de branches et de fonctions ;
- fixer un seuil qui fait **échouer** la CI, et le publier sur la Pull Request ;
- expliquer ce qu'une couverture de 100 % ne prouve pas.

**Prérequis :** [La pyramide des tests](/qualite/)

**Livrable attendu :** un rapport de couverture publié en artefact, avec un seuil bloquant dans la CI
:::

La **couverture de code** mesure quelle proportion du code est exécutée pendant les tests. C'est un instrument de mesure, pas un objectif : il sert à **repérer ce qui n'est jamais testé**, pas à décerner une note.

## Les quatre indicateurs

```js
function classerNote(note) {
  if (note < 0 || note > 20) throw new Error('note invalide')   // ← ligne A
  if (note >= 10) return 'admis'                                 // ← ligne B
  return 'ajourné'                                               // ← ligne C
}
```

Avec un seul test, `classerNote(15)` :

| Indicateur | Ce qu'il compte | Résultat ici |
| --- | --- | --- |
| **Lignes** | Lignes exécutées / lignes totales | 2 / 3 → 67 % |
| **Branches** | Chemins de décision empruntés | 2 / 4 → 50 % |
| **Fonctions** | Fonctions appelées au moins une fois | 1 / 1 → 100 % |
| **Instructions** | Instructions exécutées | proche des lignes |

La **couverture de branches** est la plus exigeante et la plus utile : elle compte chaque issue de chaque `if`. Ici, `note < 0`, `note > 20` et le cas `ajourné` ne sont jamais empruntés — le code de validation n'a jamais été vérifié.

::: tip Surveillez les branches, pas les lignes
Un `if` sans `else` couvre sa ligne dès qu'on l'exécute une fois, dans un sens seulement. La couverture de lignes reste flatteuse pendant que la moitié des décisions n'a jamais été prise. C'est le seuil de **branches** qu'il faut regarder.
:::

## Mesurer la couverture

Avec Vitest, la couverture est intégrée :

```bash
npm i -D vitest @vitest/coverage-v8
```

`vitest.config.js` :

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],   // console, machine, humain
      include: ['src/**'],
      exclude: ['**/*.test.js', 'src/config/**'],
      thresholds: {
        lines: 80,
        branches: 70,
        functions: 80,
      },
    },
  },
})
```

```bash
npx vitest run --coverage
```

Trois formats de rapport, trois usages :

| Format | Pour qui |
| --- | --- |
| `text` | La console, et donc les journaux de la CI |
| `html` | Un humain : page navigable, lignes non couvertes surlignées en rouge |
| `lcov` | Une machine : SonarCloud, Codecov, l'IDE |

## Le seuil qui fait échouer la CI

C'est le point clé de la séance. Un rapport que personne ne lit ne change rien : il faut que la couverture **bloque**.

Avec les `thresholds` ci-dessus, `vitest run --coverage` renvoie un code de sortie non nul si la couverture passe sous les seuils — et la CI devient rouge automatiquement :

```yaml
      - name: Tests avec couverture
        run: npx vitest run --coverage

      - name: Conserver le rapport HTML
        if: always()                    # même si les tests échouent
        uses: actions/upload-artifact@v4
        with:
          name: couverture
          path: coverage/
          retention-days: 7
```

`if: always()` est important : c'est précisément quand la CI est rouge qu'on veut consulter le rapport.

## Publier le résultat sur la Pull Request

Faire apparaître la couverture directement dans la PR évite d'aller la chercher :

```yaml
      - name: Résumé dans l'exécution
        if: always()
        run: |
          echo "## Couverture" >> $GITHUB_STEP_SUMMARY
          npx vitest run --coverage --reporter=basic 2>&1 | tail -20 >> $GITHUB_STEP_SUMMARY
```

`$GITHUB_STEP_SUMMARY` est un fichier Markdown que GitHub affiche sur la page de l'exécution. C'est le moyen le plus simple de rendre un résultat visible sans installer d'action tierce.

## Choisir un seuil réaliste

| Seuil | Effet observé |
| --- | --- |
| **Pas de seuil** | La couverture baisse silencieusement à chaque livraison |
| **60–70 %** | Point de départ réaliste sur un projet existant |
| **80 %** | Objectif sain sur du code neuf |
| **100 %** | Coûteux, et pousse à écrire des tests sans valeur |

La bonne pratique n'est pas de viser un chiffre absolu mais d'interdire la **régression** : on fige le niveau atteint et on refuse qu'il baisse. Sur un projet existant, monter le seuil d'un point par sprint fonctionne mieux qu'un objectif à 90 % décrété d'un coup — et jamais atteint.

## Ce que la couverture ne prouve pas

::: danger 100 % de couverture ≠ code correct
```js
// Ce test atteint 100 % de couverture… et ne vérifie rien.
it('calcule le TTC', () => {
  calculerTTC(100, 0.2)      // aucune assertion !
})
```
La couverture mesure ce qui est **exécuté**, pas ce qui est **vérifié**. Un test sans assertion, ou dont les assertions sont fausses, couvre exactement autant qu'un bon test.
:::

Trois angles morts à connaître :

- **Les assertions absentes ou faibles** — voir ci-dessus.
- **Les valeurs non testées** — couvrir la ligne `return a / b` ne dit rien du cas `b == 0`.
- **Ce qui n'existe pas** — une fonctionnalité oubliée est couverte à 100 % du code écrit, qui ne l'implémente pas.

La couverture répond donc à « qu'est-ce qui n'est **sûrement pas** testé ? », jamais à « mon code est-il correct ? ». Utilisée comme filet, elle est précieuse ; utilisée comme note, elle pousse à tricher.

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Un module affiche 95 % de lignes couvertes et 40 % de branches. Que faut-il en conclure ?
Que les tests parcourent le code mais n'explorent presque aucun cas alternatif : les `else`, les erreurs, les cas limites ne sont pas empruntés. C'est typiquement le symptôme d'une suite qui ne teste que le chemin nominal. La couverture de lignes rassure à tort, c'est celle de branches qui dit la vérité.
:::

::: details 2. Pourquoi ajouter `if: always()` sur l'étape qui publie le rapport de couverture ?
Parce que sans elle, l'étape est ignorée dès qu'une étape précédente échoue — donc exactement dans le cas où le rapport serait le plus utile. Avec `if: always()`, l'artefact est produit même quand les tests sont rouges.
:::

::: details 3. Est-il judicieux d'imposer 100 % de couverture sur un projet d'étudiants ?
Non. Le coût des derniers pourcents est disproportionné et pousse à écrire des tests sans assertion, uniquement pour faire monter le chiffre — ce qui dégrade la qualité tout en améliorant l'indicateur. Un seuil de 70–80 % sur les branches, assorti de l'interdiction de régresser, produit de bien meilleurs réflexes.
:::

**Critères de réussite de la séance**

- ☐ `npm test` échoue si la couverture passe sous le seuil
- ☐ le rapport HTML est téléchargeable depuis l'exécution, même en cas d'échec
- ☐ je sais montrer une ligne rouge dans le rapport et expliquer pourquoi elle n'est pas couverte
- ☐ je peux citer un cas où 100 % de couverture ne garantit rien

Passons au contrôle du code lui-même : [Analyse statique & quality gate](/qualite/analyse-statique).
