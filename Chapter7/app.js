const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

// index.js불러올거라 생략가능... index.js의 db안에서 sequelize값을 가져옴
const { sequelize } = require('./models');

// 라우터받기
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const app = express();

//포트번호 공유데이터에 넣어두고 사용
app.set('port', process.env.PORT || 3000);

//넌적스사용
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

//db연동코드.. sequlize에는 database종류, 사용할 데이터베이스명, 비밀번호등이 들어 있음
sequelize.sync({ force: false })
    .then(() => {
        console.log("DB연결성공");
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//라우터 연결
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

//css파일 호출시 전달
app.get('/sequelize.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sequelize.css'));
})

//애는 어따쓰는건지 모르겠음
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

//에러일때
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 대기중`)
});