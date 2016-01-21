const router = require('express').Router();
const mongoose = require('mongoose');
const File = mongoose.model('File');

router.param('id', function (req, res, next, id) {
    File.findById(id)
        .then(file => {
            if (!file) {
                const err = new Error('File not found');
                err.status = 404;
                return next(err);
            }
            req.file = file;
            next();
        })
        .then(null, next);
});

router.get('/', function (req, res, next) {
    res.send('Files')
});

router.post('/', function (req, res, next) {
    // res.json(req.body);
    File.create(req.body)
        .then(file => res.status(201).json(file))
        .then(null, next)
});

router.put('/:id', function (req, res, next) {
    req.file.text = req.body.text;
    req.file.save()
        .then(file => res.status(204).json(file))
        .then(null, next);
})

module.exports = router;
