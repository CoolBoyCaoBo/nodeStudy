const handel = require('./requestHandels');

const errorDete = (code,res,error)=>{
    res.writeHead(code,{'content-type':'text/html;charset=UTF-8'});
    res.end(error);
    return false;
};
const router = (pathname,req,res)=>{
    console.log(pathname);
    if(typeof handel.handels[pathname] === 'function'){
        handel.handels[pathname](req,res);
    }else{
        errorDete(404,res,'你要找的页面不见了，呜呜呜！！！');
    }
};
exports.router = router;
exports.errorDete = errorDete;