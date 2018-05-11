/***
 * 
 * mongoose 中Schemas的用法
 * 
 * ***/

const mongoose = require('mongoose');
const chalk = require('chalk');

//数据库连接
mongoose.connect('mongodb://localhost:27017/test',(err) => {
    if(err){
        console.log("%s 数据库连接失败", chalk.red('✗'));
    }else{
        console.log("数据库连接成功");
    }
});

// 定义Schemas 
const Schema = mongoose.Schema;

let blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date:{type: Date, default: Date.now }}],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
});
// Instance methods 实例方法，此处原理应该和save方法同属一个原型连上，只是一个是手动添加，一个是本身就有的 (表集合继承链)

blogSchema.methods.speakGreeting = function(greetTxt,cb){ // 所有的blogSchema实例均继承此方法
    console.log('hello'+greetTxt);
    cb(this);
}



// Statics 在实例上添加静态方法（在挂在点提供除内部方法外的外部方法）
blogSchema.statics.findTitle = function(title, cb) { 
    this.find({ title: title},(err,res)=>{
        if(err){
            console.log(JSON.stringify(err));
            cb(err);
            return
        }
        cb(res);
    });
};











//Creating a model 构建一个model

let Blog = mongoose.model('Blog', blogSchema); //创建一个基于blogSchema的Blog的数据库映射集合（表）



let blog1 = new Blog({ //表实例化，方便数据库存入
    title:  '5.2卡友节A',
    author: 'coolBoy_CaoBoA',
    body:   'hello this blog1 body',
    comments: [{ body: 'hello this is comments body'}],
    // date: { type: Date, default: Date.now },
    hidden: false,
    meta: {
      votes: 67,
      favs:  89
    }
});

// blog1.speakGreeting('hahaha',function(res){
//     console.log('回调结果无'+res);
// })

// Blog.findTitle('5.2卡友节A',(res)=>{
//     console.log(res);
// })

Blog.find((err,res)=>{
    console.log(res);
});
// blog1.save().then((res)=>{
//     console.log('数据插入成功~');
// }).catch((err)=>{
//     console.log(err);
// });