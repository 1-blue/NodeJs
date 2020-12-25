//요청식별
function route(handle, pathname, rp){
    if(typeof handle[pathname] === 'function'){
        handle[pathname](rp);
    }else{
        rp.writeHead(200);
        rp.write("404");
        rp.end();
    }
}

module.exports.route = route;