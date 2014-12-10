Meteor.subscribe("getGames");

Template.game.helpers({
    game: function() {    	
        return Games.findOne({_id: this.toString()});
    },
    score: function() {
    	Meteor.subscribe('GameData', this.toString());
    	var homeScore = GameData.find({game_id: this.toString(), team: 'home'});
    	var awayScore = GameData.find({game_id: this.toString(), team: 'away'});

    	return {
    		homeTotal: homeScore.count(),
    		home: homeScore.fetch(),
    		awayTotal: awayScore.count(),
    		away: awayScore.fetch()
    	}
    },
    players: function() {

    }
});


Template.game.rendered = function () {
	
	var data = [4, 8, 15, 16, 23, 42];

	var x = d3.scale.linear()
    	.domain([0, d3.max(data)])
    	.range([0, 420]);

	d3.select(".chart")
  		.selectAll("div")
    		.data(data)
  		.enter().append("div")
    		.style("width", function(d) { return x(d) + "px"; })
    		.text(function(d) { return d; });	  
};