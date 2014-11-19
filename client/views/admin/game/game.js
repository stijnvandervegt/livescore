Template.addGame.helpers({
    homePlayers: function() {
        Players.insert(
            {
                name: '',
                game_id: this._id,
                team: 'home'
            }
        );
        return Players.find({game_id: Session.get('gameId'), team: 'home'});
    },
    awayPlayers: function() {
        Players.insert(
            {
                name: '',
                game_id: this._id,
                team: 'away'
            }
        );
        return Players.find({game_id: Session.get('gameId'), team: 'away'});
    }
});

Template.addGame.events({
    'change .player': function(event) {

        Players.insert(
            {
                name: '',
                game_id: this._id,
                team: 'home'
            }
        );
    }
});