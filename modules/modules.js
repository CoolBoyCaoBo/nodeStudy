function  controller(req,res){ 
	console.log(req);
	console.log(res);     
    res.write("发送");      
    call('hello',req,res);      
    res.end("");      
}      
function  call(res){      
    console.log('call');      
}   
module.exports = controller;     