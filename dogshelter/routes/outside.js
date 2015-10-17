var mainRedirectMW = require('../middleware/generic/mainRedirect');
var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserLoginMW = require('../middleware/login/checkUserLogin');
var renderMW = require('../middleware/generic/render');
var userModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    app.get('/',
        mainRedirectMW(objectRepository),
        renderMW(objectRepository, 'Now just login page'));

    app.get('/userDetails/12',
        renderMW(objectRepository, 'UserDetails'));

    app.get('/dogRegistration',
        renderMW(objectRepository, 'dogRegistration'));

    app.get('/registration',
        renderMW(objectRepository, 'Registration'));

    app.get('/dogDetails/12',
        renderMW(objectRepository, 'degDetails'));

    app.get('/index',
        renderMW(objectRepository, 'dogSearch'));

    app.use('/login',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository),
        renderMW(objectRepository, 'login'));

};