const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user");
const passport = require('passport');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
    }, async (email, password, done) => {
        console.log('LocalStrategy');
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            if (exUser.password === password) {
                console.log('1');
                done(null, exUser);
            } else {
                done(null, false, { message: "비밀번호오류" });
            }
        } else {
            return done(null, false, { message: "유저존재하지않음" })
        }
    }));
}