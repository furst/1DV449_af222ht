/*
|--------------------------------------------------------------------
| Global App View
|--------------------------------------------------------------------
*/

App.Views.App = Backbone.View.extend({
	initialize: function() {
		var allPostsView = new App.Views.Posts({collection: App.posts}).render();
		$('.main').children().replaceWith(allPostsView.el);

		var allPagesView = new App.Views.Pages({collection: App.posts}).render();
		$('.nav').append(allPagesView.el);

		vent.on('page:show', this.showPage, this);
		vent.on('posts:show', this.showPosts);
	},

	showPage: function(page) {
		var model = App.posts.where({'url':page});
		var pageView = new App.Views.Page({model: model[0]}).render();
		$('.main').children().replaceWith(pageView.el);
	},

	showPosts: function() {
		var allPostsView = new App.Views.Posts({collection: App.posts}).render();
		$('.main').children().replaceWith(allPostsView.el);
	}
});

/*
|--------------------------------------------------------------------
| Posts View
|--------------------------------------------------------------------
*/

App.Views.Posts = Backbone.View.extend({
	tagName: 'posts',

	render: function() {
		this.collection.each(this.addOne, this);
		return this;
	},

	addOne: function(post) {

		if (post.attributes.is_page == 0) {
			var postView = new App.Views.Post({ model: post });
			this.$el.append(postView.render().el);
		}
	}
});

/*
|--------------------------------------------------------------------
| Single Post View
|--------------------------------------------------------------------
*/

App.Views.Post = Backbone.View.extend({
	tagName: 'post',

	template: template('allPostsTemplate'),

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));

		return this;
	}
});

/*
|--------------------------------------------------------------------
| Pages View
|--------------------------------------------------------------------
*/

App.Views.Pages = Backbone.View.extend({
	tagName: 'ul',

	render: function() {

		this.collection.each(this.addOne, this);
		return this;
	},

	addOne: function(page) {

		if (page.attributes.is_page == 1) {
			var postView = new App.Views.PageLink({ model: page });
			this.$el.append(postView.render().el);
		}
	}
});

/*
|--------------------------------------------------------------------
| Link Page View
|--------------------------------------------------------------------
*/

App.Views.PageLink = Backbone.View.extend({
	tagName: 'li',

	template: template('allPagesNavTemplate'),

	events : {
    	'click' : 'show'
	 },

	show : function() {
		Backbone.history.navigate('page/' + this.model.attributes.url, {trigger: true});
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));

		return this;
	}
});

/*
|--------------------------------------------------------------------
| Single Page View
|--------------------------------------------------------------------
*/

App.Views.Page = Backbone.View.extend({
	tagName: 'page',

	template: template('allPostsTemplate'),

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});



