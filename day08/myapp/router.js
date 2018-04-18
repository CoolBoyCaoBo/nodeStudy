const express = require('express');
const app = express();


//基本的路由示例：
app.get('/',(req,res) => {
    res.send('hello world');
})

//路由方法

app.get('/getTest',(req,res) => {
    let httpType = req.method;
    res.send('this http is : '+httpType);
})

app.get('/getHtml',(req,res) => {
    htmlStr = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Page Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <form action="/postTest" method="post">
            <input type="submit" value="提交">
        </form>
    </body>
    </html>`
    res.write(htmlStr);
})
 
app.post('/postTest',(req,res) => {
    let httpType = req.method;
    res.send('this http is : '+httpType);
})


//路由路径

//使用字符串的路由路径示例：
app.get('/about',(req,res) => {
    res.send('this is about api');
})

//使用字符串模式的路由路径：
// 匹配 acd 和 abcd
app.get('/ab?cd', function(req, res) {
    res.send('ab?cd');
});
  
// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function(req, res) {
    res.send('ab+cd');
});
  
// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get('/ab*cd', function(req, res) {
    res.send('ab*cd');
});
  
// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function(req, res) {
    res.send('ab(cd)?e');
});


// 使用正则表达式的路由路径

// 匹配任何路径中含有 a 的路径：
// app.get(/a/, function(req, res) {
//     res.send('/a/');
// });

// 路由句柄
// 可以为请求处理提供多个回调函数，其行为类似 中间件

app.get('/example/b', function (req, res, next) {
    console.log('response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from B!');
});

// 响应方法
    /***
     *  res.download()	提示下载文件。
        res.end()	终结响应处理流程。
        res.json()	发送一个 JSON 格式的响应。
        res.jsonp()	发送一个支持 JSONP 的 JSON 格式的响应。
        res.redirect()	重定向请求。
        res.render()	渲染视图模板。
        res.send()	发送各种类型的响应。
        res.sendFile	以八位字节流的形式发送文件。
        res.sendStatus()	设置响应状态代码，并将其以字符串形式作为响应体的一部分发送
     ***/

// app.route() 暂时没有理解使用场景

// express.Router　：使用 express.Router 类创建模块化、可挂载的路由句柄。Router 实例是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”。
// 下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用的路径上。

const birds = require('./minRouter');
app.use('/birds', birds);

//利用 Express 托管静态文件 : 通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。

app.use(express.static('views'));

//如果你希望所有通过 express.static 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现，如下所示：
//app.use('/static', express.static('public'));
//http://localhost:3000/static/images/kitten.jpg

let server = app.listen(3000,() => {
    console.log('server is running at port 300');
});