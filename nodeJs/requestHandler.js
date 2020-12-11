const { exception } = require('console');
var fs = require('fs');
/*
fs => 파일을 읽고 쓰는데 사용함
fs.readFile(path, option, callback(err, data));
fs.readFileSync(path, option);
파일을 읽어서 스트링형식으로 반환함
*/

//파일리스트만큼 선택할 수 있는 태그만들기
function getfileList(filelist){
    var list = '<ul>';
    for(var i = 0; i<filelist.length; i++){
        if(!(filelist[i] === 'Default')){
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        }
    }
    list += '</ul>';
    return list;
}

//HTML출력부분 형식 가져오기
function getHtml(filename, description, list){
    return `
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
    `;
}

//실질적으로 페이지 출력
function printPage(response, filename){
    if(filename === undefined){
        filename = "/Default";
    }

    try{            //readdir예외처리.. 여기 예외처리 한번에 할수없는지..? try~catch두개라서 신경쓰임
        fs.readdir('./data', function(error, filelist){
            try{    //readFileSync예외처리
                var description = fs.readFileSync('data/'+ filename, 'utf8');   //파일내용가져오기
                list = getfileList(filelist);
                response.writeHead(200);
                response.end(getHtml(filename, description, list));
            }catch(e){
                errorPage(response, filename, e.path);  //e.path에 오류난 경로가 들어있음
            }
        })
    }catch(e){
        errorPage(response, filename);
    }
}

//에러페이지 출력
function errorPage(response, filename, path){
    response.writeHead(404, {'Content-Type':'text/html'});
    var description =
    `
    <h1>에러페이지입니다</h1>
    <p>잘못된 경로 : ${path}</p>
    정상적인 경로를 입력해주세요
    `
    var list = [];
    response.end(getHtml(filename, description, list));
}

var handle = {};    //Object선언 { key:value }
handle['/'] = printPage;
handle['errorPage'] = errorPage;

exports.handle = handle;