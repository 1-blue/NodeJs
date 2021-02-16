const mongoose = require('mongoose');
const MONGODB_URL = 'mongodb+srv://root:1234@nodejs.qmhvw.mongodb.net/NodeJS?retryWrites=true&w=majority'

const express = require('express');
const server = express();

const User = require('./models/User');

server.get('/', (req, res)=>{
    const newUser = new User();
    newUser.email = "test@naver.com";
    newUser.name = "testPlayer";
    newUser.age = 25;

    newUser.save().then((data)=>{
        console.log(user);
        res.json({
            message:"User Create Successfully"
        })
        .catch((err)=>{
            message:'err'
        })
    })
})

server.listen(3000, (err)=>{
    if(err)
        return console.log(err);
})

mongoose.connect(MONGODB_URL, {useNewUrlParser:true}, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Connect to database successfully");
    }
});