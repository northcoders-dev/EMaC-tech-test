const recipesRouter = require('express').Router();
const {
  getRecipes,
  getRecipeById,
  postRecipe,
} = require('../controllers/recipes.controller');

recipesRouter.get('/', getRecipes);
recipesRouter.get('/:id', getRecipeById);

recipesRouter.post('/', postRecipe);

module.exports = recipesRouter;
