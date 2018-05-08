const mongoose = require('mongoose');
const chalk = require('chalk');

// mongoose 中的 Schema 的用法

//数据库连接
mongoose.connect('mongodb://localhost:27017/test',(err) => {
    if(err){
        console.log("%s 数据库连接失败", chalk.red('✗'));
    }else{
        console.log("数据库连接成功");
    }
});

//定义一个kittySchema的数据模式
let kittySchema = mongoose.Schema({
    name: String,
    age:Number,
    gender:String,
    admin:{
        type:Boolean,
        default: false
    }
});

//定义kittySchema的方法
// NOTE: methods must be added to the schema before compiling it with mongoose.model()

kittySchema.methods.speak = function(){ //methods 方法继承kittySchema原型
    let greeting = this.name ? this.name : 'sorry my name is not defined';
    console.log(greeting);
}

//定义一个Kitten的原型对象

let Kitten = mongoose.model('Kitten',kittySchema);

var silence = new Kitten({name: 'Silence1',gender:'male',age:19}); // 非默认字段不传则为undefined 默认值可以不用管
// var silence = new Kitten({gender:'male',age:18}); //插入数据结果如下
// { admin: false,
// _id: 5af15e4414ca3127fc0e99b8,
// gender: 'male',
// age: 18,
// __v: 0 }
console.log(silence.age); // '18'

silence.speak();// sorry my name is not define

// silence.save((err,res) =>{
//     if (err) return console.error(err);
//     console.log('Kitten集合插入数据成功：'+res);
// });

Kitten.find((err,res)=>{ // 集合的的查询方法，用来查询数据的，第一个参数：查询条件，第二个参数：查询成功的的回调。
    console.log(res);
});

Kitten.find({name:'Silence1'},(err,res)=>{ // 集合的的查询方法，用来查询数据的，第一个参数：查询条件，第二个参数：查询成功的的回调。
    console.log(res);
});
