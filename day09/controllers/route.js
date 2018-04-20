//路由只是方法的罗列，具体的业务实现由model层实现。
const fs = require('fs');
const path = require('path');
const util = require('util');
const albums = require('../model/albums.js');
const formidable = require('formidable'); 
const sd = require('silly-datetime');

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
    }
}