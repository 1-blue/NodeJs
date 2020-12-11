function route(handle, response, path, filename){
    if(typeof handle[path] === 'function')
        handle[path](response, filename);
    else
        handle['errorPage'](response, filename, path);
}

exports.route = route;