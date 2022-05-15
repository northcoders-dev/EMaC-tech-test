const fs = require('fs/promises');

exports.fetchRecipes = async (excluded) => {
  const data = await fs.readFile('./data/data.json');
  let recipes = JSON.parse(data);

  if (excluded.length === 0) {
    return recipes;
  }

  const filteredRecipes = recipes.filter((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      excluded.forEach((exclusion) => {
        ingredient !== exclusion;
      });
    });
  });

  return filteredRecipes;
};
