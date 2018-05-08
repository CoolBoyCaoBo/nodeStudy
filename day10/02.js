
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');
var express = require('express');

let app = express();

// URL + 端口号 + 数字库名字

let dbNameUrl = "mongodb://localhost:27017/test";

/***
 * 
 * 数据库资源是非常宝贵的，所以一点使用完毕一定要关闭
 * 
 * **/

app.get("/",(req,res) => {
    MongoClient.connect(dbNameUrl,(err,db) =>  {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var collection = db.collection('bbs');
        collection.insertMany([
            {a : 1}, {a : 2}, {a : 3}
          ], function(err, result) {
                assert.equal(err, null);
                assert.equal(3, result.result.n);
                assert.equal(3, result.ops.length);
                console.log("Inserted 3 documents into the collection");
                db.close();
                res.send("数据插入成功~");
          });
    });
});

app.listen(3000);