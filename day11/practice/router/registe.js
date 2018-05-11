const express = require('express');
const router = express.Router();
const student = require('../modles/studentSchema');
router.use(function(req, res, next) {
    next();
});
router.get('/',(req,res,next) => {
    // res.send(req.query);
    //向数据库插入数据
    student.create(req.query,(err,result)=>{
        if(err){
            res.render('result',{
                result:'数据插入失败',
                state:0
            });
            return 
        }
        res.render('result',{
            result:'数据插入成功',
            state:1
        });
    })
});

module.exports = router;