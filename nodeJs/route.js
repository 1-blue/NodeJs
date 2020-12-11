function route(handle, pathname, response, filename){
    console.log("pathname : " + pathname);
    
    if(typeof handle[pathname] === 'function'){
        handle[pathname](response, filename);
    }else{
        //handle['noting'](response, filename);
    }
}

exports.route = route;