const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');
const session = {};

//쿠키값 받아서 객체형식으로 변환후 리턴
const parseCookies = (cookie = '') => {
    return cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});
}

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);       //쿠키분석후 객체형식으로 넣음 -> name=apple | { 'name':'apple' }

    if (req.url.startsWith('/login')) {             // url에 /login이 포함되면
        const { query } = url.parse(req.url);       // url에서 쿼리스트링값중 query값만 가져옴 (?뒤에값)
        const { name } = qs.parse(query);           // 쿼리스트링을 객체로 만들것들중 name값만 가져옴
        const uniqueKey = Date.now();               // 쿠키세션과 js페이지에서 공유할 키
        const expires = new Date();                 // 쿠키반환시간을 저장할 변수
        session[uniqueKey] = {                      // 세션값들 저장할 객체
            name,
            expires
        }

        expires.setMinutes(expires.getMinutes() + 1);       //현재시간으로 지정된 날짜 + 분을 리턴함
        res.writeHead(302, {
            Location: '/',      //url주소를 /로 변경
            "Set-Cookie": `session=${uniqueKey}; Expires=${expires.toUTCString()}; HttpOnly; Path=/`   //session에 unique값 넣음
        });
        res.end();
    } else if (cookies.session) {       //세션값이 존재하면, 즉 쿠키를 만들었으면
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${session[cookies.session].name}님 안녕하세요`);           //세션값을 이용해서 웹페이지 화면에 출력
    } else {
        try {
            const data = await fs.readFile('./cookie.html');        //쿠키없을때 로그인화면출력할 html불러오기
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
}).listen(8020, ()=>{
    console.log('8020번 대기중');
})