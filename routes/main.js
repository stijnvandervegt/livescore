Router.route('/', function () {  
  	this.render('home');  
});

Router.route('/wedstrijd/:game_id', function() {

    var gameId = this.params.game_id;
    Meteor.subscribe("getGamePlayers", gameId);  
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
    
    console.log(scores.fetch());

    this.render('game', { 
    	data: function () {    		 	
      		return {
      			id: gameId, 
      			scores: scores
      		};
    	}
    });
});

