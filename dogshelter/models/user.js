var mongoose = require('mongoose');

/**
 * A felhasználó konstruktora
 * @constructor
 */
var User = mongoose.model('User', {
    userName: String,
    password: String,
    email: String,
    phone: String,
    address: String
});

/**
 * Export the module
 */
module.exports = User;