var requireOption = require('../common').requireOption;
var getDogList = require('../dog/getDogList');

/**
 * Delete dog instance from the database and redirect to /.
 */
module.exports = function (objectrepository) {

    var dogModel = requireOption(objectrepository, 'dogModel');

    return function (req, res, next) {
        dogModel.remove({_id: req.param('dogId')}, function (err, result) {
            if ((err) || (!result)) {
                return next(err);
            }
            getDogList(objectrepository);
            return res.redirect('/');
        });
    };
};