const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
    name: {
        type:mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    percentage: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    isActive: {
        type:mongoose.Schema.Types.Boolean,
        required: true,
        default: true
    },
    count: {
        type:mongoose.Schema.Types.Number,
        required: true
    }
});

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);
module.exports = PromoCode;