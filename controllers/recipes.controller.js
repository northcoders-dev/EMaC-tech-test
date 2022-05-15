const { fetchRecipes } = require('../models/recipes.model');

exports.getRecipes = async (req, res, next) => {
  try {
    const { exclude_ingredients } = req.query;
    // console.log(req.query, '<< req.query controller');
    // console.log(exclude_ingredients, '<< ex_ing controller');
    const recipes = await fetchRecipes(exclude_ingredients);

    res.send({ recipes });
  } catch (err) {
    next(err);
  }
};
