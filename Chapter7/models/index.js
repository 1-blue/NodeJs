const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

//db에 User, Comment 모델넣고
db.User = User;
db.Comment = Comment;

//db와 연동 (static init이 호출되어서 연동됨)
User.init(sequelize);
Comment.init(sequelize);

//다른테이블과 관계를 연결
User.asscoiate(db);
Comment.asscoiate(db);

module.exports = db;