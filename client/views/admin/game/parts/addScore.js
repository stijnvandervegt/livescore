
Template.addScore.events({
	'click a': function(event) {

		var data = {
			player: this, 
			type: jQuery(event.currentTarget).data('type')
		};
  		Meteor.call('addGameScore', data);
		
	}
});