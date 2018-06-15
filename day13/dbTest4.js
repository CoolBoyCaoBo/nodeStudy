// 构造一个company的数据库

// var workmate1={
//     name:'CaoBo',
//     age:25,
//     sex:1,
//     job:'前端',
//     skill:{
//         skillOne:'HTML+CSS',
//         skillTwo:'JavaScript',
//         skillThree:'PHP'
//     },
//     regeditTime:new Date(),
//     interest:[]
// }
// var workmate2={
//     name:'ShengLei',
//     age:31,
//     sex:1,
//     job:'JAVA后端',
//     skill:{
//         skillOne:'HTML+CSS',
//         skillTwo:'J2EE',
//         skillThree:'PPT'
//     },
//     regeditTime:new Date(),
//     interest:[]
// }
// var workmate3={
//     name:'MinJie',
//     age:18,
//     sex:0,
//     job:'UI',
//     skill:{
//         skillOne:'PhotoShop',
//         skillTwo:'UI',
//         skillThree:'PPT'
//     },
//     regeditTime:new Date(),
//     interest:[]
// }
// var workmate4={
//     name:'XiaoWang',
//     age:25,
//     sex:1,
//     job:'UI',
//     skill:{
//         skillOne:'PhotoShop',
//         skillTwo:'UI',
//         skillThree:'PPT'
//     },
//     regeditTime:new Date(),
//     interest:[]
// }
// var workmate5={
//     name:'LiangPeng',
//     age:28,
//     sex:1,
//     job:'前端',
//     skill:{
//         skillOne:'HTML+CSS',
//         skillTwo:'JavaScript',
//     },
//     regeditTime:new Date(),
//     interest:[]
// }
// var workmate6={
//     name:'HouFei',
//     age:25,
//     sex:0,
//     job:'前端',
//     skill:{
//         skillOne:'HTML+CSS',
//         skillTwo:'JavaScript',
//     },
//     regeditTime:new Date(),
//     interest:[]
// }
// var workmate7={
//     name:'LiuYan',
//     age:35,
//     sex:0,
//     job:'美工',
//     skill:{
//         skillOne:'PhotoShop',
//         skillTwo:'CAD',
//     },
//     regeditTime:new Date(),
//     interest:[]
// }
// var workmate8={
//     name:'DingLu',
//     age:20,
//     sex:0,
//     job:'美工',
//     skill:{
//         skillOne:'PhotoShop',
//         skillTwo:'CAD',
//     },
//     regeditTime:new Date(),
//     interest:[]
// }
// var workmate9={
//     name:'JiaPeng',
//     age:29,
//     sex:1,
//     job:'前端',
//     skill:{
//         skillOne:'HTML+CSS',
//         skillTwo:'JavaScript',
//         skillThree:'PHP'
//     },
//     regeditTime:new Date(),
//     interest:[]
// }
// var workmate10={
//     name:'LiJia',
//     age:26,
//     sex:0,
//     job:'前端',
//     skill:{
//         skillOne:'HTML+CSS',
//         skillTwo:'JavaScript',
//         skillThree:'PHP'
//     },
//     regeditTime:new Date(),
//     interest:[]
// }
var db=connect('company');
// var workmateArray=[workmate1,workmate2,workmate3,workmate4,workmate5,workmate6,workmate7,workmate8,workmate9,workmate10];
// db.workmate.insert(workmateArray);
// var resultMessage=db.runCommand({getLastError:1});
// printjson(resultMessage);
// print('[SUCCESS]：The data was inserted successfully');

//find简单查询
// db.workmate.find({"skill.skillOne":"HTML+CSS"}); //load来载入了 ,控制台将会看不见结果了 ，故采用mongo 控制台输入指令查看查询结果，后面来解决这个问题

// 筛选字段
db.workmate.find({"skill.skillOne":"HTML+CSS"},{name:true,"skill.skillOne":true})//此时得到的结果就只有name 和 skill。skillOne 两个字段的数据了，多了一个ID字段

// 去掉查询到的id字段

db.workmate.find({"skill.skillOne":"HTML+CSS"},{name:true,"skill.skillOne":true,_id:false});

// 不等修饰符

// 小于($lt):英文全称less-than
// 小于等于($lte)：英文全称less-than-equal
// 大于($gt):英文全称greater-than
// 大于等于($gte):英文全称greater-than-equal
// 不等于($ne):英文全称not-equal

db.workmate.find(
    {age:{$lte:30,$gte:25}},
    {name:true,age:true,_id:false}
);

// 日期查找
var startDate = new Date('01/01/2018');

db.workmate.find(
    {regeditTime:{$gt:startDate}},
    {name:true,_id:false}
);

//find的多条件查询

// $in修饰符:可以轻松解决一键多值的查询情况 $nin：与$in相对
db.workmate.find(
    {age:{$in:[28,33]}},
    {name:1,age:1,_id:0}
);

// $or修饰符 ：查询多个键值的情况，就比如查询同事中大于30岁或者会做PHP的信息。主要区别是两个Key值
// $nor : 与 $or 相对
db.workmate.find(
    {$or:[
        {age:{$gte:30}},
        {"skill.skillThree":"PHP"}
    ]},
    {name:1,age:1,_id:0}
);

// $and修饰符 : and用来查找几个key值都满足的情况
db.workmate.find({$and:[
    {age:{$gte:25}},
    {"skill.skillThree":'PHP'}
]},
    {name:1,age:1,_id:0}
)

// $not修饰符
db.workmate.find({
    age:{
        $not:{
            $lte:30,
            $gte:20
        }
    }
},
{name:1,"skill.skillOne":1,age:1,_id:0}
)

var resultMessage=db.runCommand({getLastError:1});
printjson(resultMessage);