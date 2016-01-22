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

router.get('/:id', function (req, res, next) {
    console.log(req.file);
    res.status(200).json(req.file);
});

router.post('/', function (req, res, next) {
    File.create(req.body)
        .then(file => res.status(201).json(file))
        .then(null, next)
});

router.put('/:id', function (req, res, next) {
    req.file.text = req.body.text;
    req.file.save()
        .then(file => res.status(204).json(file))
        .then(null, next);
});

router.get('/ownedby/:userId', function (req, res, next) {
    File.find({ user: req.params.userId })
        .then(files => {
            console.log(files);
            res.status(200).json(files)
        })
        .then(null, next);
});

module.exports = router;
