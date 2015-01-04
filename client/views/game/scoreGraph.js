Meteor.subscribe("getGamePlayers", Session.get('gameId'));

Template.scoreGraph.created = function() {
	
var score = GameData.find().observe({
	added: function(post) {
		update();
	}	
});

var update = function() {
	 var score = GameData.find({},{
	        transform: function(score) {
	        	console.log(score.player_id);
	            var player = Players.find({_id: score.player_id}).fetch();
	            
	          	setTimeout(function() {
	          		console.log(player);
	          		score.playerName = player[0].name;
	          		score.player_id = player[0]._id;                			                      	            
					return score;
	          	}, 1000);

	          	return score;
	            	            
	        }
	    }).fetch();
	 	


	   
	    /*var scores = _.map(_.groupBy(score, 'player_id'), function(score, key) {	    		
		    	Meteor.call('getPlayer', {player_id: score[0].player_id}, function(err, player) {
		    		
		    		score.name = player[0].name;

			    	score.score = player.length;
			    	score.player_id = player[0]._id;
			    	
			    	

		    	});
		    	
		    	return score;
		    	score.name = score[0].name;

		    	score.score = score.length;
		    	//score.player_id = score[0].player_id;
		    	return score;
		    });*/
	   
	    setTimeout(function() {
	    	 var scores = _.sortBy(
		    	_.map(_.groupBy(score, 'player_id'), function(score, key) {
			    	
			    	

			    	score.score = score.length;
			    	score.player_id = score[0].player_id;
			    	score.name = score[0].playerName;
			    	console.log(score);
			    	return score;
			    }), 
			    'score').reverse();

	    	 console.log(scores);
		    // Setup scorebar for each player
		    playerGraph.init('#graph', ['rect', 'text'], scores);
		    playerGraph.draw();
		    playerGraph.drawText();


		    // Group scores by type
		    var overallScore = _.map(_.groupBy(score, 'type'), function(val, k) {
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
		}, 2000);
}


   /* _.defer(function() {
		Deps.autorun(function() {
				
		    var score = GameData.find({},{
		        transform: function(score) {
		            var player = Players.findOne({_id: score.player_id});
		            if(player) {			          		            	
			            score.playerName = player.name;                			                      
		            }
		            return score; 		           
		        }
		    }).fetch();

		    var scores = _.sortBy(
		    	_.map(_.groupBy(score, 'player_id'), function(player, key) {
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
		    var overallScore = _.map(_.groupBy(score, 'type'), function(val, k) {
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
    });*/

}


