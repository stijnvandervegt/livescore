Meteor.publish("getGames", function () {
	return Games.find();
});

Meteor.publish('insertGame', function() {
	
});