const router = require('express').Router();
const controllers = require('../controllers/index');
const User = require('mongoose').model('User');

router.post('/create', controllers.watches.createWatch);
router.post('/edit/:id', controllers.watches.editWatch);
router.post('/delete/:id', controllers.watches.deleteWatch);
router.get('/get/all', controllers.watches.getAll);
router.get('/get/:id', controllers.watches.getWatchById);
router.post('/cart/add/:id', controllers.watches.addWatchToCart);
router.post('/cart/remove/:id', controllers.watches.removeFromCart);
router.post('/favourite/add/:id', controllers.watches.addWatchToFavourite);
router.post('/favourite/remove/:id', controllers.watches.removeFromFavourite);

router.get('/get/search', controllers.watches.getSearch);

module.exports = router;
