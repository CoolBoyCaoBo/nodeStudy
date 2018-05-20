var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.name){
        var name = req.session.name;
        res.render('index', { title: 'Express'+ name});
    }else{
        res.send('你还没有登录，先登录下再试试！');
    }
});

module.exports = router;
