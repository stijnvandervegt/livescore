Template.twitter.helpers({
    tweets: function() {

        var game = Games.findOne({_id: Session.get('gameId')});
        if(game) {
            Meteor.call('searchTwitter', game.twitter, function(err, result){
                if(!err){
                    if (result.statusCode === 200) {
                        Session.set('tweets', result.data.statuses);
                    }
                }
            });
        }
        return Session.get('tweets');
    }
})