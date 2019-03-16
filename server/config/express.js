const bodyParser = require('body-parser');
const session = require('express-session');
let env = process.env.NODE_ENV || 'development';
let settings = require('./settings')[env];

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
    app.use(session({secret: 'topSecretPass123'}));
// General error handling
    app.use((error, req, res, next) => {
        const status = error.statusCode || 500;
        const message = error.message;
        res.status(status)
            .json({ message: message });
        next();
    });

    app.listen(settings.port, () => { console.log(`REST API listening on port: ${settings.port}`) });
};