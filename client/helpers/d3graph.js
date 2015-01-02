_.defer(function() {

	playerGraph = {			
		svg: '',
		path: '',
		init: function(el, child, data) {
			this.svg = d3.select(el);
        	this.path = this.svg
            	.selectAll('rect')
            	.data(data);

           	this.pathText =  this.svg
            	.selectAll('text')
            	.data(data);
		},
		draw: function() {
			 this.bars = this.path
                .attr("class", "bar")
                .attr('data-player', function(d) {return d.player_id})
                .transition()
                	.attr("width", function(d) { return (d.score * 40) ; })
                .attr("height", 20)
                .attr("x", 0)
                .attr("y", function(d, i) { return i * 25 })
                .attr("fill", "blue");
            
            this.path
            	.enter()
                .append('rect')
                .attr("class", "bar")
                .attr('data-player', function(d) {return d.player_id})
                .transition()
                    .attr("width", function(d) { return (d.score * 40) ; })
                .attr("height", 20)
                .attr("x", 0)
                .attr("y", function(d, i) { return i * 25 })
                .attr("fill", "blue");


            this.path.exit().remove();
          
		},
		drawText: function() {
			this.text = this.pathText
                .attr("x", 15)
                .attr("font-size", "16px")
                .attr("y", function(d, i) { return ((i + 1) * 25) - 11})
                .text(function(d) { return d.name +' - '+ d.score ; })
                .attr("fill", "white");
            
            this.pathText
            	.enter()
                .append("text")
                .attr("x", 15)
                .attr("font-size", "16px")
                .attr("y", function(d, i) { return ((i + 1) * 25) - 11})
                .text(function(d) { return d.name +' - '+ d.score ; })
                .attr("fill", "white")
                .on("click", function(d){
                    console.log(d);
                });

              this.pathText.exit().remove();
		}
	};

	pieGraph = {
		init: function(el, child, data) {
			// Pie
            var width = 300,
                height = 300,
                radius = Math.min(width, height) / 2,
                labelr = radius + 10;

            var color = d3.scale.ordinal()
                .range(["#d0743c", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#98abc5", "#ff8c00"]);

            var arc = d3.svg.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

            var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { return d.score; });

            if(! this.svgPie) {
            	this.svgPie = d3.select("#pie")
	                .attr("width", width + 200)
	                .attr("height", height + 60)
	                .append("g")
	                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	                data.forEach(function(d) {                    
	                    d.score = +d.score;
	                });
            }

            var path = this.svgPie
 					.selectAll("path")
                    .data(pie(data)); 

            var text = this.svgPie
				.selectAll("text")
                .data(pie(data)); 

			var pathsUpdate = path
				.attr('fill', function(d, i) { return color(i) })
        		.attr('d', arc)
        		.each(function(d) { this._current = d; });

            var paths = path
            	.enter()
            	.append('path')
            		.attr('fill', function(d, i) { return color(i) })
            		.attr('d', arc)
            		.each(function(d) { this._current = d; });

           	           	
    		path.data(pie(data));

    		path.transition().duration(750).attrTween("d", arcTween);
    		function arcTween(a) {
			  var i = d3.interpolate(this._current, a);
			  this._current = i(0);
			  return function(t) {
			    return arc(i(t));
			  };
			}

 			var textUpdate = text
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
		        .text(function(d) { return d.data.name; })

			var text = text
				.enter()
                .append("text")
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

			        
		},
		draw: function() {
			
		},
		drawText: function() {
			
		}	
	}
	
}); 

