const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('audio'));

app.get('/star', (request, response)=>{
    fs.readFile('C:\\Users\\ghksa\\OneDrive\\바탕 화면\\Git\\NodeJs\\nodeJs\\audio\\밤하늘의 별을_경서.mp3', (err,data)=>{
        response.set("Content-Type", "audio/mpeg");
        response.send(data);
    })
});

app.listen(52273, ()=>{
    console.log('start!!');
})