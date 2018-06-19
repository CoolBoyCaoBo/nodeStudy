const router = require('koa-router')();
const hello = require('./hello/hello.js');
const user = require('./users/user.js');

router.get('/',hello);

router.get('/user',user);

module.exports = router;