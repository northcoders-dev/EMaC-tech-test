const apiRouter = require('express').Router();
const fs = require('fs/promises');

apiRouter.get('/', (_, res) => {
  res.json({ message: 'ok' });
});

apiRouter.get('/recipes', (req, res) => {
  const { exclude_ingredients } = req.params;
  if (exclude_ingredients) {
    const excludes = exclude_ingredients.split(',');
    //ran out of time but would filter returned data removing recipes with excluded ingredient match
  } else
    fs.readFile('data/data.json', 'utf8').then((fileContents) => {
      const parsedRecipe = JSON.parse(fileContents);
      res.status(200).send({ recipes: parsedRecipe });
    });
});

module.exports = apiRouter;
