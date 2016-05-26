---
layout: ol3
title: Chargement de la configuration
level: 2
order: 000100
api: ol3
---

# Chargement de la configuration associée à votre clé de contrat

## Présentation générale

Afin d'utiliser certaines fonctionnalités de l'extension OL3 (notamment l'ajout simple de couche WMS ou WMTS), il est nécessaire de charger préalablement les paramètres de configuration associés à votre clé de contrat.

Pour cela, deux méthodes se présentent à l'utilisateur :
1. Récupération automatique de la configuration au chargement de la page, par le biais de la balise \<*script*\> de chargement de l'extension OL3.
2. Appel au service d'auto-configuration via la bibliothèque d'accès (embarquée dans l'Extension OL3)

## Méthode 1 : Récupération de la configuration au chargement de la page par l'Extension OL3

C'est la méthode que nous vous conseillons, car elle est plus simple à mettre en oeuvre.

### Mise en oeuvre

#### Interrogation du service d'auto-configuration

L'extension OL3 propose de récupérer, lors du chargement de la page, la configuration associée à la clé de contrat de l'utilisateur. Pour cela, il lui suffit simplement de renseigner sa clé dans la balise de chargement du fichier JavaScript contenant l'extension, de la manière suivante :

``` html
<script src="GpPluginOl3.js" data-key="CLEAPI"></script>
```

De cette manière, la configuration sera récupérée via le service d'auto-configuration des API du Géoportail.

#### Récupération d'un fichier d'auto-configuration local

L'utilisateur peut aussi spécifier une URL vers un fichier d'auto-configuration (chemin relatif vers un fichier en local par exemple) :

``` html
<script src="GpPluginOl3.js" data-url="config.js"></script>
```

Remarque : Le contenu du fichier doit être le contenu de la réponse à une requête du service d'auto-configuration, en JSONP et encapsulée dans une fonction *callback*, du type : "http://wxs.ign.fr/CLE/autoconf?output=json&callback=callback", le format peut être .js ou .json.

#### Paramètres possibles de la balise script :

Paramètre | Type | Opt. | Valeur
 -|-|-|-|
data-key  | String  | Optionnel   | Clé d'accès à la plateforme Géoportail (prise sur [professionnels.ign.fr](http://professionnels.ign.fr/api-web) )
data-url  | String  | Optionnel     | URL d'accès au service d'autoconfiguration (contenant la clé de contrat), ou chemin relatif vers un fichier d'auto-configuration stocké en local.
data-timeout | Object | Optionnel   | Délai d’attente maximal (en ms) de la réponse du service d'auto-configuration (à partir de l’envoi de la requête). Par défaut, aucun timeOut n’est pris en compte (timeOut= 0).

Remarque : si aucun des paramètres n'est ajouté à la balise \<*script*\>, l'extension OL3 se chargera normalement, mais la configuration ne sera pas récupérée : il sera alors nécessaire de la charger d'une autre manière, par exemple en utilisant la méthode 2 ci-dessous.

### Exemples d'utilisation

Récupération de la configuration au chargement de la page, en passant par le service d'auto-configuration des API du Géoportail :

``` html
<html>
    <head>
        <!-- Library OpenLayers 3 -->
        <link rel="stylesheet" href="ol.css" />
        <script src="ol.js"></script>
        <!-- Extension Géoportail pour OL3 -->
        <script src="GpPluginOl3.js" data-key="CLEAPI" data-timeout="10000"></script>
    </head>
    <body>
        <script>
            window.onload = function () {
                // utilisation de l'extension Géoportail pour OL3
            }
        </script>
    </body>
</html>
```

Récupération de la configuration au chargement de la page, à partir d'un fichier local :

``` html
<html>
    <head>
        <!-- Library OpenLayers 3 -->
        <link rel="stylesheet" href="ol.css" />
        <script src="ol.js"></script>
        <!-- Extension Géoportail pour OL3 -->
        <script src="GpPluginOl3.js" data-url="AutoConf.xml"></script>
    </head>
    <body>
        <script>
            window.onload = function () {
                // utilisation de l'extension Géoportail pour OL3
            }
        </script>
    </body>
</html>
```


## Méthode 2 : Appel au service d'auto-configuration via la bibliothèque d'accès

Cette méthode est une alternative à la précédente : vous utilisez une fonction proposée par la bibliothèque d'accès pour appeler le service d'auto-configuration du Géoportail.

### Mise en oeuvre

La [Bibliothèque d'accès](./../bibacces/presentation.html) aux services de la plateforme du Géoportail, embarquée dans l'Extension OL3, propose une fonction d'accès au service d'autoconfiguration du Géoportail :

``` javascript
Gp.Services.getConfig(options)
```

Vous pouvez choisir d'utiliser directement cette fonction dans votre script, avant d'utiliser les fonctionnalités de l'extension (ajout de couche simplifié, etc.) qui seront alors conditionnées à l'exécution de la fonction de rappel onSuccess passée en paramètres de Gp.Services.getConfig().

Pour plus de détails, consulter la [page de description de cette fonctionnalité](./../bibacces/dd_services_autoconf.html), ou [la documentation technique des paramètres du service](http://ignf.github.io/geoportal-access-lib/v1.0.0-beta.1/jsdoc/module-Services.html#~getConfig).


### Exemple d'utilisation

Utilisation simple de la fonction *Gp.Services.getConfig* :

``` html
<html>
    <head>
        <!-- Library OpenLayers 3 -->
        <link rel="stylesheet" href="ol.css" />
        <script src="ol.js"></script>
        <!-- Extension Géoportail pour OL3 -->
        <script src="GpPluginOl3.js"></script>
    </head>
    <body>
        <script>
            window.onload = function () {
                Gp.Services.getConfig({
                    apiKey: 'CLEAPI',
                    onSuccess: function (response) {
                        // utilisation de l'extension Géoportail pour OL3
                    }
                });
            }
        </script>
    </body>
</html>
```
