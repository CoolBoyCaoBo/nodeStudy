var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  　console.log('Time: ', Date.now());
  　next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
  　res.send('Birds home page');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
  　res.send('About birds');
});

router.get('/about', function(req, res) {
    res.send('About birds');
});

//应用即可处理发自 /birds 和 /birds/about 的请求，并且调用为该路由指定的 timeLog 中间件。
module.exports = router;