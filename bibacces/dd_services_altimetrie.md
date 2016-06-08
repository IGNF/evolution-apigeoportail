---
layout: services
title: Altitudes
level: 3
order: 030205
api: services
---

# Services d'altimétrie

Il s'agit de proposer une couche logicielle permettant d'utiliser le service d'altimétrie du Géoportail[^8]. Elle permettra à l'utilisateur de choisir le mode d'interrogation du service (API REST ou norme WPS), le protocole utilisé (XHR ou JSONP), la méthode HTTP – lorsque c'est possible- (GET ou POST), ou encore le format de sortie. Par défaut, on propose d'utiliser l'API REST, via le protocole JSONP.

## Cas d'utilisation

L'utilisateur est un développeur web qui souhaite intégrer une fonctionnalité de calcul d'altitude dans son application. Par exemple, il souhaite pouvoir récupérer l'altitude de points saisis une carte intéractive par un internaute, ou encore proposer un profil altimétrique calculé à partir d'un échantillonage déterminé par ces points. Il fournit comme paramètres les coordonnées des points dont il souhaite connaître l'altitude, et éventuellement des paramètres concernant la méthode utilisée pour interroger le service.

## Mise en oeuvre

La mise en oeuvre de cette fonctionnalité est effective et est <a href="https://github.com/IGNF/geoportal-access-lib#alti" target="_blank">décrite ici</a>.
