
Template.editGame.created = function() {
    Meteor.subscribe('GameData', this.data.id);
    Meteor.subscribe('userGames');
    Meteor.subscribe('getGamePlayers', this.data.id);
    Session.set('gameId', this.data.id);
};

Template.editGame.helpers({
    game: function() {
        Session.set('game', Games.findOne({_id: Session.get('gameId')}));
        return Session.get('game');
    },
    players: function() {               

        return {
            home: Players.find({team: 'home', game_id: Session.get('gameId')}).fetch(),
            away: Players.find({team: 'away', game_id: Session.get('gameId')}).fetch()
        };         
    },
    event: function() {               
        return Session.get('addEvent');
    },
    score: function() {
        var homeScore = GameData.find({game_id: Session.get('gameId'), team: 'home'});
        var awayScore = GameData.find({game_id: Session.get('gameId'), team: 'away'});
        var score = homeScore.count()  +' - '+ awayScore.count();

        return score;
    }    
});

Template.editGame.events({
    'click .addPlayer': function(event) {
        Meteor.call('addPlayer', {team: event.currentTarget.getAttribute('data-team'), game_id: Session.get('gameId')});
        return false;
    },
    'click .editField': function(event) {
        jQuery(event.currentTarget).closest('td').find('.text').toggleClass('hidden');
        jQuery(event.currentTarget).closest('td').find('input').toggleClass('hidden');
    },
    'change input.info': function(event) {
        var name = event.currentTarget.name;
        var value = event.currentTarget.value;
        var data = Session.get('game');

        data.user_id = Meteor.userId();
        data[name] = value;
        data['status'] = 'publish';
        Meteor.call('updateGame', data);

        jQuery(event.currentTarget).closest('td').find('.text').toggleClass('hidden');
        jQuery(event.currentTarget).closest('td').find('input').toggleClass('hidden');
    },
    'click .btn-danger': function(event) {            
        Meteor.call('removePlayer', {player_id: this._id});
        return false;
    },
    'click .btn-info': function(event) {            
        jQuery(event.currentTarget).closest('.panel-heading').find('.name').toggleClass('hidden');
        jQuery(event.currentTarget).closest('.panel-heading').find('input').toggleClass('hidden');
        return false;
    },
    'change input.player': function(event) {
        var name = event.currentTarget.name;
        var value = event.currentTarget.value;
        var data = Session.get('game');
        data.name = value;
        data._id = this._id;       
        Meteor.call('updatePlayer', data);

        jQuery(event.currentTarget).closest('.panel-heading').find('.name').toggleClass('hidden');
        jQuery(event.currentTarget).closest('.panel-heading').find('input').toggleClass('hidden');
    },
    'click .player .panel-heading': function(event) {                 
        jQuery(event.currentTarget).closest('.player').find('.event').toggleClass('hidden');        
    },
    'click .score': function(event) {        
       jQuery(event.currentTarget).closest('.player').find('.addScore').toggleClass('hidden');
    }   
});