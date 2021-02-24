const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
//app.use('/', express.static('public'));
app.use(express.json());

app.set('port', 3000);

//폴더 없으면 폴더생성
if(!fs.existsSync('./upload'))  fs.mkdirSync('./upload');

//서버 호출시 쿠키생성 및 보내기
const createCookieRouter = require('./router/createCookie.js')
app.use(createCookieRouter);

//기본 웹페이지
// const indexRouter = require('./router/index.js')
// app.use(indexRouter);

app.get('/', (req, res) => {
    res.json({
        apple : "사과",
        blue : "파란색",
    })
    console.log("123");
});

// //쿠키삭제페이지
// app.get('/cookie-delete', (req, res, next) => {
//     res.send(`${req.cookies.cookie}삭제`);
//     res.clearCookie("cookie", req.cookies.cookie);
// })

// //multer
// const upload = multer({
//     storage: multer.diskStorage({
//         destination(req, file, cb) {
//             cb(null, './upload/');
//         },
//         filename(req, file, cb) {
//             const ext = path.extname(file.originalname);
//             cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//         }
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 },
// });

// app.post('/uploadFile1', upload.single('f'), (req, res) => {
//     console.log("file success");
//     console.log(`req.file : ${Object.entries(req.file)}`);
//     res.send(`req.file : ${Object.entries(req.file)}`);
// })

//페이지접속 대기중
app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 대기중`);
})