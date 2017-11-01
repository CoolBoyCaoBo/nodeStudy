const http = require('http');
const fs = require('fs'); //fs(file system node的文件模块系统)；
const path = require('path');
console.log(path);

http.createServer((req, res) => {
    if (req.url === '/home' || req.url === '/') { //当访问的根路径时默认打开home.html的页面。
        fs.readFile('./home/home.html', (error, data) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html;   charset=utf-8' });
                console.log("当前访问路径为：" + req.url);
                res.end(error);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html;   charset=utf-8' });
                console.log("当前访问路径为：" + req.url);
                res.end(data);
            }
        });
    } else if (/\.css$/.test(req.url)) { //踩坑，node是没有web的容器的所以所有引入的web的资源需要通过fs载入
        fs.readFile('./home/style.css', (error, data) => {
            if (error) {
                es.writeHead(500, { 'Content-Type': 'text/html;   charset=utf-8' });
                console.log("当前访问路径为：" + req.url);
                res.end(error);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css;   charset=utf-8' });
                res.end(data);
            }
        })
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html;   charset=utf-8' });
        res.end("当前访问页面不存在！！！");
    }
}).listen(3002, '127.0.0.1', () => {
    console.log('server start at 3002 port!!!');
});