Router.route('/admin/', function() {
    // Overview games
    this.render('admin');
});
Router.route('/admin/wedstrijd', function() {
    // Add game    
    Meteor.call('addGame', false, function(error, result) {
    	Session.set('gameId', result);
    });
    
    // render template
    this.render('addGame');

});
Router.route('/admin/wedstrijd/:gameId', function() {
    // Edit game and add scores etc.

    this.render('editGame',  {
        data: function () {
            return {
                id: this.params.gameId
            };
        }
    });
});

