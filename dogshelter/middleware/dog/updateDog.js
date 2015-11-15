var requireOption = require('../common').requireOption;

/**
 * Create (or update) dog if we have the data for it
 * update if we have a res.tpl.dog, create if we don't have
 *  - if there is no title, set tpl.error
 *  - if everything is ok redirect to /dogDetails/:id
 */
module.exports = function (objectrepository) {

    var dogModel = requireOption(objectrepository, 'dogModel');
    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        var dog = undefined;

        dogModel.findOne({_id: req.param('dogId')}, function(err, result){
            if (err) {
                return next(err);
            }

            if(result != undefined) {
                dog = result;

                dog.sex = req.body.sex;
                dog.species = req.body.species;
                dog.details = req.body.details;

                dog.save(function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    return res.redirect('/dogDetails/' + result.id);
                });
            } else {
                dog = new dogModel();

                userModel.findOne({'userName': req.body.userName}, function(err, result) {
                    if (err) {
                        return next(err);
                    }

                    dog.ownerUser = result;
                    dog.ownerUserName = result.userName;
                    dog.callName = req.body.dogName;
                    dog.sex = req.body.sex;
                    dog.species = req.body.species;
                    dog.details = req.body.details;

                    dog.save(function (err, result) {
                        if (err) {
                            return next(err);
                        }

                        return res.redirect('/dogDetails/' + result.id);
                    });
                });
            }
        });
    }
};