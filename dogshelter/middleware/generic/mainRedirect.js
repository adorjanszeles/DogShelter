/**
 * If the user is not logged in, redirects to /login
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof req.session.userId === 'undefined') {
            return res.redirect('/login');
        }
        return next();
    };
};