const router = require('express').Router();
const controllers = require('../controllers/index');
const User = require('mongoose').model('User');

router.post('/signup', controllers.auth.signUp);
router.post('/signin', controllers.auth.signIn);
router.post('/logout', controllers.auth.logout);

module.exports = router;
