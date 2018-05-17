const hello = require('./hello.js');
const admin = require('./admin/index.js');

module.exports = (app) => { 
    app.use('/', hello);
    app.use('/admin',admin);
};