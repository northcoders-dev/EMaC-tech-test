const server = require('express')();
const apiRouter = require('./routes/api');

server.use('/api', apiRouter);

server.use((req, res, next) => {
  res.status(404).send({ msg: 'not found!' });
});

module.exports = server;
