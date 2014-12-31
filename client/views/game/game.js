Meteor.subscribe("getGames");
Meteor.subscribe("getGamePlayers", this);
Template.game.helpers({
    game: function() {
       
        //Session.set('scores', this.scores.fetch());             
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
    }
});


	