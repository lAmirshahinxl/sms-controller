var express = require('express');
var router = express.Router();
var db = require('../models');


router.post('/' , function (req , res) {
    var token = req.body.token;
    if (token){
        db.User.findOne({token: token})
            .exec(function (error, user) {
                if (error){
                    return res.json({result: 'توکن ارسالی معتبر نمی باشد'});
                }
                if (user){
                    db.Sms.find({parentId: user._id})
                        .exec(function (err, sms) {
                            if (err){
                                return res.json({result: 'مشکلی پیش آمده'});
                            }
                            return res.json(sms);
                        })
                } else {
                    return res.json({result: 'user not found'});
                }
            })
    } else {
        res.json({result: 'مقادیر ورودی را چک بفرمایید'});
    }
})

module.exports = router;