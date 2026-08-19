# TP 5 — Livrer l'API par le pipeline

::: info 🎯 Séance 32 · 2 h
À la fin de cette séance, vous savez :

- enchaîner qualité, construction d'image et publication dans un seul pipeline ;
- conteneuriser une application Java en image légère ;
- démontrer que rien n'est publié si la qualité n'est pas au rendez-vous.

**Prérequis :** [Tester l'API](/api-java/tester-api), [Publier sur GHCR](/conteneurs/publier-ghcr)

**Livrable attendu :** une image `ghcr.io/…/api-interventions` publiée par la CI, exécutable en une commande
:::

**Objectif** : faire parcourir à l'API toute la chaîne montée depuis la séance 7. C'est l'aboutissement du cours — plus aucune notion nouvelle, uniquement de l'assemblage.

## Étape 1 — Vérifier le point de départ

Sur votre dépôt `api-interventions`, contrôlez que `mvn verify` :

- compile le projet,
- exécute les trois niveaux de tests,
- échoue si la couverture passe sous les seuils JaCoCo.

Si l'une des trois n'est pas vraie, réglez-la avant de continuer. Le reste du TP en dépend.

## Étape 2 — Le Dockerfile multi-étapes

À la racine :

```dockerfile
# syntax=docker/dockerfile:1

# ── Étape 1 : construire ────────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /build

# Les dépendances d'abord : tant que le pom ne change pas, cette
# couche est réutilisée telle quelle (cf. séance 14).
COPY pom.xml .
RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B clean package -DskipTests

# ── Étape 2 : exécuter ──────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

# Ne jamais exécuter en root
RUN addgroup -S app && adduser -S app -G app
USER app

COPY --from=build /build/target/*.jar application.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/application.jar"]
```

Et `.dockerignore` :

```text
target
.git
.github
*.md
```

::: tip Pourquoi deux étapes
L'image de construction (Maven + JDK complet) pèse près de 600 Mo. L'image finale ne garde qu'un **JRE** et le `.jar` : moins de 200 Mo. Tout ce qui a servi à construire — le compilateur, les sources, le dépôt Maven local — reste derrière. Moins de poids, et surtout moins de surface exposée.
:::

Notez `-DskipTests` dans le Dockerfile : les tests tournent dans le job de qualité, pas ici. Les rejouer doublerait le temps de construction sans rien apporter.

## Étape 3 — Le pipeline complet

`.github/workflows/livraison.yml` :

```yaml
name: Livraison de l'API

on:
  push:
    branches: [main]
    tags: ['v*']
  pull_request:

permissions:
  contents: read
  packages: write

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  qualite:
    name: Qualité
    runs-on: ubuntu-latest
    strategy:
      matrix:
        java: ['21', '25']
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: ${{ matrix.java }}
          cache: 'maven'

      - name: Tests et couverture
        run: mvn -B verify

      - name: Conserver le rapport JaCoCo
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: jacoco-java-${{ matrix.java }}
          path: target/site/jacoco/

  publier:
    name: Publier l'image
    needs: qualite                                    # ← le verrou
    if: github.event_name == 'push'                   # jamais depuis une PR
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Connexion à GHCR
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Tags et labels
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=semver,pattern={{version}}
            type=sha,format=short

      - name: Construire et publier
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

Deux lignes portent tout le sens de ce TP :

- **`needs: qualite`** — la publication n'a lieu que si les deux versions de Java sont vertes **et** que la couverture tient. Une image cassée ne peut pas atteindre le registre.
- **`if: github.event_name == 'push'`** — on vérifie sur les Pull Requests, mais on ne publie que depuis `main` ou un tag. Une PR venant d'un fork ne doit jamais pouvoir pousser une image.

## Étape 4 — Prouver que le verrou fonctionne

C'est l'étape à ne pas sauter.

1. Créez une branche `casse-la-couverture`.
2. Ajoutez une méthode publique non testée dans le service, par exemple :

```java
    public double remiseFidelite(String idClient, int anciennete) {
        if (anciennete > 10) return 0.20;
        if (anciennete > 5)  return 0.10;
        if (anciennete > 2)  return 0.05;
        return 0;
    }
```

3. Poussez et ouvrez une PR : `mvn verify` échoue sur JaCoCo (quatre branches non couvertes).
4. Vérifiez dans l'onglet Actions que le job **publier** n'a **pas** démarré.
5. Ajoutez les tests des quatre cas, poussez : la CI repasse au vert.
6. Fusionnez : cette fois, l'image est publiée.

## Étape 5 — Récupérer et exécuter l'image

Rendez l'image publique (**Packages → Package settings → Change visibility**), puis, sur toute machine dotée d'un moteur de conteneurs :

```bash
docker run --rm -p 8080:8080 ghcr.io/VOTRE-COMPTE/api-interventions:main

curl -i http://localhost:8080/api/interventions/I1
```

## Étape 6 — Versionner

```bash
git tag v1.0.0
git push origin v1.0.0
```

Le workflow republie l'image sous `1.0.0`. Vous savez désormais, pour toute image en circulation, de quel commit elle provient.

## Ce qu'il faut rendre

- Lien du dépôt public.
- La PR de l'étape 4 : capture montrant `qualite` en **rouge** et `publier` **non exécuté**, puis la même PR en vert.
- Lien de l'image dans **Packages**, avec au moins `main` et `1.0.0`.
- La sortie de `docker run` suivie d'un `curl` réussi.
- Les deux rapports JaCoCo (Java 21 et 25) téléchargés depuis les artefacts.

## Pour aller plus loin

- Ajoutez [CodeQL](/securite/codeql-secrets) sur `java` — l'analyse comprend le langage.
- Ajoutez un `HEALTHCHECK` au Dockerfile en exposant `/actuator/health`.
- Déployez l'image vers un hébergeur en ligne avec un [environnement à approbation](/deploiement/).

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Pourquoi `-DskipTests` dans le Dockerfile alors qu'on insiste tant sur les tests ?
Parce que les tests ont déjà tourné dans le job `qualite`, sur deux versions de Java, avec contrôle de couverture. Les rejouer pendant la construction de l'image doublerait la durée sans rien vérifier de plus — et le `needs: qualite` garantit déjà qu'aucune image n'est construite à partir d'un code non validé.
:::

::: details 2. Que se passerait-il sans `if: github.event_name == 'push'` ?
Chaque Pull Request publierait une image sur GHCR. Le registre se remplirait de versions intermédiaires, et surtout une PR venant d'un fork pourrait pousser une image sous votre nom. La vérification tourne sur les PR, la publication n'a lieu que depuis une branche du dépôt.
:::

::: details 3. Pourquoi deux étapes dans le Dockerfile plutôt qu'une seule ?
Pour ne pas embarquer la chaîne de construction dans l'image livrée. L'étape de build a besoin de Maven, du JDK complet et des sources ; l'exécution n'a besoin que d'un JRE et d'un `.jar`. On passe d'environ 600 Mo à moins de 200 Mo, avec une surface d'attaque réduite d'autant — plus de compilateur ni de code source dans le conteneur qui tourne en production.
:::

**Critères de réussite de la séance**

- ☐ le job `publier` ne démarre pas quand `qualite` échoue
- ☐ l'image finale pèse moins de 250 Mo
- ☐ le conteneur ne s'exécute pas en `root`
- ☐ deux tags coexistent et pointent vers la même construction
- ☐ `docker run` puis `curl` répondent sur une machine autre que la vôtre

Félicitations : votre code applicatif traverse désormais la chaîne complète, de l'objet métier jusqu'au conteneur publié. 🎉
