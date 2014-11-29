Template.editGame.helpers({
    game: function() {       
        Session.set('game', Games.findOne({_id: this.toString()}));     
        return Session.get('game');
    },
    players: function() {               
        Meteor.subscribe('getGamePlayers', this.toString());
        return {
            home: Players.find({team: 'home', game_id: this.toString()}).fetch(),
            away: Players.find({team: 'away', game_id: this.toString()}).fetch()
        };         
    },
    event: function() {       
        return Session.get('addEvent');
    },
    score: function() {
        return Session.get('addScore');
    }    
});

Template.editGame.events({
    'click .addPlayer': function(event) {        
        Meteor.subscribe('addPlayer', {team: event.currentTarget.getAttribute('data-team'), game_id: this.toString()});              
        return false;
    },
    'click .editField': function(event) {
        jQuery(event.currentTarget).closest('td').find('.text').toggleClass('hidden');
        jQuery(event.currentTarget).closest('td').find('input').toggleClass('hidden');
    },
    'change input': function(event) {
        var name = event.currentTarget.name;
        var value = event.currentTarget.value;
        var data = Session.get('game');
        data[name] = value;
        data._id = this.toString();       
        Meteor.call('updateGame', data);

        jQuery(event.currentTarget).closest('td').find('.text').toggleClass('hidden');
        jQuery(event.currentTarget).closest('td').find('input').toggleClass('hidden');
    },
    'click .player .panel-heading': function(event) {        
        // get player id 
        //show hide event       
        jQuery(event.currentTarget).closest('.player').find('.event').toggleClass('hidden');
        
    },
    'click .score': function(event) {
        
       jQuery(event.currentTarget).closest('.player').find('.addScore').toggleClass('hidden');
    }
});