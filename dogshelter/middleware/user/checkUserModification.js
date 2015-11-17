var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        userModel.findOne({_id: req.param('userId')}, function (err, result) {
            if (err || (!result)) {
                res.error.push('Your user name is not registered!');
                return res.redirect('/login');
            }

            if (result._id != req.session.userId){
                res.error.push('Its not your account!');
                req.session.userId = undefined;
                return res.redirect('/login');
            }

            res.tpl.user = result;
            return next();
        });
    };
};