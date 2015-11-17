var requireOption = require('../common').requireOption;

/**
 * Load the dogs and filtering by parameters
 * and put them on res.tpl.users
 */
module.exports = function (objectrepository) {

    var dogModel = requireOption(objectrepository, 'dogModel');

    return function (req, res, next) {
        var parameter = [];
        if(req.body.sexFilter != 'default') {
            parameter.push({'sex': req.body.sexFilter});
        }
        if(req.body.speciesFilter != 'default') {
            parameter.push({'species': req.body.speciesFilter});
        }

        if(!Object.keys(parameter).length) {
            dogModel.find({}, function (err, results) {
                if (err) {
                    return next(err);
                }
                res.tpl.dogs = results;
                res.tpl.searchFilter = {'sex': 'default', 'species': 'default'};
                return next();
            });
        } else {
            dogModel.find({ $and:parameter}, function (err, results) {
                if (err) {
                    return next(err);
                }
                res.tpl.dogs = results;
                res.tpl.searchFilter = {'sex': req.body.sexFilter, 'species': req.body.speciesFilter};
                return next();
            });
        }
    };
};