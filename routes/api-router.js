const res = require('express/lib/response');
const recipes = require('../data/data.json');

const apiRouter = require('express').Router();

apiRouter.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

module.exports = apiRouter;
