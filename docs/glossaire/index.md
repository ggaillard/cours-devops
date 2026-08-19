# Glossaire

::: tip 🧭 Page de référence — hors progression
Chaque entrée renvoie à la séance qui introduit la notion. Utilisez la recherche du site ou <kbd>Ctrl</kbd>+<kbd>F</kbd> plutôt que de lire la page en entier.

Les définitions sont volontairement courtes : elles servent à retrouver une notion, pas à l'apprendre. La séance liée, elle, l'explique.
:::

## A

**Action** — Brique réutilisable appelée par un `uses:` dans un workflow. Une action peut venir de GitHub, de la communauté, ou de votre propre dépôt. — [S7](/actions/)

**Agrégation** — Association où le tout et la partie ont des vies indépendantes : supprimer le tout ne supprime pas la partie. Se note par un losange creux. — [S27](/api-java/associations-cycle-vie)

**Analyse statique** — Examen du code **sans l'exécuter**, à la recherche de défauts, de duplications ou de constructions dangereuses. Complète les tests : elle voit ce que les tests ne parcourent pas. — [S22](/qualite/analyse-statique)

**Approbation** — Validation humaine exigée avant qu'un déploiement ne se poursuive. Attachée à un environnement, elle transforme un pipeline entièrement automatique en pipeline contrôlé. — [S19](/deploiement/)

**Artefact** — Fichier produit par un job et conservé après son exécution : rapport de tests, site construit, binaire. Sert à transmettre un résultat d'un job à un autre, ou à l'humain. — [S11](/actions/matrices-artefacts)

**Association** — Lien structurel entre deux classes. Se caractérise par son sens, son nom et ses multiplicités. — [S27](/api-java/associations-cycle-vie)

## B

**Badge** — Image générée dynamiquement affichant l'état de la CI dans un `README`. Un badge rouge visible de tous est une pression sociale efficace. — [S8](/actions/integration-continue)

**`base`** — Préfixe d'URL sous lequel un site statique est publié. Sur GitHub Pages en mode « projet », il vaut le nom du dépôt : s'il est faux, le site s'affiche sans style. — [S12](/pages/deployer-site)

**Branche** — Ligne de développement parallèle. Permet de travailler sans perturber `main`, et de faire relire avant d'intégrer. — [S3](/git-github/branches-pr)

## C

**CI (intégration continue)** — Pratique consistant à vérifier automatiquement chaque modification, à chaque envoi. Le but n'est pas d'automatiser pour automatiser : c'est de détecter une régression en minutes plutôt qu'en semaines. — [S8](/actions/integration-continue)

**Classe** — Description d'une catégorie d'objets : ce qu'ils savent (attributs) et ce qu'ils savent faire (méthodes). — [S26](/api-java/modeliser-poo)

**Classe abstraite** — Classe qu'on ne peut pas instancier, parce qu'aucun objet « générique » de ce type n'a de sens métier. Elle porte du code commun **et** des méthodes que les sous-classes doivent fournir. — [S28](/api-java/abstraction-polymorphisme)

**Codespace** — Environnement de développement complet, exécuté chez GitHub et accessible depuis un navigateur. — [S5](/codespaces/)

**CodeQL** — Moteur d'analyse statique de GitHub, qui interroge le code comme une base de données pour y chercher des motifs de vulnérabilité. — [S18](/securite/codeql-secrets)

**Commit** — Instantané de l'état du dépôt, identifié par une empreinte (SHA) et accompagné d'un message. L'unité d'histoire de Git. — [S2](/git-github/bases-git)

**Composition** — Association où la partie n'existe pas sans le tout : supprimer le tout supprime la partie. Se note par un losange plein. — [S27](/api-java/associations-cycle-vie)

**Conflit** — Situation où deux branches modifient les mêmes lignes et où Git refuse de choisir. Se résout à la main, jamais automatiquement. — [S3](/git-github/branches-pr)

