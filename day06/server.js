const http = require('http');
const url = require('url');
const requestHandlers = require('./requestHandlers.js');

let handle = {};

handle['/'] = requestHandlers.reqHandlers.start;
handle['/start'] = requestHandlers.reqHandlers.start;
handle['/upload'] = requestHandlers.reqHandlers.upload;


const serverStart = (route)=>{
    http.createServer((req,res)=>{
        if(req.url === '/favicon.ico') return false;
        let pathName = url.parse(req.url).pathname;
        //res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
        route(pathName,handle,res);
        //res.end();
    }).listen(3000,'192.168.4.101',()=>{
        console.log('server has run at port 3000');
    });
};
// serverStart();

exports.serverStart = serverStart;