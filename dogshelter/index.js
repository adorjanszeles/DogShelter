var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var busboy = require('connect-busboy');

app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/dogshelter');

/**
 * Session above all
 */
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 600000
    },
    resave: true,
    saveUninitialized: false,
    userId: String,
    userName: String
}));

/**
 * Parse parameters in POST
 */
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(busboy());

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