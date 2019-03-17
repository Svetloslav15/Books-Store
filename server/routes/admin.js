const router = require('express').Router();
const controllers = require('../controllers/index');
const User = require('mongoose').model('User');
const isAuth = require('../middleware/is-auth');

router.get('/get/all', isAuth, controllers.admin.getAllUsers);
router.post('/make/:id', isAuth, controllers.admin.makeAdmin);
router.post('/remove/:id', isAuth, controllers.admin.removeAdmin);

module.exports = router;