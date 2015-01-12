security = function() {
	Games.allow({
		update: function(userId, doc) {
			console.log(userId);				
			console.log(doc);
	  		return doc && doc.user_id === userId;
		},
	  	remove: function(userId, doc) {
	  		return doc && doc.user_id === userId;
		}
	});

	/*GameData.deny({
		update: function(userId, doc) {			
			return false;
		},
		insert: function(userId, doc) {			
			return false;
		}
	});*/
}