**Conteneur** — Processus isolé exécuté à partir d'une image, avec son propre système de fichiers. Ce n'est pas une machine virtuelle : il partage le noyau de l'hôte. — [S14](/conteneurs/)

**Contexte de construction** — Ensemble des fichiers envoyés au moteur de construction d'image. Ce qui est exclu par `.dockerignore` n'en fait pas partie — et reste donc introuvable pour le `Dockerfile`. — [S14](/conteneurs/build-image)

**Contrat de données** — Fichier versionné énonçant ce que toute livraison de données doit respecter : colonnes, bornes, complétude. Relu en Pull Request comme une signature de méthode. — [DataOps](/aller-plus-loin/dataops)

**Couverture de code** — Part du code effectivement exécutée par les tests. Une couverture faible prouve un manque ; une couverture élevée ne prouve pas la qualité. — [S21](/qualite/couverture)

**CVE** — Identifiant public d'une vulnérabilité connue, de la forme `CVE-2024-12345`. C'est ce que Dependabot recoupe avec vos dépendances. — [S17](/securite/dependabot)

## D

**DataOps** — Application au flux de données des pratiques que le DevOps applique au code : validation automatique, versionnement, contrôles à chaque livraison. — [DataOps](/aller-plus-loin/dataops)

**Déclencheur (`on:`)** — Condition qui lance un workflow : un `push`, une Pull Request, une planification, un déclenchement manuel. Un workflow qui ne démarre jamais a presque toujours un déclencheur inadapté. — [S7](/actions/premier-workflow)

**Dépendance** — Bibliothèque tierce utilisée par votre code. Elle apporte ses propres failles, d'où la surveillance automatique. — [S17](/securite/dependabot)

**Dependabot** — Service GitHub qui surveille les dépendances déclarées et ouvre des Pull Requests de mise à jour, en priorité pour les failles connues. — [S17](/securite/dependabot)

**Déploiement continu** — Prolongement de la CI : ce qui est validé part automatiquement en production, éventuellement après approbation. — [S19](/deploiement/)

**Dépôt** — Répertoire suivi par Git, contenant les fichiers **et** l'intégralité de leur historique. — [S2](/git-github/)

**Dérive** — Écart progressif entre les données rencontrées en production et celles de l'entraînement. Un modèle qui dérive devient faux sans qu'aucune erreur ne soit levée. — [MLOps](/aller-plus-loin/mlops)

**Dev Container** — Description versionnée de l'environnement de développement : image de base, outils, extensions. Garantit que tous les postes sont identiques. — [S6](/codespaces/dev-containers)

**DevOps** — Culture visant à supprimer la frontière entre ceux qui développent et ceux qui exploitent, en rendant la livraison fréquente, automatisée et sans drame. — [S1](/introduction/)

**DevSecOps** — DevOps où la sécurité est intégrée au pipeline plutôt qu'ajoutée à la fin. — [S17](/securite/)

**Diagramme d'activité** — Représentation d'un enchaînement d'actions et de décisions, proche d'un organigramme. — [S24](/uml/)

**Diagramme de cas d'utilisation** — Vue des acteurs et de ce qu'ils peuvent faire du système. Répond à « qui fait quoi », jamais à « comment ». — [S24](/uml/)

**Diagramme de classes** — Représentation des classes, de leurs attributs, de leurs opérations et de leurs relations. Dans ce cours, il accompagne chaque notion objet plutôt que de faire l'objet d'une leçon séparée. — [S26](/api-java/modeliser-poo)

**Diagramme d'états** — Représentation des états successifs d'un objet et des transitions autorisées. Chaque transition légitime devient une méthode métier. — [S27](/api-java/associations-cycle-vie)

**Diagramme de séquence** — Représentation des échanges entre participants dans le temps. Chacune de ses branches conditionnelles est un test à écrire. — [S30](/api-java/tester-api)

**Digest** — Empreinte du contenu exact d'une image (`sha256:…`). Contrairement à un tag, il ne peut pas être déplacé : c'est la seule désignation vraiment stable. — [S15](/conteneurs/publier-ghcr)

