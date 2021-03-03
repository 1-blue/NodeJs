const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = () => {
    // 로그인시 실행되고 req.session에 어떤 데이터를 저장할지 지정하는 함수
    // 콜백의 두번째 매개변수의 매개변수는 에러발생시사용할변수
    // 콜백의 첫번째매개변수에는 user에 대한정보, 세션에 저장할 데이터.. 지금은 id값만 넣어서 나중에 id값을 이용해서 DB에서 데이터 찾아서 사용
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // 위에서 세션에 넣은 데이터가 콜백함수의 첫번째 인수로 들어옴
    // 값이 id값이므로 변수명 id하고 그 값을 이용해서 사용자에 대한 정보를 읽어서 콜백함수에 전달
    // 전달하면 req.user에 user값이 들어가서 사용하면됨
    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { id },
            include: [{
                model: User,
                attributes: ['id', 'nick'],
                as: "Followers"
            }, {
                model: User,
                attributes: ['id', 'nick'],
                as: "Followings"
            }]
        })
            .then(user => {
                done(null, user)
            })
            .catch(err => done(err));
    });

    local();
    kakao();
};