const bar = require('./bar.js');
let msg = 'Hello module test';
let infos = "Hello CaoBo,do have breakfist!!!";
function showInfo(){
    console.log(infos);
}

//和windows原理一致，需要通过exports方法暴露出去

exports.msg = msg;
exports.infos = infos;
exports.showInfo = showInfo; 