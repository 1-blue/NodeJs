const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터베이스대용으로 사용

http.createServer(async (req, res) => {     //서버생성
    try {
        if (req.method === 'GET') {         //get방식으로
            if (req.url === '/') {          //url주소가 없으면
                const data = await fs.readFile('./restFront.html');     //restFront.html파일 받아서
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); 
                return res.end(data);       //restFront.html파일 클라이언트에게 전송
            } else if (req.url === '/about') {      //url주소가 /about이면
                const data = await fs.readFile('./about.html');         //about.html파일 받아서
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(data);               //about.html파일 전송
            } else if (req.url === '/users') {      //위와같음
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });  //json형식으로
                return res.end(JSON.stringify(users));      //json -> string변경후 전송
            }
            /**
             * 여기서 궁금한게 js파일이나 css파일은 호출한적이 없는데 어떻게 호출되는건지..?
             * html파일에서 link나 script태그로 호출하고 있는데 거기서 호출하니까 호출되는건지?
             * 
             * res.end(data)형식으로 보냈는데 data에 css나 js파일의 코드가 적혀있는데 end로 보내면 end는 그냥 text형식으로 보내는거 아닌지?
             * 그러면 data가 무슨값인지도 모르는 어떤방식으로 코드인지알고 읽는건지?
             * 답 : css파일을 호출할 때 마다 불러와서 html에 바로적용하는거 맞는건가?
             */
            try {
                console.log(`url : ${req.url}`);
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            } catch (err) {
                // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
            }
        } else if (req.method === 'POST') {
            if (req.url === '/user') {
                let body = '';
                // 요청의 body를 stream 형식으로 받음
                req.on('data', (data) => {
                    body += data;
                });
                // 요청의 body를 다 받은 후 실행됨
                return req.on('end', () => {
                    const { name } = JSON.parse(body);      //{"name" : "내용"} 형식으로 전달된걸 JSON.parse()를 이용해서 name에 내용을 넣음
                    const id = Date.now();                  //입력받은 시간을 key값으로 사용
                    users[id] = name;
                    res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('ok');
                });
            }
        } else if (req.method === 'PUT') {
            if (req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2];
                let body = '';
                req.on('data', (data) => {
                    body += data;
                });
                return req.on('end', () => {
                    console.log('PUT 본문(Body):', body);
                    users[key] = JSON.parse(body).name;
                    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                    return res.end('ok');
                });
            }
        } else if (req.method === 'DELETE') {
            if (req.url.startsWith('/user/')) {         //req.url이 /user/로 시작하면
                const key = req.url.split('/')[2];      //2번째 /부터 짜르고 key에 넣고
                delete users[key];                      //해당하는값삭제
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                return res.end('ok');
            }
        }
        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
})
    .listen(8082, () => {
        console.log('8082번 포트에서 서버 대기 중입니다');
    });