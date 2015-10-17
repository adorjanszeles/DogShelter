/**
 * A kutya konstruktora
 * @constructor
 */
var Dog = function () {};
/**
 * An instance
 * @type {{id: number, name: string, email: string, pass: string}}
 */
var DogInstanceMock = {
    id: 1,
    callName: 'Bodri'
};

/**
 * Find one element with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Dog.prototype.findOne = function (criteria, cb) {

    //returns 1 mocked item
    return cb(null, DogInstanceMock);
};

/**
 * Find all elements with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Dog.prototype.find = function (criteria, cb) {

    //returns 3 mocked item
    return cb(null, [DogInstanceMock, DogInstanceMock, DogInstanceMock]);
};

/**
 * Save the item to the db
 * @param cb error first callback
 * @returns {*}
 */
Dog.prototype.save = function (cb) {
    return cb(null, this);
};

/**
 * Export the module
 */
module.exports.Dog = Dog;