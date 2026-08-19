# Quand ça ne marche pas

::: tip 🧭 Page de référence — hors progression
Cette page ne se lit pas d'un bout à l'autre. On y vient avec un message d'erreur, on cherche le sien, on repart.

Chaque entrée suit le même ordre : **ce que vous voyez**, **pourquoi**, **quoi faire**. Les messages sont reproduits tels qu'ils apparaissent réellement — cherchez-en un fragment avec <kbd>Ctrl</kbd>+<kbd>F</kbd>.
:::

::: warning Le réflexe qui résout la moitié des cas
Lisez le message **en entier**, jusqu'à la dernière ligne. Les outils de cette chaîne disent presque toujours ce qui ne va pas — c'est l'habitude de ne pas les lire qui coûte du temps, pas leur obscurité.
:::

## GitHub Actions

::: details Rien ne se passe : aucun workflow ne démarre
**Il n'y a pas de message d'erreur** — c'est ce qui rend le cas déroutant. L'onglet Actions reste vide.

**Causes, par fréquence :**

1. Le fichier n'est pas dans `.github/workflows/`. Un fichier dans `.github/` ou dans `workflows/` à la racine est ignoré en silence.
2. L'extension est `.yaml` ou `.yml` — les deux marchent — mais le fichier est dans un sous-dossier de `workflows/`, ce qui ne marche pas.
3. Le déclencheur ne correspond pas : `on: push: branches: [main]` alors que vous poussez sur `feat/…`.
4. Le workflow n'existe que sur votre branche **et** son déclencheur ne concerne que `main`.

**À faire :** vérifiez l'emplacement exact du fichier depuis l'interface GitHub, puis relisez le bloc `on:`. En dernier recours, ajoutez `workflow_dispatch:` et lancez-le à la main : s'il apparaît alors dans Actions, le problème est bien le déclencheur.
:::

::: details `Invalid workflow file` — erreur de syntaxe YAML
```text
Invalid workflow file: .github/workflows/ci.yml#L14
You have an error in your yaml syntax on line 14
```

**Cause :** presque toujours l'indentation. YAML n'accepte **que des espaces** — une tabulation invalide le fichier. Les deux fautes classiques : `steps:` au même niveau que `runs-on:` alors qu'il doit lui être aligné, et `- uses:` décalé d'un espace par rapport aux autres `-`.

**À faire :** ouvrez le fichier dans VS Code avec l'extension YAML — l'erreur est signalée avant le push. Sinon, vérifiez localement :

```bash
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/ci.yml'))"
```

C'est exactement ce que fait la CI de ce cours ([séance 8](/actions/integration-continue)).
:::

::: details `Error: Process completed with exit code 1.`
**Cause :** ce n'est pas l'erreur, c'est sa **conséquence**. Une commande de l'étape a rendu un code non nul, et Actions s'arrête.

**À faire :** dépliez l'étape en rouge et remontez **au-dessus** de cette ligne. La vraie erreur est là — un test en échec, une commande introuvable, un fichier absent. Ne cherchez pas à comprendre `exit code: 1` : c'est du bruit.
:::

::: details `Resource not accessible by integration`
**Cause :** le jeton `GITHUB_TOKEN` n'a pas la permission de faire ce que le workflow demande — écrire un commentaire, pousser un tag, publier un paquet. Depuis 2023, ce jeton est **en lecture seule par défaut**.

**À faire :** déclarez explicitement le besoin dans le workflow, au plus près :

```yaml
permissions:
  contents: read
  packages: write     # uniquement si vous publiez une image
```

Déclarer `permissions: write-all` fonctionne aussi — et c'est exactement ce que le [bloc DevSecOps](/securite/) vous demande de ne pas faire.
:::

::: details Un secret apparaît en clair dans les journaux
**Cause :** le secret a été écrit dans une commande (`echo $MON_SECRET`) ou construit par concaténation, ce qui contourne le masquage automatique.

**À faire :** considérez ce secret comme **compromis** et renouvelez-le immédiatement. Le masquer après coup ne sert à rien : les journaux et l'historique sont déjà lisibles par qui a accès au dépôt. Voir [séance 10](/actions/secrets-variables).
:::

## GitHub Pages

::: details `Get Pages site failed` au déploiement
Le job de déploiement échoue avec un message évoquant l'impossibilité de trouver le site Pages.

**Cause :** dans `Settings → Pages`, la source n'est pas réglée sur **GitHub Actions**. Aucun fichier du dépôt ne peut faire ce réglage — c'est un clic dans l'interface, et il est oublié une fois sur deux.

