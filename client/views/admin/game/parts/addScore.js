
Template.addScore.events({
	'click a': function(event) {				
		console.log(jQuery(event.currentTarget).data('type'));
		console.log(this._id);
		var data = {
			player: this, 
			type: jQuery(event.currentTarget).data('type')
		};
  		Meteor.call('addGameScore', data);
		
	}
});