**Dockerfile** — Recette de construction d'une image : image de base, fichiers copiés, commandes exécutées, commande de démarrage. — [S14](/conteneurs/build-image)

**DTO** — Objet dédié au transport de données entre l'API et ses clients, distinct du modèle métier. Permet de faire évoluer le domaine sans casser le contrat exposé. — [S29](/api-java/api-rest)

**DVC** — Outil qui versionne un **pointeur** vers un fichier de données, la donnée elle-même vivant dans un stockage adapté. — [DataOps](/aller-plus-loin/dataops)

## E

**Encapsulation** — Principe consistant à rendre l'état interne inaccessible directement, pour que toute modification passe par du code qui la contrôle. C'est ce qui rend un invariant tenable. — [S26](/api-java/modeliser-poo)

**Environnement** — Cible de déploiement nommée (`staging`, `production`), à laquelle on peut attacher des secrets, des approbations et des restrictions de branche. — [S19](/deploiement/)

**`equals` / `hashCode`** — Couple de méthodes définissant l'égalité d'un objet. Les redéfinir ensemble n'est pas une convention : le contrat des collections en dépend. — [S26](/api-java/modeliser-poo)

## F

**Fork** — Copie personnelle d'un dépôt sur lequel on n'a pas les droits d'écriture. Passage obligé pour contribuer à un projet qu'on ne possède pas. — [TP 0](/tp/tp0-contribuer)

## G

**Gabarit (`template`)** — Formulaire pré-rempli proposé à l'ouverture d'une issue ou d'une Pull Request. Pose d'emblée les questions dont le relecteur aura besoin. — [S4](/git-github/issues-projects)

**Généralisation** — Relation « est un » entre une classe et sa sous-classe. Se note par un trait plein terminé par un triangle creux, à distinguer de la réalisation. — [S28](/api-java/abstraction-polymorphisme)

**GHCR** — Registre d'images de GitHub (`ghcr.io`), intégré aux permissions du dépôt. — [S15](/conteneurs/publier-ghcr)

**GitHub Pages** — Hébergement de sites statiques fourni par GitHub, alimenté par un workflow. — [S12](/pages/)

**`GITHUB_TOKEN`** — Jeton créé automatiquement pour chaque exécution de workflow, valable le temps du job. En lecture seule par défaut : tout droit supplémentaire se déclare explicitement. — [S10](/actions/secrets-variables)

## H

**Héritage** — Mécanisme par lequel une classe reprend les attributs et méthodes d'une autre. Utile quand la sous-classe est réellement une spécialisation, nuisible quand il ne sert qu'à réutiliser du code. — [S28](/api-java/abstraction-polymorphisme)

## I

**Image** — Modèle immuable à partir duquel on démarre des conteneurs, constitué de couches empilées. — [S14](/conteneurs/build-image)

**Injection de dépendances** — Fait de fournir à un objet ce dont il a besoin plutôt que de le lui faire construire lui-même. Écrite à la main dans ce cours **avant** d'être automatisée par un framework. — [S29](/api-java/api-rest)

**Interface** — Contrat sans implémentation : ce qu'une classe promet de savoir faire. Permet de dépendre d'un comportement plutôt que d'une implémentation. — [S28](/api-java/abstraction-polymorphisme)

**Invariant** — Propriété qui doit rester vraie pendant toute la vie d'un objet. C'est l'invariant qui justifie l'encapsulation, pas l'inverse. — [S26](/api-java/modeliser-poo)

**Issue** — Unité de travail ou de signalement discutée dans le dépôt : anomalie, demande, question. — [S4](/git-github/issues-projects)

## J

**JaCoCo** — Outil de mesure de couverture pour Java, capable de **faire échouer** la construction sous un seuil donné. — [S21](/qualite/couverture)

**Job** — Ensemble d'étapes exécutées sur un même runner. Les jobs d'un workflow tournent en parallèle, sauf lien `needs`. — [S7](/actions/)

