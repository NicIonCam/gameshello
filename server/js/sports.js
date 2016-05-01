	var category = "Sports";
	var sports_titles = require('../data/games/sports/titles.json');
    var sports_description = require('../data/games/sports/description.json');
	var sports_urlGame = require('../data/games/sports/urlGame.json');
	var sports_urlThumb = require('../data/games/sports/urlThumb.json');


module.exports = {
	category : category,
	titles : sports_titles,
	description : sports_description,
	urlGame : sports_urlGame,
	urlThumb : sports_urlThumb
};
