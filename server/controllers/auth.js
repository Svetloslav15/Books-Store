const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const encryption = require('../util/encryption');

function validateUser(req, res) {
    const {email, password, firstName, lastName} = req.body;
    if (email.trim() == "" || password.trim() == "" || firstName.trim() == "" || lastName.trim() == "") {
        res.status(422).json({
            message: 'Validation failed, entered data is incorrect',
        });

        return false;
    }

    return true;
}

module.exports = {
    signUp: (req, res) => {
        if (validateUser(req, res)) {
            const {email, password, firstName, lastName} = req.body;
            const salt = encryption.generateSalt();
            const hashedPassword = encryption.generateHashedPassword(salt, password);
            User.create({
                email,
                hashedPassword,
                firstName,
                lastName,
                salt,
                orders: [],
                roles: ['User']
            }).then((user) => {
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id.toString()
                }, 'somesupersecret', {expiresIn: '4h'});

                res.status(200).json(
                    {
                        message: 'User registered successfully!',
                        token,
                        userId: user._id.toString()
                    });
            }).catch((error) => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }

                    next(error);
                });
        }
    },
    signIn: (req, res) => {
        const {email, password} = req.body;

        User.findOne({email: email})
            .then((user) => {
                if (!user) {
                    const error = new Error('A user with this email could not be found');
                    error.statusCode = 401;
                    throw error;
                }

                if (!user.authenticate(password)) {
                    const error = new Error('A user with this email could not be found');
                    error.statusCode = 401;
                    throw error;
                }

                const token = jwt.sign({
                    email: user.email,
                    userId: user._id.toString()
                }, 'somesupersecret', {expiresIn: '4h'});

                res.status(200).json(
                    {
                        message: 'User successfully logged in!',
                        token,
                        userId: user._id.toString()
                    });
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    },
    logout: (req, res) => {
        res.setHeader("Authorization", "");
        res.status(200)
            .json({
                message: 'Logout successfully!'
            });
    }
};