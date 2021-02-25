const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();

const app = express();
app.set('port', process.env.PORT);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use((err, req, res, next) => {
    console.error(`error : ${err}`);
});

app.listen(app.get('port'), () => {
    console.log(`${process.env.MESSAGE}`);
    console.log(`${app.get('port')}번 대기중`);
})