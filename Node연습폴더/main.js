const server = require('./server');
const router = require('./route');
const handle = require('./handle');

server.start(router.route, handle.handle);