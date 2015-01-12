Template.admin.created = function() {
    Meteor.subscribe('userGames');
}

Template.admin.helpers({
    games: function() {                   
        console.log(Meteor.user()._id);     
        return Games.find({user_id: Meteor.user()._id});
    }
});

Template.admin.events({
	'click .removeGame': function(event) {	
        Meteor.call('removeGame', this._id);
        return false;
    
	}
})