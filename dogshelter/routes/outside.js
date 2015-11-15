var mainRedirectMW = require('../middleware/generic/mainRedirect');
var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var renderMW = require('../middleware/generic/render');
var userModel = require('../models/user');
var dogModel = require('../models/dog');
var getDogListMW = require('../middleware/dog/getDogList');
var getDogByIdMW = require('../middleware/dog/getDogById');
var getUserByIdMW = require('../middleware/user/getUserById');
var updateDogMW = require('../middleware/dog/updateDog');
var updateUserMW = require('../middleware/user/updateUser');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel,
        dogModel: dogModel
    };

    // Home Page
    app.get('/',
        //mainRedirectMW(objectRepository),
        getDogListMW(objectRepository),
        renderMW(objectRepository, 'index'));

    // User detail page
    app.get('/userDetails/:userId',
        getUserByIdMW(objectRepository),
        renderMW(objectRepository, 'UserDetails'));

    // Dog registration page
    app.get('/dogRegistration',
        //mainRedirectMW(objectRepository),
        renderMW(objectRepository, 'dogRegistration'));

    app.post('/dogRegistration',
        updateDogMW(objectRepository));

    // user registration page
    app.get('/registration',
        renderMW(objectRepository, 'Registration'));

    app.post('/registration',
        updateUserMW(objectRepository));

    // dog details page
    app.get('/dogDetails/:dogId',
        getDogByIdMW(objectRepository),
        renderMW(objectRepository, 'dogDetails'));

    // login page
    app.use('/login',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository),
        renderMW(objectRepository, 'login'));

};