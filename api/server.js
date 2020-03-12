const express = require('express');
const cors = require('cors');

const blogRouter = require('../data/db-router');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
	res.status(200).json({ api: 'api is running' });
});

server.use('/api/posts', blogRouter);

module.exports = server;
