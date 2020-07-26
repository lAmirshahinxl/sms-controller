var express = require('express');
var router = express.Router();
var { v4: uuidv4 } = require('uuid');
var model = require('../models/index');
var userModel = model.User;


// Api Login ------->
router.post('/' , function (req, res) {
    var username = req.body.username.toLowerCase();
    var password = req.body.password;

    if (username && password){
        userModel.aut(username , password , function (error , user) {
            if (error){
                return res.json({result: `${error}`})
            }
            if (user){
                const token = uuidv4();
                user.token = token;
                user.save();
                return res.json({result: 'success' , token: `${token}`})
            } else {
                return res.json({result: `user Not Find`})
            }
        })
    } else {
        res.json({result: 'error'});
    }
})

module.exports = router;