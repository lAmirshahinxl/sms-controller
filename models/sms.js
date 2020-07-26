var mongoose = require('mongoose');
var SmsSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
        unique: false
    },
    date:{
        type: String,
        required: true,
        unique: false
    },
    senderPhone:{
        type: String,
        required: true,
        unique: false
    },
    parentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required : true,
        unique: false
    }
});

var sms = mongoose.model('sms' , SmsSchema);
module.exports = sms;