**À faire :** `Settings → Pages → Build and deployment → Source = GitHub Actions`, puis relancez le workflow.
:::

::: details Le site s'affiche sans style, ou tous les liens sont en 404
**Cause :** la `base` ne correspond pas à l'URL de publication. Sur un site « projet », l'adresse est `https://<compte>.github.io/<depot>/` : le générateur doit le savoir, sinon il fabrique des chemins qui pointent à la racine du domaine.

**À faire :** dans `docs/.vitepress/config.mjs`, `base` doit valoir `/<nom-du-depot>/`, barres obliques comprises. Voir [séance 12](/pages/deployer-site).
:::

::: details Le déploiement est vert mais le site affiche l'ancienne version
**Cause :** le cache du navigateur, ou le CDN de GitHub, dans les minutes qui suivent.

**À faire :** rechargez en ignorant le cache (<kbd>Ctrl</kbd>+<kbd>Maj</kbd>+<kbd>R</kbd>), ou ouvrez le site en navigation privée. Si l'ancienne version persiste au-delà de quelques minutes, vérifiez que le déploiement porte bien sur le commit attendu.
:::

## Conteneurs et GHCR

::: details `denied: permission_denied` au moment du `docker push`
**Cause :** le workflow n'a pas la permission d'écrire des paquets, ou l'authentification au registre n'a pas eu lieu.

**À faire :** deux éléments sont nécessaires ensemble —

```yaml
permissions:
  contents: read
  packages: write
```

et l'étape de connexion :

```yaml
- uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}
```

Voir [séance 15](/conteneurs/publier-ghcr).
:::

::: details L'image est publiée mais reste introuvable pour les autres
**Cause :** un paquet GHCR est **privé par défaut**, même sur un dépôt public.

**À faire :** ouvrez le paquet dans l'onglet Packages, puis `Package settings → Change visibility → Public`. Pensez aussi à le rattacher au dépôt (`Connect repository`) pour que le lien apparaisse des deux côtés.
:::

::: details `failed to solve: process "/bin/sh -c …" did not complete successfully`
**Cause :** une commande a échoué **à l'intérieur** de la construction de l'image. Le message donne l'instruction fautive et son code de sortie.

**À faire :** remontez dans les journaux jusqu'à la sortie de cette commande. La cause la plus fréquente en cours : un fichier attendu par le `Dockerfile` est exclu par le `.dockerignore`, donc absent du contexte de construction.
:::

::: details L'image finale pèse beaucoup plus lourd que prévu
**Cause :** la chaîne de construction est restée dans l'image livrée — JDK complet, Maven, sources, cache de dépendances.

**À faire :** construction en deux étapes. La première compile, la seconde ne copie que l'artefact produit et repose sur une image d'exécution minimale. Le facteur est de l'ordre de trois ([séance 14](/conteneurs/build-image)).
:::

## Qualité et tests

::: details La CI échoue sur la couverture alors que tous les tests passent
Un message de la forme :

```text
Rule violated for bundle api-interventions: lines covered ratio is 0.62,
but expected minimum is 0.80
```

**Cause :** ce n'est pas un bug, c'est le **comportement voulu**. Le seuil est bloquant : le code compile, les tests passent, mais la part de code vérifiée est jugée insuffisante.

**À faire :** écrivez les tests manquants — pas de tests qui appellent le code sans rien vérifier, ce qui ferait monter le chiffre sans rien prouver. Baisser le seuil est une décision, pas un correctif : elle se discute en revue et s'écrit ([séance 21](/qualite/couverture)).
:::

::: details Les tests passent chez moi et échouent dans la CI
**Causes, par fréquence :**

1. Une version différente de Java ou de Node entre votre machine et le workflow.
2. Un fichier non commité — le test dépend de quelque chose que vous seul possédez.
3. Un test dépendant de l'ordre d'exécution, ou de l'horloge, ou du fuseau horaire.
4. Une casse de nom de fichier : Windows ne distingue pas `Client.java` de `client.java`, Linux si.

**À faire :** la CI a raison — c'est un environnement propre, le vôtre ne l'est pas. Reproduisez dans un [Codespace](/codespaces/) plutôt que de chercher à convaincre le pipeline.
:::

## Git

::: details `Updates were rejected because the remote contains work that you do not have locally`
**Cause :** quelqu'un — ou vous, depuis l'interface web — a poussé entre-temps. Votre historique local n'est plus un descendant du distant.

**À faire :** `git pull --rebase` puis `git push`. **Jamais** `git push --force` sur une branche partagée : vous effaceriez le travail d'autrui ([séance 3](/git-github/branches-pr)).
:::

