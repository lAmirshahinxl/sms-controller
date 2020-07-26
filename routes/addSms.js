var express = require('express');
var router = express.Router();
var db = require('../models');

//add sms -------------------------------->
router.post('/', function(req, res) {
  var token = req.body.token;
  var text = req.body.text;
  var date = req.body.date;
  var senderPhone = req.body.senderPhone;
  if (token && text && date && senderPhone){
    db.User.findOne({token: token})
        .exec(function (error , user) {
          if (user){
            var sms ={
              text: text,
              date: date,
              senderPhone: senderPhone,
              parentId: user._id
            }
            db.Sms.create(sms , function (error , result) {
              if (error){
                  console.log(error)
                return res.json({result: 'مشکلی پیش آمده است'});
              }
                /*user.smsId = result._id;
                user.save();*/
                return res.json({result: 'ok, saved!'});
            })
          }
          else {
            res.json({result: "توکن ارسالی معتبر نمی باشد"});
          }
        });
  } else {
    res.json({result: 'مقادیر ورودی را چک بفرمایید'});
  }
});

module.exports = router;
