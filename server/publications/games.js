Meteor.publish("getGames", function () {
	return Games.find({status: 'publish'});
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
				user_id: Meteor.user(),
				status: 'draft'
			};
		}

		return Games.insert(data);
	},
	updateGame: function(data) {
		return Games.update(data._id, data);
	}
});