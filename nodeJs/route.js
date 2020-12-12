function route(handle, request, response, path, filename){
    //update를 눌렀을때의 filename을 기록하고 전송해야함..
    //현재 undefinded라서 update오류
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