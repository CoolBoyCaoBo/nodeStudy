const http = require('http');
const fs = require('fs');
http.createServer((req,res)=>{
    if(req.url === '/favicon.ico') return false;
    let wjjArry = [];
    fs.readdir('./img',(error,files)=>{//异步读取文件夹内容
        if(error) throw error;
        //es5语法解决异步循环的问题,闭包递归模拟循环处理！
        (function iterator(i){
            if(i >= files.length){
                console.log(wjjArry);
                return false;
            }
            fs.stat('./img/'+files[i],(err,stats)=>{
                if(err) return false;
                if(stats.isDirectory()){
                    wjjArry.push(files[i]);
                }
                iterator(i+1);
            });
        })(0)
    });
    res.end();
}).listen(3000,'127.0.0.1',()=>{
    console.log('server run at port 3000');
});