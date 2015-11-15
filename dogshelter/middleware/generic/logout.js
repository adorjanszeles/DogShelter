/**
 * Logout
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        req.session.userId = undefined;
        return res.redirect('/login');
    };

};