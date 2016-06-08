---
layout: services
title: Accès aux webservices
level: 2
order: 030200
api: services
---

# Gp.Services : Accès aux services de la plateforme Géoportail

On traite ici de la couche logicielle qui gère l'accès aux services de la plateforme Géoportail qui rentent dans la couverture fonctionnelle de ce document.

La mise en oeuvre de cette couche logicielle est effective et son utilisation est <a href="https://github.com/IGNF/geoportal-access-lib" target="_blank">décrite ici</a>.

## Principe Général

La Bibliothèque d'accès aux ressources du Géoportail offre pour chaque service une ou plusieurs fonctions qui permettent d'émettre des réquêtes, de réceptionner les réponses afin de pouvoir les exploiter.

Pour un service donné, l'utilisation de l'API se fera au travers d'une fonction statique dédiée ayant la signature globale suivante :

> Gp.Services.serviceOperation(options) ;

Où :

* « serviceOperation » correspond à l'opération du service que l'on veut invoquer (geocode,reverseGeocode, autocomplete, …) : les fonctions correspondantes seront détaillées dans les paragraphes suivants selon les webservices traités ;
* « options » est un objet javascript dont les propriétés sont les suivantes :


<a name="commonParams"></a>

Paramètre | Type | Opt. | Valeur
-|-|-|-|
apiKey | String ou Array(String) | Conditionnel | Clef d'accès à la plateforme Géoportail, nécessaire pour franchir la couche de contrôle des accès pour avoir une réponse du service invoqué. Dans le cas de l'invocation du service d'autoconfiguration, plusieurs clefs peuvent être passées. Si ce paramètre n'est pas renseigné, alors le paramètre serverUrl doit être renseigné (comprenant alors, si nécessaire la clef API).
serverUrl | String | Conditionnel | URL d'accès au service. Permet de forcer l'utilisation d'un service équivalent déployé derrière une éventuelle autre URL d'accès. Si ce paramètre est renseigné alors, le paramètre apiKey est ignoré.

**Paramètres optionnels permettant de jouer sur le protocole d'accès au service** 

Paramètre | Type | Opt. | Valeur
-|-|-|-|
protocol | String | Optionnel | Le protocole à utiliser pour récupérer les informations du service d'auto-configuration : peut valoir 'JSONP' ou 'XHR'. Par défaut, c'est le protocole JSONP qui sera utilisé. 
proxyURL | String | Optionnel | Le proxy à utiliser pour pallier au problème de cross-domain dans le cas d'une requête XHR. Utile si le paramètre 'protocol' vaut 'XHR', il ne sera pas pris en compte si protocol vaut 'JSONP'.
httpMethod | String | Optionnel | La méthode HTTP à utiliser dans le cas d'une requête XHR : peut valoir 'GET' ou 'POST'. Non pris en compte si 'protocol' vaut JSONP qui fonctionne obligatoirement en GET. Par défaut, c'est la méthode GET qui est utilisée.
timeOut | Number | Optionnel | Délai d'attente maximal (en ms) de la réponse du service (à partir de l'envoi de la requête). Par défaut, aucun timeOut n'est pris en compte (timeOut= 0).
rawResponse | Boolean | Optionnel | Indique si l'on souhaite que la réponse du service ne soit pas parsée par l'API avant d'être restituée. (Cf. paramètre « onSuccess » pour plus de détails).

**Fonctions de rappels**

Paramètre | Type | Opt. | Valeur
- |-|-|-|
onSuccess | Fonction | Optionnel | Fonction appelée lorsque le service répond correctement à la requête :(code HTTP 200, sans message d'erreur). Cette fonction prend en paramètre la réponse du service, soit sous la forme d'un Object Javascript formaté par le parseur dédié à la syntaxe du service (comportement par défaut) ; soit brute au format String non prétraité si le paramètre « rawResponse » a été précisé avec la valeur « true ».
onFailure | Fonction | Optionnel | Fonction appelée lorsque le service ne répond pas correctement (code HTTP de retour différent de 200 ou pas de réponse).

**Paramètres spécifiques à l'invocation du service :** Ces paramètres seront détaillés service par service dans les parties suivantes

Paramètre | Type | Opt. | Valeur
- |-|-|-|
propriété | ... | ... | ...

## Exemples d'utilisation

**Exemple 1 :** invocation classique d'un service avec une clef API :

```
Gp.Services.serviceOperation({
    apiKey : 'CLEF_API',
    onSuccess : function(response) {
        // exploitation de la reponse...
        (...)
    }
}) ;
```




