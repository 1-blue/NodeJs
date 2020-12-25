//서버오픈
const http = require('http');
const url = require('url');

function Start(handle, route){
    function onRequest(rq, rp){
        var pathname = url.parse(rq.url).pathname;
        route(handle, pathname, rp);
    }

    http.createServer(onRequest).listen(3000);

    console.log("Server Start!");
}

module.exports.Start = Start;