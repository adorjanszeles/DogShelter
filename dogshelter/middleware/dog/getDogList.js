var requireOption = require('../common').requireOption;

/**
 * Load all the dogs
 * and put them on res.tpl.users
 */
module.exports = function (objectrepository) {

    var dogModel = requireOption(objectrepository, 'dogModel');

    return function (req, res, next) {
        dogModel.find({}, function (err, results) {
            if (err) {
                return next(err);
            }
            res.tpl.dogs = results;
            res.tpl.searchFilter = {'sex': 'default', 'species': 'default'};
            return next();
        });
    };
};