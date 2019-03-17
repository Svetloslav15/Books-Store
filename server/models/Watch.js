const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    imageUrl: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    price: {
        type:mongoose.Schema.Types.Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    }
});

const Watch = mongoose.model('Watch', watchSchema);
module.exports = Watch;