const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('login.html', { title: "login" });
});

router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        console.log('passport.authenticate');
        if (err) {
            return next(err); 
        }
        if (!user) { 
            return res.redirect(`/?loginError=${info.message}`); 
        }
        return req.login(user, function (err) {
            console.log('req.login');
            if (err) { 
                console.log(`req.login의 error : ${err}`);
                return next(err); 
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

module.exports = router;