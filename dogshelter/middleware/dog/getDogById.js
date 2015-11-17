var requireOption = require('../common').requireOption;

/**
 * Get the dog instance from database by id.
 */
module.exports = function (objectrepository) {

    var dogModel = requireOption(objectrepository, 'dogModel');

    return function (req, res, next) {
        dogModel.findOne({_id: req.param('dogId')}, function (err, result) {
            if ((err) || (!result)) {
                return next(err);
            }

            res.tpl.dog = result;
            return next();
        });
    };
};