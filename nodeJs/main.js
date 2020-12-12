var server = require('./server');
var router = require('./route');    //출력방식정의
var requestHandler = require('./requestHandler');   //메소드들정의

server.start(requestHandler.handle, router.route);

/*
index -> route()호출
index -> server()호출
server(route())전달.. 출력용 함수포인터(route)를 전송함
*/
/*
동기 : 작업시행중에 다른작업 실행하지않음
비동기 : 작업실행중에도 다른작업 실행함(Async)
node.js는 비동기방식을 선호해서..? 콜백함수를 넣어줘서 작업끝나고 실행함 함수를 인수로 넣어줌
callback함수 : 

NPM : nodejs package Manager
강제종료시 다시 실행시켜줌..
서버파일수정시 업데이트해줌..
pm2 start main.js [--watch]
pm2 monit
pm2 stop main
pm2 log => 변경사항, 에러에 대한것을 표시해줌


*/