function isLoginAdmin(req, res, next) {
    if (!req.session.adminId){
        return res.redirect('/');
    }
    return next();
}

module.exports = isLoginAdmin;