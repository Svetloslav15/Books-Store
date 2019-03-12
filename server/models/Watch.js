const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
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
    }
});

const Watch = mongoose.model('Watch', watchSchema);
module.exports = Watch;