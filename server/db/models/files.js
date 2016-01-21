const mongoose = require('mongoose');

const schema = ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String
    },
    extension: {
        type: String,
        default: '.js'
    }
});

mongoose.model('File', schema);
