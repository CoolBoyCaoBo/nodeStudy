/*
 * @Author: CoolBoy_CaoBo 
 * @Date: 2017-12-14 17:00:23 
 * @Last Modified by: CoolBoy_CaoBo
 * @Last Modified time: 2017-12-18 17:29:03
 */
const http = require('http');
const formidable = require('formidable');//处理表单数据
const util = require('util');//util：node的工具类，无需install

let errorDete = (code,res,error)=>{
    res.writeHead(code,{'content-type':'text/html;charset=UTF-8'});
    res.end(error);
}

let Server = ()=>{
    http.createServer((req,res)=>{
        if(req.url === '/favicon.ico') return false;
        if(req.url === '/upload' && req.method.toLocaleLowerCase() === 'post'){
            let form = new formidable.IncomingForm();
            form.parse(req,function(error,fields,files){
                if(error){
                    throw error;
                    console.log(error);
                    errorDete(500,res,'服务器异常，呜呜呜！！！');
                } 
                res.writeHead(200,{'content-type':'text/plain'})
                console.log(fields);
                console.log(files);
                //util.inspect把两个对象合并，并以字符串的形式展现
                res.end(util.inspect({fields: fields, files: files}));
            })
            return false;
        }
        if(req.url === '/home' || req.url === '/'){
            res.writeHead(200,{'content-type':'text/html;charset=UTF-8'});
            let htmlStr ='<form action="/upload" enctype="multipart/form-data" method="post">'+
            '<input type="text" name="title"><br>'+
            '<input type="text" name="age"><br>'+
            '<input type="file" name="upload" multiple="multiple"><br>'+
            '<input type="submit" value="Upload">'+
            '</form>';
            res.end(htmlStr);
            return false;
        }
        errorDete(404,res,'您要找的页面不见了，呜呜呜！！！');
        
    }).listen(3000,()=>{
        console.log('server has run at port 3000');
    });
};
Server();