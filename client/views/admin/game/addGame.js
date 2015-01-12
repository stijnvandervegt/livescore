Template.addGame.created = function() {
    Meteor.subscribe('getGamePlayers', Session.get('gameId'));
}

Template.addGame.helpers({
    players: function() {
        return {
            home: Players.find({team: 'home', game_id: Session.get('gameId')}).fetch(),
            away: Players.find({team: 'away', game_id: Session.get('gameId')}).fetch()
        };       
    },
    teams: function() {
        return [{type: 'home', name: 'Thuisspelende'}, {type: 'away', name: 'Uitspelende'}];
    }  
});

Template.addGame.events({
    'click .addPlayer': function(event) {        
        Meteor.call('addPlayer', {team: event.currentTarget.getAttribute('data-team'), game_id: Session.get('gameId')});
        return false;
    },
    'click .removePlayer': function(event) {               
        Meteor.call('removePlayer', {player_id: this._id});
        return false;
    },
    'change input.player': function(event) {
        var data = {};
        data._id = this._id;        
        data.name = event.currentTarget.value;
        Meteor.call('updatePlayer', data);
    },    
    'submit form': function(event) {
        
        var data = {
            _id: Session.get('gameId'),
            name: event.target.name.value,
            home_team: event.target.teamHome.value,
            away_team: event.target.teamAway.value,
            date: event.target.date.value,
            user_id: Meteor.userId(),
            time: event.target.time.value,
            status: 'publish'            
        };
        
        // Validate data
        Meteor.call('updateGame', data, function(error, result) {
                    
            event.target.setAttribute('action', '/admin/wedstrijd/'+Session.get('gameId'));
            Session.set('gameId', false);
            event.target.submit();

        });

        return false;

    }
});


