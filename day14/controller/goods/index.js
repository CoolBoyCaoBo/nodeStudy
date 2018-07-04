const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
let dbNameUrl = "mongodb://localhost:27017";
const findDocuments = function() {
    return new Promise((resolve,reject) => {
        MongoClient.connect(dbNameUrl,(err,client) => {
            if(err){
                reject('数据库连接失败,数据获取失败~~~');
                return ;
            };
            let db = client.db('sjhdDb');
            // console.log("Connected successfully to server===mongodb");
            let collection = db.collection('goodsType');
            collection.find({}).toArray(function(err,docs){
                if(err){
                    reject('数据查询失败~~~~');
                    return ;
                };
                resolve(docs);
                client.close();
            })  
        });
    })
};
module.exports = {
    getGoodsType:async(ctx,next) => {
        await next();
        await findDocuments().then((result)=>{
            ctx.send({
                code:200,
                message:"数据获取成功,嘻嘻嘻~~~",
                data:result[0]
            });
        }).catch((error) => {
            ctx.send({
                code:200,
                message:error,
            });
        });
    },
    postGoodsOrder:async(ctx,next) => {
        let reqData = ctx.request.body;
        await next();
        if(reqData.goodsOrderDate.length === 0 || reqData.goodsOrderAdderss.length === 0 || reqData.goodsOrderDetails.length === 0){
            ctx.send({
                code:503,
                message:'提交失败，错误的参数提交~~~'
            });
        }   
        let goodsOrderDetail =  mongoose.model("GoodsOrderSchema");
        await new goodsOrderDetail(reqData).save().then(() => {
            ctx.send({
                code:200,
                message:'提交成功~~~'
            });
        }).catch((error) =>{
            ctx.send({
                code:500,
                message:'提交失败~~~'
            });
        })
    },
    getGoodsOrder:async(ctx,next) => {
        let reqData = ctx.request.body;
        // console.log(reqData);
        await next();
        let　goodsOrderDetail =  mongoose.model("GoodsOrderSchema");  
        await goodsOrderDetail.find({'goodsOrderAdderss':reqData.goodsOrderAdderss},{'goodsOrderDetails':0}).exec().then((result) => {
            if(result.length > 0){
                ctx.send({
                    code:200,
                    message:'数据获取成功~~~',
                    data:result
                });
            }else{
                ctx.send({
                    code:500,
                    message:"该出货放暂时没有出货数据哟~~~"
                });
            }
        }).catch((err) => {
            ctx.send({
                code:500,
                message:err
            });
        })
    }
}