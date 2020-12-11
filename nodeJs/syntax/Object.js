var Obj = {};

function func(){
    console.log("func");
}
function add(x, y){
    console.log("x + y = " + (x+y));
}

Obj['func'] = func;
Obj['add'] = add;

Obj['func']();