**JUnit** — Bibliothèque de tests de référence en Java. — [S30](/api-java/tester-api)

## L

**Linter** — Outil signalant les écarts à un style ou à des règles de bonne pratique, avant même la question de la correction. — [S22](/qualite/analyse-statique)

**LTS** — Version d'un langage ou d'un outil bénéficiant d'un support long. Choisir une LTS, c'est accepter de ne pas avoir les dernières nouveautés en échange de plusieurs années de tranquillité. — [S25](/api-java/)

## M

**`main`** — Branche principale, celle qui doit toujours être en état de fonctionner. Protégée, elle n'accepte que des Pull Requests validées. — [S3](/git-github/branches-pr)

**Matrice** — Déclaration qui multiplie un job sur plusieurs variantes — versions de langage, systèmes d'exploitation — sans dupliquer le code. — [S11](/actions/matrices-artefacts)

**Mermaid** — Langage de description de diagrammes en texte, rendu automatiquement par GitHub et par ce site. Permet de versionner un diagramme et de le relire en revue. — [S24](/uml/)

**MLflow** — Outil de journalisation des entraînements : paramètres, métriques, empreinte des données, modèle produit. — [MLOps](/aller-plus-loin/mlops)

**MLOps** — DataOps étendu aux modèles : reproductibilité de l'entraînement, versionnement, surveillance de la dérive. — [MLOps](/aller-plus-loin/mlops)

**Mock (doublure)** — Objet de test qui remplace une dépendance réelle pour isoler le code testé et rendre le test rapide et déterministe. — [S30](/api-java/tester-api)

**Multiplicité** — Nombre d'objets pouvant participer à une association (`1`, `0..*`, `1..*`). Passer de `1` à `0..*` change le code **et** produit une ligne de diff discutable en revue. — [S27](/api-java/associations-cycle-vie)

## N

**`needs`** — Déclaration qui subordonne un job à la réussite d'un autre. C'est ce qui empêche une publication de partir d'un code non validé. — [S11](/actions/matrices-artefacts)

## P

**Permissions** — Droits accordés au jeton du workflow. Se déclarent au plus près du besoin ; tout accorder par défaut est exactement ce que le bloc DevSecOps enseigne à ne pas faire. — [S10](/actions/secrets-variables)

**PlantUML** — Autre langage textuel de diagrammes, utilisé ici pour les cas d'utilisation que Mermaid ne sait pas produire. — [S24](/uml/)

**Polymorphisme** — Fait qu'un même appel produise un comportement différent selon le type réel de l'objet. C'est ce qui permet de supprimer les enchaînements de conditions sur un type. — [S28](/api-java/abstraction-polymorphisme)

**Protection de branche** — Règle empêchant d'écrire directement sur une branche : passage par Pull Request, CI verte, revue exigée. — [S3](/git-github/branches-pr)

**Pull Request** — Demande d'intégrer une branche dans une autre, assortie d'une discussion, d'une revue et de vérifications automatiques. — [S3](/git-github/branches-pr)

**`p-value`** — Probabilité d'observer un écart au moins aussi grand entre deux échantillons si leurs distributions étaient identiques. En dessous de 0,05, on conclut qu'elles diffèrent. — [MLOps](/aller-plus-loin/mlops)

**Pyramide des tests** — Répartition recommandée : beaucoup de tests unitaires rapides, moins de tests d'intégration, très peu de tests de bout en bout. — [S20](/qualite/)

## Q

**Quality gate** — Ensemble de conditions qu'un code doit remplir pour être intégré. Sa vertu tient à un seul point : elle **refuse**, elle ne se contente pas de signaler. — [S22](/qualite/analyse-statique)

## R

**Réalisation** — Relation entre une classe et l'interface qu'elle implémente. Se note par un trait **pointillé** terminé par un triangle creux, à distinguer de la généralisation. — [S28](/api-java/abstraction-polymorphisme)

