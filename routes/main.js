Router.route('/', function () {  
  	this.render('home');  
});

Router.route('/admin', function() {
	this.render('admin');
});