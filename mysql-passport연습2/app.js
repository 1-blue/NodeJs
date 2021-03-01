const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const nunjucks = require('nunjucks');
const passport = require('passport');
const fs = require('fs');

const { sequelize } = require('./models');
const mainRouter = require('./routes/main');
const authRouter = require('./routes/auth');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const uploadRouter = require('./routes/upload');
const passportConfig = require('./passport');

const app = express();

app.set('port', 3000);
nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

try{
    fs.readdirSync('uploads');
} catch(err) {
    console.log("uploads폴더 생성");
    fs.mkdirSync('uploads');
}

passportConfig();

sequelize.sync({ force: false })
    .then(() => {
        console.log('DB연결성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/upload', uploadRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.error(`app의 error : ${error}`);
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 대기중`);
});