**`record`** — Classe Java immuable et concise, dont l'égalité porte sur les valeurs. Adaptée aux objets qui n'ont pas d'identité propre, comme une adresse. — [S26](/api-java/modeliser-poo)

**Registre** — Serveur qui héberge des images de conteneurs et les distribue. — [S15](/conteneurs/publier-ghcr)

**REST** — Style d'architecture où l'on manipule des **ressources** identifiées par des URL, à l'aide des verbes du protocole HTTP. — [S29](/api-java/api-rest)

**Revue de code** — Lecture du code d'autrui avant intégration. Porte sur le texte produit, jamais sur la personne. — [S3](/git-github/branches-pr)

**Runner** — Machine qui exécute un job. Fournie par GitHub, ou hébergée par vous. — [S7](/actions/)

## S

**SAST** — Analyse statique orientée sécurité, cherchant dans le code des motifs de vulnérabilité connus. — [S18](/securite/codeql-secrets)

**Scan de secrets** — Détection de clés et de jetons dans le code et l'historique. Avec la protection à l'envoi, le secret est refusé **avant** d'entrer dans le dépôt. — [S18](/securite/codeql-secrets)

**Secret** — Valeur sensible stockée par GitHub, injectée à l'exécution et masquée dans les journaux. Un secret commité doit être considéré comme compromis et renouvelé. — [S10](/actions/secrets-variables)

**Seuil** — Valeur en deçà de laquelle la construction échoue. Ce n'est pas une vérité technique mais une **décision**, qui s'écrit et s'assume. — [S21](/qualite/couverture)

**SHA** — Empreinte identifiant de façon unique un commit. C'est ce qui permet de dire de quel code exact provient une image en circulation. — [S2](/git-github/bases-git)

**Spring Boot** — Framework Java qui prend en charge la configuration, le serveur web et l'injection de dépendances. Introduit ici **après** que les notions objet ont été écrites à la main. — [S25](/api-java/)

**Step (étape)** — Unité élémentaire d'un job : une commande, ou l'appel d'une action. — [S7](/actions/)

## T

**Tag (Git)** — Étiquette posée sur un commit, généralement pour marquer une version. — [S15](/conteneurs/publier-ghcr)

**Tag (image)** — Nom lisible pointant vers une image (`1.0.0`, `main`). Il peut être déplacé : seul le digest est stable. — [S15](/conteneurs/publier-ghcr)

**Test de bout en bout** — Test qui traverse toute l'application comme le ferait un utilisateur. Le plus proche du réel, le plus lent et le plus fragile — d'où sa rareté dans la pyramide. — [S20](/qualite/)

**Test d'intégration** — Test vérifiant que plusieurs composants fonctionnent ensemble. — [S20](/qualite/)

**Test unitaire** — Test d'une unité de code isolée de ses dépendances. Rapide, déterministe, exécuté à chaque commit. — [S20](/qualite/)

## U

**UML** — Notation graphique normalisée pour décrire un système. Dans ce cours, elle est écrite en texte, versionnée et relue en Pull Request, comme le code. — [S24](/uml/)

## V

**Variable (workflow)** — Valeur de configuration non sensible, visible dans les journaux. À distinguer d'un secret, qui, lui, est masqué. — [S10](/actions/secrets-variables)

**Visibilité** — Portée d'un membre d'une classe (`-` privé, `+` public, `#` protégé). En Java, la machine virtuelle l'applique réellement — ce qui n'est pas le cas de tous les langages. — [S26](/api-java/modeliser-poo)

## W

**Workflow** — Fichier YAML placé dans `.github/workflows/`, décrivant ce qui doit s'exécuter et à quelle occasion. — [S7](/actions/)

**`workflow_dispatch`** — Déclencheur manuel. Utile pour vérifier qu'un workflow existe bien, quand aucun événement ne le déclenche. — [S7](/actions/premier-workflow)

---

Un terme manque ? C'est un excellent sujet pour le [TP 0](/tp/tp0-contribuer).
