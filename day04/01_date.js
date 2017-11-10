const sd = require('silly-datetime');//时间对象，第三方node插件，非node自带

/*
    format:接受两个参数
    第一个：时间对象，就是你需要格式化的字符串对象
    第二个：传入你需要指定的时间格式

    year:年
    month:月
    day:天/日
    hour:小时
    Minute:分钟

     Y：年   M：月   D：日   H：小时  m：分钟（注意大小写）
*/ 

let newDate = sd.format(new Date(),'YYYY-MM-DD  HH:mm');

console.log('北京当前时间：'+newDate);