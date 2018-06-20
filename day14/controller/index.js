const router = require('koa-router')();
const hello = require('./hello/hello.js');
const user = require('./users/user.js');

router.get('/',hello);

router.post('/user/register',user.register);
router.post('/user/login',user.login);

module.exports = router;