var mongoose = require('mongoose');

/**
 * A felhaszn�l� konstruktora
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