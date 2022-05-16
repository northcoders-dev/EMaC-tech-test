const apiRouter = require('express').Router();
const fs = require('fs/promises');

apiRouter.get('/', (_, res) => {
  res.json({ message: 'ok' });
});

apiRouter.get('/recipes', (req, res) => {
  fs.readFile('data/data.json', 'utf8').then((fileContents) => {
    const parsedRecipe = JSON.parse(fileContents);
    res.status(200).send({ recipes: parsedRecipe });
  });
});

module.exports = apiRouter;
