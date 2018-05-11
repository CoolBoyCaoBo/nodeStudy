const Hello = require('./hello');
const Registe = require('./registe');
const Show = require('./show');
const Modify = require('./modify');

module.exports = (app) => {
    app.use('/',Hello);
    app.use('/registe',Registe );
    app.use('/show',Show);
    app.use('/modify',Modify)
}