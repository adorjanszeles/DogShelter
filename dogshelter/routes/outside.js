var mainRedirectMW = require('../middleware/generic/mainRedirect');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var renderMW = require('../middleware/generic/render');
var userModel = require('../models/user');
var dogModel = require('../models/dog');
var getDogListMW = require('../middleware/dog/getDogList');
var getDogByIdMW = require('../middleware/dog/getDogById');
var getUserByIdMW = require('../middleware/user/getUserById');
var updateDogMW = require('../middleware/dog/updateDog');
var updateUserMW = require('../middleware/user/updateUser');
var logoutMW = require('../middleware/generic/logout');
var checkUserModification = require('../middleware/user/checkUserModification');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel,
        dogModel: dogModel
    };

    // Home Page
    app.get('/',
        mainRedirectMW(objectRepository),
        getDogListMW(objectRepository),
        renderMW(objectRepository, 'index'));

    // User detail page
    app.get('/userDetails/:userId',
        mainRedirectMW(objectRepository),
        getUserByIdMW(objectRepository),
        renderMW(objectRepository, 'UserDetails'));

    // Dog registration page
    app.get('/dogRegistration',
        mainRedirectMW(objectRepository),
        renderMW(objectRepository, 'dogRegistration'));

    app.post('/dogRegistration',
        mainRedirectMW(objectRepository),
        updateDogMW(objectRepository));

    // user registration page
    app.get('/registration',
        renderMW(objectRepository, 'Registration'));

    app.post('/registration',
        updateUserMW(objectRepository));

    // dog details page
    app.get('/dogDetails/:dogId',
        mainRedirectMW(objectRepository),
        getDogByIdMW(objectRepository),
        renderMW(objectRepository, 'dogDetails'));

    app.post('/dogDetails/:dogId',
        mainRedirectMW(objectRepository),
        updateDogMW(objectRepository));

    // login page
    app.get('/login',
        renderMW(objectRepository, 'login'));

    app.post('/login',
        checkUserLoginMW(objectRepository),
        getDogListMW(objectRepository),
        renderMW(objectRepository, 'index'));

    app.get('/logout',
        logoutMW(objectRepository));

    app.get('/userEdit/:userId',
        checkUserModification(objectRepository),
        renderMW(objectRepository, 'userEdit'));

    app.post('/userEdit/:userId',
        checkUserModification(objectRepository),
        updateUserMW(objectRepository));

};