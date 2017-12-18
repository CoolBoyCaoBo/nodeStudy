/*
 * @Author: CoolBoy_CaoBo 
 * @Date: 2017-12-14 17:00:23 
 * @Last Modified by: CoolBoy_CaoBo
 * @Last Modified time: 2017-12-15 11:57:28
 */
const http = require('http');
const formidable = require('formidable'),//处理表单数据
const util = require('util');//util：node的工具类，无需install

let Server = ()=>{
    http.createServer((req,res)=>{
        
    }).listen(3000,'127.0.0.1',()=>{
        console.log('server has run at port 3000');
    });
};
