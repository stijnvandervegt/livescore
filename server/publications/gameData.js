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
		// Synchronous way to put data in var score
		var scores = Players.find(gameId, {
            transform: function(player) {            	
                var score = GameData.find({game_id: gameId.game_id, player_id: player._id}).fetch();
                player.scores = score;
                return player;
            }
        }).fetch();
		
		var data = Meteor.call('formatScore', scores);
		
		return data;
	},
	formatScore: function(data) {
		return _.map(_.groupBy(data, '_id'), function(player, key) {		    				   
	    	if(typeof player[0].scores.length !== 'undefined' && player[0].scores.length > 0) {
	    		player[0].score = player[0].scores.length;
	    	} else {
	    		player[0].score = 0;
	    	}		 
	    	return player[0];
	    });
	}
});