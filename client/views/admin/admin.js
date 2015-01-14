Template.admin.created = function() {
    Meteor.subscribe('userGames');
}

Template.admin.helpers({
    games: function() {
        return Games.find({user_id: Meteor.userId()});
    }
});

Template.admin.events({
	'click .removeGame': function(event) {	
        Meteor.call('removeGame', this._id);
        return false;
    
	}
})