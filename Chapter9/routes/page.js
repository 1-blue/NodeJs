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

// 정보변경페이지
router.get('/infoChange', isLoggedIn, (req, res) => {
    res.render('infoChange', { title: '정보변경 - NodeBird' });
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

        //res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];

        let userLike = null;    //유저가 좋아요누른 포스트 찾은 변수
        let postLike = null;    //좋아요가 눌려진 포스트 찾는 변수

        if (req.user) {
            userLike = await User.findOne({
                where: { id: req.user.id },
                include: {
                    model: Post,
                    attributes: ['id'],
                    as: "Liked"
                }
            });
            userLike = userLike.Liked.map(f => f.id);

            //전체포스트와 좋아요 누른 유저정보 추출
            postLike = await Post.findAll({
                include: {
                    model: User,
                    attributes: ['id'],
                    as: "Liking"
                }
            });
        }

        const twits = [];
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
            likeList: userLike,
            postLike,
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
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts();
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