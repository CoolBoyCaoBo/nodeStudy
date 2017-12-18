const exec = require("child_process").exec;

let requestOptions = {
    start:function(res){
        console.log("request hander ' start ' was called" );
        let content =  "empty";
        exec('find /?',{encoding: 'utf8'},function(error, stdout, stderr){  //执行的回调函数是主线程上的，因此存在阻塞问题
            if(error) throw error;
            content =  stdout
            // function sleep(milliSeconds)  {   //模拟阻塞 
            //     let startTime =  new  Date().getTime();    
            //     while  (new  Date().getTime() < startTime + milliSeconds);  
            // }
            // sleep(10000); 
            console.log(content);
            res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});  
            res.write(content);
            res.end();
        });
        console.log(1111);
    },
    upload:function(res){
        console.log("request hander ' upload ' was called" );
        res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
        res.write("this is upload page");
        res.end();
    }
};

exports.reqHandlers = requestOptions;