const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',     //req.body의 속성명을 적어주면그값이 new LocalStrategy()의 두번째 인수의 매개변수로 들어감
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const exUser = await User.findOne({ where: { email } });        //email을 이용해서 users row 데이터를 얻고
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);     //비밀번호 비교
                if (result) {
                    done(null, exUser);     //user정보 전달 done() === passport.authenticate()
                } else {
                    done(null, false, { message: "비밀번호가 일치하지 않습니다." });
                }
            }
            else{
                done(null, false, { message: "가입되지않은 유저입니다." });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};