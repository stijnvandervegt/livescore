Router.route('/admin/', function() {
    // Overview games
    this.render('admin');
});
Router.route('/admin/wedstrijd', function() {
    // Add game
    this.render('addGame');
});
Router.route('/admin/wedstrijd/:gameId', function() {
    // Edit game and add scores etc.
    this.render('admin');
});

