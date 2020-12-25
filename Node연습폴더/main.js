//전체관리
var server = require('./server');
var router = require('./route');
var handler = require('./handle');

server.Start(handler.handle, router.route);