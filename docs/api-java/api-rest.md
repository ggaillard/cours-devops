# Exposer une API REST

::: info 🎯 Séance 27 · 2 h
À la fin de cette séance, vous savez :

- exposer un domaine objet derrière une API REST avec Spring Boot ;
- séparer entités et DTO, et dire pourquoi ;
- valider les entrées et renvoyer le bon code HTTP ;
- centraliser le traitement des erreurs.

**Prérequis :** [Abstraction, interfaces & polymorphisme](/api-java/abstraction-polymorphisme)

**Livrable attendu :** une API à quatre routes, testée au navigateur ou avec `curl`, gérant les erreurs proprement
:::

Le domaine est écrit et testé. Il ne sait rien du web — c'est voulu. On lui ajoute maintenant une **couche d'exposition**, sans jamais le modifier.

## L'architecture en couches

```
   Requête HTTP
        │
        ▼
   ┌──────────────────┐   Contrôleur : traduit HTTP ↔ objets
   │   Contrôleur     │   Ne contient AUCUNE règle métier
   └────────┬─────────┘
            ▼
   ┌──────────────────┐   Service : orchestre les règles
   │    Service       │   Ignore totalement HTTP
   └────────┬─────────┘
            ▼
   ┌──────────────────┐   Dépôt : accès aux données
   │  DepotInterventions │  (interface — séance 26)
   └──────────────────┘
```

La règle qui structure tout : **chaque couche ignore celle du dessus**. Le service ne sait pas qu'une requête HTTP existe ; le domaine ne sait pas qu'un service l'utilise. C'est ce qui permet de tester le métier sans serveur, et de remplacer l'API REST par une interface en ligne de commande sans rien réécrire.

## Mettre en place Spring Boot

Dans `pom.xml` :

```xml
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>4.1.0</version>
</parent>

<properties>
  <java.version>21</java.version>
</properties>

<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
  </dependency>
</dependencies>
```

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

```bash
mvn spring-boot:run
```

Dans un Codespace, le port 8080 est détecté automatiquement et un bandeau propose de l'ouvrir — exactement comme à la [séance 5](/codespaces/premier-codespace).

## Les DTO : ne jamais exposer ses entités

Un **DTO** (*Data Transfer Object*) est un objet dédié à l'échange avec l'extérieur.

```java
package fr.btssio.interventions.api;

import jakarta.validation.constraints.*;

/** Ce que le client envoie. */
public record CreerInterventionRequete(
        @NotBlank(message = "la référence est obligatoire")
        String reference,

        @NotBlank
        String identifiantClient,

        @NotNull @Pattern(regexp = "DEPANNAGE|MAINTENANCE|INSTALLATION")
        String type,

        @Positive(message = "la durée doit être positive")
        double heures,

        @PositiveOrZero
        double coutMateriel
) {}

/** Ce que l'API renvoie. */
public record InterventionReponse(
        String reference,
        String libelle,
        String client,
        double cout
) {
    public static InterventionReponse depuis(Intervention i) {
        return new InterventionReponse(
                i.reference(), i.libelle(), i.client().nom(), i.cout());
    }
}
```

Pourquoi ne pas sérialiser directement `Intervention` ?

| Risque | Conséquence |
| --- | --- |
| **Fuite de données** | Un champ interne ajouté un jour part en clair dans les réponses |
| **Couplage** | Renommer un champ du domaine casse tous les clients de l'API |
| **Entrées non maîtrisées** | Un client pourrait imposer des valeurs à des champs qui ne le regardent pas |

::: danger Le cas d'école
Ajoutez `motDePasse` à une entité `Utilisateur` sérialisée directement, et il se retrouve dans chaque réponse JSON. C'est une classe de fuite parfaitement réelle — et parfaitement évitable avec un DTO qui n'expose que ce qui est destiné à sortir.
:::

## Le contrôleur

```java
package fr.btssio.interventions.api;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/interventions")
public class InterventionControleur {

    private final ServiceIntervention service;

    public InterventionControleur(ServiceIntervention service) {   // injection
        this.service = service;
    }

    @GetMapping("/{reference}")
    public InterventionReponse consulter(@PathVariable String reference) {
        return InterventionReponse.depuis(service.parReference(reference));
    }

    @GetMapping
    public List<InterventionReponse> lister(@RequestParam String client) {
        return service.parClient(client).stream()
                .map(InterventionReponse::depuis)
                .toList();
    }

    @PostMapping
    public ResponseEntity<InterventionReponse> creer(
            @Valid @RequestBody CreerInterventionRequete requete) {

        var creee = service.creer(requete);
        return ResponseEntity
                .created(URI.create("/api/interventions/" + creee.reference()))
                .body(InterventionReponse.depuis(creee));
    }

    @GetMapping("/chiffre-affaires")
    public double chiffreAffaires(@RequestParam String client) {
        return service.chiffreAffairesClient(client);
    }
}
```

Deux points à souligner :

- **Le constructeur reçoit le service.** Spring l'injecte automatiquement — c'est exactement l'inversion de dépendance de la séance précédente, prise en charge par le conteneur. Rien de magique : le mécanisme est celui que vous avez écrit à la main.
- **Aucune règle métier ici.** Le contrôleur traduit HTTP vers des objets et retour. Si vous y voyez un calcul, il est mal placé.

