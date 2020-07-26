function isCurrentRegisterForm(req, res, next) {
    if (req.body.username && req.body.password &&
    req.body.chatId && req.body.phoneNumber){
        next()
    } else {
        return res.render('register' , {text: 'مقادیر ورودی را چک کنید'});
    }
}

module.exports = isCurrentRegisterForm;