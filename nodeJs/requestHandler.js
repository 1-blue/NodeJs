var fs = require('fs');
/*
fs => 파일을 읽고 쓰는데 사용함
fs.readFile(path, option, callback(err, data));
fs.readFileSync(path, option);
파일을 읽어서 스트링형식으로 반환함
*/


// function create(response){
//     console.log("request handler call create");
//     response.writeHead(200, {'Content-Type':'text/html'});  //정상동작을 알리는 의미
//     response.write("<h1>index.html호출</h1>");
//     response.write(fs.readFileSync('html/index.html', 'utf8'));
//     response.end();   //내용끝을 알림
// }

// function view1(response){
//     console.log("request handler call view1");
//     response.writeHead(200, {'Content-Type':'text/html'});  //정상동작을 알리는 의미
//     response.write("<h1>1.html호출</h1>");
//     response.write(fs.readFileSync('html/1.html', 'utf8'));
//     response.end();
// }

// function view2(response){
//     response.writeHead(200, {'Content-Type':'text/html'});
//     response.write("<h1>2.html호출</h1>");
//     response.write(fs.readFileSync('html/2.html', 'utf8'));
//     response.end();
// }

// function view3(response){
//     response.writeHead(200, {'Content-Type':'text/html'});
//     response.write("<h1>3.html호출</h1>");
//     response.write(fs.readFileSync('html/3.html', 'utf8'));
//     response.end();
// }

function defaultFunc(response){
    console.log("request handler call favicon.ico");
    response.writeHead(200, {'Content-Type':'text/html'});
    response.write("<h1>아무것도 호출되지않음</h1>");
    response.end();
}

function testFunc(response, filename){
    var description = fs.readFileSync('data/'+filename, 'utf8');
    response.writeHead(200);
    response.write(
        `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - HTML</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/?id=HTML">WEB</a></h1>
        <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ol>
        <h2>HTML</h2>
        <p>${description}</p>
        </body>
        </html>
        `
    )
}

var handle = {};    //Object선언 { key:value }
handle['/'] = testFunc;
//handle['/'] = create;
// handle['/index.html'] = create;
// handle['/1.html'] = view1;
// handle['/2.html'] = view2;
// handle['/3.html'] = view3;
handle['noting'] = defaultFunc;

exports.handle = handle;