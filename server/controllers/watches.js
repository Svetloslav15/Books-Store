const User = require('mongoose').model('User');
const Watch = require('mongoose').model('Watch');
const Order = require('mongoose').model('Order');

module.exports = {
    createWatch: (req, res) => {
        let {description, name, imageUrl, price} = req.body;
        if (description.trim() == "" || name.trim() == "" ||
            imageUrl.trim() == "" || +price <= 0) {
            res.status(422).json({
                message: 'Validation failed, entered data is incorrect!',
                success: false
            });
            return;
        }
        Watch.create({
            description, imageUrl, price: Number(price), name
        }).then((x) => {
            console.log('work');
            res.status(200).json({
                message: 'Watch was created successfully!',
                data: x,
                success: true
            });
        }).catch((err) => {
            res.status(422).json({
                message: 'Invalid data!',
                success: false
            });
        });
    },
    getWatchById: (req, res) => {
        let id = req.params.id;
        Watch.findById(id)
            .then(x => {
                res.status(200).json({
                    data: x
                });
            }).catch(err => {
            res.status(422).json({
                message: err,
            });
        })
    },
    editWatch: (req, res) => {
        let {id, description, name, imageUrl, price} = req.body;
        if (description.trim() == "" || imageUrl.trim() == "" ||
            name.trim() == "" || +price <= 0) {
            res.status(422).json({
                message: 'Validation failed, entered data is incorrect',
                success: false
            });
            return;
        }
        Watch.findByIdAndUpdate(id, {
            $set: {
                name, description, imageUrl, price: Number(price)
            }
        }).then((x) => {
            x.save();
                res.status(200).json({
                    message: 'Watch edited successfully!',
                    data: x,
                    success: true
                });
            }).catch((err) => {
            res.status(422).json({
                message: err,
                success: false
            });
        });
    },
    deleteWatch: (req, res) => {
        let id = req.body.id;
        Watch.findByIdAndUpdate(id, {
            $set: {isDeleted: true}
        }).then(watch => {
                res.status(200).json({
                    data: watch,
                    message: "Successfully deleted watch!"
                })
            }).catch(err => {
            res.status(422).json({
                message: err,
            });
        });
    },
    addWatchToCart: async (req, res) => {
        try{
            let id = req.params.id;
            let watch = await Watch.findById(id);
            let cart = req.session.cart;
            if (!cart) {
                cart = [];
            }
            cart.push(watch);
            req.session.cart = cart;
            res.status(200).json({
                message: "Successfully added watch to cart!"
            });
        }
        catch(err){
            res.status(422).json({
                message: err
            });
        }
    },
    removeFromCart: async (req, res) => {
        try{
            let id = req.params.id;
            let cart = req.session.cart;
            cart = cart.filter(x => x._id !== id);
            req.session.cart = cart;
            res.status(200).json({
                message: "Successfully remove watch from cart!"
            });
        }
        catch(err){
            res.status(422).json({
                message: err
            });
        }
    },
    getAll: (req, res) => {
        Watch.find({isDeleted: false})
            .then((watches) => {
                res.status(200).json({
                    data: watches,
                    message: 'Successfully fetched all watches!'
                })
            }).catch(err => {
            res.status(422).json({
                message: err,
            });
        })
    },
    addWatchToFavourite: async (req, res) => {
        try{
            let id = req.params.id;
            let watch = await Watch.findById(id);
            let favourite = req.session.favourite;
            if (!favourite) {
                favourite = [];
            }
            favourite.push(watch);
            req.session.favourite = favourite;
            res.status(200).json({
                message: "Successfully added watch to favourite"
            });
        }
        catch(err){
            res.status(422).json({
                message: err
            });
        }
    },
    removeFromFavourite: (req, res) => {
        try{
            let id = req.params.id;
            let favourite = req.session.favourite;
            favourite = favourite.filter(x => x._id !== id);
            req.session.favourite = favourite;
            res.status(200).json({
                message: "Successfully remove watch from favourite!"
            });
        }
        catch(err){
            res.status(422).json({
                message: err
            });
        }
    },
    getBestThree: (req, res) => {
        Watch.find({isDeleted: false}).sort('-date')
            .then((watches) => {
                let result = [];
                for (let i = 0; i < 3; i++) {
                    if (watches[i] != null){
                        result.push(watches[i]);
                    }
                }
                res.status(200).json({
                    data: result,
                    message: 'Successfully fetched all watches!'
                })
            }).catch(err => {
            res.status(422).json({
                message: err,
            });
        })
    },

    getSearch: (req, res) => {
        let query = req.query.query;
        Watch.find({})
            .then((watches) => {
                const filteredWatches = watches.filter((a) => {
                    return a.name.toLowerCase().includes(query.toLowerCase());
                });
                res.status(200).json({
                    data: filteredWatches,
                    message: 'Successfully fetched watches!'
                })
            }).catch(err => {
            res.status(422).json({
                message: err,
            });
        })
    }
};