::: details `fatal: Unable to create '.git/index.lock': File exists.`
**Cause :** un processus Git précédent s'est interrompu et a laissé son verrou, ou un outil graphique (VS Code, GitHub Desktop) tient le dépôt en ce moment même.

**À faire :** vérifiez qu'aucune commande Git ne tourne, puis supprimez le fichier `.git/index.lock`. Si le problème revient à chaque commande, c'est qu'un outil ouvert en arrière-plan garde la main.
:::

::: details Un fichier volumineux ou un secret est déjà commité
**Cause :** Git conserve **tout l'historique**. Supprimer le fichier dans un commit suivant ne l'enlève pas des commits antérieurs, ni des clones déjà faits.

**À faire :** pour un secret, renouvelez-le — c'est la seule mesure qui protège vraiment. Pour un fichier volumineux, réécrire l'historique est possible mais lourd et casse tous les clones : sur un dépôt de TP, repartir d'un dépôt propre coûte moins cher. Ajoutez le motif au `.gitignore` **avant** de recommencer.
:::

## Codespaces

::: details Le Codespace refuse de démarrer, ou s'arrête tout seul
**Causes :** quota mensuel épuisé, ou arrêt automatique après inactivité (comportement normal, le contenu est conservé).

**À faire :** consultez votre consommation dans `Settings → Billing → Codespaces`. Supprimez les Codespaces inutilisés — ils consomment du stockage même à l'arrêt. Sur un dépôt **public**, les minutes d'Actions sont gratuites, mais **pas** celles de Codespaces : les deux quotas sont distincts.
:::

::: details Une modification du Dev Container n'a aucun effet
**Cause :** `devcontainer.json` n'est lu qu'à la construction du conteneur. Le modifier dans un Codespace déjà démarré ne change rien.

**À faire :** palette de commandes → **Rebuild Container**. Comptez quelques minutes ([séance 6](/codespaces/dev-containers)).
:::

## Le site du cours lui-même

::: details `[vitepress] 1 dead link(s) found.`
Le build affiche d'abord la ligne utile :

```text
(!) Found dead link /nexistepas in file index.md
```

**Cause :** un lien interne pointe vers une page inexistante. Ce cours règle volontairement `ignoreDeadLinks: false` : un lien mort **fait échouer la CI**, parce qu'un cours qui renvoie dans le vide est un cours faux.

**À faire :** corrigez le lien. Les chemins internes commencent par `/` et **n'incluent pas** l'extension `.md`.
:::

::: details Un diagramme s'affiche en texte brut au lieu d'un schéma
**Causes possibles :**

1. Le rendu Mermaid se fait **dans le navigateur** : un aperçu sans JavaScript ou un cache périmé affiche la source. Rechargez sans cache.
2. Le bloc n'est pas ouvert par <code>&#96;&#96;&#96;mermaid</code> exactement.
3. Le diagramme comporte une faute de syntaxe.

**À faire :** lancez l'analyse hors navigateur :

```bash
npm run verifier:diagrammes
```

Elle indique le fichier, le rang du diagramme et la ligne fautive :

```text
Parse error on line 4:
...0..*" Intervention
---------------------^
Expecting 'STRUCT_STOP', 'MEMBER', got 'EOF_IN_STRUCT'
```

Ici, une accolade de classe n'a jamais été refermée.
:::

::: details `npm ci` refuse de s'exécuter
```text
npm error `npm ci` can only install packages when your package.json and
package-lock.json or npm-shrinkwrap.json are in sync.
npm error Missing: left-pad@1.3.0 from lock file
```

**Cause :** `package.json` a été modifié à la main sans régénérer le verrou. `npm ci` refuse par principe de deviner — c'est ce qui garantit qu'une installation en CI est identique à la vôtre.

**À faire :** `npm install` en local, puis **commitez le `package-lock.json`**. Ce fichier n'est pas un déchet de génération : c'est lui qui rend la construction reproductible.
:::

## Ce que vous ferez de cette page

Tenez-en une version de classe. Chaque panne rencontrée en TP y a sa place : le message exact, la cause, le correctif. C'est le même geste que le [journal des incidents](/deploiement/) en production — et la matière la plus utile que produira l'année.

::: tip Une panne bien décrite vaut une contribution
Une erreur rencontrée en TP et absente de cette page est un excellent sujet d'issue, puis de Pull Request sur le dépôt du cours. Voir [le TP 0](/tp/tp0-contribuer).
:::
