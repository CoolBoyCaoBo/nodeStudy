/*
 * @Author: CoolBoy_CaoBo 
 * @Date: 2017-12-19 13:59:42 
 * @Last Modified by: CoolBoy_CaoBo
 * @Last Modified time: 2017-12-22 14:04:14
 */

const http = require('http');
const url = require('url');
const router = require('./router');
const server = ()=>{
    http.createServer((request,response)=>{
        if(request.url === '/favicon.ico') return false;
        let pathName = url.parse(request.url).pathname;
        // console.log(pathName);
        if(pathName === '/'){
            pathName = '/start';//如果直接访问页面更路基就默认start
        }
        pathName =  pathName.replace(/\//,'');//替换掉前面的/
        router.router(pathName,request,response);
    }).listen(3000,()=>{
        console.log('server has run at port 3000');
    });
};

// server();
exports.server = server;