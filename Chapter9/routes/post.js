const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./login');

try {
    fs.readdirSync('uploads');
} catch (err) {
    console.log('upload폴더생성');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, 'uploads/')
        },
        filename(req, file, callback) {
            const ext = path.extname(file.originalname);
            callback(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

// 1. isLoginedIn
// 2. /post/img 호출은 어디서하는지
// 이미지업로드
router.post('/img', isLoggedIn, upload.single('img'), (req, res, next) => {
    res.json({ url: `/img/${req.file.filename}` });
});

// 게시글업로드
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
    try{
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        });
        
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        
        /**
         * #이붙은 textcontent가 있으면
         * findOrCreate(없으면 생성 있으면 있는거 값가져옴)
         * #떼고 값가져와서 해쉬태그테이블에서 값비교후 생성
         * 생성한값들의 배열을 result에 넣고
         * 여기서 생각할게 findOrCreate는 [생성한값, boolean]값을 반환해서
         * [[생성한값, boolean], [생성한값, boolean]]형식으로 result에 값이들어감
         * 그래서 밑에서 PostHashtag의 row생성할때 첫번째값으로 생성함
         */
        if(hashtags){
            const result = await Promise.all(
                hashtags.map(tag => {
                    return Hashtag.findOrCreate({
                        where: {title: tag.slice(1).toLowerCase()},
                    })
                }),
            );
            await post.addHashtags(result.map(r =>r[0]));
        }

        res.redirect('/');
    } catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;