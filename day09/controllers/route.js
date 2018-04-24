//路由只是方法的罗列，具体的业务实现由model层实现。
const fs = require('fs');
const path = require('path');
const util = require('util');
const albums = require('../model/albums.js');
const formidable = require('formidable'); 
const sd = require('silly-datetime');

const request = require('request');
module.exports = {
    showIndex(req,res,next){
        albums.getAllAlbums(function(allAlbums){
            res.render('home',{
                'allAlbums':allAlbums
            });
        });
    },
    showPhotoList(req,res,next){
        console
        let albumName = req.params.albumName;
        albums.getAlbumsPhtotoList(albumName,function(err,allPhotos){
            // console.log(allPhotos);
            if(err){
                // throw err;
                next();
                return;
            }
            res.render('photoList',{
                'albumName':albumName,
                'allPhotos':allPhotos
            })
        });
    },
    showPhotoUp(req,res,next){
        albums.getAllAlbums(function(allAlbums){
            res.render('photoUp',{
                'allAlbums':allAlbums
            });
        });
    },
    filtersUp(req,res,next){
        let form = new formidable();
        //注意：在parse之前设置上传路径，由于异步的原因，服务器可能是拿不到上传的图片的设置路径  
        /***
         * 解决方案：先设置一个默认的目录，然后等接受到表单数据之后，再移动到表单数据中指定的目录下
         * **/ 
        form.uploadDir = path.normalize(__dirname+"/../tempup/");
        form.parse(req,function(err,fields,files){
            //不能在里面设置上传路径
            if(err){
                next();
                return;
            }
            // res.end(util.inspect({fields:fields,files:files}));
            let newDate = sd.format(new Date(), "YYYYMMDDHHmmss");
            let ran = parseInt(Math.random*89999 + 10000);
            let extName = path.extname(files.uploadFile.name);//获取文件后缀
            let folder = fields.folderName;//拿到用户上传的置顶文件夹名称
            let oldPath = files.uploadFile.path;
            let newPath = path.normalize(__dirname+"/../uploads/"+folder+"/"+(newDate+ran+extName));
            fs.rename(oldPath,newPath,(err) => {
                if(err){
                    res.send("改名失败了");
                    return;
                }
                res.send("成功");
            });
        })
    },
    citisFoodsList(req,res,next){
        console.log(req.query.cityName);
        let cityname = req.query.cityName;
        if(cityname === '' || typeof(cityname) ==='undefined'){
            res.json({resultcode:"3000",reason:'您输入的城市名称为空~'});
            return false;
        }
        cityname = encodeURIComponent(req.query.cityName)
        // let cityname = encodeURIComponent('合肥');
        request.get('http://v.juhe.cn/weather/index?cityname='+cityname+'&key=c281d58e606eb66b74e3d5c01f534847',function (error, response, body){
                if (!error && response.statusCode == 200) {
                        console.log(body);
                        res.send(body);
                }else{ 
                    res.json({resultcode:"403",reason:'访问异常，请稍后再试！'});
                }
            }
        );
        // console.log(req.params);//应该是处理post请求，这个后面再来研究
        // res.send({
        //     "resultcode":"200",
        //     "reason":"successed!",
        //     "result":{
        //         "sk":{
        //             "temp":"17",
        //             "wind_direction":"东北风",
        //             "wind_strength":"3级",
        //             "humidity":"67%",
        //             "time":"13:28"
        //         },
        //         "today":{
        //             "temperature":"11℃~21℃",
        //             "weather":"多云",
        //             "weather_id":{
        //                 "fa":"01",
        //                 "fb":"01"
        //             },
        //             "wind":"北风3-5级",
        //             "week":"星期二",
        //             "city":"合肥",
        //             "date_y":"2018年04月24日",
        //             "dressing_index":"较舒适",
        //             "dressing_advice":"建议着薄外套、开衫牛仔衫裤等服装。年老体弱者应适当添加衣物，宜着夹克衫、薄毛衣等。",
        //             "uv_index":"弱",
        //             "comfort_index":"",
        //             "wash_index":"较适宜",
        //             "travel_index":"较适宜",
        //             "exercise_index":"较适宜",
        //             "drying_index":""
        //         },
        //         "future":{
        //             "day_20180424":{
        //                 "temperature":"11℃~21℃",
        //                 "weather":"多云",
        //                 "weather_id":{
        //                     "fa":"01",
        //                     "fb":"01"
        //                 },
        //                 "wind":"北风3-5级",
        //                 "week":"星期二",
        //                 "date":"20180424"
        //             },
        //             "day_20180425":{
        //                 "temperature":"13℃~22℃",
        //                 "weather":"多云",
        //                 "weather_id":{
        //                     "fa":"01",
        //                     "fb":"01"
        //                 },
        //                 "wind":"北风微风",
        //                 "week":"星期三",
        //                 "date":"20180425"
        //             },
        //             "day_20180426":{
        //                 "temperature":"13℃~24℃",
        //                 "weather":"多云",
        //                 "weather_id":{
        //                     "fa":"01",
        //                     "fb":"01"
        //                 },
        //                 "wind":"东风微风",
        //                 "week":"星期四",
        //                 "date":"20180426"
        //             },
        //             "day_20180427":{
        //                 "temperature":"16℃~25℃",
        //                 "weather":"多云",
        //                 "weather_id":{
        //                     "fa":"01",
        //                     "fb":"01"
        //                 },
        //                 "wind":"东风微风",
        //                 "week":"星期五",
        //                 "date":"20180427"
        //             },
        //             "day_20180428":{
        //                 "temperature":"17℃~26℃",
        //                 "weather":"多云转小雨",
        //                 "weather_id":{
        //                     "fa":"01",
        //                     "fb":"07"
        //                 },
        //                 "wind":"东南风3-5级",
        //                 "week":"星期六",
        //                 "date":"20180428"
        //             },
        //             "day_20180429":{
        //                 "temperature":"16℃~25℃",
        //                 "weather":"多云",
        //                 "weather_id":{
        //                     "fa":"01",
        //                     "fb":"01"
        //                 },
        //                 "wind":"东风微风",
        //                 "week":"星期日",
        //                 "date":"20180429"
        //             },
        //             "day_20180430":{
        //                 "temperature":"13℃~22℃",
        //                 "weather":"多云",
        //                 "weather_id":{
        //                     "fa":"01",
        //                     "fb":"01"
        //                 },
        //                 "wind":"北风微风",
        //                 "week":"星期一",
        //                 "date":"20180430"
        //             }
        //         }
        //     },
        //     "error_code":0
        // });

    }
}