var server = require('./server');
var router = require('./route');    //출력방식정의
var requestHandler = require('./requestHandler');   //메소드들정의

server.start(requestHandler.handle, router.route);

/*
index -> route()호출
index -> server()호출
server(route())전달.. 출력용 함수포인터(route)를 전송함
*/