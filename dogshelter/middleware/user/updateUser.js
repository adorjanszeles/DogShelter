var requireOption = require('../common').requireOption;

/**
 * Create (or update) User if we have the data for it
 * update if we have a res.tpl.dog, create if we don't have
 *  - if there is no title, set tpl.error
 *  - if everything is ok redirect to /userDetails/:id
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        var user = undefined;
        if (typeof res.tpl.dog !== 'undefined') {
            user = res.tpl.user;
        } else {
            user = new userModel();
        }

        user.userName = req.body.name;
        user.password = req.body.password;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.address = req.body.address;

        user.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return res.redirect('/userDetails/' + result.id);
        });
    };
};