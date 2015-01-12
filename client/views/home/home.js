Template.home.created = function() {
    Meteor.subscribe('getGames');
}
Template.home.helpers({
   games: function() {
       return Games.find();
   }
});