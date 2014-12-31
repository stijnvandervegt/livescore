Template.scoreGraph.created = function() {

		window.scoreGraph = {};
    _.defer(function() {
		Deps.autorun(function() {

			Meteor.subscribe("getGamePlayers", Session.get('gameId'));
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


            var svg = d3.select("#graph");
            var path = svg
                .selectAll('rect')
                .data(scores);
            var pathText =  svg
                .selectAll('text')
                .data(scores);


            // Netjes maken apart bestand met helpers
            function draw(scores) {
                var bars = path
                    .attr("class", "bar")
                    .attr('data-player', function(d) {return d.player_id})
                    .transition()
                    .attr("width", function(d) { return (d.score * 40) ; })
                    .attr("height", 20)
                    .attr("x", 0)
                    .attr("y", function(d, i) { return i * 25 })
                    .attr("fill", "blue");
                path.enter()
                    .append('rect')
                    .attr("class", "bar")
                    .attr('data-player', function(d) {return d.player_id})
                    .transition()
                        .attr("width", function(d) { return (d.score * 40) ; })
                    .attr("height", 20)
                    .attr("x", 0)
                    .attr("y", function(d, i) { return i * 25 })
                    .attr("fill", "blue")
                   ;

                var text = pathText
                    .attr("x", 15)
                    .attr("font-size", "16px")
                    .attr("y", function(d, i) { return ((i + 1) * 25) - 11})
                    .text(function(d) { return d.name +' - '+ d.score ; })
                    .attr("fill", "white");
                pathText.enter()
                    .append("text")
                    .attr("x", 15)
                    .attr("font-size", "16px")
                    .attr("y", function(d, i) { return ((i + 1) * 25) - 11})
                    .text(function(d) { return d.name +' - '+ d.score ; })
                    .attr("fill", "white")
                    .on("click", function(d){
                        console.log(d);
                    });

                path.exit().remove();
                pathText.exit().remove();
            }

	      	draw(scores);


	      	// Pie
            var width = 300,
                height = 300,
                radius = Math.min(width, height) / 2;

            var color = d3.scale.ordinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

            var arc = d3.svg.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

            var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { return d.score; });

            var svgPie = d3.select("#pie")
                .attr("width", width + 200)
                .attr("height", height + 60)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            console.log(score.fetch());
            /*var overallScore = _.groupBy(_.map(score.fetch(), function(val, key) {
                console.log(val);
            }), 'type');*/
            var overallScore = _.map(_.groupBy(score.fetch(), 'type'), function(val, k) {
                var score = val.length;
                val = {};
                val.name = k;
                val.score = score;
                return val;
            });
           /* console.log(overallScore);


            var overallScore = [{name: 'Afstandschot', score: 5}, {name: 'Vrijebal', score: 8}];*/


            var labelr = radius + 10;

                overallScore.forEach(function(d) {
                    console.log(d);
                    d.score = +d.score;
                });

                var g = svgPie.selectAll(".arc")
                    .data(pie(overallScore))
                    .enter().append("g")
                    .attr("class", "arc");

                g.append("path")
                    .attr("d", arc)
                    .each(function(d) { this._current = d; })
                    .style("fill", function(d, i) {  return color(i); })
                    .transition().duration(500).attrTween("d", function(a) {
                        var i = d3.interpolate(this._current, a),
                            k = d3.interpolate(arc.outerRadius()(), radius);
                        this._current = i(0);
                        return function(t) {
                            return arc.innerRadius(k(t)/4).outerRadius(k(t))(i(t));
                        };
                    });

            g.append("text")
                    .attr("transform", function(d) {
                        var c = arc.centroid(d),
                            x = c[0],
                            y = c[1],
                        // pythagorean theorem for hypotenuse
                            h = Math.sqrt(x*x + y*y);
                        return "translate(" + (x/h * labelr) +  ',' +
                        (y/h * labelr) +  ")";
                    })
                    .attr("dy", ".35em")
                    .style("text-anchor", function(d) {
                        // are we past the center?
                        return (d.endAngle + d.startAngle)/2 > Math.PI ?
                            "end" : "start";
                    })
                    .text(function(d) { return d.data.name; });




		});
    });


}