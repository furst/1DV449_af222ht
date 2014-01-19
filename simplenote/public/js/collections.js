App.Collections.Posts = Backbone.Collection.extend({
	model: App.Models.Post,
	url: '/simplenote/public/posts'
});