## Les codes HTTP

Le code de retour fait partie du contrat de l'API. L'utiliser correctement évite d'inventer une convention maison.

| Code | Quand | Ici |
| --- | --- | --- |
| **200** OK | Lecture réussie | `GET` |
| **201** Created | Création réussie | `POST`, avec l'en-tête `Location` |
| **204** No Content | Succès sans corps | `DELETE` |
| **400** Bad Request | Requête mal formée | validation en échec |
| **404** Not Found | Ressource inexistante | référence inconnue |
| **409** Conflict | Conflit d'état | référence déjà utilisée |
| **500** Server Error | Bug côté serveur | jamais volontairement |

::: warning L'erreur classique
Renvoyer `200 OK` avec un corps `{"erreur": "introuvable"}`. Le client doit alors analyser le corps pour savoir si sa requête a réussi — chaque client réinvente cette logique, et les outils intermédiaires (caches, supervision) sont trompés. Le code HTTP **est** le résultat.
:::

## Traiter les erreurs en un seul endroit

Sans configuration, une exception métier produit un `500`, ce qui est faux : la requête était invalide, pas le serveur.

```java
package fr.btssio.interventions.api;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GestionnaireErreurs {

    public record Probleme(Instant horodatage, int statut, String message, Object details) {}

    @ExceptionHandler(InterventionIntrouvableException.class)
    public ResponseEntity<Probleme> introuvable(InterventionIntrouvableException e) {
        return reponse(HttpStatus.NOT_FOUND, e.getMessage(), null);
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Probleme> conflit(IllegalStateException e) {
        return reponse(HttpStatus.CONFLICT, e.getMessage(), null);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Probleme> requeteInvalide(IllegalArgumentException e) {
        return reponse(HttpStatus.BAD_REQUEST, e.getMessage(), null);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Probleme> validation(MethodArgumentNotValidException e) {
        var champs = e.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(
                        f -> f.getField(), f -> f.getDefaultMessage(), (a, b) -> a));
        return reponse(HttpStatus.BAD_REQUEST, "requête invalide", champs);
    }

    private ResponseEntity<Probleme> reponse(HttpStatus statut, String message, Object details) {
        return ResponseEntity.status(statut)
                .body(new Probleme(Instant.now(), statut.value(), message, details));
    }
}
```

Une seule classe traduit **toutes** les exceptions du domaine en réponses HTTP. Les contrôleurs restent propres, et le format d'erreur est uniforme sur toute l'API.

## Essayer l'API

```bash
# Créer — 201 attendu
curl -i -X POST http://localhost:8080/api/interventions \
  -H "Content-Type: application/json" \
  -d '{"reference":"I1","identifiantClient":"C1","type":"DEPANNAGE","heures":2,"coutMateriel":0}'

# Consulter — 200
curl http://localhost:8080/api/interventions/I1

# Introuvable — 404
curl -i http://localhost:8080/api/interventions/INCONNUE

# Durée négative — 400 avec le détail du champ fautif
curl -i -X POST http://localhost:8080/api/interventions \
  -H "Content-Type: application/json" \
  -d '{"reference":"I2","identifiantClient":"C1","type":"DEPANNAGE","heures":-5,"coutMateriel":0}'
```

Vérifiez systématiquement le **code de retour** (`-i`), pas seulement le corps.

---

## Auto-évaluation

Répondez de mémoire avant de déplier la correction.

::: details 1. Pourquoi ne pas renvoyer directement l'entité `Intervention` en JSON ?
Pour trois raisons cumulées. Un champ interne ajouté plus tard partirait automatiquement dans les réponses — c'est le mécanisme classique de fuite de données. Renommer un champ du domaine casserait tous les clients de l'API. Et l'entité contient des références vers d'autres objets qui n'ont rien à faire dans une réponse. Le DTO découple le contrat public du modèle interne.
:::

::: details 2. Quelle différence entre 400, 404 et 409 ?
**400** : la requête est mal formée — champ manquant, durée négative. **404** : la requête est correcte mais la ressource n'existe pas. **409** : la requête est correcte, la ressource existe, mais l'opération contredit l'état actuel — créer une intervention dont la référence est déjà prise. Le client ne réagit pas de la même façon aux trois : corriger la saisie, changer d'URL, ou choisir une autre référence.
:::

::: details 3. À quoi sert `@RestControllerAdvice` ?
À centraliser la traduction exception → réponse HTTP pour tous les contrôleurs. Sans elle, chaque méthode devrait attraper ses exceptions et construire sa réponse : code dupliqué, formats d'erreur divergents, et un oubli garanti quelque part. Avec elle, les contrôleurs se limitent au cas nominal et le format d'erreur est uniforme.
:::

**Critères de réussite de la séance**

- ☐ aucune règle métier dans le contrôleur
- ☐ entités et DTO sont des classes distinctes
- ☐ les quatre codes 200, 201, 400 et 404 sont observables avec `curl -i`
- ☐ une erreur de validation indique le champ fautif

Il reste à tester tout cela : [Tester l'API](/api-java/tester-api).
