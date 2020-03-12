const server = require('./api/server');

const PORT = 5000;
server.listen(PORT, () => {
	console.log(`Port running on localhost:${PORT}`);
});
