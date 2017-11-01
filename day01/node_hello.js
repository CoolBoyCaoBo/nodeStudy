const http = require("http");
http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        return false;
    }
    res.writeHead(200, { 'Content-Type': 'text/html;  charset=utf-8' });
    console.log(req.url);
    res.write('hello,world');
    res.end('你好,世界!');
    //如果没有res.end会存在“挂起”状态，也就是浏览器Tab选项有个圈圈一直转动
    //不写则没有http协议尾,但写了会产生两次访问，一次是  /favicon.ico产生，一次是/产生
}).listen(3000, () => {
    console.log('Server  running  at  3000 port');
});