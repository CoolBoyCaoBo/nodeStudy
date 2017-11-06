const http = require('http');
const fs = require('fs');
http.createServer((req,res)=>{
    if(req.url === '/favicon.ico') return false;
    let wjjArry = [];
    fs.readdir('./img',(error,files)=>{//异步读取文件夹内容
        if(error) throw error;
        for(let i = 0;i < files.length;i++){//es6的let声明方式可以解决异步获取循环的问题
           let currentFilename = files[i];
           fs.stat('./img/'+currentFilename,(error,stats)=>{
               if(error) throw error;
               if(!stats.isDirectory()){
                   wjjArry.push(currentFilename);
                   console.log(wjjArry);
               }
           });
        }
    });
    res.end();
}).listen(3000,'127.0.0.1',()=>{
    console.log('server run at port 3000');
});