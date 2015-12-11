var expect = require('chai').expect;
var dogSearch = require('../middleware/dog/dogSearch');

describe('dogSearch middleware ', function () {

    it('should return all the dogs', function (done) {

        var req = {body: {sexFilter: 'default', speciesFilter: 'default'}};
        var res = {tpl: {}};

        var dogModel = { find: function(some, cb) {
            cb(undefined, [{
                id: 1,
                callName: 'Pocak',
                owner: 'Lili',
                sex: 'male',
                species: 'Mopsz',
                details: 'Ez egy cuki mopsz! :)'
            },
            {
                id: 2,
                callName: 'Pocaknyul',
                owner: 'Dodo',
                sex: 'female',
                species: 'Mopsz',
                details: 'Ez egy meg cukibb cuki mopsz! :)'
            }]);
        }};

        var objectRepository = {
            dogModel: dogModel
        };

        dogSearch(objectRepository)(req, res, function (err) {
            expect(res.tpl.dogs).to.eql([{
                id: 1,
                callName: 'Pocak',
                owner: 'Lili',
                sex: 'male',
                species: 'Mopsz',
                details: 'Ez egy cuki mopsz! :)'
            },
            {
                id: 2,
                callName: 'Pocaknyul',
                owner: 'Dodo',
                sex: 'female',
                species: 'Mopsz',
                details: 'Ez egy meg cukibb cuki mopsz! :)'
            }]);
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('should return just the female dog', function (done) {

        var req = {body: {sexFilter: 'female', speciesFilter: 'default'}};
        var res = {tpl: {}};

        var dogModel = { find: function(some, cb) {
            var result = [];
            if(some.$and.pop().sex == 'female') {
                result.push({
                    id: 2,
                    callName: 'Pocaknyul',
                    owner: 'Dodo',
                    sex: 'female',
                    species: 'Mopsz',
                    details: 'Ez egy meg cukibb cuki mopsz! :)'
                });
            }
            cb(undefined, result);
        }};

        var objectRepository = {
            dogModel: dogModel
        };

        dogSearch(objectRepository)(req, res, function (err) {
            expect(res.tpl.dogs).to.eql([{
                id: 2,
                callName: 'Pocaknyul',
                owner: 'Dodo',
                sex: 'female',
                species: 'Mopsz',
                details: 'Ez egy meg cukibb cuki mopsz! :)'
            }]);
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('should return just the nemetjuhasz dog', function (done) {

        var req = {body: {sexFilter: 'default', speciesFilter: 'nemetjuhasz'}};
        var res = {tpl: {}};

        var dogModel = { find: function(some, cb) {
            var result = [];
            if(some.$and.pop().species == 'nemetjuhasz') {
                result.push({
                    id: 3,
                    callName: 'kutya',
                    owner: 'Dodo',
                    sex: 'male',
                    species: 'nemetjuhasz',
                    details: 'ez egy kutya'
                });
            }
            cb(undefined, result);
        }};

        var objectRepository = {
            dogModel: dogModel
        };

        dogSearch(objectRepository)(req, res, function (err) {
            expect(res.tpl.dogs).to.eql([{
                id: 3,
                callName: 'kutya',
                owner: 'Dodo',
                sex: 'male',
                species: 'nemetjuhasz',
                details: 'ez egy kutya'
            }]);
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('should return just the male and korgi dog', function (done) {

        var req = {body: {sexFilter: 'male', speciesFilter: 'korgi'}};
        var res = {tpl: {}};

        var dogModel = { find: function(some, cb) {
            var result = [];
            var species = some.$and.pop();
            var sex = some.$and.pop();
            if(species.species == 'korgi' && sex.sex == 'male') {
                result.push({
                    id: 4,
                    callName: 'kutya',
                    owner: 'Dodo',
                    sex: 'male',
                    species: 'korgi',
                    details: 'ez egy kutya'
                });
            }
            cb(undefined, result);
        }};

        var objectRepository = {
            dogModel: dogModel
        };

        dogSearch(objectRepository)(req, res, function (err) {
            expect(res.tpl.dogs).to.eql([{
                id: 4,
                callName: 'kutya',
                owner: 'Dodo',
                sex: 'male',
                species: 'korgi',
                details: 'ez egy kutya'
            }]);
            expect(err).to.eql(undefined);
            done();
        });
    });
});