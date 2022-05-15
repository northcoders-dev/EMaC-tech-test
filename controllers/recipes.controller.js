const { fetchRecipes } = require('../models/recipes.model');

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
