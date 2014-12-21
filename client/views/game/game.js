Meteor.subscribe("getGames");
Meteor.subscribe("getGamePlayers", this);
Template.game.helpers({
    game: function() {
       
        Session.set('scores', this.scores.fetch()); 
        

             
        Session.set('gameId', this.id);    	
        return Games.findOne({_id: this.id});
    },
    score: function() {
    	Meteor.subscribe('GameData', this.id);

    	var homeScore = GameData.find({game_id: this.id, team: 'home'});
    	
        var awayScore = GameData.find({
            game_id: this.id, 
            team: 'away'
        }, {
            transform: function(score) {                
                var player = Players.findOne({_id: score.player_id});
                score.player = player;
                return score;
            }
        });

    	return {
    		homeTotal: homeScore.count(),
    		home: homeScore.fetch(),
    		awayTotal: awayScore.count(),
    		away: awayScore.fetch()
    	}
    },
    players: function() {
         // Get score by player
        var scores =  Players.find({
            game_id: Session.get('gameId')            
        }, {
            transform: function(player) {
                var scores = GameData.find({game_id: Session.get('gameId'), player_id: player._id});
                player.scores = scores.fetch();
                return player;
            }
        });
        Session.set('scores', scores.fetch());
       
        return scores;        
    }
});


Template.game.rendered = function () {
	Meteor.subscribe("GameData");
    Meteor.subscribe("getGamePlayers", Session.get('gameId'));
	var data = [4, 8, 15, 16, 23, 42];

    var data = {
        home: [{name: 'Rick Voorneveld', score: 4}, {name: 'Tim Bakker', score: 8}],        
        away: [{name: 'Rick Voorneveld', score: 4}, {name: 'Tim Bakker', score: 8}]        
    }
    
    console.log(Session.get('scores'));

	var x = d3.scale.linear()
    	.domain([0, d3.max(data.away)])
    	.range([0, 420]);

	d3.select(".chartAway")
  		.selectAll("div")
    		.data(data.away)
  		.enter()
        .append("div")
    	.style("width", function(d) { return (d.score * 40) + "px"; })
    	.text(function(d) { return d.name; });	  
};