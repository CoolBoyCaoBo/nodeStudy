const router = require('koa-router')();
const route = require('../controller/index.js');
//装载所有路由

router.use(route.routes());


module.exports = (app) =>{ //所有路由请求的入口配置
    app.use(router.routes()).use(router.allowedMethods())
};