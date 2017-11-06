const http = require('http');
const url = require('url');
http.createServer((req,res)=>{
    if(req.url === '/favicon.ico')return false;
    res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
    let pathname = url.parse(req.url,true).query;
    let username = pathname.username,password = pathname.password,sex = pathname.sex;
    //此方法获取相关值适用于get请求，若为post的方式的，则获取的值都是undefined
    res.end("表单提交的数据为：用户名[" + username + "]，密码：[" + password + "]" + "，性别：[" + sex + "]");
}).listen(3000,'127.0.0.1',()=>{
    console.log('server run at port 3000');
});