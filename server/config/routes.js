const authRoutes = require('../routes/auth');
const watchesRoutes = require('../routes/watches');

module.exports = (app) => {
    app.use('/auth', authRoutes);
    app.use('/watches', watchesRoutes);
};