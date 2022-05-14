const server = require('express')();
const apiRouter = require('./routes/api');

server.use('/api', apiRouter);

server.all('/*', (req, res) => {
	res.status(404).send({ msg: 'Path not found' });
});

module.exports = server;
