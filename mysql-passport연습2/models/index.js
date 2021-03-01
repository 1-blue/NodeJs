const Sequelize = require('sequelize');

const db = {};

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

db.sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user');

db.User.init(db.sequelize);

db.User.associate();

module.exports = db;