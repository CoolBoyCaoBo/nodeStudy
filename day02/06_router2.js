const http = require('http');
http.createServer((req,res)=>{
    if(req.url === '/favicon.cio') return false;
    let currentUrl = req.url;//模拟路由的实现方式，方面将引人第三方库插件进行复杂路由的实现方式
    let tipsInfo = '';
    res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
    if(currentUrl.substr(0,9) === '/student/'){//表示student开头
        let studentId = currentUrl.substr(9);
        if(/^\d{10}$/.test(studentId)){
            tipsInfo = '你输入的学生信息为：'+studentId
        }else{
            tipsInfo = '你输入的学生信息未找到！！！';
        }
    }else if(currentUrl.substr(0,9) === '/teacher/'){
        let teacherId = currentUrl.substr(9);
        if(/^\d{6}$/.test(teacherId)){
            tipsInfo = '你输入的老师信息为：'+teacherId;
        }else{
            tipsInfo = '你输入的老师信息未找到！！！';
        }
    }else{
        tipsInfo = '你输入的信息有误，反正我是不认识的！！！';
    }
    res.end(tipsInfo);
}).listen(3000,'127.0.0.1',()=>{
    console.log('server run at port 3000');
})