module.exports = { //此结构提值提供给前端ajax调用数据请求接口时返回给前端的数据结构
    code: '', //请求状态
    // data: {},//存放数据结构体的，若请求code为200并且有数据下发都存放在结构体中
    result: { //各种状态code对应的解释
        message: '',
        // reason: ''
    }
}