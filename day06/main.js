const server = require('./server.js');
const route = require('./router.js');


server.serverStart(route.route);
