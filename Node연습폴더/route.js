//출력방법구분

function route(handle, res, pathname){
    console.log("pathname : " + pathname);
    if(pathname === '/'){
        pathname = '/DEFAULT';
    }
    if(typeof handle[pathname] === "function"){
        console.log("pathname : " + pathname);
        handle[pathname](res, pathname);
    }else{
        handle['error'](res);
    }

}

exports.route = route;