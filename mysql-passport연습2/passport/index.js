const passport = require('passport')
const User = require("../models/user");
const local = require('./localStrategy')

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log('serializeUser');
        done(null, user.email);
    });

    passport.deserializeUser((email, done) => {
        console.log('deserializeUser');
        User.findOne({ where: { email } })
            .then(user => done(null, user))
            .catch(error => done(error));
    });

    local();
}