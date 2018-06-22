const Koa = require('koa');
const app = new Koa();

const cors = require('koa2-cors'); // koa 跨域配置 前后端分离数据联调配置 ，当然前端联调期间也可以使用代理来解决
app.use(cors()); 

const bodyParser = require('koa-bodyparser'); //客户端参数请求的解析中间件
app.use(bodyParser()); //使用该中间件

const middleware = require('./middleware'); //加载自己写的一些处理公共逻辑的中间件
middleware(app);

const {dbConect,initSchemas} = require('./database/init.js');

const router = require('./router/route.js');

router(app);

;(async ()=>{
  await dbConect().then(()=>{
      // 数据一端连接成功就初始化所有的schema表结构
      initSchemas();
      app.listen(3000, () => {
          console.log('server has running at port 3000');
      });
  }).catch((error)=>{
      console.log(error);
  });
})();