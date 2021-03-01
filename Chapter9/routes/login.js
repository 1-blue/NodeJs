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