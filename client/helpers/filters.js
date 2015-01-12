// Set global variable for helpers
	lsFilters = {	
		setGameScore: function(scores) {
			
			return _.map(scores, function(player, key) {
				if(player._id == score.player_id) {
					var checkScore = _.where(player.scores, {_id: score._id});					
					if(checkScore.length == 0) {						
						player.scores.push(score);
						player.score = (player.score + 1);
					}			
				}
				return player;
			});

		},
		addGameScore: function(scores, score) {
			
			return _.map(scores, function(player, key) {
				if(player._id == score.player_id) {
					var checkScore = _.where(player.scores, {_id: score._id});					
					if(checkScore.length == 0) {						
						player.scores.push(score);
						player.score = (player.score + 1);
					}			
				}
				return player;
			});		

		},
		getOverallGameScore: function(data, team) {

			return _.sortBy(
				_.map(_.groupBy(_.where(data, {team: team}), 'type'), function(val, k) {
			        var score = val.length;
			        val = {};
			        val.name = k;
			        val.score = score;
			        return val;
			    }), 'name');			

		},
		addPlayerWithScore: function(player, score, data) {
			player.scores = [];
			player.scores.push(score);
			player.score = 1;		
			data.push(player);
			return data;
		}
	};
