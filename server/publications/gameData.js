Meteor.publish('GameData', function(gameId) {	
	return GameData.find({game_id: gameId});
});	

Meteor.methods({
	addGameScore: function(data) {
		
		return GameData.insert({
			player_id: data.player._id,
			game_id: data.player.game_id,
			team: data.player.team,
			type: data.type
		});
	},
	getGameScore: function(gameId) {
		return gameId;
		return Players.find({
            game_id: gameId            
        }, {
            transform: function(player) {
                var scores = GameData.find({game_id: gameId, player_id: player._id});
                player.scores = scores;
                return player;
            }
        });
      
		return scores;
	}
});