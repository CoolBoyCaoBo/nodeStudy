var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var chalk = require("chalk");//用于控制台输出带有不同颜色的字体
var dotenv = require('dotenv');//用于将环境变量从一个.env文件加载到process.env。
//加载mongoose 数据库模块
var mongoose = require("mongoose");

//加载bodyParser,用来处理post请求提交到服务器的数据
var bodyParser = require("body-parser");

//加载session 中间件模块
var session = require('express-session');

//使用mongoDB 控制 session 的持久化存储以及对应的有效期
var MongoStore = require('connect-mongo')(session);

//加载所有api接口文件模块
var route = require('./routes/index.js');

dotenv.load({path:".env.global"});



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: process.env.SHAKEY,
    secret: process.env.SECRET,
    store: new MongoStore({
        url: process.env.MONGODB_URI
    }),
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 //one day
    }
}));

route(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.Promise = global.Promise //将node环境下的 Promise 赋值给mongoose

mongoose.connect(process.env.MONGODB_URI,(err) => {
    if(err){
        console.log("数据库连接失败了...",chalk.red('✗'));
        return 
    }
    console.log('数据连接成功...',chalk.green('✓'));
    app.listen(8086, () => {
        console.log("%s url : " + "http://localhost:%d", chalk.green('✓'), 8086);
        console.log("%s Express Started", chalk.green('✓'));
    });
})

module.exports = app;
