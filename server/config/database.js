const mongoose = require('mongoose');
const User = require('../models/User');
const Book = require('../models/Book');
const Order = require('../models/Order');
const PromoCode = require('../models/PromoCode');

mongoose.Promise = global.Promise;

module.exports = (settings) => {
    mongoose.connect(settings.db, {
        useNewUrlParser: true
    });       
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            console.log(err);
        } 

        console.log('Database ready');
    });

    db.on('error', reason => {
        console.log(reason);
    });
};