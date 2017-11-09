const foo = require('./moduleTest/foo.js');
//如果没有“./”，会认为是引入模块，Node会从去"node_modules"文件夹下找
//注意：调用的时候需要使用foo开头

console.log('02_module is loading...');

console.log(foo.msg);
console.log(foo.infos);
foo.showInfo();
