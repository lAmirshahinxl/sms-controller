var express = require('express');
var router = express.Router();
var isLogin = require('../../midd/isLogin');
var db = require('../../models');

router.get('/' , isLogin ,function (req, res) {
    db.User.findOne({_id: req.session.userId})
        .exec(function (error, user) {
            if (error){
                return error;
            }
            if (user){
                db.Sms.find({parentId: user._id})
                    .exec(function (err, sms) {
                        if (err){
                            return err;
                        }
                        return res.render('profile', {data: sms});
                    })
            } else {
                return res.json({result: 'user not found'});
            }
        })
})

module.exports = router;