Meteor.subscribe("getGames");

Template.game.helpers({
    data: function() {
        return Games.findOne({slug: this.toString()});
    }
});