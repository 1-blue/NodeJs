const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

// '/users'인 url이면 실행코드
router.route('/')
    .get(async (req, res, next) => {    // get방식일때
        try {
            const users = await User.findAll();
            res.json(users)
        } catch (err) {
            console.err(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {      // post방식일때
        try {
            const users = await User.create({
                name: req.body.name,
                age: req.body.age,
                married: req.body.married,
            });
            res.status(201).json(users);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.get('/:id/comments', async (req, res, next) => {
    try {
        const comments = await Comment.findAll({
            include: {
                model: User,
                where: { id: req.params.id },
            },
        });
        console.log(`comments : ${comments}`);
        res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;