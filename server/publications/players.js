Meteor.publish("getplayersByTeam", function (options) {
	return Players.find({team_id: options.team_id});
});

Meteor.publish('getGamePlayers', function(game_id) {
	return Players.find({game_id: game_id});	
});

Meteor.publish('addPlayer', function(options) {
	Players.insert(
        {
            name: '',
            game_id: options.game_id,
            team: options.team
        }
    );
});

Meteor.publish('removePlayer', function(options) {
	Players.remove(options.player_id);
})
