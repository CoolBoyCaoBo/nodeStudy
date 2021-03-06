const mongoose = require('mongoose');
module.exports = {
    register:async(ctx,next) => {
        await next();
        let reqData = ctx.request.body;
        // console.log(reqData);
        let User = mongoose.model("User"); //注册user表
        let newUser = new User({
            userPhoneNumber:reqData.phoneNumber,
            password:reqData.password,
            isAdmin:reqData.isAdmin
        });
        await newUser.save().then(()=>{
            ctx.send({
                code:200,
                msg:"注册成功！！！"
            });
        }).catch(err =>{
            ctx.send({
                code:500,
                msg:"注册失败："+err+""
            });
            return ;
        })
        
    },
    login:async(ctx,next) => {
        await next()
        let reqData = ctx.request.body;
        let User = mongoose.model("User"); //注册user表
        //开始查找用户名是否存在，存在则登录成功，不存在则对应提示
        await User.findOne({userPhoneNumber:reqData.phoneNumber}).exec().then(async (result) => {
            if(result){
                //若存则进行密码比对
                //因为comparePassword是挂在userSchema的实例上的所以需要实例化调用
                await new User().comparePassword(reqData.password,result.password).then((isMatch) => {
                    if(isMatch){
                        ctx.cookies.set("token", result.token, {
                            maxAge:1000*60*60*24
                        })
                        //返回比对结果
                        ctx.send({code:200, message:"登录成功~~~"});
                    }else{
                        ctx.send({code:1000, message:"密码输入错误，请重新输入"});
                    }
                    
                }).catch(error => {
                    //出现异常，返回异常
                    console.log(error);
                    ctx.send({code:500, message:error}); 
                    return ;
                })
            }else{
                ctx.send({code:3000, message:'输入的登录手机号不存在，请注册后再登录'});
            }
        }).catch((error)=>{
            console.log(error)
            ctx.send({code:500, message:error});
            return;
        })
    },
    loginState:async(ctx,next) => {
        await next();
        ctx.send({code:200, message:'该用户已处于登录状态~~~'});
    },
    userInfo:async(ctx,next) => {
        let _token = ctx.cookies.get("token");
        let User = mongoose.model("User"); //注册user表
        await next();
        await User.findOne({token:_token}).exec().then((result) => {
            if(result){
                ctx.send({
                    code:200,
                    message:"数据获取成功~~~",
                    data:{
                        userPhoneNum:result.userPhoneNumber,
                        userType:result.isAdmin
                    }
                });
            }else{
                ctx.send({code:500, message:"该账户用户信息不存在..."});
            }
        }).catch((err) => {
            ctx.send({code:502, message:"账户信息获取异常~~~"});
        });
    },
    loginOut:async(ctx,next) => {
        ctx.cookies.set("token", null ,{
            maxAge:500
        });
        ctx.send({code:200, message:"退出成功~~~"});
        await next();
    }
}
