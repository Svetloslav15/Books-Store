const mongoose = require('mongoose');
const User = require('../models/User');
const Watch = require('../models/Watch');
const Order = require('../models/Order');

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