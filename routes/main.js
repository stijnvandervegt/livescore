Router.route('/', function () {  
  	this.render('home');  
});

Router.route('/wedstrijd/:game_id', function() {        
    this.render('game', { 
    	data: function () {    		 	
      		return {
      			id: this.params.game_id      		
      		};
    	}
    });
});

