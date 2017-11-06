const http = require('http');
const url = require('url');//node的url模块，用来处理响应地址后面所带参数的处理
http.createServer((req,res)=>{
    if(req.url == '/favicon.ico'){return false;}
    res.writeHead(200,{'Content-type':'text/html;charsst=UTF-8'});
    console.log(req.url);
    //URL模块只能负责获取，我们依赖的对象还是req.rul
    console.log(url.parse(req.url).query);//帮助我们把传入的URL转换为（拆分为）不同的模块
    res.end('hello url api');
}).listen(3000,'127.0.0.1',()=>{
    console.log('server run at potr 3000');
})