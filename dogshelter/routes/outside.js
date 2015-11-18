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
var deleteDogMW = require('../middleware/dog/deleteDog');
var searchDogMW = require('../middleware/dog/dogSearch');
var uploadDogPicture = require('../middleware/dog/uploadDogPicture');

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

    app.post('/',
        mainRedirectMW(objectRepository),
        searchDogMW(objectRepository),
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
        renderMW(objectRepository, 'registration'));

    app.post('/registration',
        updateUserMW(objectRepository),
        renderMW(objectRepository, 'registration'));

    // dog details page
    app.get('/dogDetails/:dogId',
        mainRedirectMW(objectRepository),
        getDogByIdMW(objectRepository),
        renderMW(objectRepository, 'dogDetails'));

    app.post('/dogDetails/:dogId',
        mainRedirectMW(objectRepository),
        updateDogMW(objectRepository));

    app.get('/dogDetails/delete/:dogId',
        mainRedirectMW(objectRepository),
        deleteDogMW(objectRepository));

    // login page
    app.get('/login',
        renderMW(objectRepository, 'login'));

    app.post('/login',
        checkUserLoginMW(objectRepository),
        renderMW(objectRepository, 'login'));

    app.get('/logout',
        logoutMW(objectRepository));

    app.get('/userEdit/:userId',
        checkUserModification(objectRepository),
        renderMW(objectRepository, 'userEdit'));

    app.post('/userEdit/:userId',
        checkUserModification(objectRepository),
        updateUserMW(objectRepository),
        renderMW(objectRepository, 'userEdit'));

    app.post('/dogDetails/pictureUpload/:dogId',
        mainRedirectMW(objectRepository),
        uploadDogPicture(objectRepository));

    app.get('/errorPage/:errorMessage',
        renderMW(objectRepository, 'errorPage'));

};