Template.admin.helpers({
    games: function() {
        console.log(this.user());
        return Games.find({user_id: this.user()._id});
    }
});