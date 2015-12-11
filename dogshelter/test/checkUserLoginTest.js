var expect = require('chai').expect;
var userLogin = require('../middleware/user/checkUserLogin');
var crypto = require('crypto');

describe('checkUserLogin middleware ', function () {

    it('should return with not enough parameter error', function (done) {

        var req = {body: {userName: 'Lili', password: undefined}};
        var res = {tpl: {}, error: []};

        var userModel = {
            find: function (some, cb) {
                cb(undefined, []);
            }
        };

        var objectRepository = {
            userModel: userModel
        };

        userLogin(objectRepository)(req, res, function (err) {
            expect(res.error.pop()).to.eql('Not enough parameter!');
            done();
        });
    });

    it('should return with your user name is not registered error', function (done) {

        var req = {body: {userName: 'Lili', password: 'abcdef'}};
        var res = {tpl: {}, error: []};

        var userModel = {
            findOne: function (some, cb) {
                var result = [];
                if (some.userName == 'Geza') {
                    result.push({
                        id: 1,
                        userName: 'Geza',
                        password: 'abcdefgh1234'
                    });
                } else {
                    result = undefined
                }
                cb(undefined, result);
            }
        };

        var objectRepository = {
            userModel: userModel
        };

        userLogin(objectRepository)(req, res, function (err) {
            expect(res.error.pop()).to.eql('Your user name is not registered!');
            done();
        });
    });

    it('should return with password incorrect error', function (done) {

        var req = {body: {userName: 'Lili', password: 'abcdef'}};
        var res = {tpl: {}, error: []};

        var userModel = {
            findOne: function (some, cb) {
                var result = [];
                if (some.userName == 'Lili') {
                    result.push({
                        id: 1,
                        userName: 'Lili',
                        password: 'abcdefgh1234'
                    });
                } else {
                    result = undefined
                }
                cb(undefined, result);
            }
        };

        var objectRepository = {
            userModel: userModel
        };

        userLogin(objectRepository)(req, res, function (err) {
            expect(res.error.pop()).to.eql('Password incorrect!');
            done();
        });
    });

    it('should return with login success', function (done) {

        var req = {body: {userName: 'Lili', password: 'a'}, session: {userId: '', userName: ''}};
        var res = {tpl: {}, error: [], redirect: function(str){
            expect(str).to.eql('/');
            done();
        }};

        var userModel = {
            findOne: function (some, cb) {
                var result;
                if (some.userName == 'Lili') {
                    var sha = crypto.createHash('sha1');
                    sha.update(req.body.password);
                    var password = sha.digest('hex');
                    result = {
                        id: 1,
                        userName: 'Lili',
                        password: password
                    };
                } else {
                    result = undefined
                }
                cb(undefined, result);
            }
        };

        var dogModel = { find: function(some, cb) {
            cb(undefined, []);
        }};

        var objectRepository = {
            userModel: userModel,
            dogModel: dogModel
        };

        userLogin(objectRepository)(req, res);
    });
});