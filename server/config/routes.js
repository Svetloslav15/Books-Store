const authRoutes = require('../routes/auth');
const booksRoutes = require('../routes/books');

module.exports = (app) => {
    app.use('/auth', authRoutes);
    app.use('/books', booksRoutes);
};