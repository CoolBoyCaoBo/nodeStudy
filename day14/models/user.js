const mongoose = require('mongoose');
const bcrypt = require("bcrypt"); //引入bcrypt 对用户密码进行加盐 hash加密处理
const SALT_WORK_FACTOR = 10;
// const Schema = mongoose.Schema ;

//定义用户结构表 
//定义用户的表结构
const userSchema = new mongoose.Schema({
    //用户注册手机号
    userPhoneNumber:{ //用户手机号码是唯一的
        unique:true,
        type:String
    },
    //密码
    password: String,
    //是否为管理员
    isAdmin:{
        type: Boolean,
        default: false
    }
});

// 每次注册存入数据库前将用户密码进行加密加盐处理

userSchema.pre('save',function(next){ //此处函数严禁使用箭头函数，不然就报错拿不到想要的结果了
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt) => {
        if(err) return next(err);
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err);
            this.password = hash;
            next();
        })
    });
});

// 通过methods 方法向userSchema 实例挂在方法
userSchema.methods = {
    //密码比对的方法
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{ //_password：用户登录传入的密码  password：从数据库取到的加密密码
                if(!err) resolve(isMatch)
                else reject(err)
            });
        })
    }
}

//发布模型
mongoose.model('User',userSchema);