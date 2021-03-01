// const express = require('express');
// const morgan = require('morgan');
// const dotenv = require('dotenv').config();

// const app = express();
// app.set('port', process.env.PORT);

// app.use(morgan('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// var cb0 = function (req, res, next) {
//     console.log('CB0');
//     next();
// }

// var cb1 = function (req, res, next) {
//     console.log('CB1');
//     next();
// }

// app.get('/', cb0, cb1, function (req, res, next) {
//     console.log('the response will be sent by the next function ...');
//     next();
// }, function (req, res) {
//     res.send('Hello from D!');
// });

// app.use((err, req, res, next) => {
//     console.error(`error : ${err}`);
// });

// app.listen(app.get('port'), () => {
//     console.log(`${app.get('port')}번 대기중`);
// })

