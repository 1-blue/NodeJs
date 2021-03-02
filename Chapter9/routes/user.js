const router = require('express').Router();
const { isLoggedIn } = require('./login');
const User = require('../models/user');

/**
 * 예시로 A유저가 B유저를 follow하면
 * DB에서 A유저를 찾고 A유저.addFollowing(B유저아이디)하면
 * User.belongsToMany()로 설정해놓은것으로 인해
 * follow테이블에 following_id에 b유저아이디
 * follow테이블에 follower_id에 a유저아이디
 * 값이 들어감 (a유저가 b유저를 팔로잉하고있다. 즉 a가 following b는 follower)
 */
router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });    //현재유저를찾고
        if (user) {
            await user.addFollowing(parseInt(req.params.id, 10));       //현재유저가 following한사람을 추가
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/:id/unfollow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });    //현재유저를찾고
        if (user) {
            await user.removeFollowing(parseInt(req.params.id, 10));       //현재유저가 following한사람을 삭제
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;