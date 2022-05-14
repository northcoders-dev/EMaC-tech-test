const fs = require('fs/promises');

exports.selectRecipes = (exclude_ingredients) => {
	return fs.readFile('./data/data.json', 'utf8').then((data) => {
		let filteredRecipies = JSON.parse(data);

		//To handle queries
		if (exclude_ingredients) {
			//If multiple quieries turn string to array
			const excluededIngredients = exclude_ingredients.split(',');
			//check each query item
			excluededIngredients.forEach((excludedIng) => {
				//Filter recipes to exclude the query item if come returns true for that item
				filteredRecipies = filteredRecipies.filter(
					(recipe) =>
						!recipe.ingredients.some((obj) => obj.name === excludedIng)
				);
			});
		}
		return filteredRecipies;
	});
};
