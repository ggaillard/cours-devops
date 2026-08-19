# TP 0 — Contribuer au dépôt du cours

::: tip 🧭 TP d'ouverture — sans numéro de séance
Ce TP ne consomme pas de séance de la progression. Trois usages :

- **dans la séance 4**, comme mise en pratique immédiate des Issues et des Pull Requests ;
- **en séance de battement**, quand le calendrier a pris du retard ou de l'avance ;
- **en travail à la maison**, corrigé collectivement en dix minutes au début de la séance suivante.

**Prérequis :** [Branches & Pull Requests](/git-github/branches-pr) et [Issues & Projects](/git-github/issues-projects)

**Livrable attendu :** une issue ouverte et une Pull Request soumise sur le dépôt du cours
:::

Tous les TP de ce cours vous font construire un dépôt d'exercice. Celui-ci est différent : **le dépôt est réel**, il est publié, et vos camarades le lisent. Une correction fusionnée sera visible en ligne dans les minutes qui suivent.

C'est l'occasion la plus économique de faire un cycle complet — issue, fork, branche, correction, PR, revue, CI — sur autre chose qu'un dépôt jetable.

::: warning Ce n'est pas un exercice de politesse
Un cours écrit par un humain contient des fautes : coquilles, liens cassés, explications ambiguës, commandes qui ne fonctionnent plus depuis une mise à jour d'outil. Les chercher n'est pas impoli, c'est exactement le travail d'une revue. Le dépôt fournit d'ailleurs un gabarit d'issue prévu pour ça.
:::

## Étape 1 — Trouver quelque chose qui mérite d'être corrigé

Cherchez dans cet ordre — du plus facile au plus utile :

| Ce que vous cherchez | Comment |
| --- | --- |
| Une coquille, un accord, une phrase bancale | En lisant une page que vous venez de travailler |
| Une commande qui ne donne pas le résultat annoncé | En rejouant les manipulations de la séance |
| Une capture ou une sortie devenue fausse | Les interfaces GitHub changent souvent |
| Une explication que vous n'avez pas comprise du premier coup | La plus précieuse : elle signale un défaut du cours, pas de vous |
| Une panne rencontrée en TP et absente de la page [dépannage](/depannage/) | Un vrai apport, pas une correction |

::: tip La meilleure contribution n'est pas une coquille
Une phrase qu'il a fallu relire trois fois révèle un problème que l'auteur ne peut pas voir : il sait déjà ce qu'il a voulu dire. Signalez-la, même si vous ne savez pas comment la réécrire.
:::

## Étape 2 — Ouvrir une issue

Sur le dépôt du cours, `Issues → New issue`. Deux gabarits sont proposés — choisissez **Erreur de contenu** ou **Proposition de contenu**.

Un gabarit d'issue n'est pas de la bureaucratie : il pose les questions dont le mainteneur a besoin pour agir sans revenir vers vous. Remplissez-le comme si vous ne pouviez plus jamais répondre.

**Une issue exploitable contient :**

- ☐ la **page** concernée (son URL, pas « la page sur Docker »)
- ☐ ce qui est **écrit** aujourd'hui
- ☐ ce qui **devrait** l'être, ou pourquoi c'est un problème
- ☐ ce que vous avez **observé** si la commande ne donne pas le résultat annoncé

::: danger Une issue qui dit seulement « ça ne marche pas » ne sert à rien
Elle oblige le mainteneur à faire le travail d'enquête que vous avez déjà fait — et elle finit généralement fermée sans suite. C'est vrai ici comme dans n'importe quelle équipe.
:::

## Étape 3 — Corriger

Vous n'avez pas les droits d'écriture : c'est le cas normal en logiciel libre. Le passage obligé est le **fork**.

```bash
# Depuis l'interface GitHub : bouton « Fork »
# Puis, dans un Codespace ouvert sur votre fork :
git switch -c fix/coquille-page-conteneurs
# … vous corrigez le fichier …
git add docs/conteneurs/build-image.md
git commit -m "fix(conteneurs): corriger la taille annoncée de l'image"
git push -u origin fix/coquille-page-conteneurs
```

Pour une simple coquille, le crayon ✏️ de l'interface GitHub fait tout cela pour vous — fork compris — sans quitter le navigateur.

::: tip Une correction par branche
Si vous avez repéré trois choses, faites trois branches et trois Pull Requests. Une PR qui mélange une coquille, un lien cassé et une reformulation ne peut être acceptée qu'en bloc : le relecteur doit tout prendre ou tout refuser.
:::

