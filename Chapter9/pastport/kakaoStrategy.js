const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_ID,         //카카오에서 발급받은 아이디
        callbackURL: '/auth/kakao/callback',     //결과값을 반환받을 라우터주소
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);      //profile은 카카오에서 보내준 데이터
        try {
            const exUser = await User.findOne({ where: { sns_id: profile.id, provider: 'kakao' } });
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao_account_email,
                    nick: profile.displayName,
                    sns_id: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};