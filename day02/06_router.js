const http = require('http');
http.createServer((req,res)=>{
    if(req.url === '/favicon.cio') return false;
    let currentUrl = req.url;//模拟路由的实现方式，方面将引人第三方库插件进行复杂路由的实现方式
    res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
    if(currentUrl.substr(0,9) === '/student/'){//表示student开头
        let studentId = currentUrl.substr(9);
        if(/^\d{10}$/.test(studentId)){
            res.end('您要查询的学生信息ID为：'+studentId);
        }else{
            res.end('您要查询的学生信息未找到！！！');
        }
    }else if(currentUrl.substr(0,9) === '/teacher/'){
        let teacherId = currentUrl.substr(9);
        if(/^\d{6}$/.test(teacherId)){
            res.end('您要查询的教职工信息为：'+teacherId);
        }else{
            res.end('您要查询的教职工信息未找到！！！');
        }
    }else{
        res.end('请检查你的输入是否有问题，反正我是不认识的~！');
    }
}).listen(3000,'127.0.0.1',()=>{
    console.log('server run at port 3000');
})