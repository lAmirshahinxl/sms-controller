var express = require('express');
var router = express.Router();
var { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
var db = require('../models');


router.post('/' , function (req , res) {
    var phoneNumber = req.body.phoneNumber;
    var username = req.body.username;
    var chatId = req.body.chatId;
    var password = req.body.password;

    if (username && password && phoneNumber && chatId)
    {
        bcrypt.hash(password, 10, function (err, hash) {
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
                    return error;
                }
                if (result){
                    result.token = uuidv4();
                    result.save();
                    return res.json({result: 'ثبت نام شما با موفقت انجام شد'})
                } else {
                    return res.json({result: 'مشکلی پیش آمده، دوباره تلاش کنید.'})
                }
            })
        });
    } else {
        res.json({result: 'مقادیر ورودی را چک نمایید'});
    }
})



module.exports = router;