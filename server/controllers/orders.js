const User = require('mongoose').model('User');
const Watch = require('mongoose').model('Watch');
const Order = require('mongoose').model('Order');

module.exports = {
    getOrderById: (req, res) => {
        let id = req.params.id;
        Order.findById(id)
            .then((order) => {
                res.status(200).json({
                    data: order,
                    message: "Successfully fetched watch!"
                })
            }).catch((err) => {
               res.status(422).json({
                   message: err
               });
            });
    },
    createOrder: (req, res) => {

    },
    listMyOrders: (req, res) => {
        let myId = req.userId;
        Order.find({})
            .then(orders => {
                orders = orders.filter(x => x.userId.toString() === myId.toString());

                res.status(200).json({
                    data: orders,
                    message: "Successfully fetched all orders!"
                });
            }).catch(err => {
            res.status(422).json({
                message: err,
            });
        });
    },
    listPendingOrders: (req, res) => {
        Order.find({})
            .then(orders => {
                orders = orders.filter(x => x.isPending === true);

                res.status(200).json({
                    data: orders,
                    message: "Successfully fetched all orders!"
                });
            }).catch(err => {
            res.status(422).json({
                message: err,
            });
        });
    },
    listArchivedOrders: (req, res) => {
        Order.find({})
            .then(orders => {
                orders = orders.filter(x => x.isArchived === true);

                res.status(200).json({
                    data: orders,
                    message: "Successfully fetched all orders!"
                });
            }).catch(err => {
            res.status(422).json({
                message: err,
            });
        });
    }
};