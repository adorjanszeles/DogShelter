module.exports = function (objectrepository) {

    var userModel = objectrepository.userModel;

    return function (req, res, next) {
        /*
        // Parameters are not right...
        if ((typeof req.body.email === 'undefined') || (typeof req.body.password === 'undefined')){
             return next();
        }

        // If parameters okey, need to find the user
        userModel.find({ email : req.body.email}, function (err,result){
            if ((err) || (!result)){
                res.tpl.error.push('Your email address is not registered!');
                return next();
            }

            // Check the password
            if (result.password !== req.body.password){
                res.tpl.error.push('Password incorrect!');
                return next();
            }

            // If login is okey, we need to save the session
            req.session.id = result.id;

            // Redirect to the index
            return res.redirect('/');
        });
        */
        return next();
    };

};