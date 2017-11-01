let http = require('http');
let modules = require('./modules/modules.js');
http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type': 'text/html;	charset=utf-8'});
	if(request.url !=="/favicon.ico"){
		console.log('访问成功');
		//response.write('hello world');
		fun1(response);
		modules(request,response); 
		response.end('');
	}
}).listen(8000);
console.log('Server  running  at  http://127.0.0.1:8000/');
function fun1(res){
	res.write("hello 我是慧林创制的fun1");
}