var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
//var io = require('socket.io').listen(server);
//var fs = require('fs');

// data used
var actionGames = require('./server/js/action');
var arcadeGames = require('./server/js/arcade');
var cardsGames = require('./server/js/cards');
var girlsGames = require('./server/js/girls');
var jumpRunGames = require('./server/js/jumpRun');
var mahjongGames = require('./server/js/mahjong');
var puzzleGames = require('./server/js/puzzle');
var quizgGames = require('./server/js/quiz');
var skillGames = require('./server/js/skill');
var sportsGames = require('./server/js/sports');


app.use('/assets', express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/views'));

// MENU UPDATE
app.get('/getcategories',function(req,res){
	var categories = require('./server/js/menu.js');
	res.send(categories);
});

//  SPECIFIC CATEGORY PAGE UPDATE
app.get('/getSpecificCategory/:id',function(req,res){
	
	if(req.params.id === "Jump and Run")
		{
			var specificCaategory = require('./server/js/jumpRun');
		}
		else
		{
			var specificCaategory = require('./server/js/'+ req.params.id.toLowerCase());
		}
		var titlesAndThumbs = [];
		
		
		for (var i=0;i < specificCaategory.titles.length;i++)
		{
			for(var j=0; j < specificCaategory.urlThumb.length;j++)
			{
				if(specificCaategory.titles[i].id === specificCaategory.urlThumb[j].id){
					
					titlesAndThumbs.push({'id': specificCaategory.titles[i].id,
										  'title':specificCaategory.titles[i].gTitle,
										  'gThumb':specificCaategory.urlThumb[j].gThumb
					});
				}
			}
		}
		
	res.send(titlesAndThumbs.reverse());
})

// SEARCH FUNCTIONALITY FROM INDEX.HTML
app.get('/searchFunctionality',function(req,res){
	
	var allTitles = [];
	
	var categories = require('./server/js/menu');
	
	for(var i=0; i < categories.length;i++)
	{
		if(categories[i] === "Jump and Run")
		{
			var category = require('./server/js/jumpRun');	
		
		}
		else
		{
			var category = require('./server/js/'+ categories[i].toLowerCase());
		}
		
		for(var j=0; j < category.titles.length;j++)
		{
			category.titles[j]['category'] = categories[i];
			allTitles.push(category.titles[j]);
	
		}
	}
	res.send(allTitles);
})

// get game params from client and send response

app.get('/:category/:id',function(req,res){
	
	
	if(req.params.category === "Jump and Run")
	{
	var category = require('./server/js/jumpRun');
	}
	else{
	var category = require('./server/js/'+ req.params.category.toLowerCase());
	}
	
	var game = {};
	
	for(var i=0;i <category.titles.length;i++)
	{
	      if(category.titles[i].id == req.params.id)
		  {
			  game.title = category.titles[i].gTitle;
		  }
	}
	
	for(var i=0;i <category.description.length;i++)
	{
	      if(category.description[i].id == req.params.id)
		  {
			  game.description = category.description[i].gDescription;
		  }
	}
	
	for(var i=0;i <category.urlGame.length;i++)
	{
	      if(category.urlGame[i].id == req.params.id)
		  {
			  game.url = category.urlGame[i].gUrl;
		  }
	}
	
	for(var i=0;i <category.urlThumb.length;i++)
	{
	      if(category.urlThumb[i].id == req.params.id)
		  {
			  game.thumb = category.urlThumb[i].gThumb;
		  }
	}
	
	if(req.params.category === "Cards")
	{
		var	copyTitles = category.titles.slice();
		
		var relatedCategory = {
						'titles' :shuffle(copyTitles)
						}
	} else
	{
		var copyTitles = category.titles.slice();
		var relatedCategory = {
					'titles' : shuffle(copyTitles).slice(0,5)
		}
	}

	
	var relatedGamestitlesAndThumbs = [];
	for (var i=0;i < relatedCategory.titles.length; i++)
		{
			for(var j=0; j < category.urlThumb.length;j++)
			{
				if(relatedCategory.titles[i].id === category.urlThumb[j].id){
					
					relatedGamestitlesAndThumbs.push({'category' : category.category,
										  'id': relatedCategory.titles[i].id,
										  'title':relatedCategory.titles[i].gTitle,
										  'gThumb':category.urlThumb[j].gThumb
					});
				}
			}
		}
		
	res.send(
		{
		'gameDetails' : game,
		'relatedGames' : relatedGamestitlesAndThumbs
		}
	);
});


app.get('/homeNews',function(req,res){
	
	var categories = require('./server/js/menu');
	var news = [];
	
	for(var k=0; k < categories.length;k++)
			{
		if(categories[k] === "Jump and Run")
		{
			var category = require('./server/js/jumpRun');	
		}
		else
		{
			var category = require('./server/js/'+ categories[k].toLowerCase());
		}
		
		var copyTitles = {'titles': category.titles.slice(category.titles.length -5, category.titles.length)
						 }
		for(var i=0; i < copyTitles.titles.length;i++)
		{
			for(var j=0; j < category.urlThumb.length;j++)
			{
				if(copyTitles.titles[i].id === category.urlThumb[j].id){
					
					news.push({'category': categories[k],
						'id': copyTitles.titles[i].id,
						'title':copyTitles.titles[i].gTitle,
						'thumb':category.urlThumb[j].gThumb
					});
				}
			}
		}
	}
	
	res.send(shuffle(news));
})

var port = process.env.PORT || 8080;
server.listen(port);

//// shuffle elements in array TODO : MOVE//////
		function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

	//// end shuffle elements in array //////

















