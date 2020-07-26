var express = require('express');
var router = express.Router();
var db = require('../../models');

router.get('/' , function (req, res) {
    req.session.test = 'test';
    console.log(req.session.test)
    res.render('login');
})

router.post('/' , function (req, res) {
    var username = req.body.username.toLowerCase();
    var password = req.body.password;

    console.log(username)
    console.log(password)

    if (username && password){
        db.User.aut(username , password , function (error , user) {
            if (error){
                return res.render('login' , {text: error})
            }
            if (user){
                req.session.userId = user._id;
                return res.redirect('/profileWeb');
            } else {
                return res.render({text: 'کاربر مورد نظر یافت نشد'});
            }
        })
    } else {
        res.render('loginWeb', {text: 'وارد کردن نام کاربری و رمزعبور اجباری می باشد'});
    }
})
module.exports = router;