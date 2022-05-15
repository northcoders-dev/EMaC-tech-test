const express = require('express');
const apiRouter = require('./routes/api-router');
const recipesRouter = require('./routes/recipes-router');
const server = express();

server.use(express.json());

server.use('/api', apiRouter);
server.use('/api/recipes/', recipesRouter);

server.use((req, res, next) => {
  res.status(404).send({ msg: 'not found!' });
});

server.use((err, req, res, next) => {
  console.log(err, '<< custom error handler');
  res.status(err.status).send({ msg: err.msg });
});

module.exports = server;
