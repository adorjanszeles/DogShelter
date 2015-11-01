var mainRedirectMW = require('../middleware/generic/mainRedirect');
var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserLoginMW = require('../middleware/login/checkUserLogin');
var renderMW = require('../middleware/generic/render');
var userModel = require('../models/user');
var dogModel = require('../models/dog');

module.exports = function (app) {

    var dog1 = dogModel.Dog();
    var user1 = userModel.User();

    var objectRepository = {
        userModel: user1,
        dogModel: dog1
    };

    app.get('/',
        mainRedirectMW(objectRepository),
        renderMW(objectRepository, 'index'));

    app.get('/enter',
        mainRedirectMW(objectRepository),
        renderMW(objectRepository, 'enter'));

    app.get('/userDetails',
        renderMW(objectRepository, 'UserDetails'));

    app.get('/dogRegistration',
        renderMW(objectRepository, 'dogRegistration'));

    app.get('/registration',
        renderMW(objectRepository, 'Registration'));

    app.get('/dogDetails',
        renderMW(objectRepository, 'dogDetails'));

    app.get('/index',
        renderMW(objectRepository, 'index'));

    app.use('/login',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository),
        renderMW(objectRepository, 'login'));

};