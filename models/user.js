const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    phoneNumber:{
        type: String,
        trim: true,
        required: true
    },
    chatId:{
        type: Number,
        maxlength: 10,
        trim: true,
        required: true
    }
    ,
    username:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    token:{
        type: String,
        unique: false
    },
    smsId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sms',
        unique: false,
        required: false
    },
    role:{
        type: Number, //admin = 2 , user = 1
        unique: false,
        required: true
    }

});


UserSchema.statics.aut = function(username , password , callback){

    this.findOne({username: username})
        .exec(function(err , myUser){
            if (err){
                return callback(err);
            }
            if (myUser){
                bcrypt.compare(password , myUser.password, function(error , res){
                    if (error){
                        return callback(error);
                    }
                    if (res){
                        return callback(null, myUser);
                    } else {
                        var er = new Error('password not match');
                        return callback(er);
                    }
                });
            }
            if (!myUser){
                return callback('user not found' , null);
            }

        })
}

/*
UserSchema.statics.saveHash = function (username , password, phoneNumber, chatId, callback) {
    bcrypt.hash(password, 10, function(error, hash){

        if (error){
            return error;
        }

        var us = {
            username: username,
            password: hash,
            phoneNumber: phoneNumber,
            chatId: chatId,
            token: null,
            smsId: null
        };
        this.create(us).exec(function (err , result) {
            if (err){/!*
                if (error.code === 11000){
                    return res.json({result: 'این نام کاربری قبلا ثبت شده است'});
                }*!/
                return callback(err);
            }
            if (result){
                return callback(null, result);
            } else {
                return callback(null , null);
            }
        })
    });
}*/
var user = mongoose.model('user' , UserSchema);
module.exports = user;