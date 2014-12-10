Meteor.publish("getGames", function () {
	return Games.find({status: 'publish'});
});

Meteor.publish('userGames', function() {
	return Games.find({user_id: Meteor.user()._id});
});

Meteor.methods({
	addGame: function(data) {
		if(data === false) {
			var data = {
				name: '',
				home_team: '',
				away_team: '',
				date: '',
				time: '',
				
				status: 'draft'
			};
		}

		return Games.insert(data);
	},
	updateGame: function(data) {
		data.user_id = Meteor.user()._id;
		return Games.update(data._id, data);
	}	
});


