let env = process.env.NODE_ENV || 'development';
let settings = require('./config/settings')[env];
const app = require('express')();

require('./config/database')(settings);
require('./config/express')(app);
require('./config/routes')(app);

//START POINT OF THE SERVER