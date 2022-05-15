const recipesRouter = require('express').Router();
const {
  getRecipes,
  getRecipeById,
} = require('../controllers/recipes.controller');

recipesRouter.get('/', getRecipes);
recipesRouter.get('/:id', getRecipeById);

module.exports = recipesRouter;
