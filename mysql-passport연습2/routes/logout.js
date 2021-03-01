const router = require('express').Router();

router.get('/', (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;