Template.game.created = function() {
    Meteor.subscribe("getGames");
    Meteor.subscribe("getGamePlayers", this.data.id);
    Meteor.subscribe('GameData', this.data.id);

    Session.set('gameId', this.data.id);
};

Template.game.helpers({
    game: function() {
        return Games.findOne({_id: Session.get('gameId')});
    },
    score: function() {

    	var homeScore = GameData.find({game_id:Session.get('gameId'), team: 'home'});

        var awayScore = GameData.find({game_id: Session.get('gameId'), team: 'away'});

    	return {
    		homeTotal: homeScore.count(),
    		awayTotal: awayScore.count()
    	}
    }
});


	