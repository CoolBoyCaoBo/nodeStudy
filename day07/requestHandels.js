/*
 * @Author: CoolBoy_CaoBo 
 * @Date: 2017-12-20 14:14:17 
 * @Last Modified by: CoolBoy_CaoBo
 * @Last Modified time: 2018-04-17 15:12:17
 */

const queryString = require('querystring');
const fs = require('fs');//node 的  fileSystem 文件系统
const util = require('util');//util：node的工具类，无需install
const path = require("path");//path： node的处理文件路径的问题，无需install
const formidable = require('formidable');//处理表单数据
const sd = require("silly-datetime");// node 获取服务器当前时间的和处理时间格式的工具第三方库插件

const router = require('./router');
const handelsOptions = {
    start(request,response){
        console.log("request hander ' start ' was called" );
        response.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});  
        response.write('start');
        response.end();
    },
    upload(request,response){
        console.log("request hander ' upload ' was called" );
        let postData = '';
        request.setEncoding("utf8");
        request.addListener("data",(postDataChunk)=>{      
            postData += postDataChunk;
            console.log("Received POST data chunk '"+ postDataChunk +"'.");    
        });
        request.addListener("end",()=>{
            response.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});  
            postData = queryString.parse(postData);
            console.log(postData);
            response.write(postData.text);
            response.end();
        });
    },
    post(request,response){
        console.log("request hander ' post ' was called" );
        response.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});  
        let htmlStr = `
        <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            </head>
        <body>
            <form action="/upload" method="post"><textarea name="text" rows="20" cols="60"></textarea><input type="submit" value="Submit text" /></form>
        </body>
        </html>`;
        response.write(htmlStr);
        response.end();
    },
    show(request,response){
        console.log("request hander 'show' was called" ); 
        fs.readFile('./imgs/01.jpg',(error,data)=>{
            if(error){
                router.errorDete(500,response,error);
                return false;
            }
            console.log(data);
            response.writeHead(200,{'Content-type':'image/png'});
            response.write(data);
            response.end();
        }); 
    },
    fileUpLoading(request,response){
        console.log("request hander ' fileUpLoading ' was called" );
        fs.readFile('./views/fileUpLoading.html',(error,data)=>{
            if(error){
                router.errorDete(500,response,error);
                return false;
            }
            console.log(data);
            response.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
            response.write(data);
            response.end();
        });
    },
    uploadA(request,response){
        console.log("request hander ' uploadA ' was called" );
        if(request.method.toLocaleLowerCase() === 'post'){
            let form = new formidable.IncomingForm();
            form.uploadDir = "./imgs";//注意目录必须存在，否则报错/不能上传成功
            form.parse(request,(error,fields,files)=>{
                if(error){
                    throw error;
                    console.log(error);
                    router.errorDete(500,response,error);
                    return false;
                }
                // response.write("received uploadA:\n\n");
                let ranNumber = parseInt((Math.random()*1000).toFixed(0));//生成一个三位数整数的随机数
                let newDate = sd.format(new Date(),'YYYYMMDDHHmmss');//生成既定的时间格式
                let extname = path.extname(files.upload.name);//传入url或者文件名
                let oldpath = __dirname+"/"+files.upload.path;//获取之前的url;
                /*
                    newpath:要被修改的路径
                    组成部分：当前路径+保存路径+当前时间+随机数字+后缀名
                */ 
                console.log(__dirname);
                let newpath = __dirname + "/imgs/"+  newDate + ranNumber + extname;
                // 文件名：年月日时分秒+4位随机数
                console.log(fields);
                console.log(files);
                //let obj = util.inspect({fields: fields, files: files});
                fs.rename(oldpath,newpath,(err)=>{
                    if(err) {
                        router.errorDete(505,response,err);
                    }
                    //response.writeHead(200,{"Content-type":"text/plain"});
                    //response.end("success");
                    response.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
                    let imgStr = `
                            <html>
                                <head>
                                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                                </head>
                            <body>
                                <img src="${newpath}" alt=""/>
                            </body>
                            </html>
                        `
                        // 目前引用已经成功，上传和保存均可使用，但是node是没有web容器的，在页面居然显示不了，后面再来处理
                    response.write(imgStr); 
                    response.end();
                });
                //fs.renameSync(obj.files.upload.path, './img/test.jpg');
                //util.inspect把两个对象合并，并以字符串的形式展现
            });
        }else{
            router.errorDete(505,response,'method of post is not find');
        }
    }
};

exports.handels = handelsOptions;