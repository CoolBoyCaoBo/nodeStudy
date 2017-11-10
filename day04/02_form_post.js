const http = require('http');
const queryString = require('querystring');

http.createServer((req,res)=>{
    if(req.url === '/favicon.ico') return false;
    console.log(req.method);//req.method:获取提交的方式：get/post 等等

    if(req.url === '/dopost' && req.method.toLowerCase() === 'post'){
        /*
        下面的这个公式是post的请求接收公式
        这里只接收了一小段，防止一个多大的post请求处理阻塞了这个进程
    */ 
    // 传输中 
        let allData = "";
        /**
         * 我们在本地电脑可能只会看到一次分段处理，但是在服务器可能会有N个
         */ 

        req.addListener('data',(chunk)=>{
            allData+=chunk;
        }) ;
        // 传输完毕后

        req.addListener('end',()=>{
            let dataString = allData.toString();
            console.log('allData is loading...');
            console.log(allData);
            // 将dataString转换为一个对象
            let dataObj = queryString.parse(dataString);
            console.log('dataObj is loading...');
            console.log(typeof dataObj);
            console.log("名字："+dataObj.name);
            console.log("密码："+dataObj.password);
            res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
            res.end('success');
        });
    }else{
        res.writeHead(404,{'Content-type':'text/html;charset=UTF-8'});
        res.end('request is not found');
    }
    
}).listen(3000,'127.0.0.1',()=>{
    console.log('server run at port 3000');
});