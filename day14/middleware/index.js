const miSend = require('./miSend');
module.exports = (app) => {
  app.use(miSend()); //JSON 数据传递中间间
}