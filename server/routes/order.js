const router = require('express').Router();
const controllers = require('../controllers/index');
const User = require('mongoose').model('User');
const isAuth = require('../middleware/is-auth');

router.post('/create', isAuth, controllers.orders.createOrder);
router.get('/mine/:id', isAuth, controllers.orders.listMyOrders);
router.get('/get/pending', isAuth, controllers.orders.listPendingOrders);
router.get('/get/archived', isAuth, controllers.orders.listArchivedOrders);
router.get('/get/:id', isAuth, controllers.orders.getOrderById);
router.post('/archive/:id', isAuth, controllers.orders.archiveOrderServer);
router.post('/pend/:id', isAuth, controllers.orders.makePendingServer);

module.exports = router;