const MongoClient = require('mongodb').MongoClient;
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
                msg:"数据获取成功,嘻嘻嘻~~~",
                data:result[0]
            });
        }).catch((error) => {
            ctx.send({
                code:200,
                msg:error,
            });
        });
    },
    postGoodsOrder:async(ctx,next) => {
        let reqData = ctx.request.body;
        console.log(reqData);
        ctx.send({
            code:200,
            message:'提交成功~~~'
        })
    }
}