const http = require('http');
http.createServer((req, res) => {
    if (req.url !== '/favicon.icon') {
        if (req.url === '/home') {
            res.writeHead('200', { 'Content-Type': 'text/html;  charset=utf-8' });
            console.log("当前访问路径为：" + req.url);
            res.write("当前访问路径为：" + req.url)
            res.end("");
        } else if (req.url === '/info') {
            res.writeHead('200', { 'Content-Type': 'text/html; charset=utf-8' });
            console.log("当前访问路径为：" + req.url);
            res.write("当前访问路径为：" + req.url);
            res.end("");
        } else if (req.url === '/detail') {
            res.writeHead('200', { 'Content-Type': 'text/html; charset=utf-8' });
            console.log("当前访问路径为：" + req.url);
            res.write("当前访问路径为：" + req.url);
            res.end("");
        } else {
            res.writeHead('404', { 'Content-Type': 'text/html; charset=utf-8' });
            console.log("当前访问路径为：" + req.url);
            res.write("当前访问路径为：" + req.url);
            res.end("当前所访问服务不存在");
        }
    }
}).listen(3001, '127.0.0.1', () => {
    console.log("server start at port 3001");
})