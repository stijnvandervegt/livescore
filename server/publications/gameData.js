Meteor.publish('GameData', function(gameId) {	
	return GameData.find({game_id: gameId});
});	

Meteor.methods({
	getScore: function(data) {
		console.log(data);
		console.log('test');
		var score = GameData.find({game_id: data.game_id},{
	        transform: function(score) {
	            var player = Players.findOne({_id: score.player_id});
	            if(player) {			          		            	
		            score.playerName = player.name;                			                      
	            }
	            return score; 
	            
	        }
	    });

	    return score.fetch();
	}, 
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