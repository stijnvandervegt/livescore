
Template.addGame.helpers({
   /* homePlayers: function() {
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
    }*/
    players: function() {        
        Meteor.subscribe('addPlayer', {team: 'home', game_id: this._id});
        Meteor.subscribe('addPlayer', {team: 'away', game_id: this._id});
        Meteor.subscribe('getGamePlayers', this._id);
        return 'hier komen spelers';
        //return Meteor.subscribe('getGamePlayers', this._id);

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