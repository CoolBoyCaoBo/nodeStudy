const mongoose = require('mongoose');
const chalk = require('chalk');
mongoose.connect('mongodb://localhost:27017/test',(err) => { //mongoose连接mongodb数据库，数据库url 连接的回调函数
    if(err){
        console.log("%s 数据库连接失败", chalk.red('✗'));
    }else{
        console.log("数据库连接成功");
    }
});

const Cat = mongoose.model('Cat', { name: String }); //声明一个数据集合，第一个参数：集合名称，第二个参数：集合的数据结构及对应的数据类型

const kitty = new Cat({ name: 'Zildjian' }); //实例化Cat表集合方便save方法操作来插入数据库
kitty.save().then((res) => console.log('Cat 集合出入一条name'+res)).catch((err) =>console.log(JSON.stringify(err))); //mongoose用了插入mongodb数据库的方法，promise语法。