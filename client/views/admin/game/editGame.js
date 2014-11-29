Template.editGame.helpers({
    game: function() {
        return Games.findOne({_id: this.toString()});
    },
    players: function() {        
       
        Meteor.subscribe('getGamePlayers', this.toString());
        return [
            {home: Players.find({team: 'home', game_id: this.toString()}).fetch()},
            {away: Players.find({team: 'away', game_id: this.toString()}).fetch()}
	    ];       
    },
});