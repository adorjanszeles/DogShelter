var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        userModel.findOne({_id: req.param('userId')}, function (err, result) {
            if (err || (!result)) {
                return res.redirect('/errorPage/Your user name is not registered!');
            }

            if (result._id != req.session.userId){
                return res.redirect('/errorPage/Its not your account!');
            }

            res.tpl.user = result;
            return next();
        });
    };
};