# Soutenance — démontrer la chaîne

::: info 🎯 Séance 32 · 2 h
À la fin de cette séance, vous savez :

- démontrer en direct une chaîne DevOps complète, du commit à l'image publiée ;
- justifier vos choix de conception à l'appui d'un diagramme UML ;
- répondre à une question technique sans réciter, en montrant le fichier qui prouve.

**Prérequis :** [TP 5 — Livrer l'API](/tp/tp5-api-livree)

**Livrable attendu :** une démonstration de 10 minutes et un dépôt public prêt à être ouvert devant le jury
:::

Cette séance ne contient aucune notion nouvelle. Elle vérifie une seule chose : que vous savez **montrer** ce que vous avez construit, et **dire pourquoi**.

C'est un exercice professionnel avant d'être scolaire. En entretien comme en revue d'équipe, personne ne vous demandera de réciter la définition de l'intégration continue. On vous demandera d'ouvrir votre dépôt et d'expliquer ce qui s'y passe.

## Le format

| Temps | Ce qui se passe |
| --- | --- |
| 0–2 min | Vous présentez le problème que votre API résout, sans jargon |
| 2–8 min | **Démonstration en direct** : vous cassez, la CI refuse, vous réparez, la CI publie |
| 8–10 min | Vous montrez le diagramme de classes et justifiez deux décisions de conception |
| 10–15 min | Questions du jury |

::: warning La démonstration est en direct, pas en captures
Une PR ouverte pendant la soutenance, un workflow qui tourne devant le jury : c'est le cœur de l'exercice. Les captures d'écran servent uniquement de secours si le réseau lâche — préparez-les, mais ne comptez pas dessus.
:::

## Le scénario à préparer

Le scénario le plus convaincant tient en quatre gestes, tous répétés à l'avance :

1. **Ouvrir une branche** et y introduire une régression volontaire — une méthode dont vous supprimez le test, ou une valeur qui viole un invariant du domaine.
2. **Ouvrir la Pull Request.** La CI démarre. Vous commentez ce qui s'exécute pendant que ça s'exécute : compilation, tests, couverture, seuil.
3. **Montrer le refus.** Le job `qualite` échoue, le job `publier` ne démarre pas. C'est le moment le plus important de la soutenance : vous démontrez que le pipeline **refuse**, il ne se contente pas de signaler.
4. **Corriger, pousser, fusionner.** La CI passe au vert, l'image apparaît dans Packages avec son tag.

::: tip Répétez la démonstration au moins une fois en conditions réelles
Chronométrez le pipeline. S'il dure 4 minutes, prévoyez de commenter le diagramme pendant qu'il tourne plutôt que de regarder la barre de progression en silence.
:::

## Les deux décisions de conception à défendre

Le jury attend que vous choisissiez **vous-même** deux décisions et que vous les justifiiez. Quelques exemples de ce qui fait une bonne réponse :

| Décision | Ce qu'on attend de vous |
| --- | --- |
| `Adresse` est un `record`, pas une classe | Expliquer l'immuabilité et l'égalité par valeur, pas réciter la syntaxe |
| `Intervention` est abstraite | Montrer qu'aucune intervention « générique » n'a de sens métier |
| Le dépôt est une interface, pas une classe | Montrer le test qui n'existerait pas sans elle |
| La couverture est bloquante à un certain seuil | Assumer le seuil comme une **décision**, pas comme une valeur trouvée sur Internet |
| L'image est construite en deux étapes | Comparer les tailles obtenues, chiffres à l'appui |

Une décision défendue avec un chiffre ou un fichier à l'appui vaut mieux que trois décisions énoncées.

## Grille d'évaluation — 20 points

| Critère | Points | Ce qui est observé |
| --- | --- | --- |
| **Démonstration du pipeline** | 6 | La chaîne tourne en direct ; l'échec puis la réussite sont montrés sur la même branche |
| **Justification de la conception** | 5 | Deux décisions défendues, diagramme à l'appui, en termes de conséquences et non de syntaxe |
| **Exigence de la chaîne** | 4 | Le pipeline refuse effectivement ; les seuils sont assumés et expliqués |
| **Réponses aux questions** | 3 | La réponse s'appuie sur un fichier ouvert à l'écran plutôt que sur une définition |
| **Conduite de l'exposé** | 2 | Temps tenu, vocabulaire exact, démonstration préparée |

**Bonus (jusqu'à +2, sans dépasser 20)** — un élément qui dépasse l'attendu et que vous savez expliquer : environnement à approbation, CodeQL sur `java`, `HEALTHCHECK`, matrice élargie, module [DataOps / MLOps](/aller-plus-loin/).

::: danger Ce qui coûte le plus de points
Ne pas savoir dire **pourquoi** un fichier de votre dépôt existe. Un `permissions:` recopié sans comprendre, un seuil de couverture dont vous ignorez d'où il vient, un `if:` sur un job dont vous ne savez pas ce qu'il empêche : chacun se repère en une question.
:::

## Les questions du jury

Elles sont graduées. Le premier niveau vérifie que vous savez ce que vous avez fait ; le troisième, que vous sauriez le refaire ailleurs.

### Niveau 1 — restituer

::: details Que se passe-t-il exactement quand vous poussez sur une branche ?
On attend le déroulé réel de *votre* dépôt, pas la théorie : le déclencheur du workflow, les jobs qui démarrent, ceux qui attendent un `needs`, ce qui est publié en artefact. Ouvrez l'onglet Actions et suivez avec le curseur.
:::

::: details Où sont stockés vos secrets, et pourquoi pas dans le code ?
Dans les secrets du dépôt, injectés à l'exécution. La raison décisive n'est pas « c'est plus propre » mais qu'un secret commité **reste dans l'historique** et dans tous les clones : le retirer d'un commit ne le supprime pas. Il faut le considérer comme compromis et le renouveler.
:::

::: details À quoi sert le diagramme de classes que vous montrez ?
À rendre visible ce que le code impose : quelles classes existent, ce qu'elles s'autorisent, ce qu'elles s'interdisent. Il sert de contrat de conception relu en revue — modifier une multiplicité produit une ligne de diff discutable.
:::

### Niveau 2 — justifier

::: details Votre seuil de couverture, pourquoi cette valeur-là ?
Aucune valeur n'est « la bonne ». Ce qu'on attend, c'est un raisonnement : ce que le seuil protège, ce qu'il coûte à l'équipe, et pourquoi 100 % est une mauvaise cible (on écrit alors des tests pour la métrique, pas pour le risque). Une réponse honnête — « nous avons pris cette valeur car la couvrir davantage aurait demandé de tester du code généré » — vaut mieux qu'un chiffre récité.
:::

::: details Pourquoi la publication de l'image est-elle conditionnée ?
Parce que sans condition, chaque Pull Request publierait une image — y compris une PR venant d'un fork, sous votre nom. La vérification doit tourner partout, la publication seulement depuis le dépôt. C'est la distinction entre *vérifier* et *livrer*.
:::

::: details Qu'est-ce qui, dans votre code, serait impossible sans encapsulation ?
On attend un invariant concret : un état qu'aucun chemin du code ne peut violer parce que le champ est privé et que la seule voie de modification le contrôle. Montrer la méthode, puis montrer que le champ n'est accessible nulle part ailleurs.
:::

### Niveau 3 — transposer

::: details Vous arrivez dans une équipe dont le dépôt n'a aucune CI. Par où commencez-vous ?
La réponse attendue est graduelle et argumentée : d'abord un workflow qui **construit** (échec bruyant, valeur immédiate, aucune discussion à avoir), puis les tests existants, puis seulement ensuite un seuil — introduit sur les nouvelles lignes plutôt que sur tout le code, sinon la CI est rouge dès le premier jour et l'équipe la contourne.
:::

::: details Votre pipeline est vert et pourtant l'application est cassée en production. Comment est-ce possible ?
Plusieurs pistes valables : un cas non couvert par les tests, une différence entre l'environnement de test et celui de production, une configuration ou un secret propre à la production, une dépendance résolue différemment. La bonne réponse reconnaît qu'une CI verte prouve que **ce qui est testé** fonctionne, rien de plus.
:::

::: details Ce que vous avez appris ici s'appliquerait-il à un projet qui n'est pas du code ?
C'est la question ouverte. Un pipeline gouverne tout ce qui se versionne et se vérifie automatiquement : de la documentation, de l'infrastructure décrite en fichiers, des données ([DataOps](/aller-plus-loin/dataops)). La limite apparaît quand l'artefact ne se relit pas et se dégrade tout seul — un modèle appris.
:::

## Préparer le dépôt qu'on ouvrira devant vous

- ☐ le `README` explique en trois lignes ce que fait l'API et comment la lancer
- ☐ le badge de la CI est en tête du `README` et il est **vert**
- ☐ le diagramme de classes est versionné dans le dépôt, pas dans un fichier à part
- ☐ l'onglet Actions ne montre aucun échec inexpliqué sur `main`
- ☐ l'image est visible dans Packages, avec au moins deux tags
- ☐ aucune valeur sensible n'apparaît dans l'historique

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Pourquoi montrer un échec pendant une soutenance, alors qu'on cherche à convaincre ?
Parce que l'échec est précisément ce que la chaîne est faite pour produire. Un pipeline qui n'a jamais rien refusé ne prouve rien : il pourrait être vert parce qu'il ne vérifie rien. Montrer le refus, puis la réparation, démontre que le dispositif fonctionne — c'est l'argument le plus fort de la démonstration.
:::

::: details 2. Le jury vous demande pourquoi une classe est abstraite. Que répondez-vous ?
En partant du métier, pas du langage : parce qu'il n'existe pas d'objet « générique » de ce type dans le domaine — on ne planifie pas une intervention indéterminée, on planifie un dépannage ou une maintenance. La conséquence technique suit : le compilateur interdit d'en instancier une, et l'erreur de conception devient impossible à commettre.
:::

::: details 3. La démonstration en direct échoue pour une raison imprévue. Que faire ?
Le dire, diagnostiquer à voix haute, et continuer. Lire le message d'erreur devant le jury vaut mieux que basculer immédiatement sur les captures : c'est exactement la compétence évaluée. Les captures servent si le diagnostic dépasse une minute — on ne laisse pas un jury attendre en silence.
:::

**Critères de réussite de la séance**

- ☐ la démonstration tient dans le temps imparti, répétée au moins une fois
- ☐ un échec de pipeline puis sa réparation sont montrés en direct
- ☐ deux décisions de conception sont défendues avec un fichier ou un chiffre à l'appui
- ☐ chaque question trouve sa réponse dans le dépôt, ouvert à l'écran

Le parcours s'arrête ici — ou continue avec le module d'ouverture sur [les évolutions du métier](/aller-plus-loin/).
