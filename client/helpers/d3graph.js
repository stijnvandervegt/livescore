
    PlayerGraph = function(el, child) {

        this.svg = d3.select(el);

    }

    PlayerGraph.prototype = {
		init: function(el, child, data) {

        	this.path = this.svg
            	.selectAll('rect')
            	.data(data);

           	this.pathText =  this.svg
            	.selectAll('text')
            	.data(data);
		},
		update: function(el, child, data) {
			this.init(el, child, data);
			this.draw();
		},
		draw: function() {
			// Update bars
			this.bars = this.updateLine(this.path);

			// Add new bars
            this.path
            	.enter()
                .append('rect');

            this.path = this.updateLine(this.path);

            this.path.exit().remove();
            this.drawText();
          
		},
		updateLine: function(path) {
			path
                .attr("class", "bar")
                .attr('data-player', function(d) {return d.player_id})
                .transition()
                	.attr("width", function(d) { return (d.score * 40) ; })
                .attr("height", 20)
                .attr("x", 0)
                .attr("y", function(d, i) { return i * 25 })
                .attr("fill", "blue");

            return path;
		},
		drawText: function() {
			// Update text
			this.text = this.updateText(this.pathText);
            
            // Add new text
            this.pathText
            	.enter()
                .append("text");

            this.pathText = this.updateText(this.pathText);
            
            this.pathText.exit().remove();
		},
		updateText: function(path) {
			path
                .attr("x", 15)
                .attr("font-size", "16px")
                .attr("y", function(d, i) { return ((i + 1) * 25) - 11})
                .text(function(d) { return d.name +' - '+ d.score ; })
                .attr("fill", "white");
            return path;
		}

	};

	PieGraph = function (el, child, width, height) {
		this.el = el;
		this.child = child;
		this.width = width;
		this.height = height;

		this.svgPie = d3.select(el)
            .attr("width", width + 200)
            .attr("height", height + 60)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            
	};

	PieGraph.prototype = {		
		radius: 0,
		labelr: 0,
		color:  d3.scale.ordinal().range(["#d0743c", "#8a89a6", "#ff8c00", "#98abc5", "#a05d56", "#98abc5", "#ff8c00"]),			
		init: function(data) {		
			
			this.radius = (Math.min(this.width, this.height) / 2);
			this.labelr = (this.radius + 10);
			
            this.arc = d3.svg.arc()
                .outerRadius(this.radius - 10)
                .innerRadius(0);

            this.pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { return d.score; });
		     
		    this.draw(data);   

		},		
		draw: function(data) {

			var self = this;

			data.forEach(function(d) {                    
                d.score = +d.score;
            });           
            this.path = this.svgPie
 					.selectAll("path")
                    .data(this.pie(data)); 

            this.text = this.svgPie
				.selectAll("text")
                .data(this.pie(data)); 

			this.path = this.updatePath();

           	this.path
            	.enter()
            	.append('path');

    		this.path.data(this.pie(data));

            this.path = this.updatePath();

 			var textUpdate = this.updateText();

			this.text
				.enter()
                .append("text");

		    var text = this.updateText();

		},
		updateText: function() {
			
			var self = this;

			this.text
 				.attr("transform", function(d) {
		            var c = self.arc.centroid(d),
		                x = c[0],
		                y = c[1],
		            // pythagorean theorem for hypotenuse
		                h = Math.sqrt(x*x + y*y);
		            return "translate(" + (x/h * self.labelr) +  ',' +
		            (y/h * self.labelr) +  ")";
		        })
		        .attr("dy", ".35em")
		        .style("text-anchor", function(d) {
		            // are we past the center?
		            return (d.endAngle + d.startAngle)/2 > Math.PI ?
		                "end" : "start";
		        })
		        .text(function(d) { return d.data.name; });

		    return this.text;

		},
		updatePath: function() {
			
			var self = this;

			this.path
				.attr('fill', function(d, i) { return self.color(i) })
        		.attr('d', this.arc)
        		.each(function(d) { this._current = d; });	

        	return this.path;

		}
		
	};


