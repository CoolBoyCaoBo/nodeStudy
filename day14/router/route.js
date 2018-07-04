const router = require('koa-router')();
const route = require('../controller/index.js');

router.use(async(ctx,next) => { //路由session 验证，如果存在且没有失效则保留会话，否则需登录后更新session后才可保留服务器与客户端的会话
    let _token = ctx.cookies.get("token");
    // console.log("token的获取："+_token);
    await next();
    if(_token === undefined && ctx.request.url !== "/user/login"){
        ctx.body={code:3001, message:"session获取失败，请重新登录~~~"};
    }
});

//装载所有路由
router.use(route.routes());


module.exports = (app) =>{ //所有路由请求的入口配置
    app.use(router.routes()).use(router.allowedMethods())
};