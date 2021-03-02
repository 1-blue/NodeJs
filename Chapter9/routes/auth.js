const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./login');
const User = require('../models/user');

const router = express.Router();

// local 회원가입
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;     //front에서 전달한 정보 사용
    try {
        // 이메일 중복 확인
        const exUserEmail = await User.findOne({ where: { email } });
        if (exUserEmail) {
            return res.redirect('/join?error=email_exist');       //입력된 email이 존재하면 원래페이지로... 이메일 중복이므로 회원가입불가능
        }

        // 닉네임 중복 확인
        const exUserNick = await User.findOne({ where: { nick } });
        if (exUserNick) {
            return res.redirect('/join?error=nick_exist');       //입력된 nick이 존재하면 원래페이지로... 이메일 중복이므로 회원가입불가능
        }

        const hash = await bcrypt.hash(password, 12);       //암호화
        await User.create({         //DB에 User테이블생성
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');   //원래페이지로
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// local 로그인
// passport가 req.login, req.logout매서드 생성함
router.post('/login', isNotLoggedIn, (req, res, next) => {
    // local은 id와 password로 로그인하는 전략을 사용하겠다는 의미
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {      //authError값이 존재하면 서버쪽에서 넣어준값 서버쪽에러임
            console.error(authError);
            return next(authError);
        }
        if (!user) {      //user값이 존재하지않으면 로그인에러
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {        // req.login(user, callback)에 첫번째 인수에 값을주면 req.login내부에서 passport.serializeUser()를 호출하면서 user객체를 넘겨줌
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);     //미들웨어내부에 미들웨어를 실행할때는 내부에서 (req, res, next)붙여주면됨
});

// 프로필 정보변경.. 일단 닉네임만 바꿀수있다는 전제로 (id나 pw는 다른방법으로 만들기 보안상문제로)
router.post('/update', isLoggedIn, async (req, res, next) => {
    const { nick } = req.body;     //front에서 전달한 정보 사용

    const userOverlap = await User.findOne({ where: { nick } });  // 이름중복유저찾고

    if (userOverlap) {
        return res.redirect('/infoChange?error=nick_exist');       //입력된 nick이 존재하면 원래페이지로... 이메일 중복이므로 회원가입불가능
    }

    const exUser = await User.findOne({ where: { id: req.user.id } });  // 현재로그인한 유저찾고

    // update(수정할내용, 조건)
    exUser.update({
        nick,
    });

    res.redirect('/');
});

// local 로그아웃
router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();           //req.user객체 제거
    req.session.destroy();  //session값 제거 (user.id값넣어둔거)
    //res.clearCookie('connect.sid')    //쿠키제거.. 옵션값확인하고 제거해야함
    res.redirect('/');      //기본페이지로
});

// 카카오 로그인
router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;