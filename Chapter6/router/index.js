const router = require('express').Router();

router.get('/', (req, res, next) => {
    //res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.json({
        apple : "사과",
        blue : "파란색",
    })
    console.log("123");
})

module.exports = router;