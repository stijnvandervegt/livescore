Meteor.publish("getplayersByTeam", function (options) {
	return Players.find({team_id: options.team_id});
});
Meteor.publish('getGamePlayers', function(game_id) {
	return Players.find({game_id: game_id});	
});

Meteor.methods({
    updatePlayer: function(data) {        
        return Players.update(data._id, {$set: {'name': data.name}});
    },
    getPlayer: function(data) {
        var player = Players.findOne({_id: data.player_id});
        return player;
    },
    addPlayer: function(data) {
        console.log(data);
        Players.insert(
            {
                name: '',
                game_id: data.game_id,
                team: data.team
            }
        );
    },
    removePlayer:  function(data) {
        Players.remove(data.player_id);
    }
});
