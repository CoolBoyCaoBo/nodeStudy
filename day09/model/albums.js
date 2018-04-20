const fs = require('fs');

module.exports = {
    getAllAlbums(callback){
        let AllAlbumsArry = [];
        // callback(AllAlbumsArry);
        fs.readdir('./uploads',(err,files) => {
            if(err){
                throw err;
                return;
            }
            // console.log(JSON.stringify(files));
            (function iterator(i){
                if(i === files.length){
                    callback(AllAlbumsArry);
                    return;
                }
                fs.stat('./uploads/'+files[i],(err,stats) => {
                    if(err){
                        throw err; //找不到文件了
                        return;
                    }
                    if(stats.isDirectory()){
                        AllAlbumsArry.push(files[i]);
                    }
                    iterator(i+1);
                });
            })(0)
        });
    },
    getAlbumsPhtotoList(albumName,callback){
        fs.readdir('./uploads/'+albumName,(err,files) => {
            if(err){
                callback("没有找到uploads文件",null);
                return;
            }
            let photoList = [];
            (function iterator(i){
                if(i === files.length){
                    callback(null,photoList);
                    return;
                }
                fs.stat("./uploads/"+albumName+"/"+files[i],(err,stats) => {
                    if(err){
                        callback("找不到文件"+files[i],null);
                        return;
                    }
                    if(stats.isFile()){
                        photoList.push(files[i]);
                    }
                    iterator(i+1);
                });
            })(0);
        });
    }
}