function view(reponse){
    reponse.writeHead(200);
    reponse.end("view");
}

function create(reponse){
    reponse.writeHead(200);
    reponse.end("create");
}

function read(reponse){
    reponse.writeHead(200);
    reponse.end("read");
}

function update(reponse){
    reponse.writeHead(200);
    reponse.end("update");
}

function deletee(reponse){
    reponse.writeHead(200);
    reponse.end("delete");
}

var handle = {};

handle['/'] = view;
handle['/view'] = view;
handle['/create'] = create;
handle['/read'] = read;
handle['/update'] = update;
handle['/delete'] = deletee;

module.exports.handle = handle;