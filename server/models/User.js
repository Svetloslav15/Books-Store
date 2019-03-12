const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: Schema.Types.String,
        required: true
    },
    salt: {
        type: Schema.Types.String,
        required: true
    },
    orders: [
        {type: Schema.Types.ObjectId, ref: 'Order'}
    ],
    roles: [
        {type: Schema.Types.String}
    ]
});

userSchema.method({
    authenticate: function (password) {
        const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

        return currentHashedPass === this.hashedPassword;
    }
});

module.exports = mongoose.model('User', userSchema);