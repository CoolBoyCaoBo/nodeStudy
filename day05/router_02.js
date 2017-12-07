function route(pathName,handle,res){
    //console.log("About to route a request for "  + pathName);
    if(typeof handle[pathName] === 'function'){
        res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'});
        handle[pathName](res);
    }else{
        res.writeHead(404,{'Content-type':'text/html;charset=UTF-8'});
        res.write(pathName+'-page is not found!');
        console.log("No request handler found for "  + pathName);  
    }
};

exports.route = route;