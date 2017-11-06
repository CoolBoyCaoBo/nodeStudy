const http = require('http');
const fs = require('fs');
http.createServer((req,res)=>{
    if(req.url === '/favicon.ico') return false;
    res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
    fs.stat('./08_fs.js',(err,data)=>{//回调有两个参数 (err, stats) 其中 stats 是一个 fs.Stats 对象。
        console.log(data.isDirectory());//判断是否是文件夹
        //data.isDirectory如果返回时true表示加载的是文件夹，反之表示不是
    });
    res.end();
}).listen(3000,'127.0.0.1',()=>{
    console.log('server run at port 3000');
});