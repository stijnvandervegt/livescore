Meteor.publish('GameData', function(game_id) {
	console.log(game_id);
	return GameData.find({game_id: game_id});
});	

Meteor.methods({
	addGameScore: function(data) {
		console.log({
			player_id: data.player._id,
			game_id: data.player.game_id,
			team: data.team,
			type: data.type
		});
		return GameData.insert({
			player_id: data.player._id,
			game_id: data.player.game_id,
			team: data.player.team,
			type: data.type
		});
	}
});