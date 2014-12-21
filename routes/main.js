Router.route('/', function () {  
  	this.render('home');  
});

Router.route('/wedstrijd/:game_id', function() {

    this.render('game', { 
    	data: function () {
    		Meteor.subscribe("getGamePlayers", this.params.game_id);
    		var gameId = this.params.game_id;
			Meteor.subscribe("getGames");
    		var scores =  Players.find({
		            game_id: gameId            
		        }, {
		            transform: function(player) {
		                var scores = GameData.find({game_id: gameId, player_id: player._id});
		                player.scores = scores.fetch();
		                return player;
		            }
		        });    		
      		return {
      			id: gameId, 
      			scores: scores
      		};
    	}
    });
});

