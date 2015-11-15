var requireOption = require('../common').requireOption;

/**
 * Get the task for the taskid param
 *  - if there is no such task, redirect to /tasks
 *  - if there is one, put it on res.tpl.task
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