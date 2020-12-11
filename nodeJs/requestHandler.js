var fs = require('fs');
/*
fs => 파일을 읽고 쓰는데 사용함
fs.readFile(path, option, callback(err, data));
fs.readFileSync(path, option);
파일을 읽어서 스트링형식으로 반환함
*/

/*
             <ol>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=JavaScript">JavaScript</a></li>
                </ol>
*/

function printPage(response, filename){
    if(filename === undefined){
        filename = "/Default";
    }

    try{
        fs.readdir('./data', function(error, filelist){
            var description = fs.readFileSync('data/'+ filename, 'utf8');   //파일내용가져오기
            //파일리스트만큼 태그만들기
            var list = '<ul>';
            for(var i = 0; i<filelist.length; i++){
                if(!(filelist[i] === 'Default')){
                    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
                }
            }
            list += '</ul>';

            response.writeHead(200);
            response.write(
                `
                <!doctype html>
                <html>
                <head>
                <title>WEB1 - ${filename}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/?id=Default">WEB</a></h1>
                ${list}
                <h2>${filename}</h2>
                <p>${description}</p>
                </body>
                </html>
                `
            )
        })
    }catch(e){
        errorPage(response, filename);
    }
}

function errorPage(response, pathname, filename){
    console.log("request handler call favicon.ico");
    response.writeHead(404, {'Content-Type':'text/html'});
    response.write(
        `
        <!doctype html>
        <html>
        <head>
        <title>FileName : Error404</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1>Error페이지...</h1>
        <p>들어온 경로 : ${pathname}</p>
        <p>들어온 파일명 : ${filename}</p>
        </body>
        </html>
        `
    )
    response.end();
}

var handle = {};    //Object선언 { key:value }
handle['/'] = printPage;
handle['errorPage'] = errorPage;

exports.handle = handle;