var http = require('http');
var url = require('url');

function start(handle, route){
  //createServer에 인수로 넣을 함수
  //서버 구동시 실행할 내용을 작성
  function onRequest(request, response){
    console.log("input Server localhost:3000");   //서버 호출시 실행
    var pathname = url.parse(request.url).pathname;   //pathname => 포트번호이후 QueryString이전 문자열
    var queryString = url.parse(request.url, true).query;   //url.parse(request.url, bool),, true->객체형식, false->문자열형식
    var filename = queryString.id;
    console.log(filename);
    route(handle, pathname, response, filename);
  }

  var server = http.createServer(onRequest);    //서버생성.. 실행방식을 매개변수로 전달

  server.listen(3000, function(){               //서버에서 응답대기
    console.log("start Server localhost:3000");
  })
}

exports.start = start;

/*
http://test.org:3000/main?id=HTML&page=12
http : 통신규약
test.org : 도메인주소(host)
3000 : port번호
main : path
? : 쿼리스트링앞에 적어줘야할 약속된 문자
= : 이름과 값을 구분하는 약속된 문자
& : 쿼리스트링의 문자를 구분하는 약속된 문자
*/