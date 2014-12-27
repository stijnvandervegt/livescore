Template.scoreGraph.created = function() {
	_.defer(function() {
		window.scoreGraph = {};
		Deps.autorun(function() {

		    var score = GameData.find({},{
		        transform: function(score) {                
		            var player = Players.findOne({_id: score.player_id});                                
		            score.playerName = player.name;                
		            return score;            
		        }
		    });

		    var scores = _.map(_.groupBy(score.fetch(), 'player_id'), function(player, key) {
		    	
		    	player.name = player[0].playerName;
		    	player.score = player.length;
		    	player.player_id = player[0].player_id;
		    	return player;
		    })
			
	      	function draw(scores) {
	      		var graph = d3.scale.linear()
		        .domain([0, 50])
		        .range([0, 100]);
			var bars = d3.select("#graph")
			  	.selectAll("div")
			    .data(scores);
			bars
			    .enter()
			    .append("div");
			bars
			    .attr("class", "bar")
			    .style("height", 50)
			    .style("width", function(d) {  console.log(d); return (d.score * 40) + "px"; })
			    .attr('data-player', function(d) {return d.player_id})
	        	.text(function(d) { return d.name; });
	        bars
	        	.exit().remove();
	      	}
	      	draw(scores);

		});

	});
}