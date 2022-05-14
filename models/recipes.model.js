const fs = require('fs/promises');

exports.selectRecipes = () => {
	return fs.readFile('./data/data.json', 'utf8').then((data) => {
		return JSON.parse(data);
	});
};
