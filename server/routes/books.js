const router = require('express').Router();
const controllers = require('../controllers/index');
const User = require('mongoose').model('User');

router.post('/create', controllers.books.createBook);
router.post('/edit/:id', controllers.books.editBook);
router.post('/delete/:id', controllers.books.deleteBook);
router.get('/get/all', controllers.books.getAll);
router.get('/get/:id', controllers.books.getBookById);
router.get('/get/search', controllers.books.getSearch);
router.get('/get/filtered/:genre', controllers.books.getAllByCategory);
router.post('/addToCart/:id', controllers.books.addBookToCart);
router.post('/removeFromCart/:id', controllers.books.removeFromCart);

module.exports = router;