## Étape 4 — Ouvrir la Pull Request

Le gabarit de PR du dépôt vous demande le lien de l'issue. Écrivez-le sous la forme `Closes #42` : GitHub fermera l'issue automatiquement à la fusion.

Puis **regardez la CI tourner**. Elle exécute, sur votre correction, exactement ce que ce cours enseigne :

| Ce que la CI vérifie | La séance correspondante |
| --- | --- |
| Le site se construit, aucun lien mort | [séance 12](/pages/deployer-site) |
| La cohérence pédagogique : renvois, numéros de séance, totaux | [séance 22](/qualite/analyse-statique) |
| Les diagrammes Mermaid s'analysent | [séance 24](/uml/) |
| Les fichiers YAML sont valides | [séance 8](/actions/integration-continue) |

Si votre lien est mal écrit, **la CI passe au rouge et votre PR ne peut pas être fusionnée**. C'est précisément la démonstration du cours, appliquée à vous.

## Étape 5 — Répondre à la revue

Une demande de modification n'est pas un refus. Répondez, corrigez, poussez sur la **même branche** : la PR se met à jour toute seule, sans qu'il faille en ouvrir une nouvelle.

::: tip Ce que vous êtes en train d'apprendre
Voir un commentaire arriver sur son propre travail est inconfortable la première fois, et banal la dixième. C'est peut-être ce que ce TP vous apporte de plus utile pour la suite : la revue porte sur le texte, jamais sur vous.
:::

## Barème — 20 points

| Ligne | Points | Ce qui est observé sur ce TP |
| --- | --- | --- |
| **Le livrable fonctionne** | 8 | une issue exploitable et une Pull Request ouverte, qui construit au vert |
| **Méthode Git** | 4 | fork, branche nommée, un seul sujet par PR, message de commit lisible |
| **Exigence de la chaîne** | 4 | la CI est verte sur la PR, ou son échec est diagnostiqué et corrigé |
| **Traçabilité du rendu** | 3 | la PR référence l'issue (`Closes #…`) et décrit le changement |
| **Compréhension** | 1 | sait dire pourquoi un fork était nécessaire ici et pas dans les autres TP |

Le barème commun aux TP et sa justification sont détaillés sur la [vue d'ensemble des TP](/tp/).

::: warning La fusion ne fait pas partie de la note
Une PR peut être refusée pour un motif qui ne vous concerne pas : doublon, choix éditorial, correction déjà en cours ailleurs. Ce qui est évalué, c'est la **qualité de la démarche**.
:::

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Pourquoi passer par un fork alors que les autres TP se font sur votre propre dépôt ?
Parce que vous n'avez pas les droits d'écriture sur le dépôt du cours — et c'est le cas normal dès qu'on contribue à un projet qu'on ne possède pas. Le fork est votre copie personnelle, sur laquelle vous pouvez tout faire ; la Pull Request est la demande adressée au propriétaire d'intégrer votre travail. C'est le modèle de contribution de la quasi-totalité du logiciel libre.
:::

::: details 2. Pourquoi une PR par correction plutôt qu'une PR qui regroupe tout ?
Parce qu'une Pull Request se décide **en bloc** : elle est fusionnée entièrement ou pas du tout. Si elle mélange une coquille évidente et une reformulation discutable, la coquille attend que la discussion aboutisse. Une PR par sujet, c'est aussi un historique où chaque changement reste identifiable et annulable séparément.
:::

::: details 3. Votre PR est rouge alors que votre correction est bonne. Que s'est-il passé ?
La CI vérifie plus que l'orthographe. Le cas le plus fréquent : la correction a modifié un lien interne, et le site ne se construit plus parce que la cible n'existe pas — souvenez-vous que les chemins internes n'incluent pas l'extension `.md`. Deuxième cas : un numéro de séance a été touché, et le contrôle de cohérence a détecté une contradiction. Dans les deux cas, le journal du job nomme le fichier et la ligne.
:::

**Critères de réussite de la séance**

- ☐ l'issue désigne une page précise et décrit ce qui devrait changer
- ☐ la branche porte un nom qui dit ce qu'elle fait
- ☐ la Pull Request ne traite qu'un seul sujet
- ☐ la CI est verte, ou son échec a été lu et corrigé
- ☐ une demande de modification, s'il y en a eu une, a reçu une réponse

Retour à la [vue d'ensemble des TP](/tp/).
