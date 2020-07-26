var express = require('express');
var router = express.Router();
var isCurrentRegisterForm = require('../../midd/isCurrentRegisterForm');
const bcrypt = require('bcrypt');
var db = require('../../models');

router.get('/' , function (req, res) {
    req.session.test = 'test';
    console.log(req.session.test)
    return res.render('register');
})

router.post('/' , isCurrentRegisterForm, function (req, res){
    var phoneNumber = req.body.phoneNumber;
    var username = req.body.username;
    var chatId = req.body.chatId;
    var password = req.body.password;

    bcrypt.hash(password, 10, function (err, hash) {
        var user = {
            username: username,
            password: hash,
            phoneNumber: phoneNumber,
            chatId: chatId,
            token: null,
            smsId: null
        };
        db.User.create(user , function (error , result) {
            if (error){
                if (error.code === 11000){
                    return res.render('register' , {text: 'این نام کاربری قبلا ثبت شده است'})
                }
                return res.json({result: 'مشکلی پیش آمده، دوباره تلاش کنید.'})
            }
            if (result){
                req.session.userId = result._id;
                return res.redirect('/profileWeb')
            }
        })
    });

})
module.exports = router;