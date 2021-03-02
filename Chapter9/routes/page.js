const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./login');
const { Post, User, Hashtag } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;     //passport.deserializeUser()실행시 req.user에 user정보에 대한 값이 들어감
    res.locals.followerCount = req.user ? req.user.Followers.length : 0;
    res.locals.followingCount = req.user ? req.user.Followings.length : 0;
    res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
    next();
});

// 로그인한 상태면 접속 아니면 기본페이지에 쿼리스트링으로 error정보 전달.. (isLoggedIn참고)
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird' });
});

// 로그인안한 상태면 접속 아니면 기본페이지에 쿼리스트링으로 error정보 전달.. (isNotLoggedIn참고)
router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', { title: '회원가입 - NodeBird' });
});

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick'],
            },
            order: [['created_at', "DESC"]],
        });

        const twits = [];
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 해쉬태그검색
router.get('/hashtag', isLoggedIn, async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {
        return res.redirect('/');
    }

    try {
        const hashtag = await Hashtag.findOne({ where: { title: query } });
        console.log(`hashtag====${JSON.stringify(hashtag)}`);
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts();
            console.log(`posts====${JSON.stringify(posts)}`);
        }

        return res.render('main', {
            title: `${query} | NodeBird`,
            twits: posts,
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;