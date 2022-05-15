const { fetchRecipes, fetchRecipeById } = require('../models/recipes.model');

exports.getRecipes = async (req, res, next) => {
  try {
    let excluded = [];
    const { exclude_ingredients } = req.query;
    if (exclude_ingredients) {
      excluded = exclude_ingredients.split(',');
    }

    const recipes = await fetchRecipes(excluded);

    res.send({ recipes });
  } catch (err) {
    next(err);
  }
};

exports.getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const recipe = await fetchRecipeById(id);

    res.send({ recipe });
  } catch (err) {
    next(err);
  }
};
