//실행부분
const fs = require("fs");

function index(res, pathname){
    res.writeHead(200);
    res.write(
    `
    <!doctype html>
    <html>
    <head>
    <title>WEB1 - ${pathname}</title>
    <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/DEFAULT">WEB</a></h1>
    <ol>
        <li><a href="/HTML">HTML</a></li>
        <li><a href="/CSS">CSS</a></li>
        <li><a href="/JavaScript">JavaScript</a></li>
    </ol>
    <h2>${pathname}</h2>
    <p>${fs.readFileSync('data/' + pathname, 'utf8')}</p>
    </body>
    </html>
    `
    );
    res.end();
};

function error(res){
    res.writeHead(200);
    res.write("<h1>경로오류</h1>");
    res.end();
};

var handle = {};
handle['/DEFAULT'] = index;
handle['/HTML'] = index;
handle['/CSS'] = index;
handle['/JavaScript'] = index;
handle['success'] = index;
handle['error'] = error;

exports.handle = handle;