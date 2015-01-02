Meteor.subscribe("getGamePlayers", Session.get('gameId'));

Template.scoreGraph.created = function() {

	window.scoreGraph = {};
    _.defer(function() {
		Deps.autorun(function() {

			console.log('waarom 2x?');
			
		    var score = GameData.find({},{
		        transform: function(score) {
		            var player = Players.findOne({_id: score.player_id});
		            if(player) {			          		            	
			            score.playerName = player.name;                			                      
		            }
		            return score; 
		            
		        }
		    });

		    var scores = _.sortBy(
		    	_.map(_.groupBy(score.fetch(), 'player_id'), function(player, key) {
			    	player.name = player[0].playerName;
			    	player.score = player.length;
			    	player.player_id = player[0].player_id;
			    	return player;
			    }), 
			    'score').reverse();

		    
		    // Setup scorebar for each player
		    playerGraph.init('#graph', ['rect', 'text'], scores);
		    playerGraph.draw();
		    playerGraph.drawText();


		    // Group scores by type
		    var overallScore = _.map(_.groupBy(score.fetch(), 'type'), function(val, k) {
                var score = val.length;
                val = {};
                val.name = k;
                val.score = score;
                return val;
            });

		    // Setup pie chart for whole game
		    pieGraph.init('#pie', ['rect', 'text'], overallScore);
		    pieGraph.draw();
		    pieGraph.drawText();





		});
    });


}