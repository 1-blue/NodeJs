const express = require('express');
const bodyParser = require("body-parser");

const server = express();

server.use(bodyParser.json());

const users = [
    {
        id:"apple",
        name:"a",
        email:"a@naver.com"
    },
    {
        id:"blue",
        name:"b",
        email:"b@naver.com"
    }
];

server.get("/api/user", (req, res)=>{
    res.json(users);
    console.log("T");
})

server.get("/api/user/:id", (req, res)=>{
    const user = users.find(u=>{
        return u.id === req.params.id;
    });
    if(user){
        res.json(user);
    }else{
        res.status(404).json({errorMessage:"User was not found"});
    }
})

server.post("/api/user", (req, res)=>{
    console.log(req.body);
    users.push(req.body);
    res.json(users);
})

server.listen(3000, () => {
    console.log("Start");
});

