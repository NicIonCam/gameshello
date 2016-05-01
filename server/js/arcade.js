	var category = "Arcade";
	var arcade_titles = require('../data/games/arcade/titles.json');
    var arcade_description = require('../data/games/arcade/description.json');
	var arcade_urlGame = require('../data/games/arcade/urlGame.json');
	var arcade_urlThumb = require('../data/games/arcade/urlThumb.json');


module.exports = {
	category : category,
	titles : arcade_titles,
	description : arcade_description,
	urlGame : arcade_urlGame,
	urlThumb : arcade_urlThumb
};
