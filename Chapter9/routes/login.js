const User = require('../models/user');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {        // 로그인중일때 true반환
        next();
    } else {
        res.status(403).send('로그인필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        req.redirect(`/?error=${message}`);
    }
};

// 닉네임중복체크 : 중복시 true반환
exports.nicknameOverlapCheck = async (nick) => {
    const exUserNick = await User.findOne({ where: { nick } });
    if (exUserNick) {
        return true;
    }
    return false;
}

exports.emailOverlapCheck = async (email) => {
    const exUserEmail = await User.findOne({ where: { email } });
    if (exUserEmail) {
        return true;
    }
    return false;
}