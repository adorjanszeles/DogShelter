var requireOption = require('../common').requireOption;
var crypto = require('crypto');

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        var user = undefined;

        userModel.findOne({_id: req.param('userId')}, function(err, result){
            if (err) {
                return next(err);
            }

            if(result != undefined) {
                user = result;

                if(req.body.password == '') {
                    res.error.push('Passwords required!');
                    return next();
                }

                if(req.body.password != req.body.passwordAgain) {
                    res.error.push('Passwords not the same!');
                    return next();
                }

                var sha = crypto.createHash('sha1');
                sha.update(req.body.password);

                user.password = sha.digest('hex');
                user.email = req.body.email;
                user.phone = req.body.phone;
                user.address = req.body.address;

                user.save(function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    return res.redirect('/userDetails/' + result.id);
                });
            } else {
                user = new userModel();

                if(req.body.password == '') {
                    res.error.push('Passwords required!');
                    return next();
                }

                if(req.body.password != req.body.passwordAgain) {
                    res.error.push('Passwords not the same!');
                    return next();
                }

                var sha = crypto.createHash('sha1');
                sha.update(req.body.password);

                user.userName = req.body.userName;
                user.password = sha.digest('hex');
                user.email = req.body.email;
                user.phone = req.body.phone;
                user.address = req.body.address;

                user.save(function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    return res.redirect('/userDetails/' + result.id);
                });
            }
        });
    };
};