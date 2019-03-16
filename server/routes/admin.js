const router = require('express').Router();
const controllers = require('../controllers/index');
const User = require('mongoose').model('User');

router.get('/get/all', controllers.admin.getAllUsers);
router.post('/make/:id', controllers.admin.makeAdmin);
router.post('/remove/:id', controllers.admin.removeAdmin);

module.exports = router;