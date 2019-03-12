const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const encryption = require('../util/encryption');

function validateUser(req, res) {
    const {username, password} = req.body;
    if (username.trim() == "" || password.trim() == "") {
        res.status(422).json({
            message: 'Validation failed, entered data is incorrect',
            success: false
        });

        return false;
    }

    return true;
}

module.exports = {
    signUp: async (req, res) => {
        if (validateUser(req, res)) {
            const {username, password, repeatPassword} = req.body;
            if (username.trim() === "" || password.trim() === "" ||
                repeatPassword.trim() !== password){
                res.status(422).json({
                    data: req.body,
                    message: "Invalid credentials!",
                    success: false
                });
                return;
            }
            const salt = encryption.generateSalt();
            const hashedPassword = encryption.generateHashedPassword(salt, password);
            let users = await User.find({username: username});
            if (users.length > 0){
                res.status(422).json({
                    data: req.body,
                    message: "Username already exists",
                    success: false
                });
                return;
            }
            User.create({
                username,
                hashedPassword,
                salt,
                orders: [],
                roles: ['User']
            }).then((user) => {
                const token = jwt.sign({
                    username: user.username,
                    userId: user._id.toString()
                }, 'somesupersecret', {expiresIn: '4h'});

                res.status(200).json(
                    {
                        message: 'User registered successfully!',
                        token,
                        userId: user._id.toString(),
                        username: user.username,
                        success: true,
                        roles: user.roles,
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
        const {username, password} = req.body;
        if (username.trim() === "" || password.trim() === ""){
            res.status(422).json({
                data: req.body,
                message: "Invalid credentials!",
                success: false
            });
            return;
        }
        User.findOne({username: username})
            .then((user) => {
                if (!user) {
                    res.status(401).json({
                        data: req.body,
                        message: "A user with this username could not be found",
                        success: false
                    });
                    return;
                }

                if (!user.authenticate(password)) {
                    res.status(401).json({
                        data: req.body,
                        message: "A user with this password could not be found",
                        success: false
                    });
                    return;
                }

                const token = jwt.sign({
                    username: user.username,
                    userId: user._id.toString()
                }, 'somesupersecret', {expiresIn: '4h'});

                res.status(200).json(
                    {
                        message: 'User successfully logged in!',
                        token,
                        userId: user._id.toString(),
                        username: user.username,
                        success: true,
                        roles: user.roles,

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
                message: 'Logout successfully!',
                success: true
            });
    }
};