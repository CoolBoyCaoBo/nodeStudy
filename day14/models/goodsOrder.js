const mongoose = require('mongoose');

const goodsOrderSchema = new mongoose.Schema({
    goodsAllCount: String,
    goodsAllPrice: String,
    goodsOrderDate: String,
    goodsOrderAdderss: String,
    goodsOrderDetails:Array,
    orderCreatedTime:{ type: Date, default: Date.now },
});

//发布模型
mongoose.model('GoodsOrderSchema',goodsOrderSchema);