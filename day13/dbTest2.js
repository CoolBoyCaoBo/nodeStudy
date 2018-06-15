var db=connect('test');

// $push追加数组/内嵌文档值

// db.workmate.update({name:'xiaoWang'},{$push:{interest:'draw'}});//追加数组值
// db.workmate.update({name:'MinJie'},{$push:{"skill.SkillFive":'draw'}});//内嵌文档增加值
// print('[SUCCESS]: The data was pushed successfully.');


// $ne查找是否存在, 检查一个值是否存在，如果不存在再执行操作，存在就不执行

// db.workmate.update({name:'xiaoWang',"interest":{$ne:'Game'}},{$push:{interest:'Game'}});//检查interest字段中Game是否存在，若存在，则不添加，若不存在，则添加

// print('[SUCCESS]: The data was ned successfully.');

// $addToSet 升级版的$ne
// db.workmate.update({"name":"xiaoWang"},{$addToSet:{interest:'FootBall'}});//查找是否存在，不存在就push上去
// print('[SUCCESS]: The data was addToSet successfully.');

// $each 批量追加
// var newInterset = ["Sing","Dance","Code"];

//db.workmate.update({"name":"Caobo"},{$addToSet:{interest:{$each:newInterset}}});//此时我们一次想CaoBo这条数据的interest追加了三条数据

// print('[SUCCESS]: The data was eached successfully.');

// $pop 删除数组值

// db.workmate.update({"name":"Caobo"},{$pop:{interest:1}});//在数据库我们发现原先的第一条数据已经被删除了
// print('[SUCCESS]: The data was poped successfully.');

// 数组定位修改interest.int
// db.workmate.update({name:'xiaoWang'},{$set:{"interest.1":"Football"}});//我们发现数据库的数据已经发生变化了
// print('[SUCCESS]: The data was poped successfully.');
