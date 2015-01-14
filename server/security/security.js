security = function() {
	Games.allow({
		update: function(userId, doc) {
	  		return doc && doc.user_id === userId;
		},
	  	remove: function(userId, doc) {
	  		return doc && doc.user_id === userId;
		}
	});

	GameData.deny({
		update: function(userId, doc) {			
			return true;
		},
		insert: function(userId, doc) {			
			return true;
		}
	});

    Players.deny({
        update: function() {
            return true;
        },
        insert: function() {
            return true;
        }
    });
}