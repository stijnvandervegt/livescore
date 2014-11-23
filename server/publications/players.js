Meteor.publish("getplayersByTeam", function (options) {
	return Players.find({team_id: options.team_id});
});

Meteor.publish('getGamePlayers', function(game_id) {

	var players = {
		home: Players.find({team: 'home', game_id: game_id}).fetch(),
		away: Players.find({team: 'away', game_id: game_id}).fetch()
	}; 
	
	//return true;
	//return players;

});

Meteor.publish('addPlayer', function(options) {
	
	Players.insert(
        {
            name: '',
            game_id: options.game_id,
            team: options.team
        }
    );

    //return true;

});
