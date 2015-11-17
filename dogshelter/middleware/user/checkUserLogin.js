var requireOption = require('../common').requireOption;
var getDogList = require('../dog/getDogList');

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        // Parameters are not right...
        if ((typeof req.body.userName === 'undefined') || (typeof req.body.password === 'undefined')){
            res.error.push('Not enough parameter!');
            return next();
        }

        userModel.findOne({'userName': req.body.userName}, function (err, result) {
            if (err || (!result)) {
                res.error.push('Your user name is not registered!');
                return next();
            }

            // Check the password
            if (result.password != req.body.password){
                res.error.push('Password incorrect!');
                return next();
            }

            req.session.userId = result._id;
            req.session.userName = result.userName;
            getDogList(objectrepository);
            return res.redirect('/');
        });
    };
};