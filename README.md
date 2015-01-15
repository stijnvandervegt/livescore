Livescore app met Meteor
=========
###Beschrijving

Dit is een real time livescore web app gebouwd in Meteor. Met deze app kan iedereen een account aanmaken en inloggen. Een gebruiker die ingelogd is kan wedstrijden aanmaken en live scores doorgeven. Iedereen kan deze wedstrijd pagina met score statistieken bekijken. De ingelogde gebruiker kan alleen zijn eigen wedstrijden beheren. Waardoor je altijd een beheerder per pagina hebt. De applicatie is op dit moment gericht op korfbal, maar kan eigenlijk voor iedere sport waarbij scores worden bijgehouden ingezet worden.

###Folder structuur
Voor de folder structuur heb ik inspiratie opgedaan van meteor-boilerplate. De package zelf heb ik niet gebruikt omdat ik dat voor deze applicatie geen toegevoegde waarde vind. 
[github meteor-boilerplate](https://github.com/matteodem/meteor-boilerplate)

###D3
De applicatie maakt gebruik van d3js library. Dit is een javascript library om data te verwerken in grafieken. 
De documentatie van d3js vind je [hier](https://github.com/mbostock/d3/wiki)

### Methods and Calls
De applicatie is verdeeld in client-side en server-side. Dat wil zeggen dat alle database calls server-side worden gemaakt. 
Dit ter bevordering van de performance en veiligheid. De clientside roept calls naar de server aan die op zijn tijd weer data teruggeeft. De client kan gewoon doorgaan het uitvoeren van de overige code, zodra de data gereed is wordt het realtime geupdate. Meteor gebruikt hiervoor latency compensation. Bekijk [hier](https://meteorhacks.com/introduction-to-latency-compensation.html) een artikel voor meer informatie.

### Reactivity
Voor het updaten van de grafieken maak ik gebruik van reactivity. Telkens als er een score wordt toegevoegd dan houdt deze observe method het in de gaten en kun je in de added function de score toevoegen aan de grafiek. 

Voor meer informatie over observe kun je de documentatie van Meteor erbij pakken: [reactivity](http://docs.meteor.com/#/full/observe)
```
observe({
	added: function(post) {
	}
});
```



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

###Vervolg stappen
Op dit moment verkeerd de applicatie in een prototype versie. Om er een goede professionele applicatie van te maken zijn de nodige stappen nodig. Hierdonder vind je een paar stappen die ik in de toekomst kan nemen om de applicatie beter te maken. 
* Kadira monitor: Dit is een mooie tool om je applicatie te monitoren. Hierdoor kun je gericht stappen nemen om de perfomance van applicatie te optimalisren.
* Bulletproof Meteor: Op deze website vind je erg veel uitleg om je meteor applicatie te optimaliseren. 

* Naast performance moet de applicatie ook nog vormgegeven worden. Op dit moment wordt bootstrap gebruikt. 
* Naast het toevoegen van scores moet het ook mogelijk zijn om andere gebeurtenissen toe te voegen zoals bijvoorbeeld wissels, kaarten en timeouts. Een andere mooie toevoegen zou de tijd bij elke gebeurtenis zijn zodat je dit ook in de statistieken naar voren kunt brengen.
