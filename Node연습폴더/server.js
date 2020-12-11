//서버오픈

const http = require('http');
const { runInContext } = require('vm');
const url = require('url');

function start(route, handle){
    function onCreateServer(req, res){
        var pathname = url.parse(req.url, true).pathname;
        var id = url.parse(req.url, true).query.id;
        var pw = url.parse(req.url, true).query.pw;
        if(id === 'apple' && pw === 'blue'){
            pathname = 'success';
        }

        console.log("server3000호출");
        route(handle, res, pathname);
    };
    
    http.createServer(onCreateServer).listen(3000, function(){
        console.log("3000 start!");
    })
}

exports.start = start;