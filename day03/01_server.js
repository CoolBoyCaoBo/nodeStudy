const http = require('http');
const url = require('url');//node url 模块解析地址参数功能用
const fs = require('fs');//node 文件系统模块
const path = require('path');//node 的路径模块
/*
    path模块提供了一些用户处理文件路径的小工具
    path.normalize：规范化路径
*/
function getMine(extname){//根据传入的文件名的后缀判断文件所需要渲染的环境，//nodejs是没有web容器的
    switch(extname){
        case'.html':
            return 'text/html;charset=UTF-8';
            break;
        case'.jpg':
            return 'image/jpg';
            break;
        case ".css":
            return "text/css;charset=UTF-8";
            break;
        case ".json":
            return "application/json"
            break;
    }
}



http.createServer((req,res)=>{
    if(req.url === '/favicon.ico') return false;
    let pathname = url.parse(req.url).pathname;//获取端口号后面的URL;
    console.log(pathname);
    //判断请求是文件还是文件夹
    //文件：list.html     文件夹：myimg   images
    if(pathname.indexOf('.') === -1){//代表访问的是文件夹，此时就该重写实际的请求路径
        pathname = pathname + '/index.html';
    }
    //输入的请求文件地址：127.0.0.1/img/img.jpg
    //而实际请求的地址是：./static/img/img.jpg
    let fileUrl = './'+path.normalize('./static/'+pathname);//当发现多个连续的路径分隔符时（如 POSIX 上的 / 与 Windows 上的 \ 或 /），它们会被单个的路径分隔符（POSIX 上是 /，Windows 上是 \）替换。 末尾的多个分隔符会被保留。
    //如果 path 是一个长度为零的字符串，则返回 '.'，表示当前工作目录。
    let extname = path.extname(pathname);//extname：获取后缀名
    console.log(pathname);
    fs.readFile(fileUrl,(err,data)=>{
        if(err) {
            res.writeHead(404,{"Content-type":"text/html;charset=UTF-8"});
            res.end("404，页面未找到，page not found");
        };
        let mime = getMine(extname) || "text/plain";
        res.writeHead(200,{"Content-type":mime});//xiehua
        //res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});//这个貌似只是识别html的文件，
        res.end(data);
    })
}).listen(3000,'127.0.0.1',()=>{
    console.log('server run at port 3000');
});