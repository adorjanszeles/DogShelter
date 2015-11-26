var mongoose = require('mongoose');

/**
 * A kutya konstruktora
 * @constructor
 */
var Dog = mongoose.model('Dog', {
    callName: String,
    sex: String,
    species: String,
    details: String,
    pictureExtension: String,
    ownerUserName: String,
    ownerUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

/**
 * Export the module
 */
module.exports = Dog;