const fs = require('fs/promises');

exports.fetchRecipes = async (exclude_ingredients) => {
  const data = await fs.readFile('./data/data.json');
  let recipes = JSON.parse(data);

  if (!exclude_ingredients) {
    return recipes;
  }

  const filteredRecipes = recipes.filter((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredient !== exclude_ingredients;
    });
  });

  console.log(filteredRecipes.length);
  return filteredRecipes;
};
