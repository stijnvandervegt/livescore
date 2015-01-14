Meteor.publish("getGames", function () {
	return Games.find({status: 'publish'});
});

Meteor.publish('userGames', function() {
	return Games.find({user_id: this.userId});
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
                twitter: '',
				user_id: this.userId,
				status: 'draft'
			};
		}
		data.user_id = this.userId;
		return Games.insert(data);
	},
	updateGame: function(data) {

        return Games.update(data._id, {$set: {
            'name': data.name,
            'home_team': data.home_team,
            'away_team': data.away_team,
            'date': data.date,
            'time': data.time,
            'twitter': data.twitter,
            'status': data.status
        }});

	},
	removeGame: function(id) {
		return Games.remove(id);
	}

});


