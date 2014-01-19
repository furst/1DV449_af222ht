<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Simplenote cms</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="/simplenote/public/css/normalize.css">
        <link rel="stylesheet" href="/simplenote/public/css/toast.css">
        <link rel="stylesheet" href="/simplenote/public/css/style.css">
	</head>
    <body>

    	<div class="container">

			<div class="grid">
			    <div class="unit span-grid border-bottom">
					<h1 class="logo">Simplenote cms</h1>
					<div class="nav"></div>
			    </div>

			    <div class="unit span-grid border-top">
			        <div class="main">
			        	<img class="loader" src="/simplenote/public/img/ajax-loader.gif" alt="loader">
			        </div>
			    </div>

			    <div class="unit span-grid border-footer">
			        <div class="footer">© 2014 Andreas Fürst. All Rights Reserved.</div>
			    </div>
			</div>
	        
    	</div>

        <script id="allPostsTemplate" type="text/template">
	    	<h1><%= title %></h1>
	    	<%= content %>
	    	<hr>
	    </script>

	    <script id="allPagesNavTemplate" type="text/template">
	    	<%= title %>
	    </script>
		
		<script src="/simplenote/public/js/jquery.js"></script>
		<script src="/simplenote/public/js/underscore.js"></script>
	    <script src="/simplenote/public/js/backbone.js"></script>
	    <script src="/simplenote/public/js/main.js"></script>
	    <script src="/simplenote/public/js/models.js"></script>
	    <script src="/simplenote/public/js/collections.js"></script>
	    <script src="/simplenote/public/js/views.js"></script>
	    <script src="/simplenote/public/js/router.js"></script>

	    <script>
	    	new App.Router;
	    	Backbone.history.start({ pushState: true, root: 'simplenote/public' });

	    	App.posts = new App.Collections.Posts;
	    	App.posts.fetch().then(function() {
	    		new App.Views.App({ collection : App.posts });

	    		vent.trigger('test');
	    	});

	    	$('.logo').on('click', function() {
	    		Backbone.history.navigate('', {trigger: true});
	    	});

	    	$.ajax({
				url: 'service',
				context: document.body
			});
	    </script>
    </body>
</html>