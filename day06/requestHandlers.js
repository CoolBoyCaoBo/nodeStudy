const exec = require("child_process").exec;//解决阻塞的不好的实现方式

let requestOptions = {
    start:function(res){
        console.log("request hander ' start ' was called" );
        // function sleep(milliSeconds)  {   //模拟阻塞 
        //     let startTime =  new  Date().getTime();    
        //     while  (new  Date().getTime() < startTime + milliSeconds);  
        // }
        // sleep(10000); 
        // res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});  
        // res.write('我是睡眠了十秒后启动的！！！');
        // res.end();
        //let content =  "empty";
        exec("ls -lah",function(error, stdout, stderr){  
            res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});  
            res.write(stdout);
            res.end();
        });
        // exec("find /", {timeout:10000,maxBuffer:20000*1024},function(error, stdout, stderr){
        //     res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'}); 
        //     res.write(stdout);
        //     res.end();   
        // });
    },
    upload:function(res){
        console.log("request hander ' upload ' was called" );
        res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
        res.write("this is upload page");
        res.end();
    }
};

exports.reqHandlers = requestOptions;