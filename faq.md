---
layout: faq
title: Foire Aux Questions
level: 1
order: 000000
api: faq
---

# Foire Aux Questions

[Questions sur les nouveaux éléments](#APIv3)

[Questions sur les APIS actuelles : dépréciation](#APIv2-deprecated)

[Questions sur le passage des APIS actuelles vers les nouveaux éléments](#APIv2-migration)

[Obtenir de l'aide](#help)



<a id="APIv3"/>

## Questions sur les nouveaux éléments


### Quand arriveront les nouveaux éléments promis ?

La bibliothèque d'accès arrivera au **premier trimestre 2016**.

Les extensions pour Leaflet et OpenLayers 3 arriveront au **deuxième trimestre 2016**.

Le kit de développement arrivera au **deuxième trimestre 2016**.

### Comment serai-je averti de l'arrivée des nouveaux éléments ?

Chaque mise à disposition d'un nouvel élément sera annoncée :


* sur le [blog du site api.ign.fr](http://api.ign.fr/blog).

* sur la [disucussion dédiée du forum developpez.net](http://www.developpez.net/forums/d1531763/applications/sig-systeme-d-information-geographique/ign-api-geoportail/mise-place-d-api-v3/) où vous pouvez aussi poser des questions.

* En suivant le compte [Twitter du Géoportail](https://twitter.com/geoportail)


### Quelle est la licence d'utilisation des éléments proposées ?

Les différents éléments proposés (bibliothèque d'accès, extensions et kit de développement) seront proposés sous [licence OpenSource CECILL-B](http://www.cecill.info/licences/Licence_CeCILL-B_V1-fr.html) qui autorise toute ré-utilsation dans un cadre privé ou public, sans aucune contrainte, si ce n'est de citation. Il s'agit d'une adapatation à la législation française des licences de type BSD, Apache, MIT ou autres du même style.


### Recommendez vous Leaflet ou OpenLayers 3 ?

Nous ne privilégions aucun outil, le choix de l'un ou de l'autre dépend de votre besoin. 

Les extensions Géoportail proposées vous permettront, quelque soit votre choix, d'utiliser aisément les données du Géoportail avec l'une ou l'autre des bibliothèques.


### Comment choisir entre les différents éléments à utiliser ?

Si vous utilisez déjà ou êtes familiers avec Leaflet ou OpenLayers 3, ne changez rien, vous pouvez utiliser les extensions correspondantes en complément de ces bibliothèques.

Si vous utilisez ou êtes familiers avec une autre bibliothèque cartographique, la bibliothèque d'accès peut vous permettre d'accéder plus facilement aux ressources du Géoportail.

Si vous n'êtes familiers avec aucune bibliothèque cartographique et que vous souhaitez utiliser les ressources du Géoportail, le kit de développement vous offre une solution tout en un intégrant OpenLayers 3 et son extension. 


### Que se passera-t-il quand OpenLayers ou Leaflet évolueront ?

Les extensions évolueront si nécessaire de façon à être compatibles avec les nouvelles versions mineures de ces bibliothèques tout en gardant une compatibilité avec les anciennes versions.



<a id="APIv2-deprecated"/>

## Questions sur les APIs actuelles : dépréciation

### Pourquoi arrêtez vous les API Géoportail actuelles ?

Ce changement est du aux évolutions du web :

* l'API Géoportail Flash devient obsolète de fait avec l'abandon progressif de la technologie Flash par les navigateurs

* l'API Géoportail JavaScript repose sur le projet open source **OpenLayers 2** 
qui a arrêté d'évoluer depuis 3 ans au profit du projet **OpenLayers 3** qui en est une ré-écriture complète sans compatibilité d'interface. Il fallait donc entreprendre une refonte majeure de notre API pour pouvoir suivre ces évolutions et rester compatible avec les évolutions des navigateurs.



### Mon application utilise le Géoportail. Que se passera-t-il après le 30 juin 2017 ?

Rien de spécial. Les données seront toujours diffusées selon les mêmes services web et le code de l'API Géoportail JavaScript actuelle continuera de fonctionner comme avant. Seulement, l'IGN n'assurera plus la garantie de fonctionnement de ce code. 

Concrètement : Les équipes de support de l'IGN ne proposeront pas de patchs correctifs ni d'analyses particulières sur des applications utilisant encore les API Géoportail actuelles.  

### Peut-on rester sur la configuration actuelle sans être impacté ?

Oui. La seule différence est qu'à partir du troisième trimestre 2017, l'IGN n'assurera plus la garantie de fonctionnement du code de l'API Géoportail JavaScript actuelle. Pour des applications utilisant l'API Géoportail Flash, l'arrêt de garantie prendra effet dès le deuxième trimestre 2016.

Concrètement : Les équipes de support de l'IGN ne proposeront pas de patchs correctifs ni d'analyses particulières sur des applications utilisant encore les API Géoportail actuelles à partir des dates annoncées.


### Est-ce que l'API actuelle arrêtera de fonctionner ?

Non. A partir du troisième trimestre 2017, l'IGN n'assurera plus la garantie de fonctionnement du code de l'API Géoportail JavaScript actuelle. Pour des applications utilisant l'API Géoportail Flash, l'arrêt de garantie prendra effet dès le deuxième trimestre 2016.

Les risques de dysfonctionnement peuvent venir de l'évolution des navigateurs : une montée de version d'un navigateur (Firefox, Chrome, Edge, ...) peut entrainer l'arrêt du support d'une fonctionnalité utilisée par l'API Géoportail. Dans ce cas là rien ne sera proposé par l'IGN si votre appplication utilise encore les API Géoportail actuelles au-delà des dates annoncées.


<a id="APIv2-migration"/>

## Questions sur le passage des APIS actuelles vers les nouveaux éléments


### Devra-t-on changer de clef API ou prendre un nouveau contrat avec les nouveaux éléments ?

Non. La contractualisation de l'accès au ressources du Géoportail est indépendante de l'utilisation ou non des API Géoportail actuelles ou des nouveaux éléments proposés.

### Comment savoir si on utilise l'API JavaScript actuelle dans mon application ?

Si votre application charge un fichier GeoportalExtended.js, GeoportalMin.js ou Geoportal.js ou GeoportalMobile.js alors vous utilisez sans doute l'API Géoportail JavaScript.

Si vous avez accès au code de votre application (même chargé dans une page web), et que vous voyez l'utilisation de fonctions ou classes dont le nom commence par "Geoportal...", alors vous utilisez l'API Géoportail JavaScript.

 

### Comment savoir si j'utilise l'API Flash actuelle dans mon application ?

Si votre application nécessite qu'un plugin Flash soit chargé dans votre navigateur pour fonctionner, alors il y a des chances que vous utilisiez l'API Géoportail Flash.


### Si je veux utiliser les nouveaux éléments devrai-je ré-écrire toute mon application ? 

Si vous utilisez l'API Géoportail JavaScript, non : il faudra seulement réécrire la partie qui intéragit avec la carte de l'API Géoportail.

Si vous utilisez l'API Géoportail Flash, oui car il s'agit d'un changement complet de contexte de développement (passer du Flash au JavaScript).

### Est-ce que vous proposerez des "passerelles" pour passer de l'API JavaScript actuelle vers les nouveaux éléments ?

Lorsque le kit de développement sortira, nous proposerons des documentations permettant d'aider à passer de l'ancienne interface à la nouvelle. Dans l'esprit : "vous utilisez telle fonctionnalité de l'ancienne API : voici comment faire avec le kit de développement".


### Quels temps cela prendra-t-il de passer de l'API JavaScript actuelle aux nouveaux éléments ?

Cela dépend de la complexité de votre application par rapport à l'utilisation qui est faite de l'API Géoportail. Plus vous utilisez de fonctionnalités de l'ancienne API plus de temps il faudra pour les faire basculer sur les fonctionnalités équivalente des nouveaux éléments.

### Peut-on se passer de l'API Géoportail ?

Oui. Vous pouvez toujours développer une application utilisant directement les ressources du Géoportail en vous passant de l'API Géoportail ou des nouveaux éléments proposés. Ces derniers ont pour but d'en faciliter l'accès.


### Vous n'avez pas parlé de votre API 3D ? Qu'en est-il ?

L'API 3D est liée au plugin VirtualGéo pour le Géoportail. Ce dernier est aussi voué à l'obsolescence du fait du support de moins en moins assumé de ce type de plugins par les navigateurs (il n'est déjà plus supporté sous Chrome comme nous l'avions annoncé [sur le blog du site api](http://api.ign.fr/article/427/le-plugin-3d-du-geoportail-sera-bientot-incompatible-avec-google-chrome)). 

En parralèle, l'IGN mène des travaux sur des solutions 3D (notamment les projets [iTowns](https://github.com/iTowns/itowns/) et [iTowns2](https://github.com/iTowns/itowns2/) en partenariat avec [Oslandia](http://oslandia.com/)) reposant sur des technologies sans plugin qui pourront servir de base à une visualisation 3D pour le Géoportail. 

Certains clients OpenSource permettent déjà d'afficher les données images servies par la plateforme Géoportail, comme le populaire [CesiumJS](http://cesiumjs.org/).


<a id="help"/>

## Obtenir de l'aide

### Ma question n'est pas dans cette FAQ. Où puis-je la poser ?

Vous pouvez poser vos question sur la [discussion dédiée du forum des développeurs](http://www.developpez.net/forums/d1531763/applications/sig-systeme-d-information-geographique/ign-api-geoportail/mise-place-d-api-v3/). Vous pouvez aussi envoyer vos questions par mail au SAV IGN [contact.api@ign.fr](mailto:contact.api@ign.fr) ou directement à votre chargé de clientèle si vous en avez un.


