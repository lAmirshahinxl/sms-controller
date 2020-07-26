function isLogin(req, res, next) {
    if (!req.session.userId){
        return res.redirect('/loginWeb');
    }
    return next();
}

module.exports = isLogin;