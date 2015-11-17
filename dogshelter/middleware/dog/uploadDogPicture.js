var requireOption = require('../common').requireOption;
var fs = require('fs');

/**
 * Get the dog instance from database by id.
 */
module.exports = function (objectrepository) {

    var dogModel = requireOption(objectrepository, 'dogModel');

    return function (req, res, next) {
        dogModel.findOne({_id: req.param('dogId')}, function (err, result) {
            if ((err) || (!result)) {
                return next(err);
            }

            var dog = result;
            if(req.busboy) {
                var fstream;
                req.pipe(req.busboy);
                req.busboy.on('file', function(fieldname, file, filename) {
                    var extension = filename.split('.');
                    console.log("Uploading: " + filename);
                    fstream = fs.createWriteStream(__dirname + '/../../public/img/' + dog._id + '.' + extension[1]);
                    file.pipe(fstream);
                    fstream.on('close', function () {
                        console.log("Upload Finished of " + filename);
                        res.redirect('/dogDetails/' + dog._id);
                    });
                });
            }
        });
    };
};