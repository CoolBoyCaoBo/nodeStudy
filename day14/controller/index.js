const router = require('koa-router')();
const hello = require('./hello/hello.js');
const user = require('./users/user.js');
const good = require('./goods/index.js');

router.get('/',hello);

router.get('/goods/getGoodsType',good.getGoodsType);
router.post('/goods/getGoodsOrder',good.getGoodsOrder);
router.post('/goods/postGoodsOrder',good.postGoodsOrder);

router.post('/user/register',user.register);
router.post('/user/login',user.login);

module.exports = router;