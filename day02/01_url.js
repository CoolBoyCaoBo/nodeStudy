const http = require("http");
http.createServer((req,res)=>{
    res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
    res.write("<h1>A主题</h1>");
    res.write("<h2>B主题</h2>");
    res.write("<h3>C主题</h3>");
    res.end();
}).listen(3000,'127.0.0.1',()=>{
    console.log('server run at port 3000');
});