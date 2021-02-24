const router = require('express').Router();

router.use((req, res, next) => {
    console.log("시작.. 쿠키생성");
    res.cookie("cookie", "blue-cookie", {
        expires: new Date(Date.now() + 10000),
        httpOnly: true,
    });
    next();
})

module.exports = router;