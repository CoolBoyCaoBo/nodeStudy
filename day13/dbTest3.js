var db=connect('test');

// db.runCommand(); 数据库运行命令的执行器，执行命令首选就要使用它，因为它在Shell和驱动程序间提供了一致的接口。
// db.workmate.update({sex:1},{$set:{money:1000}},false,true);
// var resultMessage=db.runCommand({getLastError:1});
// //参数说明
// printjson(resultMessage);

// false：第一句末尾的false是upsert的简写，代表没有此条数据时不增加;
// true：true是multi的简写，代表修改所有，这两个我们在前边课程已经学过。
// getLastError:1 :表示返回功能错误，这里的参数很多，如果有兴趣请自行查找学习，这里不作过多介绍。
// printjson：表示以json对象的格式输出到控制台。

// var resultMessage = db.runCommand({ping:1}); //返回ok：1就代表链接正常。
// printjson(resultMessage);

// findAndModify:从名字上就可以看出，findAndModify是查找并修改的意思。配置它可以在修改后给我们返回修改的结果

var myModify = {
    findAndModify:"workmate",
    query:{name:"Caobo"},
    update:{$set:{money:200000}},
    new:true, //更新完成，需要查看结果，如果为false不进行查看结果
    fields:{
        money:1
    }
};
var resultMessage = db.runCommand(myModify);
printjson(resultMessage);

// indAndModify的性能是没有直接使用db.collections.update的性能好，但是在实际工作中都是使用它，
// 毕竟要商用的程序安全性还是比较重要的。

// findAndModify属性值：

// query：需要查询的条件/文档
// sort:    进行排序
// remove：[boolean]是否删除查找到的文档，值填写true，可以删除。
// new:[boolean]返回更新前的文档还是更新后的文档。
// fields：需要返回的字段
// upsert：没有这个值是否增加。
// remove: 删除查询字段中指定的文档。将此设置为true以删除所选文档。默认的是false