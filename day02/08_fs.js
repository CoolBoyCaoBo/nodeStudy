const http = require('http');
const fs = require('fs');
http.createServer((req,res)=>{
    if(req.url === '/favicon.ico') return false;
    //创建文价夹属于异步操作，所以在这里需要特别注意！！！
    fs.mkdir('./images',(err)=>{
        if(err) throw err;
    });
    res.writeHead(200,{'Content-type':'txt/html;charset=UTF-8'});
    res.end('创建完毕！！！');
}).listen(3000,'127.0.0.1',()=>{
    console.log('server run at port 3000');
});