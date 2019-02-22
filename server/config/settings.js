module.exports = {
    development: {
        db: 'mongodb://localhost:27017/books-store',
        port: 5000
    },
    production: {
        port: process.env.PORT,
        db: ""
    }
};