var express = require('express');
var router = express.Router();
var db = require('../../models');
var isLoginAdmin = require('../../midd/isLoginAdmin');
var bcrypt = require('bcrypt');
//admin home
router.get('/', isLoginAdmin , function (req,res) {
    //TODO 
    return res.render('adminHome');
})

//when click on add user run this action
router.post('/addUser' , isLoginAdmin, function (req,res) {
    var phoneNumber = req.body.data.phoneNumber;
    var username = req.body.data.username;
    var chatId = req.body.data.chatId;
    var password = req.body.data.password;

    if (username && password && phoneNumber && chatId )
    {
        if (password.length >6 && phoneNumber.length === 11 && chatId.length ===10 &&
            !isNaN(phoneNumber) && !isNaN(chatId)){
            bcrypt.hash(password, 10, function (err, hash) {
                if (err){
                    return err;
                }
                var user = {
                    username: username,
                    password: hash,
                    phoneNumber: phoneNumber,
                    chatId: chatId,
                    role: 1,
                    token: null,
                    smsId: null
                };
                db.User.create(user , function (error , result) {
                    if (error){
                        if (error.code === 11000){
                            return res.json({status: '0', result: 'این نام کاربری قبلا ثبت شده است'});
                        }
                        return res.json({status: '0', result: error})
                    }
                    if (result){
                        result.save();
                        return res.json({status: '1', result: 'کاربر با موفقیت ثبت شد'})
                    } else {
                        return res.json({status: '0', result: 'مشکلی پیش آمده، دوباره تلاش کنید.'})
                    }
                });
            });
        } else{
            return res.json({status: '0', result: 'مقادیر ورودی را چک نمایید'});
        }
    } else {
        return res.json({status: '0', result: 'مقادیر ورودی را چک نمایید'});
    }
})

module.exports = router;