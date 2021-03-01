const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
    res.render('auth.html', { title: "auth" });
});

router.post('/', (req, res, next) => {
    const { name, email, password } = req.body;
    console.log(name);
    User.create({
        name,
        email,
        password,
    });

    res.redirect('/');
});

module.exports = router;