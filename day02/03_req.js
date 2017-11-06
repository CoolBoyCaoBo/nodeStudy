const http = require('http');
const url = require('url');
http.createServer((req,res)=>{
    if(req.url === '/favicon.ico') return false;
    res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
    console.log(req.url);
    //url.parse,官网api共接受三个参数，urlString(string):要解析的URL字符串
    //parseQueryString(boolean):如果为 true，则 query 属性总会通过 querystring 模块的 parse() 方法生成一个对象。 如果为 false，则返回的 URL 对象上的 query 属性会是一个未解析、未解码的字符串。 默认为 false
    //slashesDenoteHost(boolean):如果为 true，则 // 之后至下一个 / 之前的字符串会被解析作为 host。 例如，//foo/bar 会被解析为 {host: 'foo', pathname: '/bar'} 而不是 {pathname: '//foo/bar'}。 默认为 false。
    console.log(url.parse(req.url,true).query.name);
    res.end();
}).listen(3000,'127.0.0.1',()=>{
    console.log('server run at port 3000');
})