/**
 * Using the template engine render the values into the template
 */
module.exports = function (objectrepository, viewName) {
    return function (req, res) {
        res.locals = req;
        res.render(viewName, res);
    };

};