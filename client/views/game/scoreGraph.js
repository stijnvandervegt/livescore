Template.scoreGraph.created = function() {
    Meteor.subscribe("getGamePlayers", Session.get('gameId'));
    Meteor.subscribe("GameData", Session.get('gameId'));
}

Template.scoreGraph.rendered = function() {

	// Initialize pies
	var awayPie = new PieGraph('#pieAway', ['rect', 'text'], 200, 200);	 
	var homePie = new PieGraph('#pieHome', ['rect', 'text'], 200, 200);
	
    var self = this;
	// Get scores and create graph
	Meteor.call('getGameScore', {game_id: Session.get('gameId')}, function(err, scores) {
		
		if(err) {
			throw new Meteor.Error( 500, 'There is something wrong with the Game Data' ); 
		}
		var playerScores = _.sortBy(scores,  'scores').reverse();
	
		Session.set('GameScores', scores);

        self.observe();
		// Create player graphs
		playerGraph.init('#graph', ['rect', 'text'], playerScores);
	    playerGraph.draw();  
	   
	    // Create Pie chart for ovarall score
	    var overallHomeScore = lsFilters.getOverallGameScore(_.flatten(_.pluck(scores, 'scores')), 'home');
		var overallAwayScore = lsFilters.getOverallGameScore(_.flatten(_.pluck(scores, 'scores')), 'away');	 		
	    // Setup pie chart for game		    	   
	    homePie.init(overallHomeScore);   	      
	    awayPie.init(overallAwayScore);

	});

    this.observe = function() {
        // Observe score and update graph
        GameData.find().observe({
            added: function (score) {

                // Check if player exists
                var player = _.where(Session.get('GameScores'), {_id: score.player_id});

                if (player.length > 0) {
                    // Add score
                    var newScores = lsFilters.addGameScore(Session.get('GameScores'), score);
                    Session.set('GameScores', newScores);
                    playerGraph.update('#graph', ['rect', 'text'], _.sortBy(newScores, 'score').reverse());
                } else {
                    // add player
                    Meteor.call('getPlayer', {player_id: score.player_id}, function (err, player) {
                        var newScores = lsFilters.addPlayerWithScore(player, score, Session.get('GameScores'));
                        Session.set('GameScores', newScores);
                        playerGraph.update('#graph', ['rect', 'text'], _.sortBy(newScores, 'score').reverse());
                    });
                }

                var overallHomeScore = lsFilters.getOverallGameScore(_.flatten(_.pluck(newScores, 'scores')), 'home');
                var overallAwayScore = lsFilters.getOverallGameScore(_.flatten(_.pluck(newScores, 'scores')), 'away');
                homePie.init(overallHomeScore);
                awayPie.init(overallAwayScore);

            }
        });
    }

}


