module.exports = async (ctx,next) => {
    await next();
    // ctx.response.type = 'text/html'
    // ctx.response.body = '<h1>Hello World2</h1>'
    ctx.send({code:200, message:"欢迎进入koa+node+mongodb+mongoose"});
};  