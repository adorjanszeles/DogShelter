var express = require('express');
var app = express();

/**
 * .tpl and .error on the res object
 */
app.use(function (req, res, next) {
    res.error = [];
    res.tpl = {};
    return next();
});

/**
 * Include all the routes
 */
require('./routes/outside')(app);

/**
 * The old static server
 */
//app.use('/', express.static(__dirname + '/public'));

/**
 * Standard error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send('The site cannot open...');

    // Flush out the stack to the console
    console.error(err.stack);
});

/**
 * Make server to listen at the specified IP and Port
 */
var server = app.listen(3000, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('DogBook listening at http://%s:%s', host, port);
});