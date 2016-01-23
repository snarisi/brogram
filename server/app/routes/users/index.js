const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const File = mongoose.model('File');

router.get('/', function (req, res, next) {
    User.find({ _id: { $in: req.query.userIds } })
        .then(users => res.send(
            users.map(user => ({ _id: user._id, email: user.email}))
        ))
})

module.exports = router;
