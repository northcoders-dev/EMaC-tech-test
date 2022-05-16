const server = require('express')();
const apiRouter = require('./routes/api');

server.use('/api', apiRouter);
server.use('/api/recipes', apiRouter);

module.exports = server;
