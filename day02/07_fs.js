const http = require('http');
const fs = require('fs');//node 读取文件api 全称：fileSystem
http.createServer((req,res)=>{
    if(req.url === '/favicon.ico') return false;
    res.writeHead(200,{'Content-type':'text/html;charset=UFT-8'});
    let randNum = parseInt(Math.random() * 1000);//模拟一下并行请求

    fs.readFile('./test/1.txt',(error,data)=>{//文件获取都是异步获取
        if(error) throw error;
        console.log(randNum + '文件读取完毕！！！');
        res.end(data);
    })
}).listen(3000,'127.0.0.1',()=>{
    console.log('server run at port 3000');
});