const express = require("express");
const router = express.Router();

// 当我们访问/admin时，所有请求都会走这个中间件

router.use("/",(req,res,next) => {
    /**
     * 权限控制
     * */ 
    // if(req.isAdmin){

    // }
    next();
});

router.get("/",(req,res,next) => {
    var user={
        name:"CaoBo1",
        age:"26",
        address:"hf"
    }
    req.session.name = user.name;
    res.send("这里访问的是管理员首页");
});

module.exports = router