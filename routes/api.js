const res = require('express/lib/response');
const recipes = require('../data/data.json');

const apiRouter = require('express').Router();

apiRouter.get('/', (_, res) => {
  res.json({ message: 'ok' });
});

apiRouter.get('/recipes', (_, res) => {
  res.status(200).send(recipes);
});

module.exports = apiRouter;
