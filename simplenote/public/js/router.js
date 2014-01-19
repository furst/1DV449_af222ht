App.Router = Backbone.Router.extend({
	routes: {
		'': 'index',
		'page/:slug': 'page'
	},

	slug: 'tom',

	index: function() {
		vent.trigger('posts:show');
	},

	page: function(slug) {
		this.slug = slug;
		vent.trigger('page:show', slug);
		vent.on('test', this.test, this);
	},

	test: function(slug) {
		var self = this;
		vent.trigger('page:show', this.slug);
	}

});