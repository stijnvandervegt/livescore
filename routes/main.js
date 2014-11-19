Router.route('/', function () {  
  	this.render('home');  
});

Router.route('/wedstrijd/:gameSlug', function() {
    this.render('game', {data: this.params.gameSlug});
});

