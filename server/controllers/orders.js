const User = require('mongoose').model('User');
const Watch = require('mongoose').model('Watch');
const Order = require('mongoose').model('Order');

module.exports = {
    getOrderById: (req, res) => {
        let id = req.params.id;
        Order.findById(id)
            .populate('watches')
            .populate('userId')
            .then((order) => {
                console.log(order);
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
        let {watches, userId, price} = req.body;
        let isPending = true;
        let isArchived = false;
        price = Number(price);
        console.log(req.body);
        Order.create({
            watches, userId, price, isPending, isArchived
        }).then((data) => {
            res.status(200).json({
                data: data,
                message: "Successfully checkout!"
            })
        }).catch(err => {
            res.status(422).json({
                message: err
            });
        });
    },
    archiveOrderServer: (req, res) => {
        let orderId = req.params.id;
        console.log('hey');

        let isPending = false;
        let isArchived = true;
        Order.findByIdAndUpdate(orderId, {
            $set: {
                isPending, isArchived
            }
        }).then((data) => {
            console.log(data);
            res.status(200).json({
                data: data,
                message: "Successfully make order Pending!"
            })
        }).catch(err => {
            res.status(422).json({
                message: err
            });
        });
    },
    makePendingServer: (req, res) => {
        let orderId = req.params.id;
        console.log('hi');
        let isPending = true;
        let isArchived = false;
        Order.findByIdAndUpdate(orderId, {
            $set: {isPending, isArchived}
        }).then((data) => {

            res.status(200).json({
                data: data,
                message: "Successfully make order Pending!"
            })
        }).catch(err => {
            res.status(422).json({
                message: err
            });
        });
    },
    listMyOrders: (req, res) => {
        let myId = req.params.id;
        Order.find({})
            .populate('watches')
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
            .populate('userId')
            .then(orders => {
                orders = orders.filter(x => x.isPending === true);
                res.status(200).json({
                    data: orders,
                    message: "Successfully fetched all pending orders!"
                });
            }).catch(err => {
            res.status(422).json({
                message: err,
            });
        });
    },
    listArchivedOrders: (req, res) => {
        Order.find({})
            .populate('userId')
            .then(orders => {
                orders = orders.filter(x => x.isArchived === true);

                res.status(200).json({
                    data: orders,
                    message: "Successfully fetched all archived orders!"
                });
            }).catch(err => {
            res.status(422).json({
                message: err,
            });
        });
    }
};