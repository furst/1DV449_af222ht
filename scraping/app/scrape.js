
/**
 * Module dependencies.
 */
var async = require('async');
var $ = require('jquerygo');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/scrape');

var request = require('request');
var fs = require('fs');

var collection = db.get('usercollection');
//collection.remove();

$.config.addJQuery = false;

var print = function(text) {
    return function(done) {
        console.log(text);
        done();
    };
};

var download = function(uri, filename){
    request.head(uri, function(err, res, body){
        //console.log('content-type:', res.headers['content-type']);
        //console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename));
    });
};

var select = function(selector, done) {
    return function(done) {
        $('.instruction p').text(function(text) {
            console.log(text);
            done();
        });
    };
};

var sleep = function(time) {
    return function(done) {
        setTimeout(done, time);
    };
};

var update = function(title, content) {
    collection.update({ title : title.trim() }, { $set: {content : content }});
};

var updateImg = function(title, content) {
    collection.update({ title : title.trim() }, { $set: {img : content }});
};

var updateLocalImg = function(title, content) {
    collection.update({ title : title.trim() }, { $set: {localImg : content }});
};

var visit = function(recipes, i, done) {
    $.visit('http://www.arla.se' + recipes[i], function() {
        $.waitForElement('.instruction', function() {
            $('h1').text(function(title) {

                collection.find({ title : title.trim() }, function(e, docs) {

                    if (docs.length == 0) {
                        collection.insert({
                            "title" : title.trim(),
                            "date" : new Date(),
                            "scraped" : 1
                        }, function (err, doc) {
                            if (err) {
                                console.log('error');
                            }
                            else {
                                console.log('Data sparat i databasen');
                                $('.instruction').text(function(instruction) {
                                    update(title, instruction);
                                });

                                $('.recipe-media-area img').attr('src', function(img) {
                                    updateImg(title, img);

                                    var imgName = title.toLowerCase();
                                    imgName = imgName.replace(/ /g, '-');
                                    imgName = imgName.replace(',', '');
                                    imgName = imgName + '.jpg';

                                    download(img , 'public/images/' + imgName);

                                    updateLocalImg(title, 'images/' + imgName);
                                });

                                $.visit('http://www.arla.se/recept/mina-sidor/mina-favoriter/', function() {
                                    $.waitForElement('*:contains("Du kan spara favoritrecept")', function() {
                                        if (i == recipes.length - 1) {
                                            done();
                                        } else {
                                            i++;
                                            visit(recipes, i, done);
                                        }
                                    });
                                });
                            }
                        });
                    } else {
                        collection.update({ title : title.trim() }, { $inc: {scraped : 1 }});
                        collection.update({ title : title.trim() }, { $set: {date : new Date() }});
                        console.log('Data uppdaterat i databasen');
                        $.visit('http://www.arla.se/recept/mina-sidor/mina-favoriter/', function() {
                            $.waitForElement('*:contains("Du kan spara favoritrecept")', function() {
                                if (i == recipes.length - 1) {
                                    done();
                                } else {
                                    i++;
                                    visit(recipes, i, done);
                                }
                            });
                        });
                    }
                });
            });

        });
    });
};

var login = function(done) {
    async.series([
        $.go(false, 'visit', 'http://www.arla.se/'),
        $.go(false, 'waitForElement', '*:contains("Logga in")'),
        print('Startsidan'),
        $('#usernameField').go(false, 'val', 'andreas.furst@gmail.com'),
        $('#passwordField').go(false, 'val', 'gnag1901'),
        $('#submitButton').go(false, 'click'),
        $.go(false, 'waitForElement', 'a.favorites'),
        print('Inloggning slutförd')
    ], done);
};

var toRecipes = function(done) {
    async.series([
        print('Går till favoritrecept...'),
        $.go(false, 'visit', 'http://www.arla.se/recept/mina-sidor/mina-favoriter/'),
        $.go(false, 'waitForElement', '*:contains("Du kan spara favoritrecept")'),
    ], done);
};

var showRecipes = function(done) {
    console.log('Hämtar recept...');

    var found = false;

    var recipes = new Array();

    $('ul.thumbnail-teaser a').each(function(index, item, done) {

        item.attr('href', function(href) {
            recipes[index] = href;
            found = true;
            done();
        });

    }, function() {
        if (!found) {
            console.log('Du har inga favoritrecept.');
            done();
        }
        else {
            console.log('Recept laddade');
            visit(recipes, 0, done);
        }
    });
};

async.series([
    login,
    toRecipes,
    showRecipes
], function() {
    $.close();
    db.close();
});