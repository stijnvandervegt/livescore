var twitter = new TwitterApi();

Meteor.methods({
    searchTwitter: function(term) {
        return twitter.search(term);
    },
    userTwitter: function(user) {
        return twitter.usersSearch(user);
    }
});