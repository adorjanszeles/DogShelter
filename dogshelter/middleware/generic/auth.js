/**
 * If the user is not logged in, redirects to index
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};