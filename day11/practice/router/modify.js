const express = require('express');
const student = require('../modles/studentSchema');
const router = express.Router();
const responseOk = require('./dataStyle');

//每次请求都会先走这个中间件
router.use(function(req,res,next) {
    next();
});

function modifyControl(sid,req,res){
    student.findOne({"sid":Number(sid)},(err,result)=>{
        if(err) {
            responseOk.code = '403',
            responseOk.result.message = '修改失败...',
            res.json(responseOk);
            return
        }
        result.sid = Number(req.query.sid);
        result.name = req.query.name;
        result.age = req.query.age;
        result.sex = req.query.sex;
        console.log(result)
        // result.update({"sid":Number(sid)},result,(err) => {
        //     if(err){
        //         responseOk.code = '403',
        //         responseOk.result.message = '修改失败...',
        //         res.json(responseOk);
        //         return
        //     }
        //     responseOk.code = '200',
        //     responseOk.result.message = '修改成功...'
        //     res.json(responseOk);
        // });
        result.save((err,res1) =>{ //方法2
            if(err){
                responseOk.code = '403',
                responseOk.result.message = '修改失败...',
                res.json(responseOk);
                return
            }
            responseOk.code = '200',
            responseOk.result.message = '修改成功...'
            res.json(responseOk);
        });
    });
};

function deleteControl(req,res){
    student.remove({"sid":Number(req.query.sid)},(err) => {
        if(err){
            responseOk.code = '403',
            responseOk.result.message = '删除失败...',
            res.json(responseOk);
            return
        }
        responseOk.code = '200',
        responseOk.result.message = '删除成功...'
        res.json(responseOk);
    });
};

router.get('/',(req,res) => {
    console.log(req.query);
    if(req.query.type === '0'){
        modifyControl(req.query.sid,req,res);
    }else{
        deleteControl(req,res);
    }
});


module.exports = router;