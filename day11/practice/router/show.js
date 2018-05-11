const express = require('express');
const router = express.Router();
const student = require('../modles/studentSchema');

//每次请求都会先走这个中间件
router.use(function(req, res, next) {
    next();
});

router.get('/',(req,res) => {
    student.find((err,result)=>{
        if(err){
            res.render('listShow',{
                result:'数据库查询失败...',
                state:0
            });
            return
        }
        if(result.length){
            res.render('listShow',{
                result:result,
                state:1
            });
        }else{
            res.render('listShow',{
                result:'数据库查询为空...',
                state:-1
            });
        }
    });
});
module.exports = router;