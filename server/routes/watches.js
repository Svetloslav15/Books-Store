const router = require('express').Router();
const controllers = require('../controllers/index');
const User = require('mongoose').model('User');
const isAuth = require('../middleware/is-auth');

router.post('/create', isAuth, controllers.watches.createWatch);
router.post('/edit/:id', isAuth, controllers.watches.editWatch);
router.post('/delete/:id', isAuth, controllers.watches.deleteWatch);
router.get('/get/all', controllers.watches.getAll);
router.get('/get/best/3', controllers.watches.getBestThree);
router.get('/get/:id', isAuth, controllers.watches.getWatchById);
router.post('/cart/add/:id', isAuth, controllers.watches.addWatchToCart);
router.post('/cart/remove/:id', isAuth,  controllers.watches.removeFromCart);
router.post('/favourite/add/:id', isAuth, controllers.watches.addWatchToFavourite);
router.post('/favourite/remove/:id', isAuth, controllers.watches.removeFromFavourite);

router.get('/get/search', controllers.watches.getSearch);

module.exports = router;
