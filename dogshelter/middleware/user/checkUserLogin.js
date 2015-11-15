var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        // Parameters are not right...
        if ((typeof req.body.userName === 'undefined') || (typeof req.body.password === 'undefined')){
            return next();
        }

        userModel.findOne({'userName': req.body.userName}, function (err, result) {
            if (err || (!result)) {
                res.tpl.error.push('Your user name is not registered!');
                return next();
            }

            // Check the password
            if (result.password != req.body.password){
                res.tpl.error.push('Password incorrect!');
                return next();
            }

            req.session.userId = result._id;
            return next();
        });
    };
};