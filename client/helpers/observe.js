lsReactive = {
    init: function(homePie, awayPie, playerGraph) {
        this.observe(homePie, awayPie, playerGraph);
    },
    observe: function(homePie, awayPie, playerGraph) {
        // Observe score and update graph
        GameData.find({game_id: Session.get('gameId')}).observe({
            added: function (score) {
                // Check if player exists
                var player = _.where(Session.get('GameScores'), {_id: score.player_id});
                if (player.length > 0) {
                    // Add score
                    var newScores = lsFilters.addGameScore(Session.get('GameScores'), score);
                    Session.set('GameScores', newScores);
                    playerGraph.update('#graph', ['rect', 'text'], _.sortBy(newScores, 'score').reverse());
                } else {
                    // add player
                    Meteor.call('getPlayer', {player_id: score.player_id}, function (err, player) {
                        var newScores = lsFilters.addPlayerWithScore(player, score, Session.get('GameScores'));
                        Session.set('GameScores', newScores);
                        playerGraph.update('#graph', ['rect', 'text'], _.sortBy(newScores, 'score').reverse());
                    });
                }

                var overallHomeScore = lsFilters.getOverallGameScore(_.flatten(_.pluck(newScores, 'scores')), 'home');
                var overallAwayScore = lsFilters.getOverallGameScore(_.flatten(_.pluck(newScores, 'scores')), 'away');
                homePie.init(overallHomeScore);
                awayPie.init(overallAwayScore);

            }
        });
    }
};