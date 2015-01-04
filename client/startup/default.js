Meteor.startup(function () {
	console.log('test startup');


	GameData.deny({
		update: function(userId, doc) {			
			return false;
		},
		insert: function(userId, doc) {			
			return false;
		}
	});

});