
//插入方式1:
// var startTime = (new Date()).getTime(); //得到开始时间
// var  db = connect('test');  //链接数据库

// //开始循环
// for(var i = 0 ; i < 1000; i++){
//     db.test.insert({num:i});
// }
// var runTime = (new Date()).getTime()-startTime;//计算时间差
// print ('This run this is:'+runTime+'ms');//打印出来 596ms

//插入方式2：
var startTime = (new Date()).getTime();
var  db = connect('test');

var tempArray = []              //声明一个数组
for(var i=0;i<1000;i++){        //循环向数组中放入值
    tempArray.push({num:i+"type2"});
}
db.test1.insert(tempArray)       //批量一次插入
 
var runTime = (new Date()).getTime()-startTime;
print ('This run this is:'+runTime+'ms'); //168ms 

//可以发现插入方式2要不插入方式插入速度快一倍多