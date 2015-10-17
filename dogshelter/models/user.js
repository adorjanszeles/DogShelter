/**
 * A felhasználó konstruktora
 * @constructor
 */
var User = function () {};

/**
 * An instance
 * @type {{id: number, name: string, email: string, pass: string}}
 */
var UserInstanceMock = {
    id: 1,
    name: 'Dog Friend',
    email: 'lovedog@dog.hu',
    pass: 'Ilovedog58'
};

/**
 * Find one element with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
User.prototype.findOne = function (criteria, cb) {

    //returns 1 mocked item
    return cb(null, UserInstanceMock);
};

/**
 * Find all elements with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
User.prototype.find = function (criteria, cb) {

    //returns 3 mocked item
    return cb(null, [UserInstanceMock, UserInstanceMock, UserInstanceMock]);
};

/**
 * Save the item to the db
 * @param cb error first callback
 * @returns {*}
 */
User.prototype.save = function (cb) {
    return cb(null, this);
};

/**
 * Export the module
 */
module.exports.User = User;