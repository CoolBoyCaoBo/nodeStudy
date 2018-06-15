//第一步在test数据的插入workmate表（集合），然后在表内（集合）,先插入数据在修改数据
// var workmate1={
//     name:'Caobo',
//     age:25,
//     sex:1,
//     job:'前端',
//     skill:{
//         skillOne:'HTML+CSS',
//         SkillTwo:'JavaScript',
//         SkillThree:'node'
//     },
//     regeditTime:new Date()
// }
 
// var workmate2={
//     name:'ShengLei',
//     age:30,
//     sex:1,
//     job:'JAVA后端',
//     skill:{
//         skillOne:'HTML+CSS',
//         SkillTwo:'J2EE',
//         SkillThree:'PPT'
//     },
//     regeditTime:new Date()
// }
 
// var workmate3={
//     name:'MinJie',
//     age:20,
//     sex:1,
//     job:'UI设计',
//     skill:{
//         skillOne:'PhotoShop',
//         SkillTwo:'UI',
//         SkillThree:'Word+Excel+PPT'
//     },
//     regeditTime:new Date()
// }
 
var db=connect('test');
// var workmateArray=[workmate1,workmate2,workmate3]
// db.workmate.insert(workmateArray)
// print('[SUCCESS]: The data was inserted successfully.');

//第二步使用$set修改器，修改某条数据 //所有修改是严格遵守key的大小写进行的，如果未找到对应的key值，则会新增一条未找到的key对应的数据

//用来修改一个指定的键值(key),这时候我们要修改上节课的sex和age就非常方便了，只要一句话就可以搞定
// db.workmate.update({"name":"MinJie"},{"$set":{sex:0,age:19}});

// 修改嵌套内容(内嵌文档)
// db.workmate.update({"name":"MinJie"},{"$set":{"skill.SkillThree":'word+ppt'}});
// db.workmate.update({"name":"MinJie"},{"$set":{"skill.SkillFour":'dance+sing'}});//我们发现并数据库没有SkillFour这个键值，但是执行后发现数据库新增了此条数据

//print('[SUCCESS]: The data was updated successfully.');

// $unset用于将key删除
// db.workmate.update({"name":"MinJie"},{$unset:{"age":''}});
// db.workmate.update({"name":"MinJie"},{$set:{"age":23}}); //再使用$set将该条数据给增添回来
// print('[SUCCESS]: The data was deleted successfully.');

// $inc对数字进行计算
// db.workmate.update({"name":"MinJie"},{$inc:{"age":+2}});
// print('[SUCCESS]: The data was added successfully.');

// multi选项
// db.workmate.update({},{$set:{interset:[]}}); //此时我们进入数据库发现并不是所有数据都有这个字段，而只有第一条数据有这个这个字段

	
// db.workmate.update({},{$set:{interset:[]}},{multi:true}); //此时我们发现workmate集合的所有数据都新增了一个interset字段

// print('[SUCCESS]: The data was added a interset successfully.');

//upsert选项
// db.workmate.update({name:'xiaoWang'},{$set:{age:20}},{upsert:true}); //但此时只有两个字段和其他数据是不统一的
//比如我们这时候又来了一个新同事xiaoWang，我们这时候修改他的信息，age设置成20岁，但集合中并没有这条数据。这时候可以使用upsert选项直接添加。
// print('[SUCCESS]: The data was upserted successfully.');