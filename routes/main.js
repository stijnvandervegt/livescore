Router.route('/', function () {  
  	this.render('home');  
});

Router.route('/wedstrijd/:game_id', function() {
    this.render('game', {data: this.params.game_id});
});

