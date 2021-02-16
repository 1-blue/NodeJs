const express = require('express');
const bodyParser = require('body-parser');
const { response, request } = require('express');

//서버생성
const server = express();
server.listen(3000, ()=>{
    console.log('Server Start!!');
});

//미들웨어 추가 (url읽어서 정리후 body에 넣음)
server.use(bodyParser.urlencoded({
    extended:false
}));

//변수선언
let userCounter = 0;    //유저수
const users = [];       //유저정보를 담을 배열

//라우트
//모든유저정보출력
server.get('/user', (req, res)=>{
    res.send(users);
});

//추가
server.post('/user', (req, res)=>{
    const body = req.body;

    if(!body.name)
        return res.status(400).send('name을 보내주세요');
    else if(!body.region)
        return res.status(400).send('region을 보내주세요');

    const name = body.name;
    const region = body.region;

    const data = {
        id:userCounter++,
        name:name,
        region:region
    };
    users.push(data);   //사용자 추가
    res.send(data);
})

//검색
server.get('/user/:id', (req, res)=>{
    const id = req.params.id;

    //데이터찾기
    //filter는 조건에 만족하는 모든요소 다른 배열로 만들어서 반환
    const filtered = users.filter((user)=>user.id == id);

    //응답
    if(filtered.length == 1)
        res.send(filtered[0]);
    else
        res.status(404).send('데이터가 존재하지 않습니다. get');

    console.log("검색");
})

//수정
server.put('/user/:id', (req, res)=>{
    const id = req.params.id;
    let isExist = false;

    //데이터수정
    //forEach는 각배열요소마다 실행.. 즉  users는 객체배열이니까 객체 1개씩 비교하는것
    users.forEach((user)=>{
        if(user.id == id){
            isExist = true;
            if(req.body.name)
                users[id].name = req.body.name;
            if(req.body.region)
                users[id].region = req.bpdy.region;

            res.send(user);
        }
    });

    if(!isExist)
        res.status(404).send('데이터가 존재하지않습니다. put');

    console.log("수정");
})

//삭제
server.delete('/user/:id', (req, res)=>{
    const id = req.params.id;
    let deleteUser = null;

    for(let i = users.length -1; i>=0; i--){
        if(users[i].id == id){
            deleteUser = users[i];
            users.splice(i, 1);
            break;
        }
    }

    if(deleteUser)
        res.send(deleteUser);
    else
        res.status(400).send("데이터가 존재하지 않습니다. delete");

    console.log("delete");
})

