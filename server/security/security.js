security = {
    init: function() {
        this.games();
        this.gameData();
        this.players();
    },
    games: function() {
        Games.allow({
            update: function(userId, doc) {
                return doc && doc.user_id === userId;
            },
            remove: function(userId, doc) {
                return doc && doc.user_id === userId;
            }
        });
    },
    gameData: function() {
        GameData.deny({
            update: function(userId, doc) {
                return true;
            },
            insert: function(userId, doc) {
                return true;
            }
        });
    },
    players: function() {
        Players.deny({
            update: function() {
                return true;
            },
            insert: function() {
                return true;
            }
        });
    }
};