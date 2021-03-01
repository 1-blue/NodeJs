const router = require('express').Router();

router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        const { name } = req.user;
        res.render('main.html', { title: "main", name });
    } else {
        res.render('main.html', { title: "main", isLogin: true });
    }
});

module.exports = router;