const http = require('http');
const url = require('url');
http.createServer((req,res)=>{
    if(req.url === '/favicon.ico')return false;
    res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
    let pathName = url.parse(req.url,true).query;
    console.log('name:'+pathName.name+'age:'+pathName.age+'sex:'+pathName.sex);
    res.end();
}).listen(3000,'127.0.0.1',()=>{
    console.log('server run at port 3000');
});