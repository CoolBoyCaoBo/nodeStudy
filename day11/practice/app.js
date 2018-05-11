const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');

const route = require('./router/index.js');
const app = express();
route(app);

//set express 服务端渲染模版引擎
app.set('view engine', 'ejs');

//set express 静态资源托管文件
app.use('/static',express.static('public'));

mongoose.connect('mongodb://localhost:27017/test',(err) => { //mongoose连接mongodb数据库，数据库url 连接的回调函数
    if(err){
        console.log("%s 数据库连接失败", chalk.red('✗'));
    }else{
        console.log("数据库连接成功");
        app.listen(3000,() => {
            console.log('server is running at port 3000');
        });
    }
});