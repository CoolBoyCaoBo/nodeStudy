const http = require('http');

function start() {
    function onRequest(req,res){
        if(req.url === '/favicon.ico') return false;
        console.log('resquest has received!');
        res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
        res.end('hello world!');
    };
    http.createServer(onRequest).listen(3000,'127.0.0.1',()=>{
        console.log('server has start at port 3000');
    });
};

exports.start = start;//我们现在可以把我们的应用的不同部分放入不同的文件里，并且通过生成模块的方式把它们连接到一起了