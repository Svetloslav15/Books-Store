const router = require('express').Router();
const controllers = require('../controllers/index');
const User = require('mongoose').model('User');

router.post('/create', controllers.orders.createOrder);
router.get('/mine/:id', controllers.orders.listMyOrders);
router.get('/get/pending', controllers.orders.listPendingOrders);
router.get('/get/archived', controllers.orders.listArchivedOrders);
router.get('/get/:id', controllers.orders.getOrderById);
router.post('/archive/:id', controllers.orders.archiveOrderServer);
router.post('/pend/:id', controllers.orders.makePendingServer);

module.exports = router;