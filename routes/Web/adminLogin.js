var express = require('express');
var router = express.Router();
var db = require('../../models');


router.get('/' , function (req,res) {
    return res.render('adminLogin');
})

router.post('/' , function (req , res) {
    var username= req.body.usernameAdmin;
    var password= req.body.passwordAdmin;

    if (username && password){
        db.User.findOne({username : username , role: 2}).exec(function (error, result) {
            if (error){
                throw error;
            }
            if (result){
                db.User.aut(result.username ,password , function (err , user) {
                    if (err){
                        return res.render('adminLogin' , {message: err});
                    }
                    if (user){
                        req.session.adminId = user._id;
                        return res.redirect('/adminHome');
                    } else {
                        return res.render('adminLogin', {message: 'کاربر مورد نظر یافت نشد'});
                    }
                })
            } else {
                return res.render('adminLogin' , {message: 'این اکانت وجود ندارد'});
            }
        })
    } else {
        return res.render('adminLogin' , {message: 'وارد کردن تمام فیلد ها اجباری می باشد'});
    }
})
module.exports = router;