function People(name,sex,age){
    this.name = name;
    this.sex = sex;
    this.age = age; 
    //console.log('我是功能函数里面的方法：name:'+name+'sex:'+sex+'age'+age);
};
People.prototype = {
    sayHello:function(){
        console.log(this.name + "," + this.sex + "," + this.age);
    }
}
/*
    exports是引用的module.exports的值
*/
// exports.People = People;

//此时这样People会被认为是一个构造函数，就可以通过new来实例化
module.exports = People;