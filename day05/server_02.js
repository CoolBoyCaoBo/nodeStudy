const http = require('http');
const url = require('url');

function start(route,handle){//进行函数形式的传递
    http.createServer((req,res)=>{
        if(req.url === '/favicon.ico') return false;//当加入请求后，node服务的本次请求将不再访问了,但会走route的else入口
        var pathName = url.parse(req.url).pathname;//可以通过请求的URL路径来区别不同请求了,现在我们新建router_01.js通过路由来拓展一下文件
        console.log("Request for "  + pathName +  " received.");
        route(pathName,handle,res);//此时我们可以看见在输入不同的地址可以输出不同的路由了
        // res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
        //res.end('this is:'+pathName+'page');
        res.end();
    }).listen(3000,'127.0.0.1',()=>{
        console.log('server has run at port 3000');
    });
};

exports.start = start;