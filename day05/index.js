// const server = require('./server.js');
// const server = require('./server_01.js');
//const route = require('./router_01.js');
const server = require('./server_02.js');
const route = require('./router_02.js');
const requestHandlers = require("./requestHandlers.js");

let handle = {};

handle['/'] = requestHandlers.reqHandlers.start;
handle['/start'] = requestHandlers.reqHandlers.start;
handle['/upload'] = requestHandlers.reqHandlers.upload;

console.log(JSON.stringify(handle));
server.start(route.route,handle);
