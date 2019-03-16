const authRoutes = require('../routes/auth');
const watchesRoutes = require('../routes/watches');
const ordersRoutes = require('../routes/order');
const adminRoutes = require('../routes/admin');

module.exports = (app) => {
    app.use('/auth', authRoutes);
    app.use('/watches', watchesRoutes);
    app.use('/orders', ordersRoutes);
    app.use('/admin', adminRoutes);
};