function route(handle, request, response, path, filename){
    if(typeof handle[path] === 'function'){
        if(path == '/create_page')
            handle[path](request, response);
        else
            handle[path](response, filename);
    }   
    else
        handle['errorPage'](response, filename, path);
}

exports.route = route;