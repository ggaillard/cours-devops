# Pourquoi le tout-en-ligne ?

Ce cours fait un choix assumé : **tout se passe dans le navigateur et sur GitHub**. Aucune machine virtuelle à installer, aucun serveur à louer, aucun logiciel à configurer sur son poste.

## Les avantages pédagogiques

- **Zéro friction de démarrage.** Pas d'heure perdue à installer Docker, configurer un hyperviseur ou déboguer une VM. On se concentre sur les concepts.
- **Environnement identique pour tous.** Le même bouton donne à chaque étudiant exactement la même configuration. Fini le « ça marche sur ma machine ».
- **Accessible partout.** Depuis un PC de la salle, un portable, ou même une tablette : il suffit d'un navigateur et d'une connexion.
- **Reproductible et versionné.** L'environnement (Codespaces, workflows) est décrit par des fichiers dans le dépôt : on peut le recréer à l'identique.
- **Gratuit pour l'éducation.** GitHub propose des quotas généreux, et le [GitHub Student Developer Pack](https://education.github.com/pack) débloque encore plus de ressources.

## Ce que l'on remplace

| Approche classique (locale) | Équivalent en ligne (ce cours) |
| --- | --- |
| VM Debian / VirtualBox | [GitHub Codespaces](/codespaces/) |
| Serveur Web à administrer | [GitHub Pages](/pages/) |
| Jenkins / GitLab CI auto-hébergé | [GitHub Actions](/actions/) |
| Registre Docker privé local | [GitHub Container Registry (GHCR)](/conteneurs/) |
| Outils de scan installés | [Dependabot / CodeQL](/securite/) |

## Les limites à connaître

Le tout-en-ligne a aussi ses contraintes, qu'un professionnel doit connaître :

- **Dépendance à un fournisseur.** On mise ici sur l'écosystème GitHub ; les concepts restent transférables (GitLab, Azure DevOps… reposent sur les mêmes idées).
- **Quotas.** Les minutes d'Actions et les heures de Codespaces sont limitées sur les comptes gratuits. On apprend donc à être efficace.
- **Connexion requise.** Tout repose sur Internet.

> Ces limites sont réelles, mais pour **apprendre** le DevOps, le tout-en-ligne offre le meilleur rapport temps-passé / concepts-appris.

Passez à la suite : [Le parcours recommandé](/introduction/parcours).
