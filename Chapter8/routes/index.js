const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find({});      //User출력해보기
        res.render('mongoose', { users });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;