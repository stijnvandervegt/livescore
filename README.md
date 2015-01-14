Livescore app met Meteor
=========
###Beschrijving

Dit is een real time livescore web app gebouwd in Meteor. Met deze app kun je wedstrijden aanmaken en live scores doorgeven. Iedereen kan jouw wedstrijd pagina met score statistieken bekijken. 

###D3
De applicatie maakt gebruik van d3 library. Dit is een javascript library om data te verwerken in grafieken. 

De documentatie van d3js vind je [hier](https://github.com/mbostock/d3/wiki)

### Methods and Calls
De applicatie is verdeeld in client-side en server-side. Dat wil zeggen dat alle database calls server-side worden gemaakt. 
Dit ter bevordering van de performance.

### Reactivity
Voor het updaten van de grafieken maak ik gebruik van reactivity. Telkens als er een score wordt toegevoegd dan houdt deze observe method het in de gaten en kun je in de added function de score toevoegen aan de grafiek. 

Voor meer informatie over observe kun je de documentatie van Meteor erbij pakken: [reactivity](http://docs.meteor.com/#/full/observe)
```
observe({
	added: function(post) {
	}
});
```

###Folder structuur
Voor de folder structuur heb ik inspiratie opgedaan van meteor-boilerplate. De tool zelf heb ik niet gebruikt omdat ik dat voor deze applicatie geen toegevoegde waarde vond. 
[github meteor-boilerplate](https://github.com/matteodem/meteor-boilerplate)

###Bronnen
* Book: Discover Meteor
* Web: http://meteor.com

###Meteor packages

* accounts-facebook            1.0.2* Login service for Facebook accounts
* accounts-password            1.0.4* Password support for accounts
* accounts-twitter             1.0.2* Login service for Twitter accounts
* broth:inspector              0.2.2  Ensures that if meteor is in debug mode n...
* d3                           1.0.0  Library for manipulating documents based ...
* ian:accounts-ui-bootstrap-3  1.1.21* Bootstrap-styled accounts-ui with multi-...
* iron:router                  1.0.1* Routing specifically designed for Meteor
* less                         1.0.11* The dynamic stylesheet language
* meteor-platform              1.2.0* Include a standard set of Meteor packages...
* mizzao:bootstrap-3           3.3.0* HTML, CSS, and JS framework for developin...
* superstringsoft:observatory  0.4.8  Versatile and powerful logging and applic...


