
/**
 * Module dependencies.
 */

var express = require('express');
var jsdom = require('jsdom');
var request = require('request');
var url = require('url');
//var app = module.exports = express.createServer();
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/scrape');

var app = express();

var fs = require('fs');

var download = function(uri, filename){
	request.head(uri, function(err, res, body){
		console.log('content-type:', res.headers['content-type']);
		console.log('content-length:', res.headers['content-length']);

		request(uri).pipe(fs.createWriteStream(filename));
	});
};

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index(db));

app.get('/scrape', function(req, res) {

	request({uri: 'http://www.arla.se/sok/efterratt/'}, function(err, response, body){
		var self = this;
		self.items = new Array(); //I feel like I want to save my results in an array

		//Just a basic error check
		if(err && response.statusCode !== 200){console.log('Request error.');}
			//Send the body param as the HTML code we will parse in jsdom
			//also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
		jsdom.env({
			html: body,
			scripts: ['http://code.jquery.com/jquery-1.6.min.js'],
			done: function (err, window) {
				var $ = window.jQuery,
                $body = $('body'),
                $recipes = $body.find('.ess-hitLink');

                // Set our collection
				var collection = db.get('usercollection');

				collection.remove();

				$recipes.each(function (i, item) {

					//I will use regular jQuery selectors
					var $img = $(item).find('.media-area img');

                    //first anchor element which is children of our .video-entry item
                    var $title = $(item).find('h3').text();

                    //video title
                    var $text = $(item).find('p').text();

                    var imgName = $img.attr('alt');
                    imgName = imgName.replace(/ /g, '-');
                    imgName = imgName.replace(',', '');
                    imgName = imgName + '.jpg';

                    download($img.attr('src') , 'public/images/' + imgName);

					// Submit to the DB
					collection.insert({
						"href" : $(item).attr('href'),
						"img" : $img.attr('src'),
						"localImg" : 'images/' + imgName,
						'title' : $title.trim(),
						'text' : $text
					}, function (err, doc) {
						if (err) {
							// If it failed, return error
							res.send("There was a problem adding the information to the database.");
						}
						else {
							console.log('Data added');
						}
					});

					//and add all that data to my items array
					self.items[i] = {
						href: $(item).attr('href'),
						img: $img.attr('src'),
						title: $title.trim(),
						text: $text
					};
				});

				res.render('scrape', {
					title: 'Dessertscraping',
					items: self.items
				});
			}
		});
	});
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
