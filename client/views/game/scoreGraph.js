Template.scoreGraph.created = function() {
    Meteor.subscribe("getGamePlayers", this.data.id);
    Meteor.subscribe("GameData", this.data.id);
}

Template.scoreGraph.rendered = function() {
    Session.set('GameScores', '');
	// Initialize pies
	var awayPie = new PieGraph('#pieAway', ['rect', 'text'], 200, 200);	 
	var homePie = new PieGraph('#pieHome', ['rect', 'text'], 200, 200);
    var playerGraph = new PlayerGraph('#graph');
	
    var self = this;
	// Get scores and create graph
	Meteor.call('getGameScore', {game_id: this.data.id}, function(err, scores) {

		if(err) {
			throw new Meteor.Error( 500, 'There is something wrong with the Game Data' ); 
		}
		var playerScores = _.sortBy(scores,  'scores').reverse();
	
		Session.set('GameScores', scores);

        lsReactive.init(homePie, awayPie, playerGraph);

		// Create player graphs
		playerGraph.init('#graph', ['rect', 'text'], playerScores);
	    playerGraph.draw(playerScores);
	   
	    // Create Pie chart for ovarall score
	    var overallHomeScore = lsFilters.getOverallGameScore(_.flatten(_.pluck(scores, 'scores')), 'home');
		var overallAwayScore = lsFilters.getOverallGameScore(_.flatten(_.pluck(scores, 'scores')), 'away');	 		
	    // Setup pie chart for game		    	   
	    homePie.init(overallHomeScore);   	      
	    awayPie.init(overallAwayScore);

	});

}


