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

exports.fetchRecipeById = async (id) => {
  const data = await fs.readFile('./data/data.json');

  let recipes = JSON.parse(data);

  let recipe = recipes.find((currentRecipe) => {
    return currentRecipe.id === id;
  });

  console.log(recipe);

  if (recipe === undefined) {
    return Promise.reject({ status: 404, msg: 'not found!' });
  }

  return recipe;
};

exports.createRecipe = async (imageUrl, instructions, ingredients) => {
  const data = await fs.readFile('./data/data.json');

  let recipes = JSON.parse(data);

  let newRecipe = {
    id: `recipe-${recipes.length + 1}`,
    imageUrl: imageUrl,
    instructions: instructions,
    ingredients: ingredients,
  };

  recipes.push(newRecipe);

  const newData = JSON.stringify(recipes, null, 2);

  await fs.writeFile('./data/data.json', newData, 'utf-8');

  return newRecipe.id;
};
