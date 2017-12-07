let requestHandlerOptions = {
    start:function(res){
        console.log("request hander ' start ' was called" );
        res.write("this is start page");
    },
    upload:function(res){
        console.log("request hander ' upload ' was called" );
        res.write("this is upload page");
    }
};

exports.reqHandlers = requestHandlerOptions;


