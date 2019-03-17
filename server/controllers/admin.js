const User = require('mongoose').model('User');
const Watch = require('mongoose').model('Watch');
const Order = require('mongoose').model('Order');

module.exports = {
    getAllUsers: async (req, res) => {
        User.find({})
            .then(users => {
                res.status(200).json({
                    data: users,
                    message: "Successfully fetched all users!"
                });
            }).catch(err => {
                res.status(422).json({
                    message: err,
                });
            });
    },
    makeAdmin: async (req, res) => {
        try{
            let id = req.params.id;
            let user = await User.findById(id);
            user.roles.push('Admin');
            user.save();
            res.status(200).json({
                message: "Successfully made the user an Admin!"
            });
        }
        catch (err){
            res.status(422).json({
                message: err
            });
        }
    },
    removeAdmin: async (req, res) => {
        try{
            let id = req.params.id;
            let user = await User.findById(id);
            user.roles = user.roles.filter(x => x != 'Admin');
            user.save();
            res.status(200).json({
                message: "Successfully made the user an Admin!"
            });
        }
        catch (err){
            res.status(422).json({
                message: err
            });
        }
    }
};