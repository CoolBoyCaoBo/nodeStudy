const mongoose = require('mongoose');
const path = require('path');
const glob = require('glob');
let dbUrl = "mongodb://localhost/sjhdDb";

mongoose.Promise = global.Promise
exports.dbConect = () =>{ //加入promise使连接mongodb的异步操作连接产生的错误抛出至外部
    let maxConnectTimes = 0;
    mongoose.connect(dbUrl);

    return new Promise((resolve,reject) => {
        //增加数据库连接的事件监听
        mongoose.connection.on('disconnected',()=>{
            //进行重连
            console.log('***********数据库断开***********');
            if(maxConnectTimes < 3){
                maxConnectTimes++;
                mongoose.connect(dbUrl);
            }else{
                reject();
                throw Error('数据库出现问题，程序无法搞定，请人为修理......');
            }
        });

        //数据库连接出现错误的时候 
        mongoose.connection.on('error',err =>{
            console.log('***********数据库错误***********');
            if(maxConnectTimes < 3) {
                maxConnectTimes++;
                mongoose.connect(dbUrl);
            }{
                reject(err);
                throw Error('数据库出现问题，程序无法搞定，请人为修理......');
            }
            mongoose.connect(dbUrl);
        });

        //连接打开的时候，即数据库连接成功
        mongoose.connection.once('open',()=>{
            console.log('mongoDB Connected successfully!');
            resolve();
        });
    });
};

exports.initSchemas = () =>{
    glob.sync(path.resolve(__dirname,'../models/','**/*.js')).forEach(require)
};