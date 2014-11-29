Template.admin.helpers({
    games: function() {        
        Meteor.subscribe('userGames');   
        console.log(Meteor.user()._id);     
        return Games.find({user_id: Meteor.user()._id});
    }
});