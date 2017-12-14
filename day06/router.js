
const route = (pathName,handle,res)=>{
    if(typeof handle[pathName] === 'function'){
        handle[pathName](res);
    }else{
        res.writeHead(404,{'Content-type':'text/html;charset=UTF-8'});
        res.write(pathName+'-page is not found!');
        res.end();
        console.log("No request handler found for "  + pathName);  
    }
};
exports.route = route;