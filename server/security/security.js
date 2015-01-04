security = function() {
	Games.allow({
		update: function(userId, doc) {
	  		return doc && doc.userId === userId;
		},
	  	remove: function(userId, doc) {
	  		return doc && doc.userId === userId;
		}
	});

	GameData.deny({
		update: function(userId, doc) {			
			return false;
		},
		insert: function(userId, doc) {			
			return false;
		}
	});
}