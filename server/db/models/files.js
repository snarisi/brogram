const mongoose = require('mongoose');

const schema = ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String
    },
    name: {
        type: String,
        default: 'untitled'
    },
    extension: {
        type: String,
        default: '.js'
    }
});

mongoose.model('File', schema);
